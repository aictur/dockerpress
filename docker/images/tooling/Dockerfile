ARG NODE_VERSION=14.17
ARG PHP_TAG=8.0-cli

FROM node:${NODE_VERSION} AS node

FROM php:${PHP_TAG}
COPY --from=node /usr/local/lib/node_modules /usr/local/lib/node_modules
COPY --from=node /usr/local/bin/node /usr/local/bin/node
RUN ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm

RUN apt-get update && apt-get upgrade -y && apt-get install -y build-essential curl wget \
  sshpass rsync ssh mariadb-client git

RUN wget --output-document=composer-setup.php https://getcomposer.org/installer
RUN php composer-setup.php --install-dir=bin --filename=composer && rm composer-setup.php
RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar && chmod +x wp-cli.phar && mv wp-cli.phar /usr/local/bin/wp

ENTRYPOINT /bin/bash