#!/bin/bash

# Script to build and serve the project using a docker image.

IMAGE=quizio_frontend
PORT=3005

echo 'Building image...'
docker build -t $IMAGE .

echo 'Running image...'
docker run -dp $PORT:80 $IMAGE

echo "Quizio Frontend build successful. App is running on port $PORT"