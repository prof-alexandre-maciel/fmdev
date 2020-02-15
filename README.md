# FMDEV
Msc. Project from Universidade de Pernambuco

## Backend
```
cd backend
virtualenv -p python3 venv
source venv/bin/activate
pip install -r requirements.txt
python run.py
```

## Manage Database (Flask-Migrate)

```
python migrate.py db migrate
python migrate.py db upgrade
```

## Frontend
```
cd frontend
npm install
npm start
```

## Analysis

```
cd analysis
virtualenv -p python3 venv
source venv/bin/activate
pip install -r requirements.txt
jupyter notebook --ip=127.0.0.1
```