#!/bin/bash

# Redirect all subsequent commands' output to deploy.log
exec >> /home/ec2-user/digger-api/demoserver/deploy.log 2>&1

echo 'run application_start.sh: '

echo 'pm2 restart server'
pm2 restart server
