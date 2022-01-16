FROM node:16 AS node_base


FROM wordpress:5.8-php8.0-apache

RUN apt-get update && apt-get install -y  wget curl ca-certificates git sshpass rsync mariadb-client

ENV NODE_VERSION=16.13.0
RUN wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.39.1/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" &&  nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
RUN cp /root/.nvm/versions/node/v${NODE_VERSION}/bin/node /usr/bin/
RUN cp /root/.nvm/versions/node/v${NODE_VERSION}/bin/npm /usr/bin/
RUN /root/.nvm/versions/node/v${NODE_VERSION}/bin/npm install  leasot@latest -g
