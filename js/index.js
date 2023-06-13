  //page url = http://127.0.0.1:5500/index.html?p1=11.401736541896099&p2=76.683730423760906

  const infoPanelClose = document.getElementById('close-info');
  const contentBox = document.getElementById('my-content');
  const contenBoxInfo = document.getElementById('content-info');
  const contetnBoxImg = document.getElementById('content-img');
  const contentBoxTitle = document.getElementById('content-title');

  infoPanelClose.onclick = ()=>{
   
   contentBox.style.visibility = 'hidden';
  }

  function openInfoPanel (title,img,info,link){
   contentBox.style.visibility = 'visible';
   contentBoxTitle.innerText = title;
   contetnBoxImg.src = img;
   contenBoxInfo.innerText = info;
   console.log(title+link);
  }
   
  const myKeyValues = window.location.search;
  const urlParams = new URLSearchParams(myKeyValues);

  const param1 = urlParams.get('p1');
  const param2 = urlParams.get('p2');
  var gardenPointLayers;

  var amenityMarker;
  var buildingMarker;
  var hotspotMarker;
  var qrMarker;

  // Creating map options
  var mapOptions = {
     center: [param1, param2],
     zoom: 22
  }

  // Creating a map object
  var map = new L.map('map', mapOptions);

  // Creating a Layer object
  // var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
  var layer = new L.TileLayer('',{ maxZoom: 21,minZoom: 18});
  var layerKarnatakaGarden = new L.imageOverlay('assets/gardenMap.webp', [[11.402839908787264, 76.6852570126544],
  [11.395477956926253, 76.68092250666123]], { opacity: 0.8 }).addTo(map);
//   gardenPointLayers = new L.GeoJSON.AJAX('data/points.geojson', { pointToLayer: returnGardenMarkers }).addTo(map);

  hotspotMarker = new L.GeoJSON.AJAX('data/points.geojson',{pointToLayer:returnHotspotMarkers}).addTo(map);
  buildingMarker = new L.GeoJSON.AJAX('data/points.geojson',{pointToLayer:returnBuildingMarkers}).addTo(map);
  amenityMarker = new L.GeoJSON.AJAX('data/points.geojson',{pointToLayer:returnAmenityMarkers}).addTo(map);
  qrMarker = new L.GeoJSON.AJAX('data/points.geojson',{pointToLayer:returnQrMarkers}).addTo(map);

  // Adding layer to the map
  map.addLayer(layer);
  map.addLayer(layerKarnatakaGarden);

  var southWest = L.latLng(11.402839908787264, 76.6852570126544),
  northEast = L.latLng(11.395477956926253, 76.68092250666123),
  mybounds = L.latLngBounds(southWest, northEast);
  map.setMaxBounds(mybounds);

  console.log(map.getBounds());

  console.log(mybounds);

  // L.Routing.control({
  //    waypoints: [
  //       L.latLng(11.402271873233801,76.684343279075804),
  //       L.latLng(11.3989518633229,76.681833509311801)
  //    ]
  // }).addTo(map);

  var buildingIcon = L.icon({
  iconUrl: 'assets/icons/building.webp',
  iconSize: [40, 40],
  iconAnchor: [27, 60],
  popupAnchor: [-3, -76],
});

