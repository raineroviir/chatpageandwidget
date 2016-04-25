## Build instructions

### Pre-req:
+ Nodejs (v 4.4.3 or 5.x)
+ "npm"
+ nginx or apache

### Steps:
1. git clone the repo
2. cd chatcenter-web
3. execute "npm run build" (this should create a folder called "dist")

### Deployment (until we have service side component for the business app) -
1. Copy index.html from the root of the repo to web-server doc-root
2. Copy entire "dist"folder to webserver doc-root
