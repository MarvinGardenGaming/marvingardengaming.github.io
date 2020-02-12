require([
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/BasemapToggle",
    "esri/widgets/BasemapGallery",
    "esri/Basemap",
    "esri/layers/FeatureLayer",
    "esri/widgets/Legend",
    "dojo/dom-class",
    "dojo/domReady!"
  ], function(Map, MapView, BasemapToggle, BasemapGallery, Basemap, FeatureLayer, Legend, domClass) {

    var basemap = new Basemap({
        portalItem: {
          id: "e017749be45e463f86886efaeac58988"  // Firefly
        }
      });

    var map = new Map({
      basemap: basemap
    });

    // Define a popup for private schools
    var popupPrivateSchools = {
        "title": "Private School",
        "content": "<b>School Name:</b> {NAME}<br><b>Address:</b> {ADDRESS}<br><b>City:</b> {CITY}<br><b>STATE:</b> {STATE}<br><b>Attendance:</b> {POPULATION}<br><b>Grades:</b> {START_GRAD} through {END_GRADE}"
    }

    var privateSchools = new FeatureLayer({
        url: "http://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/PrivateSchools/FeatureServer/0",
        outFields: ["NAME","ADDRESS","CITY","STATE","POPULATION", "START_GRAD", "END_GRADE"],
        popupTemplate: popupPrivateSchools
    });
    privateSchools.renderer = {
        type: "simple",
        symbol: {
            type: "picture-marker",
            url: "https://static.arcgis.com/images/Symbols/Firefly/FireflyC14.png",
            width: 10,
            height: 10
        }
    }
    map.add(privateSchools);


    // Define a popup for private schools
    var popupAppleStores = {
        "title": "Apple Store",
        "content": "<b>Address:</b> {Address}<br><b>Date opened:</b> {Opening_Date}<br><b>Store Website:</b> {Store_Page_link}"
    }

    var appleStores = new FeatureLayer({
        url: "http://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Apple_Stores/FeatureServer/0",
        outFields: ["Address","Opening_Date","Store_Page_Link"],
        popupTemplate: popupAppleStores
    });
    appleStores.renderer = {
        type: "simple",
        symbol: {
            type: "picture-marker",
            url: "https://static.arcgis.com/images/Symbols/Firefly/FireflyA7.png",
            width: 24,
            height: 24
        }
    }
    map.add(appleStores);


    var view = new MapView({
      container: "viewDiv",
      map: map,
      center: [-122.04000,37.37000],
      zoom: 7
    });
    
    view.watch('updating', function(evt){
        if(evt === true){
            //Updating still
        }else{
            document.getElementById("loadingDiv").style.display = "none";
        }
    })

    var basemapGallery = new BasemapGallery({
      view: view,
      source: {
        portal: {
          url: "http://www.arcgis.com",
          useVectorBasemaps: true, // Load vector tile basemap group
        },
      } 
    });

    var legend = new Legend({
        view: view,
        layerInfos: [{
            layer: appleStores,
            title: "Apple Retail Stores"
        },
        {
            layer: privateSchools,
            title: "US Private Schools"
        }]
      });
      
    view.ui.add(legend, "bottom-left");

    view.ui.add(basemapGallery, "top-right"); // Add to the view
    
  });