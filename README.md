## Install Operating System on Pi

1. Set the timezone (`sudo timedatectl set-timezone America/Denver`)
1. Set the locale

## Setup OOKLA Speedtest on Pi

1. Install Ookla Speedtest (`curl`, then `sudo apt install speedtest`)

1. Install Ookla Speedtest.
1. Put speedtest in cron file (NOT on the hour).

## Create Digital Ocean Droplet

1. Create droplet on DO console (debian)
1. Log in with root password.
1. Create user accounts (`adduser username`)
1. Put new user in sudo group (`usermod -aG sudo username)
1. Make sure sudo is installed.
1. Make SSH keys for root and users (`ssh-keygen`; save with meaningful filename)
1. Update SSH config file for new key (`Host`, etc.).
1. Copy keys to droplet (ssh-copy-id -i ~/.ssh/keyname user@host)
1. Check the SSH agent (`ssh-add -l`)
1. Disable root login.
1. Disable password login.

## Write the Node Server

## Install NGINX

## Link NGINX to Server

## Point Namecheap Subdomain to DO Droplet

## Install Certificate for SSL?
