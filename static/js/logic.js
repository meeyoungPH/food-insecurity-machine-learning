// initialize map variables
var center, lat, lng = ''
var bounds = {}

// initialize webpage
function init(){
    let fips = '01'
    createDropdown()
    tract(fips)
    foodAccessHeatMap(fips)
    foodAccess(fips)
    centerMap(fips)
    // population(fips)
}

// create dropdown menu to control map
function createDropdown(){
    
    // jurisdiction dropdown menu
    d3.json('/api/jurisdictions').then(data => {
        // console.log(data)

        let options = [...new Set(data.map(d => [d.StateFIPS, d.State]))];

        let dropdown = d3.select('#jurisdiction-dropdown')
            .selectAll('option')
                .data(options)
            .enter()
                .append('option')
                .text(d => d[1])
                .attr('class','dd_options')
                .attr('value', d => d[0]);

        // select Alabama as default value
        dropdown.property('selected', d => d[1] == 'Alabama') 
    });
}

// create LeafletJS map
// base layers
var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// create layerGroups
var tractLayer = L.layerGroup();
var marketHeatLayer = L.layerGroup();
var foodAccessLayer = L.layerGroup();
// var populationLayer = L.layerGroup();

// create baseMap object
var baseMap = {  
};

// create overlay object
var overlayMaps = {
    "US Census Tracts": tractLayer,
    "Food Market Heat Map": marketHeatLayer,
    "Low Food Access": foodAccessLayer,
    // "Pop w/in 0.5 Mile of Market": populationLayer
};

// settings for map on load
var myMap = L.map('myMap', {
    center: [32.318230, -86.902298],
    zoom: 7,
    zoomControl: false,
    layers: [street, tractLayer, marketHeatLayer]
});

// add layer controls to map
L.control.layers(baseMap, overlayMaps, {
    collapsed: false
}).addTo(myMap);

// function to center on selected state
function centerMap(fips) {

    if (fips == '02') {
        myMap.setView(new L.LatLng(63.738522, -152.723006), 4);
    } else {     
        // array to store polygons
        const polygons = [];

        // access data
        d3.json(`/api/food-access/${fips}.geojson`).then(d => {
            
            // create feature layer
            const featureLayer =  L.geoJSON(d);

            // add polygon layers to the polygon array
            featureLayer.eachLayer(layer => {
                if (layer instanceof L.Polygon) {
                    polygons.push(layer.toGeoJSON());
                }
            });
        
            // create Leaflet feature group and add polygons
            const featureGroup = L.featureGroup();

            polygons.forEach(polygon => {
                L.geoJSON(polygon).addTo(featureGroup);
            });

            console.log(polygons)

            bounds = featureGroup.getBounds();

            console.log(bounds)

            // set map view to the bounds of the feature group
            myMap.fitBounds(bounds);
        });
    };
};

// function to reset map
function resetMap(){
    let input = document.getElementById('jurisdiction-dropdown')
    let fips = input.value;

    if (fips == '02') {
        myMap.setView(new L.LatLng(63.738522, -152.723006), 4);
    } else { 
        myMap.fitBounds(bounds)
    }
}

// function to display US census tract borders
function tract(fips) {
    // clear existing data from layer
    tractLayer.clearLayers();

    // access tract data
    d3.json(`/api/food-access/${fips}.geojson`).then(d => {
        // console.log(d.features)

        // render boundaries
        L.geoJSON(d, {
            weight: 1,
            color: 'grey'
        }).addTo(tractLayer);
    });
};

// function to display food access heat map
function foodAccessHeatMap(fips){
    // clear existing data from layer
    marketHeatLayer.clearLayers();

    // access market data by jurisdiction
    d3.json(`/api/food-markets/${fips}.geojson`).then(d => {
        console.log(`heat map, ${fips}`)
        console.log(d.features)

        let results = d.features

        heatArray = [...new Set(results.map(d => [d.geometry.coordinates[1],d.geometry.coordinates[0]]))];
        // console.log(heatArray)

        // heatmap parameters
        var heat = L.heatLayer(heatArray, {
            radius: 15,
            blur: 4,
            minOpacity: 0.5
        }).addTo(marketHeatLayer);       
    });
};

