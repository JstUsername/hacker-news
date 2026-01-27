pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = 'hacker-news'
        GITHUB_ACCOUNT       = 'JstUsername'
        GITHUB_REPO          = 'hacker-news'
        DEPLOY_ENV           = 'production'
        BACKEND_IMAGE        = 'hacker-news-backend:20-alpine'
        FRONTEND_IMAGE       = 'hacker-news-frontend:20-alpine'
        APP_URL              = 'http://45.144.220.219'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                script {
                    env.GIT_COMMIT_SHORT = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
                    env.GIT_COMMIT_FULL  = sh(script: "git rev-parse HEAD", returnStdout: true).trim()
                    env.GIT_BRANCH       = sh(script: "git rev-parse --abbrev-ref HEAD", returnStdout: true).trim()
                    echo "Building commit: ${env.GIT_COMMIT_SHORT} on branch: ${env.GIT_BRANCH}"
                }
            }
        }

        stage('GitHub Status — Pending') {
            steps {
                githubNotify(
                    status: 'PENDING',
                    context: 'continuous-deployment/jenkins',
                    description: "Deployment started...",
                    credentialsId: 'github-token',
                    repo: "${env.GITHUB_REPO}",
                    sha: "${env.GIT_COMMIT_FULL}",
                    account: "${env.GITHUB_ACCOUNT}"
                )
            }
        }

        stage('Create GitHub Deployment') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'github-token', usernameVariable: 'GITHUB_USER', passwordVariable: 'GITHUB_TOKEN')]) {
                    script {
                        def deploymentPayload = """
                        {
                            "ref": "${env.GIT_COMMIT_FULL}",
                            "environment": "${env.DEPLOY_ENV}",
                            "auto_merge": false,
                            "required_contexts": [],
                            "description": "Deploying ${env.GIT_COMMIT_SHORT} to ${env.DEPLOY_ENV}"
                        }
                        """
                        writeFile file: 'deployment.json', text: deploymentPayload

                        def response = sh(
                            script: """
                                curl -s -X POST "https://api.github.com/repos/${env.GITHUB_ACCOUNT}/${env.GITHUB_REPO}/deployments" \\
                                  -H "Authorization: Bearer ${GITHUB_TOKEN}" \\
                                  -H "Accept: application/vnd.github+json" \\
                                  -d @deployment.json
                            """,
                            returnStdout: true
                        ).trim()

                        echo "GitHub Response: ${response}"

                        env.DEPLOYMENT_ID = sh(
                            script: "echo '${response}' | jq -r '.id'",
                            returnStdout: true
                        ).trim()

                        if (!env.DEPLOYMENT_ID || env.DEPLOYMENT_ID == 'null') {
                            error("Failed to create GitHub deployment. Response: ${response}")
                        }

                        echo "Deployment created with ID: ${env.DEPLOYMENT_ID}"
                    }
                }
            }
        }

        stage('Prepare Environment Files') {
            steps {
                script {
                    echo 'Creating environment files...'

                    sh """
                        cat > app/backend/.env <<EOF
EXPRESS_PORT=${EXPRESS_PORT}
EXPRESS_HOST=${EXPRESS_HOST}
FRONTEND_URL=${FRONTEND_URL}
NEWS_COUNT=${NEWS_COUNT}
MAX_COMMENT_PER_NEWS=${MAX_COMMENT_PER_NEWS}
MAX_COMMENT_REPLIES=${MAX_COMMENT_REPLIES}
MAX_COMMENT_LEVEL=${MAX_COMMENT_LEVEL}
JWT_ACCESS_SECRET=${JWT_ACCESS_SECRET}
JWT_REFRESH_SECRET=${JWT_REFRESH_SECRET}
JWT_ACCESS_TOKEN_EXPIRES_IN=${JWT_ACCESS_TOKEN_EXPIRES_IN}
JWT_REFRESH_TOKEN_EXPIRES_IN=${JWT_REFRESH_TOKEN_EXPIRES_IN}
POSTGRES_USER=${POSTGRES_USER}
POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
POSTGRES_DB=${POSTGRES_DB}
POSTGRES_HOST=${POSTGRES_HOST}
POSTGRES_PORT=${POSTGRES_PORT}
EOF
                    """

                    sh """
                        cat > app/frontend/.env <<EOF
REACT_PORT=${REACT_PORT}
API_URL=${API_URL}
EOF
                    """
                }
            }
        }

        stage('Build & Deploy') {
            steps {
                script {
                    echo 'Building and deploying services...'
                    sh 'docker compose build'
                    sh 'docker compose down || true'
                    sh 'docker compose up -d'
                }
            }
        }

        stage('Health Checks') {
            steps {
                script {
                    echo 'Waiting for services...'
                    sleep 20

                    timeout(time: 1, unit: 'MINUTES') {
                        script {
                            def status = sh(script: '''
                                for i in {1..10}; do
                                    if nc -zv localhost 3001 2>&1 | grep -q succeeded; then exit 0; fi
                                    sleep 3
                                done
                                exit 1
                            ''', returnStatus: true)

                            if (status != 0) echo "Warning: Backend port 3001 not reachable"
                            else echo "✓ Backend ready"
                        }
                    }

                    def runningCount = sh(script: "docker compose ps --services --filter 'status=running' | wc -l", returnStdout: true).trim()
                    echo "Services running: ${runningCount}"
                    sh 'docker compose logs --tail=50'

                    if (runningCount.toInteger() < 3) {
                         error("Not all services are running. Check logs above.")
                    }
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    sh 'docker image prune -f'
                }
            }
        }
    }

    post {
        success {
            updateGithubStatus('success', 'Deployment successful')
        }

        failure {
            updateGithubStatus('failure', 'Deployment failed')
            script {
                echo 'Attempting rollback...'
                sh 'docker compose down || true'
            }
        }

        always {
            script {
                echo 'Removing sensitive files...'
                sh 'rm -f app/backend/.env app/frontend/.env deployment.json status_payload.json'
            }
        }
    }
}

def updateGithubStatus(state, description) {
    if (!env.DEPLOYMENT_ID) {
        echo "No Deployment ID found, skipping GitHub status update."
        return
    }

    withCredentials([usernamePassword(credentialsId: 'github-token', usernameVariable: 'GITHUB_USER', passwordVariable: 'GITHUB_TOKEN')]) {
        script {
            def payload = """
            {
                "state": "${state}",
                "environment_url": "${env.APP_URL}",
                "log_url": "${env.BUILD_URL}",
                "description": "${description}"
            }
            """
            writeFile file: 'status_payload.json', text: payload

            sh """
                curl -s -X POST "https://api.github.com/repos/${env.GITHUB_ACCOUNT}/${env.GITHUB_REPO}/deployments/${env.DEPLOYMENT_ID}/statuses" \\
                  -H "Authorization: Bearer ${GITHUB_TOKEN}" \\
                  -H "Accept: application/vnd.github+json" \\
                  -d @status_payload.json
            """
        }
    }

    githubNotify(
        status: state.toUpperCase(),
        context: 'continuous-deployment/jenkins',
        description: description,
        credentialsId: 'github-token',
        repo: "${env.GITHUB_REPO}",
        sha: "${env.GIT_COMMIT_FULL}",
        account: "${env.GITHUB_ACCOUNT}"
    )
}
