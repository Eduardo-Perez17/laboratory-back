# definimos la verision de node
FROM --platform=linux/amd64 node:18

# copiamos primero esto y asi cada vez que se haga un cambio en el codigo no haga el install
COPY ["package.json", "package-lock.json", "nest-cli.json", "tsconfig.json", "tsconfig.build.json", "/usr/src/"]

# nos movemos al directorio
WORKDIR /usr/src

# hacemos el install
RUN npm install && npm install -g @nestjs/cli

# ahora si copiamos todos los archivos del proyecto
COPY [".", "/usr/src"]

# exponemos el puerto por el cual la maquina afitriona puede acceder a este contenedor
EXPOSE 3001

# en caso de que no se ejecute un comando tenemos este por default
CMD ["npm", "run", "start:dev"]