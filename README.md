# FMDEV

Framework for Educational Data Mining Developed By Universidade de Pernambuco.

## Requirements:

* Python `3.7.6`.
* Yarn `1.22.0`.
* npm `6.13.7`.
* nodejs `13.9.0`.
* Git `2.17.1` or superior.
* For production deploy, we strongly install on `Ubuntu 18.04`.

## Minimal Hardware

* 4 GB
* 2 CPUs
* 80 GB/ SSD DISK

# 1. Installation

## Download Repository

```sh
cd ~/

git clone https://github.com/prof-alexandre-maciel/fmdev.git
```

## 1.1 Nginx

Install Nginx:

```sh
sudo apt update
sudo apt install nginx
```
Adjusting the Firewall:

```sh
sudo ufw app list
```

You can enable this by typing:

```sh
sudo ufw allow 'Nginx HTTP'
```

Checking your Web Server

At the end of the installation process, Ubuntu 18.04 starts Nginx. The web server should already be up and running.

We can check with the systemd init system to make sure the service is running by typing:

```sh
systemctl status nginx
```

```sh
Output
● nginx.service - A high performance web server and a reverse proxy server
   Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
   Active: active (running) since Fri 2018-04-20 16:08:19 UTC; 3 days ago
     Docs: man:nginx(8)
 Main PID: 2369 (nginx)
    Tasks: 2 (limit: 1153)
   CGroup: /system.slice/nginx.service
           ├─2369 nginx: master process /usr/sbin/nginx -g daemon on; master_process on;
           └─2380 nginx: worker process
```

When you have your server’s IP address, enter it into your browser’s address bar:

```sh
http://your_server_ip
```

### 1.2 Yarn

```sh 
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -

echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

sudo apt update

sudo apt install yarn
```

### 1.3 Node Version Manager

This tool, helps to install Node.js and NPM (Node Package Manager).

```sh
sudo apt update

curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | sh

source ~/.nvm/nvm.sh

nvm install 13.9.0

nvm use 13.9.0
```

Check installation:

```sh
node --version

npm --version
```

## 1.4 React.js

Install Node Modules

```sh
cd ~/fmdev/frontend

yarn install
```

Configure node memory limit to increase build

```sh
export NODE_OPTIONS=--max_old_space_size=3072
```

Build

```sh
cd ~/fmdev/frontend

yarn build
```

Rollback Max Space After Build

```sh
export NODE_OPTIONS=--max_old_space_size=512
```

### 1.5 Python


Use the following command to install prerequisites for Python before installing it.

```sh
sudo apt-get install build-essential checkinstall

sudo apt-get install libreadline-gplv2-dev libncursesw5-dev libssl-dev \
    libsqlite3-dev tk-dev libgdbm-dev libc6-dev libbz2-dev libffi-dev zlib1g-dev
```

Download Python using following command from python official site. You can also download latest version in place of specified below.

```sh
cd /usr/src

sudo wget https://www.python.org/ftp/python/3.7.6/Python-3.7.6.tgz
```

Now extract the downloaded package.

```sh
sudo tar xzf Python-3.7.6.tgz
```

Use below set of commands to compile Python source code on your system using altinstall.

```sh
cd Python-3.7.6

sudo ./configure --enable-optimizations

sudo make altinstall
```

`make altinstall` is used to prevent replacing the default python binary file /usr/bin/python.

Check Python Version

```sh
python3.7 -V
```

Install and Activate Virtualenv

```sh
cd backend

python3.7 -m venv venv

source venv/bin/activate
```

Install Python Requirements

```sh
pip install -r requirements.txt
```

Enable Firewall UFW

```sh
sudo ufw allow 5000
```

Configure Gunicorn as Service:

```sh
nano /etc/systemd/system/fmdev.service
```

Copy and Paste this code on `fmdev.service`. Remember to check if FMDEV path is correct.

```sh
[Unit]
Description=FMDEV Service
After=network.target

[Service]
User=root
WorkingDirectory=/root/fmdev/backend
Environment="PATH=/root/fmdev/backend/venv/bin"
ExecStart=/root/fmdev/backend/venv/bin/gunicorn -b 127.0.0.1:5000 app:app
Restart=always

[Install]
WantedBy=multi-user.target
```

Reload Daemons:

```sh
sudo systemctl daemon-reload
```

Enable Service:

```sh
sudo systemctl start fmdev
```

Check if service its running:

```sh
sudo systemctl status fmdev
```

You will see a status like this:

```sh
● fmdev.service - FMDEV Service
   Loaded: loaded (/etc/systemd/system/fmdev.service; enabled; vendor preset: enabled)
   Active: active (running) since Wed 2020-05-20 20:43:26 UTC; 9min ago
 Main PID: 26626 (gunicorn)
    Tasks: 2 (limit: 4704)
   CGroup: /system.slice/fmdev.service
           ├─26626 /root/fmdev/backend/venv/bin/python3.7 /root/fmdev/backend/venv/bin/gunicorn 
           └─26646 /root/fmdev/backend/venv/bin/python3.7 /root/fmdev/backend/venv/bin/gunicorn 

May 20 20:43:26 fmdev systemd[1]: Started FMDEV Service.
May 20 20:43:26 fmdev gunicorn[26626]: [2020-05-20 20:43:26 +0000] [26626] [INFO] Starting gunic
May 20 20:43:26 fmdev gunicorn[26626]: [2020-05-20 20:43:26 +0000] [26626] [INFO] Listening at: 
May 20 20:43:26 fmdev gunicorn[26626]: [2020-05-20 20:43:26 +0000] [26626] [INFO] Using worker: 
May 20 20:43:26 fmdev gunicorn[26626]: [2020-05-20 20:43:26 +0000] [26646] [INFO] Booting worker
```

# 2. Deploy on Docker

In Progress

# 3. Local Development

## 3.1 Backend Module

```sh
cd backend
python3.7 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python run.py
```

## 3.2 Manage Database (Flask-Migrate)

```sh
python migrate.py db migrate
python migrate.py db upgrade
```

## 3.3 Frontend Module

```sh
cd frontend
yarn install
yarn start
```

## Analysis Module (For view jupyter notebook analysis - Not required)

```sh
cd analysis
python3.7 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
jupyter notebook --ip=127.0.0.1
```