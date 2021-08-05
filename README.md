# traveloggia-node-api

This app is running on express, managed by pm2 it is installed at home/api-user/traveloggia-node-api 
api-user is the only login that seems to be working 5/2/21


as of 5/9/21 - mongo-death has public key for my mac - as api-user pwd - api-death

use scp from mac to send files to ubuntu / Digital Ocean ( the api server )

scp photoRoutes.js api-user@138.68.12.0:

// note colon after the server ip - the . means root dir which is api-user ( inside there is traveloggia-node-api )

use ssh api-user@138.68.12.0 to connect to remote
( or  from Digital Ocean dash board open console )

use sudo cp photoRoutes.js traveloggia-node-api/Routes  
api-user password : api-death

on the server to copy to the correct directory

 ( then clean up )
rm siteController.js  	

There is not much installed on the server, not even nginx 

In order to see your updates you need to restart pm2 ( I think you can set it to watch, but thats todo)

pm2 is running the traveloggia-node-api server  ( 5/9/21 its called tra-api )

use pm2 list 
to see whats running 

$ pm2 stop api

pm2 start tra-api --attach ( to get console log)

https://pm2.keymetrics.io/docs/usage/quick-start/

https://scriptingosx.com/2017/07/transferring-files-with-ssh/


The mongo db data base is hosted on the digital ocean droplet mongo-death ( 138.68.12.0) // also hosts the api   - it is associated with the digital ocean project "traveloggia-node-api"

the droplet has a firewall, and in addition the mongo database uses ufw security - white listing ips that are allowed to access the resource

at the moment it appears there is the same firewall being used for both the data base / service droplet
and the website ( cart blanche )  - i think this is a mistake - whats valid is the settings around port 27017 ( mongo's default port)  and thus the firewall for the database - its nescessary to change when developing ( using studio 3T or localhost ) from another machine ( ie in long island or landes ) you need to add that ip to the white list both on the firewall and on the database itself ( see in structions above link)

// check what is currently allowed
You can verify the change in firewall settings with ufw:
sudo ufw status
The output will show that traffic to port 27017 from the remote server is now allowed:

// run to add another allowed ip
Run the following command, making sure to change trusted_server_ip to the IP address of the trusted remote machine you’ll use to access your MongoDB instance:

Note: If the previous command’s output showed your installation of MongoDB is listening on a non default port, use that port number in place of 27017 in this command.

sudo ufw allow from trusted_server_ip to any port 27017

https://www.digitalocean.com/community/tutorials/how-to-configure-remote-access-for-mongodb-on-ubuntu-20-04
