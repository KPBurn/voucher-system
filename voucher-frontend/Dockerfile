# Stage 1: Build the Angular app
FROM node:18.19 AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Angular application
RUN npm run build -- --configuration production

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy the Angular build output to the Nginx HTML directory
COPY --from=build /app/dist/voucher-frontend /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
