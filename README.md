# Projet sur l'Exploitation cartographique de l’API Qualité des cours d’eau
<img src="https://static.data.gouv.fr/avatars/c7/8f3e7b4d5740b890684d16aa381697.png" width="200" height="100" /> <img src="https://hubeau.eaufrance.fr/sites/default/files/api/demo/piezo/images/logohubeau.svg" width="200" height="100" />

Le Système d’information sur l’eau (site de [Eau France](https://www.eaufrance.fr/)), vise à mettre à disposition les données publiques sur l’eau. 
Dans ce cadre, une plateforme ([Hubeau](https://hubeau.eaufrance.fr/page/api-qualite-cours-deau)) a été mise en place pour diffuser un certain nombre de jeux de données massives 
via des API, permettant de requêter et télécharger des données, manuellement ou par programme.

L'objectif du projet est d'exploiter les données de l’API Qualité des cours d’eau pour 
visualiser sous forme de cartographie dynamique les résultats de mesure de présence d’un pesticide, le glyphosate, 
ainsi que de son principal produit de dégradation, l’AMPA, dans les cours d’eau du département de Seine-et-Marne (77).

## Sommaire
1. [GITHUB](#github)
2. [INSTALLATION PGADMIN](#installation-pgadmin)
3. [INSTALLATION GEOSERVER](#installation-geoserver)
4. [MISE EN PLACE DE LA BASE DE DONNEES](#mise-en-place-des-donnees)
5. [MISE EN PLACE DU SERVEUR CARTOGRAPHIQUE](#mise-en-place-du-serveur-cartographique)

***

## 1. GITHUB
GitHub est une plate-forme d'hébergement de code pour le contrôle de version et la collaboration entre membres d'une équipe.
Cela nous permet de tous ensemble nous partager les modifications de données, de fichiers et de les mettre à jour sur un serveur, ici GitHub.
Mais pour pouvoir pousser de nouvelles modifications de nos fichiers locaux sur des dépôts à distants sur GitHub, il est préférable d'utiliser une invite de commande
grâce à l'installation rapide de Git(Bash) sur l'ordinateur.

Export des fichiers de GitHub : pour exporter les fichiers sur GitHub sur votre bureau, un fichier .zip est disponible sur la plate-forme.
![Alt text](/screenshots/github_zip.jpg?raw=true "Optional Title")

## 2. INSTALLATION PGADMIN
- Installer pgadmin4 via le lien GitHub
- Dans le StartBuilder : installer deux applications :
	- dans Database Servers, installer PostgreSQL (dernière version)
	- dans Spatial Extensions, installer PostGIS (dernière version)

## 3. INSTALLATION GEOSERVER
- Installer Geoserver et Java via les liens suivants:
   * [Java 64 bits pour Windows](https://www.java.com/fr/download/) : Version 8
   * [Geoserver - Windows Installer](http://geoserver.org/release/stable/) : Version 2.20.2
- Suivre le tuto d'installation Geoserver, et choisir la version de Java installée précédemment lorsque cela est demandé
- Aller a l'adresse : C:\Program Files\GeoServer\webapps\geoserver\WEB-INF et remplacer le fichier "web.html" par celui fourni dans la documentation

## 4. MISE EN PLACE DE LA BASE DE DONNEES
- Lancer pgadmin4, se connecter avec les identifiants choisis lors de la configuration.
- Créer une database 
	- clic droit sur Databases 
	- Create 
	- Database et la  nommer "stations_mesures".
	
- Installer l'extension PostGIS : 
	- clic droit sur Extensions 
	- Create 
	- Extension 
	- taper "postgis" dans la barre de recherche.
	
- Importer la base de données : 
	- clic droit sur la database "stations_mesures" 
	- Restore 
	- Filename 
	- choisir le fichier fourni "stations_mesures.backup".

## 5. MISE EN PLACE DU SERVEUR CARTOGRAPHIQUE
- Lancer "Start Geoserver" via le menu Démarrer.
- Ouvrir Geoserver en rentrant l'adresse suivante dans la barre de recherche d'un navigateur web, et se connecter:
```
http://localhost:8080/geoserver
```

- Créer un espace de travail : 
	- Menu Données 
	- Espaces de Travail 
	- Ajouter un nouvel espace de travail, et le nommer "projet_qualite_eau" (bien respecter les noms)
	
- Créer un entrepôt : 
	- Menu Données 
	- Entrepôts 
	- Ajouter un nouvel entrepôt 
	- POSTGIS.
	- Choisir l'espace de travail "projet_qualite_eau"
	- Nommer la source de données "stations_mesures"
	- Rentrer le nom de la database, également "stations_mesures"
	- Rentrer dans user et passwd les nom d'utilisateur et mot de passe pgadmin4.
	- Sauvegarder
	
- Publier la couche de données : 
	- Menu Données 
	- Couches 
	- Ajouter une nouvelle couche.
	- Choisir l'entrepôt préalablement créé
	- Publier la couche "mesures_stations_V1", une page s'ouvre.
	- Se rendre dans la rubrique Emprises, et cliquer sur "Basées sur les données" et "Calculées sur les emprises natives".
	- Sauvegarder
	
- Création du style : 
	- Menu Données 
	- Styles 
	- Ajouter un nouveau style
	- Nommer le style "style_resultats", choisir l'espace de travail, laisser le format en SLD.
	- Dans Fichier de style 
	- Cliquer sur Parcourir 
	- Choisir le fichier "style_resultats.sld" fourni 
	- Cliquer sur charger
	- Sauvegarder
	
- Création de la couche stylisée :
	- Menu Données 
	- Agrégations de couches 
	- Ajouter un nouvel agrégat.
	- Nommer l'agrégat "mesures_stations_V1_style" (même chose dans titre et résumé), choisir le bon espace de travail.
	- Dans la rubrique Couches : 
		- Ajouter la couche "mesures_stations_V1"
		- Ajouter le Style Group "style_resultats"
	- Cliquer sur Générer l'emprise
	- Sauvegarder.

La configuration est terminée ! Il ne reste plus qu'a ouvrir le fichier web.html fourni
via un navigateur web.

```
Développeurs :
- CECILLON Jules
- PALOS Johan
- POTTELET Thomas
G2 2021-2022
```
