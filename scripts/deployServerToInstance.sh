#!/bin/bash
# to be run from project root

# not to be included in copy operation
rm -rf coast-server/node_modules

## delete old files
ssh -i $1 ec2-user@$2 "rm -rf /home/ec2-user/coast-server"

# copy new files
scp -i $1 -r coast-server ec2-user@$2:/home/ec2-user/coast-server

ssh -i $1 ec2-user@$2 "npm i --prefix /home/ec2-user/coast-server"
ssh -i $1 ec2-user@$2 "sudo systemctl daemon-reload"
ssh -i $1 ec2-user@$2 "sudo systemctl restart coast-server"