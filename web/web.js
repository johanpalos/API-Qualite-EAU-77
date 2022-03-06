var map = L.map('map').setView([48.64443263, 2.94391393], 9); //paramétrage de la carte : zoom et centrage

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoianVsZXNjZWNpbGxvbiIsImEiOiJja3pmZWQ1OWgyNW5iMzBvMW15dmtnODc5In0.ad-neM_5fNyJqRF2ayE7ZQ'
}).addTo(map); 

var wmsLayer = L.tileLayer.wms('https://wxs.ign.fr/cartes/geoportail/r/wms?', {
    layers: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2'
}).addTo(map); //import via flux WMS du fond de carte IGN

var stations = L.tileLayer.wms("http://localhost:8080/geoserver/wms", {
    layers: 'projet_qualite_eau:mesures_stations_V1_style',
    format: 'image/PNG',
    transparent: true
}); //import depuis Geoserver via flux WMS de la couche stylisée représentant la valeur maximale d'ampa ou glyphosate mesurée par station
stations.addTo(map); 

var owsrootUrl = 'http://localhost:8080/geoserver/ows'; //connexion au Geoserver


var defaultParameters = {
    service : 'WFS',
    version : '1.1.0',
    request : 'GetFeature',
    typeName : 'projet_qualite_eau:mesures_stations_V1',
    outputFormat : 'text/javascript',
    srsName : 'EPSG:4326'
}; 
var parameters = L.Util.extend(defaultParameters);
var URL = owsrootUrl + L.Util.getParamString(parameters); //import de la couche "mesures_stations_V1" depuis Geoserver via un flux WFS


var Icon = L.icon({ 
    iconUrl: 'marker.png',
    iconSize:     [15, 15], 
    iconAnchor:   [7.5, 7.5], 
}); //paramétrage du marker : associaition à un .png transparent et taille


//Création de la légende
var legend = L.control({position: 'bottomright'}); 
legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0.03, 0.85, 1.7, 3.86, 6.4]; //intervalles des résultats max des stations
        div.innerHTML += '<h6>Résultat max<br>par station en µg/L</h6>';
        for (var i = 0; i < grades.length; i++) {
        div.innerHTML += '<i style="background:' + getColor(grades[i] +0.5) + '"></i> ' + grades[i] + (grades[i + 1] ? ' - ' + grades[i + 1] + '<br>' : ' - 210');
    }//
    return div;
};
legend.addTo(map); //ajout de la légende sur la carte

function style(feature) { 
    return {
        fillColor: getColor(d),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7,
    };
}; //création du style de la légende
   
function getColor(d) { 
    return  d > 6.4 ? '#67000d' :
        d > 3.86 ? '#d32020' :
        d > 1.7 ? '#fb7050' :
        d > 0.85 ? '#fcbea5' :
        d > 0.03 ? '#ffefe6' :
        0;
}; //association des couleurs de la carte à la légende selon les valeurs


let allStations = {}; //création d'une bibliothèque vide

var WFSLayer = null;

var ajax = $.ajax({
    url : URL,
    dataType : 'jsonp',
    jsonpCallback : 'parseResponse', //transformation de la couche Geoserver en couche GeoJSON en utilisant AJAX, permettant ainsi de modifier la page web sans la recharger
    success : function (response) {
       response.features.forEach(function(feature){
            if (!allStations[feature.properties.code_station]) {
                    allStations[feature.properties.code_station] = {
                        geometry: feature.geometry.coordinates,
                        mesures: [],
                    }; //triage des données du GeoJSON : on stocke ici pour chaque station ses coordonées dans la variable geometry et on crée une variable "mesures"
                }
            allStations[feature.properties.code_station].mesures.push({
                station: feature.properties.code_station,
                date_prelevement: feature.properties.date_prelevement,
                libelle_parametre: feature.properties.libelle_parametre,
                resultat : feature.properties.resultat,
            }); //triage des données du GeoJSON : on injecte dans la variable "mesures" toutes les mesures (date, paramètre, résultat) pour chaque station
       })
       
        for(let cle in allStations) {
           let station = allStations[cle]; //création d'un clé n'ayant que le champ 'code_station'
           let x = station.geometry[0]; //on stocke dans la variable x les longitudes de chaque station
           let y = station.geometry[1]; //on stocke dans la variable y les latitudes de chaque station
           var marker = L.marker([y, x], {icon: Icon, station: station}).addTo(map).on('click', function(e) { //création des markers cliquables pour chaque couple x-y correspondant chacun à 1 station. On associe aux markers la variable de style "Icon"
               document.getElementById('tableau').innerHTML=""; //lorsque le tableau est créé, on le vide en premier lieu à chaque clic
            
               //Création du tableau avec les différentes parties
               let table = document.createElement('table'); //création de l'objet tableau
               let thead = document.createElement('thead'); //création d'en-tête de tableau, du nom de chaque colonne
               let tbody = document.createElement('tbody'); //création de corps remplis par la suite par les mesures

               table.appendChild(thead); //ajout de l'en-tête au tableau
               table.appendChild(tbody); //ajout du corps au tableau

               document.getElementById('titre').innerHTML=cle; //ajout d'un titre grâce à une clé précédemment créée, avec le champ 'code_station'
               document.getElementById('tableau').appendChild(table); //ajout du tableau entier dans le body du html
               
               //Création et ajout de données à la première ligne du tableau
               let row_1 = document.createElement('tr'); //'tr' nous crée une ligne
               let heading_1 = document.createElement('th');
               heading_1.innerHTML = "Date de prélèvement";
               let heading_2 = document.createElement('th');
               heading_2.innerHTML = "Paramètre mesuré";
               let heading_3 = document.createElement('th');
               heading_3.innerHTML = "Résultat (µg/L)";
               
               //Ajout de chaque en-tête à une même ligne
               row_1.appendChild(heading_1);
               row_1.appendChild(heading_2);
               row_1.appendChild(heading_3);
               thead.appendChild(row_1);

                for (let p in e.target.options.station.mesures){
                    data = e.target.options.station.mesures[p]; //un chemin permettant d'obtenir les données
                    
                    //Création de tables avec les différentes données
                    const arr = [data.date_prelevement];
                    const arr2 = [data.libelle_parametre];
                    const arr3 = [data.resultat];

                    var length = arr.length; //longueur de la table arr
                    
                    //Création et ajout de données de la deuxième à la dernière ligne du tableau selon les nombres de mesures par station
                    for (var i = 0; i < length; i++) {
                        let row_2 = document.createElement('tr'); //'tr' nous crée une ligne
                        let row_2_data_1 = document.createElement('td');
                        row_2_data_1.innerHTML = arr[i];
                        let row_2_data_2 = document.createElement('td');
                        row_2_data_2.innerHTML = arr2[i];
                        let row_2_data_3 = document.createElement('td');
                        row_2_data_3.innerHTML = arr3[i];
                        
                        //Ajout de chaque corps à une même ligne
                        row_2.appendChild(row_2_data_1);
                        row_2.appendChild(row_2_data_2);
                        row_2.appendChild(row_2_data_3);
                        tbody.appendChild(row_2); 
                    }    
                };
            });
        }
    }
});