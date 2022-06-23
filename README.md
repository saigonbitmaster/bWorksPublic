# bWorks
http://bworks.app:4001/emp <br />
http://bworks.app:4001/jsk <br />
http://bworks.app:4001/cmn <br />
http://bworks.app:4001/cms <br />

## Install & run dev

```
git clone https://github.com/saigonbitmaster/bWorksPublic
cd bWorksPublic
yarn 
yarn run-api
yarn run-emp
yarn run-jsk
```

## Build app

```
make build-emp
make build-jsk
make build-cms
```

## setup .env file for api

```DK_DATA=.data
DEBUG=false
#change NODE_ENV to select configuration file e.g datasources.production.js or datasources.development.js
NODE_ENV=development
PASSWORD=*****
#set NODE_INIT_DATA = true to init database e.g ACL, user
NODE_INIT_DATA=true
#to force update INIT and TEST data
NODE_FORCE_INIT_DATA=true
#to init test data
NODE_INIT_TEST_DATA = false
PORT=4001
HOST=dev.bworks.app
#these setting used for external production server e.g nginx to communicate with outside clients.
#in this project used for email verify and reset password.
#setting below appropriately to NGINX settings in production mode.
DOMAIN=dev.bworks.app
EXTERNAL_PORT=4001
EXTERNAL_PROTOCOL=http
```
