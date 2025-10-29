FROM richarvey/nginx-php-fpm:3.1.6

# Copy application code
COPY . /var/www/html

# Image configuration
ENV SKIP_COMPOSER 0
ENV WEBROOT /var/www/html/public
ENV PHP_ERRORS_STDERR 1
ENV RUN_SCRIPTS 1
ENV REAL_IP_HEADER 1

# App config
ENV APP_ENV production
ENV APP_DEBUG false

# Allow composer to run as root
ENV COMPOSER_ALLOW_SUPERUSER 1

# Set working directory
WORKDIR /var/www/html

# Install composer dependencies
RUN composer install --no-dev --optimize-autoloader

CMD ["/start.sh"]
