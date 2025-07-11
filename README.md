# login-proyect-api


# Nodejs + TypeScript + Sequelize + Mysql

Hola!

Para poder correr este proyecto solo se necesita tener instalador nodejs en version 
estable y ejecutar los siguientes comandos: 

Instalar las dependemcias

  npm install 

Correr el proyecto: 

  npm run dev

el proyecto cuenta con un archivo de variables de entorno con la siguiente variable (.env): 

  PORT=4000
  JWT_SECRET=supersecret
  DB_HOST=localhost
  DB_USER=root
  DB_PASSWORD=12345
  DB_NAME=login-proyect

En la carpeta de nas se encuentra un Dump de la base de datos.

Para crear la dockerizacion del API se tiene que ejecutar los siguientes comandos:

  - docker-compose up --build -d elasticsearch fluentd 
  - docker-compose up --build -d mysql backend
  - docker-compose up --build -d nginx
  - docker-compose up --build -d kibana