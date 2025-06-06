# hacker-news

Веб - приложение, имитирующее [API](https://github.com/tastejs/hacker-news-pwas/blob/master/docs/api.md) для получения новостей и комментариев с новостного портала, оснащенное интерфейсом для их просмотра.

## Технологии

#### Общие:
- <img height="20" src="https://user-images.githubusercontent.com/25181517/183890598-19a0ac2d-e88a-4005-a8df-1ee36782fde1.png" alt="TypeScript"> TypeScript;
- <img height="20" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/turborepo.png" alt="Turborepo"> Turborepo;

#### Frontend:
- <img height="20" src="https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png" alt="React"> React;
- <img height="20" src="https://user-images.githubusercontent.com/958486/218346783-72be5ae3-b953-4dd7-b239-788a882fdad6.svg" alt="Zustand"> Zustand;
- <img height="20" src="https://github.com/marwin1991/profile-technology-icons/assets/25181517/2a36d1f6-2198-4726-89ac-2148ce46a69a" alt="Styled components"> Styled components;
- <img height="20" src="https://github-production-user-asset-6210df.s3.amazonaws.com/62091613/261395532-b40892ef-efb8-4b0e-a6b5-d1cfc2f3fc35.png" alt="Vite"> Vite.

#### Backend:
- <img height="20" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/express.png" alt="Express"> Express;
- <img height="20" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/postgresql.png" alt="PostgreSQL"> PostgreSQL;
- <img height="20" src="https://sequelize.org/img/logo.svg" alt="Sequelize"> Sequelize;
- <img height="18" src="https://esbuild.github.io/favicon.svg" alt="Esbuild"> Esbuild;
- <img height="20" src="https://fakerjs.dev/logo.svg" alt="Faker"> Faker;


#### DevOps:
- <img height="20" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/docker.png" alt="Docker"> Docker;
- <img height="20" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/nginx.png" alt="Nginx"> Nginx;
- <img height="20" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/kubernetes.png" alt="Kubernetes"> Kubernetes;

## Разработка

### Требования

Для установки и запуска проекта, необходим [NodeJS](https://nodejs.org/) v21.7.0+.

### Установка зависимостей

Для установки зависимостей, выполните команду:

```sh
npm install
```

> [!TIP]
> Перед запуском не забудьте создать .env файлы в директориях `/app/backend` и `/app/frontend`. Примеры приведены в .env.example.

### Запуск приложения

Чтобы выполнить development сборку и запустить приложение, выполните команду:

```sh
npm run dev
```

Чтобы выполнить production сборку и запустить приложение, выполните команды:

```sh
npm run build
```

```sh
npm run serve:dev
```

## Docker

Чтобы запустить приложение с помощью docker-compose, выполните команду:

```sh
docker-compose -p hacker-news up -d
```

## K8s

Перед запуском вам будет необходимо сгенерировать `secret` по `.env` файлу из директории `/app/backend`.

Для этого выполните команду:
```sh
kubectl create secret generic hacker-news-backend-secret --from-env-file=./app/backend/.env
```

Примените конфигурацию к кластеру:
```sh
kubectl apply -f ./.deploy/k8s
```

Пробросьте порты frontend, для удобного доступа по localhost:
```sh
kubectl port-forward svc/hacker-news-frontend-service 80:3000
```
