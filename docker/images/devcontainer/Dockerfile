FROM composer:latest AS composer

FROM wordpress:cli AS wpcli

FROM wordpress:5.8-php8.0-apache

WORKDIR /var/www/html

COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY 000-default.conf /etc/apache2/sites-enabled/000-default.conf
COPY ports.conf /etc/apache2/ports.conf
COPY --from=composer /usr/bin/composer /usr/bin/composer
COPY --from=wpcli /usr/local/bin/wp /usr/local/bin/wp

RUN apt-get update && apt-get install -y gnupg wget curl ca-certificates git sshpass rsync mariadb-client mariadb-server supervisor

ENV NODE_VERSION=16.13.0
RUN wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.39.1/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" &&  nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
RUN cp /root/.nvm/versions/node/v${NODE_VERSION}/bin/node /usr/bin/
RUN cp /root/.nvm/versions/node/v${NODE_VERSION}/bin/npm /usr/bin/
RUN /root/.nvm/versions/node/v${NODE_VERSION}/bin/npm install  leasot@latest -g

EXPOSE 8000 3306
