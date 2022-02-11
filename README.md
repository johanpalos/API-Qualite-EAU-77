# Projet API-Qualite-EAU-77

L'objectif du projet est d'exploiter les données de l’API Qualité des cours d’eau pour 
visualiser sous forme de cartographie dynamique les résultats de mesure de présence d’un pesticide, le glyphosate, 
ainsi que de son principal produit de dégradation, l’AMPA, dans les cours d’eau du département de Seine-et-Marne (77).

## Sommaire
1. [Tuto GitHub](#tuto-github)
2. [Tuto Geoserver](#tuto-geoserver)

***

## Tuto GitHub
#### Objectif de GitHub :
GitHub est une plate-forme d'hébergement de code pour le contrôle de version et la collaboration entre membres d'une équipe.
Cela nous permet de tous ensemble nous partager les modifications de données, de fichiers et de les mettre à jour sur un serveur, ici GitHub.
Mais pour pouvoir pousser de nouvelles modifications de nos fichiers locaux sur des dépôts à distants sur GitHub, il est préférable d'utiliser une invite de commande
grâce à linstallation rapide de Git(Bash) sur l'ordinateur.

#### Export des fichiers de GitHub via un serveur local par Git
Une petite intorduction pour l'installation de Git via ce lien ci-dessous. 
* [Git - Downloading Package](http://git-scm.com/downloads) : Version 2.35.1

Et voici une commande pour copier un dépôt distant sur un serveur local.
```
$ cd desktop
$ git clone https://github.com/johanpalos/API-Qualite-EAU-77.git
```

## Tuto Geoserver
#### Objectif de Geoserver :
Créer un entrepôt de données sous Geoserver dans l’objectif de diffuser les données précédemment 
stockées dans la base de données Postgis via des flux (WMS, WFS, ...) via l’interface 
d’administration web de Geoserver.

