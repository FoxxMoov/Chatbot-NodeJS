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
$ curl https://chatbot-node-app.herokuapp.com/
```

Send "**Hello World**" (online version)

# Exercice 3

```
$ curl http://localhost:3000/hello?nom=Sasha
```

```
$ curl https://chatbot-node-app.herokuapp.com/hello?nom=Sasha
```

Send "**Bonjour, Sasha !**"

```
$ curl http://localhost:3000/hello?nom=Michel
```

```
$ curl https://chatbot-node-app.herokuapp.com/hello?nom=Michel
```

Send"**Bonjour, Michel !**"

```
$ curl http://localhost:3000/hello
```

```
$ curl https://chatbot-node-app.herokuapp.com/hello
```

Send "**Quel est votre nom ?**"

# Exercice 4

```
$ curl -X POST --header "Content-Type: application/json" --data "{\"msg\":\"ville\"}" http://localhost:3000/chat
```

```
$ curl -X POST --header "Content-Type: application/json" --data "{\"msg\":\"ville\"}" https://chatbot-node-app.herokuapp.com/chat
```

Send "**Nous sommes à Paris**"

```
$ curl -X POST --header "Content-Type: application/json" --data "{\"msg\":\"météo\"}" http://localhost:3000/chat
```

```
$ curl -X POST --header "Content-Type: application/json" --data "{\"msg\":\"météo\"}" https://chatbot-node-app.herokuapp.com/chat
```

Send "**Il fait beau**"

# Exercice 5

```
$ curl -X POST --header "Content-Type: application/json" --data "{\"msg\":\"demain\"}" http://localhost:3000/chat
```

```
$ curl -X POST --header "Content-Type: application/json" --data "{\"msg\":\"demain\"}" https://chatbot-node-app.herokuapp.com/chat
```

Send "**Je ne connais pas demain...**"

```
$ curl -X POST --header "Content-Type: application/json" --data "{\"msg\":\"demain = Mercredi\"}" http://localhost:3000/chat
```

```
$ curl -X POST --header "Content-Type: application/json" --data "{\"msg\":\"demain = Mercredi\"}" https://chatbot-node-app.herokuapp.com/chat
```

Send "**Merci pour cette information !**"

```
$ curl -X POST --header "Content-Type: application/json" --data "{\"msg\":\"demain\"}" http://localhost:3000/chat
```

```
$ curl -X POST --header "Content-Type: application/json" --data "{\"msg\":\"demain\"}" https://chatbot-node-app.herokuapp.com/chat
```

Send "**demain: Mercredi**"

# Partie 2 :

============

# Exercice 1

```
$ node dates.js
```

Register the actual date & console log all dates registered in DB

# Exercice 2

```
$ curl -X POST --header "Content-Type: application/json" --data "{\"msg\":\"ville\"}" http://localhost:3000/chat
```

Send "**Nous sommes à Paris**" & adding messages from bot & user to DB

```
$ curl -X GET http://localhost:3000/messages/all
```

Displays the history of conversations (from the DB)

```
$ curl -X DELETE http://localhost:3000/messages/last
```

Delete the last conversation (from the DB)

# Exercice 3

URL of the APP : https://chat-bot-mongodb.herokuapp.com/

```
$ curl -X POST --header "Content-Type: application/json" --data "{\"msg\":\"ville\"}" https://chatbot-node-app.herokuapp.com/chat
```

Send "**Nous sommes à Paris**" & adding messages from bot & user to DB

```
$ curl -X GET https://chatbot-node-app.herokuapp.com/messages/all
```

Displays the history of conversations (from the DB)

```
$ curl -X DELETE https://chatbot-node-app.herokuapp.com/messages/last
```

Delete the last conversation (from the DB)
