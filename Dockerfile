FROM node:14.18.1-alpine AS builder

# directory for the app in the container
WORKDIR /usr/app

# copies all the app's files from host into the container folder which 
# might include the node_modules dir if npm install executed in the host
COPY . .

# npm ci is used to install all exact version dependencies or devDependencies 
# from a package-lock.json file. If a node_modules is already present, it will 
# be automatically removed before npm ci begins its install.
RUN npm ci

# build the app
RUN npm run build

#Stage 2
#######################################
# Pull the official nginx:1.21.6-alpine base image
FROM nginx:1.21.6-alpine

# Set working directory to nginx resources directory
WORKDIR /var/www

# Remove default nginx static resources
RUN rm -rf ./*

# Copy static resources from builder stage
COPY --from=builder /usr/app/build .

# Copy nginx conf from docker/ folder
COPY ./docker/nginx/nginx.conf  /etc/nginx/nginx.conf

# Change permission of the current directory and everything within
RUN chown nginx:nginx ./*