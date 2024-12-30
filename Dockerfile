FROM ubuntu:latest
LABEL authors="DGrabarz"

ENTRYPOINT ["top", "-b"]

# Use a lightweight Node.js image for building the React app
FROM node:16-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application and build it
COPY . .
RUN npm run build

# Use an Nginx image to serve the React app
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
