## Install Operating System on Pi

1. Set the timezone (`sudo timedatectl set-timezone America/Denver`)
1. Set the locale

## Setup OOKLA Speedtest on Pi

1. Install Ookla Speedtest (`curl`, then `sudo apt install speedtest`)
1. Put speedtest in cron file (NOT on the hour).
1. Use script?

- Ping first, then send data.
- If ping fails, keep track locally of how long we can't ping.
- If ping fails, send notification to Pushover (to check DO server).
- That means power is on but Comcast is down.
- When ping succeeds send that info (how long down) to server.
- Therefore, completely missing data on the server indicates power outage.

```sh
speedtest --format=json | jq -r '"\(.timestamp),\(.download.bandwidth*8),\(.upload.bandwidth*8)"' >> ispeed.csv
```

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
1. Install user dotfiles.
1. Install emacs?
1. Put new user in sudo group (`usermod -aG sudo username)
1. Make sure sudo is installed.
1. Make SSH keys for root and users (`ssh-keygen`; save with meaningful filename)
1. Update SSH config file for new key (`Host`, etc.).
1. Copy keys to droplet (ssh-copy-id -i ~/.ssh/keyname user@host)
1. Check the SSH agent (`ssh-add -l`)
1. Disable all root logins (SSH or password).
1. Disable password login for users (SSH only).
1. Configure and enable the firewall.
1. Figure out how to update regularly.

Check these then remove as they may contain settings that override
your desired defaults (these are `Include`d in the defaults file):

```sh
sudo rm /etc/ssh/sshd_config.d/*
```

## Write the Node Server

1. Using Fastify for my server. Go (Echo) maybe later.
1. Use `pino` for logging.
1. Use `logrotate` to rotate logs.
1. Use AWS S3 to backup the data file (speeds).
1. Use `pm2` to auto-restart the server.
1. Return data in CSV (or in format client wants)?

- Leaning towards returining data in requested format.
- Use a query string to pass requested format.
- Browser can't use Node packages so server seems like best fit.

## Install NGINX

1. Enable firewall for SSH and HTTP (HTTPS if using SSL).
1. Consider DO Application Platofrm?
1. Consider gRPC solution?

- Nginx can proxy to gRPC server.

1. Consider Caddy and Go router/middleware?
1. Consider Hono on Cloudflare?

## Link NGINX to Server

1. Configure Nginx for reverse proxy.

## Point Namecheap Subdomain to DO Droplet

1. Add an 'A' record to DNS on Namecheap.

## Install Certificate for SSL?

## Write the Web Client

1. Use same repo as server (monorepo)?

- Can Netlify grab a site from a directory in the repo?

1. Where to put the dashboard page (i.e. which of my sites)?
1. Use `node-csv/csv-parse` to unpack returned CSV data.
