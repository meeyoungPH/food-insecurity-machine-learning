// initialize webpage
function init(){
    fips = '01'
    createDropdown()
    tract(fips)
}

// create dropdown menu to control map
function createDropdown(){
    
    // jurisdiction dropdown menu
    d3.json('/api/jurisdictions').then(data => {
        console.log(data)

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
        dropdown.property('selected', d = d[1] == 'Alabama') 
    });
}

// create LeafletJS map
// base layers
var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// create layerGroups
var tractLayer = L.layerGroup();
var marketLayer = L.layerGroup();
var foodSecurityLayer = L.layerGroup();
var halfMileRadiusLayer = L.layerGroup();

// create baseMap object
var baseMap = {  
};

// create overlay object
var overlayMaps = {
    "US Census Tracts": tractLayer,
    "Food Markets": marketLayer,
    "Low Food Access": foodSecurityLayer,
    "Pop. w/in 0.5 mile": halfMileRadiusLayer
};

// settings for map on load
var myMap = L.map('myMap', {
    center: [32.318230, -86.902298],
    zoom: 6,
    zoomControl: false,
    layers: [street, tractLayer, marketLayer, foodSecurityLayer]
});

// add layer controls to map
L.control.layers(baseMap, overlayMaps, {
    collapsed: false
}).addTo(myMap);

// function to display US census tract borders
function tract(fips) {
    // clear existing data from layer
    tractLayer.clearLayers();

    // access tract data
    d3.json(`/api/food-access/${fips}.geojson`).then(d => {
        console.log(d.features)
        // render boundaries
        L.geoJSON(d, {
            weight: 1
        }).addTo(tractLayer)
        
    });
};

init()

function jurisdictionChanged(fips){
    tract(fips)
}