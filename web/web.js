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



var owsrootUrl = 'http://localhost:8080/geoserver/ows';

var defaultParameters = {
    service : 'WFS',
    version : '1.1.0',
    request : 'GetFeature',
    typeName : 'projet_qualite_eau:mesures_stations_final',
    outputFormat : 'text/javascript',
    srsName : 'EPSG:4326'
};

var parameters = L.Util.extend(defaultParameters);
var URL = owsrootUrl + L.Util.getParamString(parameters);




var WFSLayer = null;
var ajax = $.ajax({
    url : URL,
    dataType : 'jsonp',
    jsonpCallback : 'parseResponse',
    success : function (response) {
        WFSLayer = L.geoJson(response, {
            onEachFeature : function(feature, layer){
                console.log(feature)
            },
            style: function (feature) {
                return {
                    stroke: true,
                    fillColor: 'red',
                    fillOpacity: 1
                };
            },
            onEachFeature: function (feature, layer) {
                popupOptions = {maxWidth: 200};
                layer.bindPopup("Popup text, access attributes with feature.properties.ATTRIBUTE_NAME"
                    ,popupOptions);
            }
        }).addTo(map);
    }
});

var stations = L.tileLayer.wms("http://localhost:8080/geoserver/wms", {
                        layers: 'projet_qualite_eau:mesures_stations_style',
                        format: 'image/PNG',
                        transparent: true
});


stations.addTo(map);