#!/bin/bash
docker ps -a|grep admin &&  docker stop admin && docker rm admin || echo "not exist"
docker images |grep  admin && docker rmi -f admin || echo  "not exist"
docker build -t admin .
docker run -d --name admin -p 8888:80 admin
