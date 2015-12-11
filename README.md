# JDM-dico
L'objectif du projet est d'afficher des informations sur des mots en récupérant les données de jeux de mots.

## Architecture de l'application
L'application contiendra un serveur Node.js ainsis qu'un client Angular.js

### Le serveur Node.js
Le serveur Node.js a deux rôles:
- distribuer le client
- produire un JSON wrapper autour de l'XML récupéré depuis l'API de jeuxdemots.org. L'exposition des données JSON sera de la forme d'une API RESTful

### Le client Angular.js
Le client Angular.js consommera l'API RESTful mise à disposition par le serveur Node.js. Il affiche ensuite ces données via des templates. Ces templates utiliseront bootstrap pour gérer le responsive design.

### API jeuxdemots

- accéder aux infos du mot chat : http://www.jeuxdemots.org/rezo-xml.php?gotermsubmit=Chercher&gotermrel=chat

## Déploiement de l'application

- créer un fichier `secret.json` de la frome suivante :

```
{
    "host" : "IP ou domaine de l'host",
    "username" : "username",
    "password" : "password"
}

```

puis lancer la commande suivante : `grunt deploy`

Félicitation, vous avez deployé votre application !
