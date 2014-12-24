#!/bin/sh
echo "Installing nl.js into /opt/";
mkdir /opt/nljs
cp nl.js /opt/nljs/nl.js
cp package.json /opt/nljs/package.json
cd /opt/nljs
npm install
ln -s /opt/nljs/nl.js /usr/bin/nljs
echo "Install complete. Execute with nljs (nl.json)";
