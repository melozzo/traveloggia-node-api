# image you will start with, since this is a node js app - start with node image 
# specifying at least a major version number for saftey - otherwise always the lates
FROM node 

WORKDIR /src

COPY package.json .

RUN npm install

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 4000

# Run the specified command within the container.
CMD [ "npm", "start" ]

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .
