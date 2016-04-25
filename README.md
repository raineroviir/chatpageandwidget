Build instructions

Pre-req:
    1. Nodejs (v 4.4.3 or 5.x)
    2. "npm"
    3. nginx or apache
Steps:
    git clone the repo
    cd chatcenter-web
    execute "npm run build"
        this should create a folder called "dist"

Deployment

    Copy index.html from the root of the repo to web-server doc-root
    Copy entire "dist"folder to webserver doc-root
