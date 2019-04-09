 #!/bin/bash

if docker inspect nano-node &>/dev/null
 then
     if ! docker top nano-node &>/dev/null
     then
         docker start nano-node
     else
         echo "nano-node is already running"
     fi
 else

     docker run -d --name nano-node -p 7075:7075/udp -p 7075:7075 -p [::1]:7076:7076 -v ~:/root --restart=unless-stopped nanocurrency/nano
fi


