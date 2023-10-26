# coast

EC2 Instance Setup: 
- Launch instance with Amazon Linux OS
- Install mongo: https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-amazon/#std-label-install-mdb-community-amazon-linux
- Install node using nvm 
- Setup security groups to allow for SSH and TCP access from dev computer/whatever accesses the mongo instance
- Start mongo running using :"systemctl start mongod"
- Create systemd script by copying contents of coast.service file into /etc/systemd/system/coast.service on EC2

Deploying changes to EC2:
- From dev computer (or wherever the source code to copy exists), run scripts/deployToInstance.sh with args for private key location, ec2 public ip, and project directory respectively
- From ec2 instnace, run "systemctl daemon reload" and "systemctl start coast". This should start the process in the background.
The status can be confirmed using "systemctl status coast"