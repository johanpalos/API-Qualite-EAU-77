var map = L.map('map').setView([48.705, 3,5], 9);

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
}).addTo(map);

var stations = L.tileLayer.wms("http://localhost:8080/geoserver/wms", {
                        layers: 'projet_qualite_eau:mesures_stations_V1_style',
                        format: 'image/PNG',
                        transparent: true
});


stations.addTo(map);

var owsrootUrl = 'http://localhost:8080/geoserver/ows';

var defaultParameters = {
    service : 'WFS',
    version : '1.1.0',
    request : 'GetFeature',
    typeName : 'projet_qualite_eau:mesures_stations_V1',
    outputFormat : 'text/javascript',
    srsName : 'EPSG:4326'
};

var parameters = L.Util.extend(defaultParameters);
var URL = owsrootUrl + L.Util.getParamString(parameters);

var Icon = L.icon({
    iconUrl: 'marker.png',

    iconSize:     [15, 15], // size of the icon
    iconAnchor:   [7.5, 7.5], // point of the icon which will correspond to marker's location
});


let allStations = {};

var WFSLayer = null;
var ajax = $.ajax({
    url : URL,
    dataType : 'jsonp',
    jsonpCallback : 'parseResponse',
    success : function (response) {
       console.log(response);
       response.features.forEach(function(feature){
            if (!allStations[feature.properties.code_station]) {
                allStations[feature.properties.code_station] = {
                    geometry: feature.geometry.coordinates,
                    mesures: [],
                };
            }
            allStations[feature.properties.code_station].mesures.push({
                station: feature.properties.code_station,
                date_prelevement: feature.properties.date_prelevement,
                libelle_parametre: feature.properties.libelle_parametre,
                resultat : feature.properties.resultat,
                unité : feature.properties.symbole_unite, 
            });
       })
       console.log(allStations);
    

       for(let cle in allStations) {
           let station = allStations[cle];
           /*console.log(station.geometry)*/
           let x = station.geometry[0];
           let y = station.geometry[1];
           var marker = L.marker([y, x], {icon: Icon, station: station}).addTo(map).on('click', function(e) {
            
            document.getElementById('tableau').innerHTML="";
            
            let table = document.createElement('table');
            let thead = document.createElement('thead');
            let tbody = document.createElement('tbody');

            table.appendChild(thead);
            table.appendChild(tbody);

            document.getElementById('tableau').appendChild(table);


            let row_1 = document.createElement('tr');
            let heading_1 = document.createElement('th');
            heading_1.innerHTML = "Date de prélèvement";
            let heading_2 = document.createElement('th');
            heading_2.innerHTML = "Paramètre libelle";
            let heading_3 = document.createElement('th');
            heading_3.innerHTML = "Résultat";

            row_1.appendChild(heading_1);
            row_1.appendChild(heading_2);
            row_1.appendChild(heading_3);
            thead.appendChild(row_1);

            for (let p in e.target.options.station.mesures){
                data = e.target.options.station.mesures[p];
                /*console.log(data.date_prelevement);*/
                const arr = [data.date_prelevement];
                const arr2 = [data.libelle_parametre];
                const arr3 = [data.resultat];

                var length = arr.length;

                for (var i = 0; i < length; i++) {
                    let row_2 = document.createElement('tr');
                    let row_2_data_1 = document.createElement('td');
                    row_2_data_1.innerHTML = arr[i];
                    let row_2_data_2 = document.createElement('td');
                    row_2_data_2.innerHTML = arr2[i];
                    let row_2_data_3 = document.createElement('td');
                    row_2_data_3.innerHTML = arr3[i];
        
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

