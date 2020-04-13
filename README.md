# Hello World Server

===============

## Setup

```
$ git clone https://gitlab.eemi.tech/corentin.ravet/chatbot-node.git
$ npm install
$ cd chatbot-node
$ npm run start
```

# What it is, what it does

Server that responds "Hello World" or something else to HTTP GET and POST request

# Usage

# Partie 1 :

============

# Exercice 1 et 2

```
$ curl http://localhost:3000/
```

Send "**Hello World**" (local version)

```
$ curl https://chat-bot-mongodb.herokuapp.com/
```

Send "**Hello World**" (online version)

# Exercice 3

```
$ curl http://localhost:3000/hello?nom=Sasha
```

```
$ curl https://chat-bot-mongodb.herokuapp.com/hello?nom=Sasha
```

Send "**Bonjour, Sasha !**"

```
$ curl http://localhost:3000/hello?nom=Michel
```

```
$ curl https://chat-bot-mongodb.herokuapp.com/hello?nom=Michel
```

Send"**Bonjour, Michel !**"

```
$ curl http://localhost:3000/hello
```

```
$ curl https://chat-bot-mongodb.herokuapp.com/hello
```

Send "**Quel est votre nom ?**"
