# ! /bin/bash
ENV_FILE=".env"

load_env () {
  . $ENV_FILE
}

init () {
  echo "
  ================================================
    Creando archivo $ENV_FILE
    Llenar con los valores necesarios
  ================================================"

  cp -v .env.example $ENV_FILE 
}

start () {
  load_env

  docker compose --env-file ./.env up -d 

  echo "
  ================================================
    Database: mysql://$LABORATORY_DB_HOST:$LABORATORY_DB_PORT
    user: $LABORATORY_DB_USERNAME
    password: $LABORATORY_DB_PASSWORD
    db: $LABORATORY_DB_DATABASE
  ================================================
    Api http://localhost:$PORT/$ROOT_APLICATION
  ================================================"
}

stop () {
  echo "
  ================================================
    Apagando docker
  ================================================"

  docker compose down
}

bash () {
  echo "
  ================================================
    Entrando al bash de docker para ejecutar comandos en el contenedor
  ================================================"

  docker exec -it back_medico bash
}

reset_containers () {
  echo "
  ================================================
    Reseteando la imagen del back en docker
  ================================================"

  docker-compose build --no-cache $1
  start
}

migrations_create () {
  npm run migrations:create api/src/database/migrations/$1
}

migrations_generate () {
  npm run migrations:generate api/src/database/migrations/$1
}

${@}