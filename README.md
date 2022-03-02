# Projet API-Qualite-EAU-77
<img src="https://static.data.gouv.fr/avatars/c7/8f3e7b4d5740b890684d16aa381697.png" width="200" height="100" /> <img src="https://hubeau.eaufrance.fr/sites/default/files/api/demo/piezo/images/logohubeau.svg" width="200" height="100" />

Le Système d’information sur l’eau (site de [Eau France](https://www.eaufrance.fr/)), vise à mettre à disposition les données publiques sur l’eau. 
Dans ce cadre, une plateforme ([Hubeau](https://hubeau.eaufrance.fr/page/api-qualite-cours-deau)) a été mise en place pour diffuser un certain nombre de jeux de données massives 
via des API, permettant de requêter et télécharger des données, manuellement ou par programme.

L'objectif du projet est d'exploiter les données de l’API Qualité des cours d’eau pour 
visualiser sous forme de cartographie dynamique les résultats de mesure de présence d’un pesticide, le glyphosate, 
ainsi que de son principal produit de dégradation, l’AMPA, dans les cours d’eau du département de Seine-et-Marne (77).

## Sommaire
1. [Tuto GitHub](#tuto-github)
2. [Tuto pgAdmin](#tuto-pgadmin)
3. [Tuto Geoserver](#tuto-geoserver)

***

## 1. Tuto GitHub
### Objectif de GitHub :
GitHub est une plate-forme d'hébergement de code pour le contrôle de version et la collaboration entre membres d'une équipe.
Cela nous permet de tous ensemble nous partager les modifications de données, de fichiers et de les mettre à jour sur un serveur, ici GitHub.
Mais pour pouvoir pousser de nouvelles modifications de nos fichiers locaux sur des dépôts à distants sur GitHub, il est préférable d'utiliser une invite de commande
grâce à l'installation rapide de Git(Bash) sur l'ordinateur.

Export des fichiers de GitHub : pour exporter les fichiers sur GitHub sur votre bureau, un fichier .zip est disponible sur la plate-forme.

## 2. Tuto pgAdmin


## 3. Tuto Geoserver
### Objectif de Geoserver :
Créer un entrepôt de données sous Geoserver dans l’objectif de diffuser les données précédemment 
stockées dans la base de données Postgis via des flux (WMS, WFS, ...) via l’interface 
d’administration web de Geoserver.

### Installation Java et Geoserver
* [Java 64 bits pour Windows](https://www.java.com/fr/download/) : Version 8
* [Geoserver - Windows Installer](http://geoserver.org/release/stable/) : Version 2.20.2

Après avoir installé correctement Geoserver en suivant les précédentes instructions, il faut démarrer Geoserver avec votre application "Start Geoserver" sur votre PC.
Pour accéder au Geoserver après installation, la ligne suivante est à taper dans la barre de recherche de votre navigateur.
```
http://localhost:8080/geoserver
```

