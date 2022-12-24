FROM php:7.3-fpm-alpine

RUN docker-php-ext-install pdo_mysql

WORKDIR /var/www/html/

RUN php -r "readfile('http://getcomposer.org/installer');" | php -- --install-dir=/usr/bin/ --filename=composer



# copy all of the file in folder to /src
COPY . /src
WORKDIR /src


RUN echo "hello there"
RUN echo $WORKDIR
RUN composer update

# run the php server service
# move this command to -> docker-compose.yml
CMD php -S 0.0.0.0:3000 public/index.php
