## Install Operating System on Pi

1. Set the timezone (`sudo timedatectl set-timezone America/Denver`)
1. Set the locale

## Setup OOKLA Speedtest on Pi

1. Install Ookla Speedtest (`curl`, then `sudo apt install speedtest`)

1. Install Ookla Speedtest.
1. Put speedtest in cron file (NOT on the hour).

One line of data:
```sh
2024-04-29T00:45:18Z,532644720,23770232
```
is about 40 bytes, so one day is about 1K, so one year is about 365K. After
three years file size will only be about a megabyte.

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
1. Disable all root logins (SSH or password).
1. Disable password login for users (SSH only).

Check these then remove as they may contain settings that override
your desired defaults (these are `Include`d in the defaults file):
```sh
sudo rm /etc/ssh/sshd_config.d/*
```

## Write the Node Server

## Install NGINX

1. Enable firewall for SSH and HTTP (HTTPS if using SSL).

## Link NGINX to Server

## Point Namecheap Subdomain to DO Droplet

## Install Certificate for SSL?
