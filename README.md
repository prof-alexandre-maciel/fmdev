# FMDEV

Framework for Educational Data Mining Developed By Universidade de Pernambuco.

# 1. Install Dependencies

Advise: We strongly recommended to use Ubuntu `18.04` for this guide.

## Requirements

* Python `3.7.6`
* Yarn `1.22.0`
* npm `6.13.7`
* nodejs `13.9.0`

### Yarn

```sh 
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -

echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/
apt/sources.list.d/yarn.list

sudo apt update

sudo apt install yarn
```

### Node.js

```sh
sudo apt update

sudo apt install nodejs
```

### NPM (Node Package Manager)

```sh
sudo apt update

sudo apt install npm
```

### Python

#### 1. Prerequsiteis 

Use the following command to install prerequisites for Python before installing it.

```sh
sudo apt-get install build-essential checkinstall

sudo apt-get install libreadline-gplv2-dev libncursesw5-dev libssl-dev \
    libsqlite3-dev tk-dev libgdbm-dev libc6-dev libbz2-dev libffi-dev zlib1g-dev
```

#### 2. Download Python 3.7 

Download Python using following command from python official site. You can also download latest version in place of specified below.

```sh
cd /usr/src

sudo wget https://www.python.org/ftp/python/3.7.6/Python-3.7.6.tgz
```

Now extract the downloaded package.

```sh
sudo tar xzf Python-3.7.6.tgz
```

#### 3. Compile Python Source

Use below set of commands to compile Python source code on your system using altinstall.

```sh
cd Python-3.7.6

sudo ./configure --enable-optimizations

sudo make altinstall
```

`make altinstall` is used to prevent replacing the default python binary file /usr/bin/python.

#### 4. Check Python Version

```sh
python3.7 -V
```

# 2. Local Development

## Backend Module

```sh
cd backend
virtualenv -p python3 venv
source venv/bin/activate
pip install -r requirements.txt
python run.py
```

## Manage Database (Flask-Migrate)

```sh
python migrate.py db migrate
python migrate.py db upgrade
```

## Frontend Module

```sh
cd frontend
npm install
npm start
```

## Analysis Module

```sh
cd analysis
virtualenv -p python3 venv
source venv/bin/activate
pip install -r requirements.txt
jupyter notebook --ip=127.0.0.1
```

