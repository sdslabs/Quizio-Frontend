# Quizio Frontend

Frontend for Quizio!

## Setting Up Guide

- run `npm install`
- run `npm start`

> OR

- run `docker-compose build` 
- run `docker-compose up`

## Deployment Guide

- run `bash deploy.sh`
# Dev Notes:

## Security:
- Currently the user is authnticated by a jwtToken sent by the client as a cookie. This is unsafe as the cookie is prone to xss attacks in the frontend. 
- Ideally, the cookie must be set from the backend as an 'http-only' cookie.