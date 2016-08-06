---
title: "Installing let's encrypt"
date: 2016-08-06
author: "bjdixon"
authorUrl: "https://github.com/bjdixon"
template: post.hbt
---

###Requirements

You must own or control the registered domain name that you wish to use the certificate with.

Create an A Record that points your domain to the public IP address of your server. This is required because of how Let's Encrypt validates that you own the domain it is issuing a certificate for. For example, if you want to obtain a certificate for example.com, that domain must resolve to your server for the validation process to work.

###Install dependencies

Make sure that the git and bc packages are installed

    sudo apt-get -y install git bc

Clone the letsencrypt repository from GitHub to /opt/letsencrypt. The /opt/ directory is a standard location for software that's not installed from the distribution's official package repositories

    sudo git clone https://github.com/letsencrypt/letsencrypt /opt/letsencrypt

Change to the letsencrypt directory

    cd /opt/letsencrypt

###Retrieve Initial Certificate

nginx is probably already running on port 80, and the Let's Encrypt client needs this port in order to verify ownership of your domain, stop nginx temporarily

    sudo systemctl stop nginx

Run letsencrypt with the Standalone plugin

    ./letsencrypt-auto certonly --standalone

You'll be prompted to answer several questions, including your email address, agreement to a Terms of Service, and the domain name(s) for the certificate.

###Configure Nginx for HTTPS

You'll need to add some details to your Nginx configuration. Open /etc/nginx/sites-enabled/default for editing

    sudo nano /etc/nginx/sites-enabled/default

Replace its contents with the following

    # HTTP - redirect all requests to HTTPS:
    server {
        listen 80;
        listen [::]:80 default_server ipv6only=on;
        return 301 https://$host$request_uri;
    }

    # HTTPS - proxy requests on to local Node.js app:
    server {
        listen 443;
        server_name your_domain_name;

        ssl on;
        # Use certificate and key provided by Let's Encrypt:
        ssl_certificate /etc/letsencrypt/live/your_domain_name/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/your_domain_name/privkey.pem;
        ssl_session_timeout 5m;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_prefer_server_ciphers on;
        ssl_ciphers 'EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH';

        # Pass requests for / to localhost:8080:
        location / {
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-NginX-Proxy true;
            proxy_pass http://localhost:8080/;
            proxy_ssl_session_reuse off;
            proxy_set_header Host $http_host;
            proxy_cache_bypass $http_upgrade;
            proxy_redirect off;
        }

Exit the editor and save the file. Start Nginx again

    sudo systemctl start nginx

You can test your new certificate and Nginx configuration by visiting http://your_domain_name/ in your browser. You should be redirected to https://your_domain_name/, without any security errors, and see the default page served by your Node.js app.

***The certificate retrieval process has to be repeated every 90 days***
