# Nano Wall
This project is the backend for Nano Wall.  
Generates x amount of nano addresses and stores them in a json file.  
Then brute force checks each block that comes in to see if any of the generated addresses is a receiver.  
If receiver validate hash and update 2d array to receiver  
## Dependencies  
Docker  
Docker compose  
npm  
nodejs  
pm2  
  
  
## Setup  
  
chmod +x ./docker-start.sh  
./docker-start.sh  
npm install  
add block_confirm into node_modules/rai_client  
## Adding a wallet to node
  
[Create wallet](https://github.com/nanocurrency/nano-node/wiki/Docker-node#setting-up-a-wallet-and-adding-accounts)  
  
## Start  
npm start  
  
## Test  
npm test  
