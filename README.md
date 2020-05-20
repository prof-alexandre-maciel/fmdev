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

## 1.1 Nginx

### 1.1.1 Install Nginx

```sh
sudo apt update
sudo apt install nginx
```
### 1.1.2 Adjusting the Firewall

```sh
sudo ufw app list
```

You can enable this by typing:

```sh
sudo ufw allow 'Nginx HTTP'
```

### 1.1.3 Checking your Web Server

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

### 2.1 Yarn

```sh 
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -

echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

sudo apt update

sudo apt install yarn
```

### 2.2 Node Version Manager

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

### 2.3 Python

#### 2.3.1 Prerequsiteis 

Use the following command to install prerequisites for Python before installing it.

```sh
sudo apt-get install build-essential checkinstall

sudo apt-get install libreadline-gplv2-dev libncursesw5-dev libssl-dev \
    libsqlite3-dev tk-dev libgdbm-dev libc6-dev libbz2-dev libffi-dev zlib1g-dev
```

#### 2.3.2 Download Python 3.7 

Download Python using following command from python official site. You can also download latest version in place of specified below.

```sh
cd /usr/src

sudo wget https://www.python.org/ftp/python/3.7.6/Python-3.7.6.tgz
```

Now extract the downloaded package.

```sh
sudo tar xzf Python-3.7.6.tgz
```

#### 2.3.3 Compile Python Source

Use below set of commands to compile Python source code on your system using altinstall.

```sh
cd Python-3.7.6

sudo ./configure --enable-optimizations

sudo make altinstall
```

`make altinstall` is used to prevent replacing the default python binary file /usr/bin/python.

#### 2.3.4 Check Python Version

```sh
python3.7 -V
```

### 2.4 Download Repository

```sh
cd ~/

git clone https://github.com/prof-alexandre-maciel/fmdev.git
```

### 2.5 Install and Activate Virtualenv

```sh
cd backend

python3.7 -m venv venv

source venv/bin/activate
```

### 2.6 Install Python Requirements

```sh
pip install -r requirements.txt
```

### 2.7 Enable Firewall UFW

```sh
sudo ufw allow 5000
```

### 2.8 Install Yarn Dependencies

```sh
cd ~/fmdev/frontend

yarn install
```

### 2.9 Configure node memory limit to increase build

```sh
export NODE_OPTIONS=--max_old_space_size=3072
```

### 2.10 Build Frontend

```sh
cd ~/fmdev/frontend

yarn build
```

### 2.11 Rollback Max Space After Build

```sh
export NODE_OPTIONS=--max_old_space_size=512
```


# 3. Deploy on Docker

In Progress

# 4. Local Development

## 4.1 Backend Module

```sh
cd backend
python3.7 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python run.py
```

## 4.2 Manage Database (Flask-Migrate)

```sh
python migrate.py db migrate
python migrate.py db upgrade
```

## 4.3 Frontend Module

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