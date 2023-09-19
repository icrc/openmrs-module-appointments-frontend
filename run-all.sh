#!/bin/sh

echo "npm install in ui folder"
sh run.sh npm run preinstall-ci
echo "npm install in root folder"
sh run.sh npm install ci
echo "npm run build in root folder"
sh run.sh npm run bunldle
