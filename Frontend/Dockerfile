# Usar una imagen base de Node.js
FROM node:16

# Configurar el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar todo el código fuente al contenedor
COPY . .

# Establecer el puerto en el que se ejecutará la aplicación
ENV PORT=2250

# Exponer el puerto
EXPOSE 2250

# Comando para ejecutar la aplicación
CMD ["npm", "start"]

