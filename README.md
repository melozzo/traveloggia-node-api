# traveloggia-node-api

This app is running on express, managed by pm2 it is installed at home/api-user/traveloggia-node-api 
api-user is the only login that seems to be working 5/2/21


as of 5/9/21 - mongo-death has public key for my mac - as api-user

use scp from mac to send files to ubuntu / Digital Ocean ( the api server )

scp photoRoutes.js api-user@138.68.12.0:. photoRoutes.js

// note colon after the server ip - the . means root dir which is api-user ( inside there is traveloggia-node-api )

use ssh api-user@138.68.12.0 to connect to remote
( or  from Digital Ocean dash board open console )

use sudo cp photoRoutes.js traveloggia-node-api/Routes  

on the server to copy to the correct directory ( then clean up )

There is not much installed on the server, not even nginx 

pm2 is running the traveloggia-node-api server  ( 5/9/21 its called tra-api )

use pm2 list 
to see whats running 

https://pm2.keymetrics.io/docs/usage/quick-start/

https://scriptingosx.com/2017/07/transferring-files-with-ssh/