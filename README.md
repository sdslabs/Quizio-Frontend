# Quizio Frontend

Frontend for Quizio!

## Setting Up Quizio Backend

- run `npm install && npm start` 
> OR
- run `docker-compose up`

# Dev Notes:

## Security:
- Currently the user is authnticated by a jwtToken sent by the client as a cookie. This is unsafe as the cookie is prone to xss attacks in the frontend. 
- Ideally, the cookie must be set from the backend as an 'http-only' cookie.