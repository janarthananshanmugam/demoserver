#!/bin/bash
echo 'run after_install.sh: ' >> /home/ec2-user/digger-api/demoserver/deploy.log

echo 'cd /home/ec2-user/nodejs-server-cicd' >> /home/ec2-user/digger-api/demoserver/deploy.log
cd /home/ec2-user/digger-api/demoserver >> /home/ec2-user/digger-api/demoserver/deploy.log

echo 'npm install --force' >> /home/ec2-user/digger-api/demoserver/deploy.log 
npm install >> /home/ec2-user/digger-api/demoserver/deploy.log
