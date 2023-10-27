#!/bin/bash

# not to be included in copy operation
rm -rf coast-ui/node_modules

## delete old files
ssh -i $1 ec2-user@$2 "rm -rf /home/ec2-user/coast-ui"

# copy new files
scp -i $1 -r $3 ec2-user@$2:/home/ec2-user/coast-ui