# Musicify microservices

This application caontains multiple services that are used to serve for Musicify App. The follwing microservices exists:

- Albums
- Bands
- Favourites
- Genres
- Tracks
- Users
- Artists

## Installation

1. In each microservice copy and rename env.example to .env
2. If needed apply changes in .env file. Each .env file have _PORT_ variable (by default it's 3000 in each service)
   and _VERIFY_TOKEN_URL_ (url for jwt verification in Users service)
3. You can install node modules by:
    ```bash
   # separately in each service folder
   npm i
   
   # separately for each service form the rood directory
   npm run install:%serviceName%
   
   # for all services (install dependencies for root folder and it will install nested dependencies in postinstall script)
   npm i
   ```
4. To run services:
   ```bash
   # separately in each service folder
   npm run:start:dev

   # separately for each service form the rood directory
   npm run run:%serviceName%

   # all services
   npm run run:all
   ```

## Mongo

The application is using MongoDB as a database. Feel free to choose any solution for it, however it's highle recommended to use Docker and the official image for it.

[Docker MongoDB](https://hub.docker.com/_/mongo)

# А теперь моя часть

# Если используешь докер для микросервисов
1) В корне проекта создаёшь Dockerfile с таким содержимым:
```
FROM node:16-alpine
WORKDIR /app
ARG current_user
ARG current_user_group
RUN mkdir /tmp/npm_cache && chown -R $current_user:$current_user_group /tmp/npm_cache
RUN npm config set cache /tmp/npm_cache
```
2) Билдишь образ контейнера `docker build --build-arg current_user=$(id -u) --build-arg current_user_group=$(id -g) -t task5:latest .`
3) Запускаешь контейнер командой `docker run --network host -v $(pwd):/app -it task5 sh`
# Если не используешь докер
# Запуск MongoDB
1) Билдишь образ MongoDB контейнера `docker build -t task5_mongodb:latest --file ./docker/MongoDBDockerfile ./docker/`
2) Запускаешь контейнер командой `docker run -d --network host task5_mongodb`
