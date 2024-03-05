#!/bin/bash

# Redirect all subsequent echo commands to deploy.log
exec >> /home/ec2-user/digger-api/demoserver/deploy.log 2>&1

echo 'run after_install.sh: '

echo 'cd /home/ec2-user/nodejs-server-cicd'
cd /home/ec2-user/digger-api/demoserver

echo 'npm install --force'
npm install --force
