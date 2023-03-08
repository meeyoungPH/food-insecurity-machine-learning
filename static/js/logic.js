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

// create baseMap object
var baseMap = {  
};

// create overlay object
var overlayMaps = {
    "US Census Tracts": tractLayer,
    "Low Food Access": foodAccessLayer,
    "Food Market Heat Map": marketHeatLayer
};

// settings for map on load
var myMap = L.map('myMap', {
    center: [32.318230, -86.902298],
    zoom: 7,
    zoomControl: false,
    layers: [street, tractLayer, foodAccessLayer]
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
            fillOpacity: 0.6
        }).addTo(foodAccessLayer)
    });
};

// setup legend
var legend = L.control({position: 'bottomright'});

// create legend
legend.onAdd = function(myMap) {
    var div = L.DomUtil.create('div', 'info legend'),
        foodAccess = [null,0,1],
        labels = [];
    let from, to;

    labels.push(`<i style="background: #808080; fill-opacity: 0.3;"></i> No Data`);
    labels.push(`<i style="background: red; fill-opacity: 0.1;"></i> Low Access*`);

    div.innerHTML = '<h4 style="text-align: center">Food Access</h4>'+ labels.join('<br>');
    return div;
};

// add legend to map
legend.addTo(myMap);

// run function to initialize page on load
init()

// function to change map settings with the dropdown menu
function jurisdictionChanged(fips){
    console.log(fips)
    centerMap(fips)
    tract(fips)
    foodAccessHeatMap(fips)
    foodAccess(fips)
}