
FROM node:20-alpine AS build
WORKDIR /chess
COPY package*.json ./
RUN npm install
COPY . .
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
RUN npm run build

FROM nginx:stable-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /chess/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]