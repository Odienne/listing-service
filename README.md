# API meme-me

Meme-me, le magnifique jeu où l'on peut juger les performances de cringes des autres joueurs

Steps to run this project:
## Pré-requis : python

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file if needed
3. Run migrations with `npm run migration:run` if needed
3. Run `npm start` command

# Routes

## User

POST URL/users

{ \
&emsp;"email": string, \
&emsp;"password": string, \
&emsp;"nom": string, \
&emsp;"prenom": string, \
&emsp;"pseudo": string, \
&emsp;"birthday_date": string, \
&emsp;"inscription_date": string, \
&emsp;"last_connexion": string \
} 

GET URL/users

GET URL/users/{id}

PATCH URL/users/{id}

{ \
&emsp;"email": string, \
&emsp;"password": string, \
&emsp;"nom": string, \
&emsp;"prenom": string, \
&emsp;"pseudo": string, \
&emsp;"birthday_date": string, \
&emsp;"inscription_date": string, \
&emsp;"last_connexion": string, \
&emsp;"idTrophy":integer, \
&emsp;"idLobby":integer \
} 

DELETE URL/users/{id}

## Game

POST URL/games

{ \
&emsp;"name": string, \
&emsp;"description": string, \
&emsp;"status": string, \
&emsp;"tour": integer \
}

GET URL/games

GET URL/games/{id}

PATCH URL/games/{id}

{ \
&emsp;"name": string, \
&emsp;"description": string, \
&emsp;"status": string, \
&emsp;"tour": integer, \
&emsp;"idUser":1 \
}

DELETE URL/games/{id}

## Trophy

POST URL/trophies

{ \
&emsp;"name": string, \
&emsp;"icon": string, \
&emsp;"description": string \
}

GET URL/trophies

GET URL/trophies/{id}

PATCH URL/trophies/{id}

{ \
&emsp;"name": string, \
&emsp;"icon": string, \
&emsp;"description": string \
}

DELETE URL/trophies/{id}

## Lobby

POST URL/lobbies

{ \
&emsp;"description": string, \
&emsp;"max_player": integer, \
&emsp;"game_mode": string, \
&emsp;"created_date": string, \
&emsp;"status": string, \
}

GET URL/lobbies

GET URL/lobbies/{id}

PATCH URL/lobbies/{id}

{ \
&emsp;"description": string, \
&emsp;"max_player": integer, \
&emsp;"game_mode": string, \
&emsp;"created_date": string, \
&emsp;"status": string, \
}

DELETE URL/lobbies/{id}
