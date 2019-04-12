# Nano Wall
This project is the backend for Nano Wall. Generates addresses from nano node which it then brute force checks every block that comes from the network. After finding a match to the set or addresses it then validates and updates.
    
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
  
## Adding a wallet to node
  
[Create wallet](https://github.com/nanocurrency/nano-node/wiki/Docker-node#setting-up-a-wallet-and-adding-accounts)  
  
## Start  
npm start  
  
## Test  
npm test  
