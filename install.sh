#!/bin/bash

echo "Adding Adafruit Declarations and installing node:"

curl -sLS https://apt.adafruit.com/add | sudo bash

sudo apt-get install node

echo "Creating Device Tree Blob for halt signal on GPIO25:"

sudo dtc -I dts -O dtb -o /boot/dt-blob.bin my-blob.dts

echo "Installing dependencies for application:"

npm config set disturl https://atom.io/download/atom-shell
npm config set target 1.3.15
npm config set runtime electron

npm i
