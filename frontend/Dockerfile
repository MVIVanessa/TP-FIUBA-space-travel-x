FROM nginx:alpine

COPY ./pages /usr/share/nginx/html
COPY ./styles /usr/share/nginx/html/styles
COPY ./config.js /usr/share/nginx/html/config.js
COPY ./pages/index.html /usr/share/nginx/html/index.html


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
