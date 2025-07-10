FROM node:18

#carpeta donde trabajaremos los archivos
WORKDIR /app

# Copiamos package.json y package-lock.json
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código
COPY . .

# Compilamos TypeScript
RUN npm run build

# Exponemos el puerto (ajusta si no es 3000)
EXPOSE 4000

# Comando para ejecutar la app
CMD ["npm", "start"]