var amenityIcon = L.icon({
   iconUrl: 'assets/icons/amenity.webp',
   iconSize: [40, 40],
   iconAnchor: [27, 60],
   popupAnchor: [-3, -76],
 });

 var hotspotIcon = L.icon({
   iconUrl: 'assets/icons/hotspot.webp',
   iconSize: [40, 40],
   iconAnchor: [27, 60],
   popupAnchor: [-3, -76],
 });

  function returnHotspotMarkers(json,latlng){
    var jsonInfo = json.properties;
    if (jsonInfo.type == 'hotspot') {
        var col = 'blue';
        
     }
     else{
        return null;
     }
   // //   return L.circleMarker(latlng, { radius: 10, color: col }).bindTooltip("<h4>" + jsonInfo.Name + "</h4>" + "<h4>" + jsonInfo.type + "</h4>");
   // return L.circleMarker(latlng, { radius: 10, color: col }).on('click',function(e){
   //    openInfoPanel(jsonInfo.Name,'assets/garden.jpg',jsonInfo.description,'link');
   // });

   return L.marker(latlng, {icon: hotspotIcon}).addTo(map).on('click',function(e){
         openInfoPanel(jsonInfo.Name,jsonInfo.imgsrc,jsonInfo.description,'link');
      });
  }

  function returnAmenityMarkers(json,latlng){
    var jsonInfo = json.properties;
    if (jsonInfo.type == 'amenity') {
        var col = 'yellow';
     }
     else{
        return null;
     }
   //   return L.circleMarker(latlng, { radius: 10, color: col }).bindPopup("<h4>" + jsonInfo.Name + "</h4>" + "<h4>" + jsonInfo.description + "</h4>").openPopup();
   return L.marker(latlng, {icon: amenityIcon}).addTo(map).on('click',function(e){
      openInfoPanel(jsonInfo.Name,jsonInfo.imgsrc,jsonInfo.description,'link');
   });
  }

  function returnBuildingMarkers(json,latlng){
    var jsonInfo = json.properties;
    if (jsonInfo.type == 'building') {
        var col = 'deeppink';
    }
     else{
        return null;
     }
   //   return L.circleMarker(latlng, { radius: 10, color: col }).bindTooltip("<h4>" + jsonInfo.Name + "</h4>" + "<h4>" + jsonInfo.type + "</h4>");
   return L.marker(latlng, {icon: buildingIcon}).addTo(map).on('click',function(e){
      openInfoPanel(jsonInfo.Name,jsonInfo.imgsrc,jsonInfo.description,'link');
   });
  }

  function returnQrMarkers(json,latlng){
    var jsonInfo = json.properties;
    if (jsonInfo.type == 'qr') {
        var col = 'red';
    }

     else{
        return null;
     }
   //   return L.circleMarker(latlng, { radius: 10, color: col }).bindTooltip("<h4>" + jsonInfo.Name + "</h4>" + "<h4>" + jsonInfo.type + "</h4>");
     return L.marker(latlng).bindTooltip("<h4>" + jsonInfo.Name + "</h4>" + "<h4>" + jsonInfo.type + "</h4>");
   //   return L.marker(latlng, {icon: myIcon}).addTo(map);
   }

//   function returnGardenMarkers(json, latlng) {
//      var jsonInfo = json.properties;

//      if (jsonInfo.type == 'building') {
//         var col = 'deeppink';
//      }
//      else if (jsonInfo.type == 'amenity') {
//         var col = 'yellow';
//      }
//      else if (jsonInfo.type == 'hotspot') {
//         var col = 'blue';
//      }
//      else if (jsonInfo.type == 'qr') {
//         var col = 'red';
//         // return null;
//      }
//      return L.circleMarker(latlng, { radius: 10, color: col }).bindTooltip("<h4>" + jsonInfo.Name + "</h4>" + "<h4>" + jsonInfo.type + "</h4>");
//   //   return L.marker(latlng, {icon: myIcon}).addTo(map);
//      // return L.circleMarker(latlng,{radius:10,color:'deeppink'}).on('click',onClick(json));
//   }

  function onClick(json) {
     var jsonAtt = json.properties;
     // console.log(jsonAtt.Name)
     return jsonAtt.Name;
  }

  //Marker control
  var markerCtrl = {
    'Amineties': amenityMarker,
    'building':buildingMarker,
    'hotspot':hotspotMarker
  }

  L.control.layers(null,markerCtrl).addTo(map)

     // Load kml file
   //   fetch('assets/S2E.kml')
   //          .then(res => res.text())
   //          .then(kmltext => {
   //              // Create new kml overlay
   //              const parser = new DOMParser();
   //              const kml = parser.parseFromString(kmltext, 'text/xml');
   //              const track = new L.KML(kml);
   //              map.addLayer(track);

   //              // Adjust map to show the kml
   //              const bounds = track.getBounds();
   //              map.fitBounds(bounds);
   //          });

      // fetch('assets/S2DW.kml')
      //       .then(res => res.text())
      //       .then(kmltext => {
      //           // Create new kml overlay
      //           const parser = new DOMParser();
      //           const kml = parser.parseFromString(kmltext, 'text/xml');
      //           const track = new L.KML(kml);
      //           map.addLayer(track);

      //           // Adjust map to show the kml
      //           const bounds = track.getBounds();
      //           map.fitBounds(bounds);
      //       });
      
      // fetch('assets/S2T.kml')
      //       .then(res => res.text())
      //       .then(kmltext => {
      //           // Create new kml overlay
      //           const parser = new DOMParser();
      //           const kml = parser.parseFromString(kmltext, 'text/xml');
      //           const track = new L.KML(kml);
      //           map.addLayer(track);

      //           // Adjust map to show the kml
      //           const bounds = track.getBounds();
      //           map.fitBounds(bounds);
      //       });