// function to identify tracts with low food access
function foodAccess(fips){
    // clear existing dta from layer
    foodAccessLayer.clearLayers()

    // access data
    d3.json(`/api/food-access/${fips}.geojson`).then(d => {
        console.log(`low food access, ${fips}`)
        console.log(d.features)

        let lowAccessTract = d.features.filter(d => d.properties.LAhalfand10 == 1);
        // let adequateAccessTract = d.features.filter(d => d.properties.LAhalfand10 == 0);
        let noDataTract = d.features.filter(d => d.properties.LAhalfand10 == null);

        // fill polygons
        L.geoJSON(lowAccessTract, {
            weight: 1,
            color: 'grey',
            fillColor: 'red',
            fillOpacity: 0.2
        }).addTo(foodAccessLayer)

        L.geoJSON(noDataTract, {
            weight: 1,
            color: 'grey',
            fillColor: 'grey',
            fillOpacity: 0.2
        }).addTo(foodAccessLayer)
    });
};

// setup legend
var legend = L.control({position: 'bottomright'});

legend.onAdd = function(myMap) {
    var div = L.DomUtil.create('div', 'info legend'),
        foodAccess = [null,0,1],
        labels = [];
    let from, to;

    labels.push(`<i style="background: #808080; fill-opacity: 0.1;"></i> No Data`);
    labels.push(`<i style="background: red; fill-opacity: 0.1;"></i> Low Access*`);

    div.innerHTML = '<h4 style="text-align: center">Food Access</h4>'+ labels.join('<br>');
    return div;
};

legend.addTo(myMap);

// function getColor(rate) {
//     return  alt >= 90  ?   "#552a58": 
//             alt >= 80  ?   "#73315c":
//             alt >= 70  ?   "#8e3a5d":
//             alt >= 60  ?   "#a7465a":
//             alt >= 50  ?   "#bb5654":
//             alt >= 40  ?   "#ca6a4e":
//             alt >= 30  ?   "#d48148":
//             alt >= 20  ?   "#d89945":
//             alt >= 10   ?   "#d5b348":
//                             "#cdcd55"
// };

// function to number of people identify population within 1/2 mile of food market
// function population(fips){
//     // clear existing dta from layer
//     populationLayer.clearLayers()

//     // access data
//     d3.json(`/api/food-access/${fips}.geojson`).then(d => {
//         console.log(`population, ${fips}`)
//         console.log(d.features)

//         // create popup for each feature
//         function onEachFeature(feature, layer) {
//             layer.bindPopup(
//                 `<h4>${feature.properties.NAMELSAD}</h4>
//                 <h4>${feature.properties.County}</h4>
//                 <hr>
//                 <p>Population w/in 0.5 mile of food store: ${feature.properties.lapophalfshare}</p>
//                 <p>Poverty Rate: ${feature.properties.PovertyRate}</p>
//                 <p>Median Family Income: $${feature.properties.MedianFamilyIncome}</p>`
//             )
//         };

//         // format circular markers
//         function pointToLayer(feature, latlng) {

//             // parameters for circle markers
//             var markerOptions = {
//                 radius: feature.properties.lapophalfshare, // radius by pop within 1/2 mile to food market
//                 fillColor: getColor(feature.properties.PovertyRate), // color gradient by poverty rate
//                 color: "#808080", // grey outline
//                 opacity: 0.5,
//                 fillOpacity: 0.5,
//                 weight: 1,
//             };
            
//             return L.circleMarker(latlng, markerOptions);
//         }

//         // create GeoJSON layer with circle markers
//         L.geoJSON(d, {
//             pointToLayer: pointToLayer,
//             onEachFeature: onEachFeature
//         }).addTo(populationLayer)
//     });
// };

init()

function jurisdictionChanged(fips){
    console.log(fips)
    centerMap(fips)
    tract(fips)
    foodAccessHeatMap(fips)
    foodAccess(fips)
    population(fips)
}