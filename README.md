## Installation

Install Docker 

```bash
Install Docker-compose version 3
$ sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
$ sudo chmod +x /usr/local/bin/docker-compose
```

```bash
# Install nvm and node
$ curl -sL https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh -o install_nvm.sh
$ export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
$ nvm  install 19
```


```bash
#Install dependencies 
$ npm install
```

## Running the app
```bash
#start a database for develepment
# for both integration test and dev we need this to make sure we already have mongo running
$ npm run infra
```


```bash
#Remove .example from .env.example and provide respected data for bootstraping  
# you will find two set of URL for docker and local development in config file we make sure 
# if application is running in docker we use docker internal dns and not the local host 

# seed 
$ npm run seed

# watch mode
$ npm run dev

```

## Test

```bash
# integration tests
$ npm run test
```

## Docker-Compose 
```bash 
# Boostrapping the application on docker
$ docker-compose up --build
```

