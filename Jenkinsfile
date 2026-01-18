pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = 'hacker-news'
        BACKEND_IMAGE = 'hacker-news-backend:20-alpine'
        FRONTEND_IMAGE = 'hacker-news-frontend:20-alpine'
        GITHUB_REPO = 'JstUsername/hacker-news'
        APP_URL = 'http://89.23.102.251'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                script {
                    env.GIT_COMMIT_SHORT = sh(
                        script: "git rev-parse --short HEAD",
                        returnStdout: true
                    ).trim()

                    env.GIT_COMMIT_FULL = sh(
                        script: "git rev-parse HEAD",
                        returnStdout: true
                    ).trim()

                    env.GIT_BRANCH = sh(
                        script: "git rev-parse --abbrev-ref HEAD",
                        returnStdout: true
                    ).trim()

                    echo "Building commit: ${env.GIT_COMMIT_SHORT}"
                    echo "Branch: ${env.GIT_BRANCH}"
                }
            }
        }

        stage('GitHub Deployment - Pending') {
            steps {
                script {
                    githubNotify(
                        status: 'PENDING',
                        context: 'continuous-deployment/jenkins',
                        description: "Deployment started for ${env.GIT_COMMIT_SHORT}"
                    )
                }
            }
        }

        stage('Prepare Environment Files') {
            steps {
                script {
                    echo 'Creating environment files from injected variables...'

                    sh '''
                        cat > app/backend/.env << EOF
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
                    '''
                    echo '✓ Backend .env created'

                    sh '''
                        cat > app/frontend/.env << EOF
                        REACT_PORT=${REACT_PORT}
                        API_URL=${API_URL}
                        EOF
                    '''
                    echo '✓ Frontend .env created'
                }
            }
        }

        stage('Build Images') {
            steps {
                script {
                    echo 'Building Docker images...'
                    sh 'docker-compose build'
                    echo '✓ Images built successfully'
                }
            }
        }

        stage('Stop Old Containers') {
            steps {
                script {
                    echo 'Stopping old containers...'
                    sh 'docker-compose down || true'
                    echo '✓ Old containers stopped'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    echo 'Starting new containers...'
                    sh 'docker-compose up -d'
                    echo '✓ New containers started'
                }
            }
        }

        stage('Wait for Services') {
            steps {
                script {
                    echo 'Waiting for services to be ready...'
                    sh 'sleep 20'
                    sh 'docker-compose ps'
                    sh 'docker-compose logs --tail=30'
                }
            }
        }

        stage('Basic Connectivity Check') {
            steps {
                script {
                    echo 'Checking services connectivity...'

                    def backendCheck = sh(
                        script: '''
                            for i in {1..10}; do
                                if nc -zv localhost 3001 2>&1 | grep -q succeeded; then
                                    echo "Backend port is open"
                                    exit 0
                                fi
                                echo "Attempt $i: Backend not ready yet..."
                                sleep 3
                            done
                            exit 1
                        ''',
                        returnStatus: true
                    )

                    if (backendCheck != 0) {
                        echo 'Warning: Backend port check failed, but continuing...'
                    } else {
                        echo '✓ Backend is responding on port 3001'
                    }

                    def frontendCheck = sh(
                        script: 'nc -zv localhost 80 2>&1 | grep -q succeeded',
                        returnStatus: true
                    )

                    if (frontendCheck != 0) {
                        echo 'Warning: Frontend port check failed, but continuing...'
                    } else {
                        echo '✓ Frontend is responding on port 80'
                    }

                    def dbCheck = sh(
                        script: 'nc -zv localhost 5432 2>&1 | grep -q succeeded',
                        returnStatus: true
                    )

                    if (dbCheck != 0) {
                        echo 'Warning: Database port check failed'
                    } else {
                        echo '✓ Database is responding on port 5432'
                    }
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                script {
                    echo 'Verifying deployment...'

                    def runningContainers = sh(
                        script: "docker-compose ps --services --filter 'status=running' | wc -l",
                        returnStdout: true
                    ).trim()

                    echo "Running containers: ${runningContainers}"

                    def frontendStatus = sh(
                        script: "docker inspect -f '{{.State.Status}}' hacker-news-frontend",
                        returnStdout: true
                    ).trim()

                    def backendStatus = sh(
                        script: "docker inspect -f '{{.State.Status}}' hacker-news-backend",
                        returnStdout: true
                    ).trim()

                    def dbStatus = sh(
                        script: "docker inspect -f '{{.State.Status}}' hacker-news-postgres",
                        returnStdout: true
                    ).trim()

                    echo "Frontend status: ${frontendStatus}"
                    echo "Backend status: ${backendStatus}"
                    echo "Database status: ${dbStatus}"

                    if (frontendStatus != 'running' || backendStatus != 'running' || dbStatus != 'running') {
                        error('Not all containers are running!')
                    }

                    echo '✓ All containers are running'
                    sh 'docker-compose logs --tail=50'
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    echo 'Cleaning up old Docker images...'
                    sh '''
                        docker image prune -f

                        docker images 'hacker-news-backend' --format "{{.ID}} {{.CreatedAt}}" | \
                            sort -rk 2 | awk 'NR>3 {print $1}' | xargs -r docker rmi -f || true

                        docker images 'hacker-news-frontend' --format "{{.ID}} {{.CreatedAt}}" | \
                            sort -rk 2 | awk 'NR>3 {print $1}' | xargs -r docker rmi -f || true
                    '''
                    echo '✓ Cleanup completed'
                }
            }
        }
    }

    post {
        success {
            script {
                echo "✅ Deployment successful! Commit: ${env.GIT_COMMIT_SHORT}"
                echo "Frontend: ${APP_URL}"
                echo "Backend: ${APP_URL}:3001"

                githubNotify(
                    status: 'SUCCESS',
                    context: 'continuous-deployment/jenkins',
                    description: "Deployment completed successfully",
                    targetUrl: "${APP_URL}"
                )
            }
        }

        failure {
            script {
                echo "❌ Deployment failed! Commit: ${env.GIT_COMMIT_SHORT}"

                sh 'docker-compose logs --tail=100 || true'

                githubNotify(
                    status: 'FAILURE',
                    context: 'continuous-deployment/jenkins',
                    description: "Deployment failed - check logs"
                )

                echo 'Attempting rollback...'
                sh 'docker-compose down || true'
            }
        }

        always {
            script {
                echo 'Cleaning up sensitive files...'

                sh '''
                    rm -f app/backend/.env || true
                    rm -f app/frontend/.env || true
                '''

                echo 'Final container status:'
                sh 'docker-compose ps || true'
                echo '✓ Post-deployment cleanup completed'
            }
        }
    }
}
