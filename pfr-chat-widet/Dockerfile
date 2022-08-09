FROM nginx:alpine

ENV HTML_DIR=/usr/share/nginx/html
ENV TEMPLATE_DIR=/usr/share/nginx/template

COPY dist/js $HTML_DIR
COPY entrypoint.sh /bin/entrypoint.sh
COPY default.conf /etc/nginx/conf.d/default.conf

#ENTRYPOINT [ "/bin/entrypoint.sh" ]
CMD ["nginx", "-g", "daemon off;"]

EXPOSE 5000
