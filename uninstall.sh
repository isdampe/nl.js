#!/bin/sh
echo "Uninstalling nl.js from /opt/";
rm /opt/nljs -R
echo "Removing symlink on nljs";
rm /usr/bin/nljs
echo "Uninstall complete.";
