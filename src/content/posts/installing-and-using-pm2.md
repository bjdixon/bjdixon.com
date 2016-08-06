---
title: "Installing and using PM2"
date: 2016-03-28
author: "bjdixon"
authorUrl: "https://github.com/bjdixon"
template: post.hbt
---

PM2 is a process manager for Node.js applications. It provides an easy way to run them in the background as a service.

###Install

    sudo npm install -g pm2

###Manage an application with PM2

Use the pm2 start command to run your application

    pm2 start hello-world.js

This also adds your application to PM2's process list, which is outputted every time you start an application:

To get more details about a running app use the pm2 show command

    pm2 show <id|name>

PM2 automatically assigns an App name (based on the filename, without the .js extension) and a PM2 id. PM2 also maintains other information, such as the PID of the process, its current status, and memory usage.

If an application running under PM2 crashes or is killed it will automatically restart. To have an application launch on system startup use the pm2 startup command

    pm2 startup systemd

The last line of the resulting output includes a command that must be run with superuser privileges

###Other PM2 commands

Stop an application

    pm2 stop <id|name>

Restart an application

    pm2 restart <id|name>

List applications currently managed by PM2

    pm2 list

More information about a specific application

    pm2 info <id|name>

The PM2 process monitor can be pulled up with the monit subcommand. This displays the application status, CPU, and memory usage:

    pm2 monit
