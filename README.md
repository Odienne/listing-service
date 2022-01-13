# API listing

Un service d'annuaire qui permet de stocker simplement

Steps to run this project:
## Pré-requis : python inférieur à 3 exemple 2.7

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file if needed
3. Run migrations with `npm run migration:run` if needed
3. Run `npm start` command

# Routes

## 

POST URL/

{ \
&emsp;"value": string, \
&emsp;"type": string, \
&emsp;"userId": string \
&emsp;"gameId": string \
}

GET URL/

GET URL/{id}

PATCH URL/{id}

{ \
&emsp;"value": string, \
&emsp;"type": string, \
&emsp;"userId": string \
&emsp;"gameId": string \
}

DELETE URL/{id}
