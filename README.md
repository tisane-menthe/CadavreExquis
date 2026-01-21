# Cadavre Exquis

This is an old project from 2020, made during a coding jam to learn how a simple server and database works. 

## Where it lives

The project was first hosted on Glitch.io. Following Glitch shutdown in 2025 it was migrated to Render. So it still functional at https://cadavreexquis.onrender.com

## Simple reminder to myself how it is all assembled

Render is not as flexible as Glitch (when you are poor like me). Therefore the database had to be moved to persist data. \
The database is using the free tier of MongoDb. \
The server is made with Express. It connects to Mongodb via Node.js. \
There is a user/pwd protection that is saved into .env (locally) and Render environment variable (in Render UI)\

## Run locally

To run locally, run node server.js
