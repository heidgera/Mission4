# Mission 4 Hacker

Raspberry pi based RFID 'hacker'.

## Disclaimer
Not complete documentation, but enough to get you started.

## Technical highlights

## Installation Instructions

Install Raspbian Jesse (not lite)

git clone https://github.com/heidgera/Mission4

cd rfidHack

./install.sh

chmod 777 startApp.sh

In .bashrc:
	./Mission4/startApp.sh

raspi-config: 
	Boot options: cmdline with autologin

## Commands available in program:

*To Change Answers:*

changeAnswer(NEW_ANSWER)

*To setup wifi:*

setupWifi(NETWORK_NAME,NETWORK_PASSWORD)

*To display current IP address:*

ipaddress
