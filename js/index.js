  //page url = http://127.0.0.1:5500/index.html?p1=11.401736541896099&p2=76.683730423760906


  //dijkstra's algorithm
  var Graph = (function (undefined) {

	var extractKeys = function (obj) {
		var keys = [], key;
		for (key in obj) {
		    Object.prototype.hasOwnProperty.call(obj,key) && keys.push(key);
		}
		return keys;
	}

	var sorter = function (a, b) {
		return parseFloat (a) - parseFloat (b);
	}

	var findPaths = function (map, start, end, infinity) {
		infinity = infinity || Infinity;

		var costs = {},
		    open = {'0': [start]},
		    predecessors = {},
		    keys;

		var addToOpen = function (cost, vertex) {
			var key = "" + cost;
			if (!open[key]) open[key] = [];
			open[key].push(vertex);
		}

		costs[start] = 0;

		while (open) {
			if(!(keys = extractKeys(open)).length) break;

			keys.sort(sorter);

			var key = keys[0],
			    bucket = open[key],
			    node = bucket.shift(),
			    currentCost = parseFloat(key),
			    adjacentNodes = map[node] || {};

			if (!bucket.length) delete open[key];

			for (var vertex in adjacentNodes) {
			    if (Object.prototype.hasOwnProperty.call(adjacentNodes, vertex)) {
					var cost = adjacentNodes[vertex],
					    totalCost = cost + currentCost,
					    vertexCost = costs[vertex];

					if ((vertexCost === undefined) || (vertexCost > totalCost)) {
						costs[vertex] = totalCost;
						addToOpen(totalCost, vertex);
						predecessors[vertex] = node;
					}
				}
			}
		}

		if (costs[end] === undefined) {
			return null;
		} else {
			return predecessors;
		}

	}

	var extractShortest = function (predecessors, end) {
		var nodes = [],
		    u = end;

		while (u !== undefined) {
			nodes.push(u);
			u = predecessors[u];
		}

		nodes.reverse();
		return nodes;
	}

	var findShortestPath = function (map, nodes) {
		var start = nodes.shift(),
		    end,
		    predecessors,
		    path = [],
		    shortest;

		while (nodes.length) {
			end = nodes.shift();
			predecessors = findPaths(map, start, end);

			if (predecessors) {
				shortest = extractShortest(predecessors, end);
				if (nodes.length) {
					path.push.apply(path, shortest.slice(0, -1));
				} else {
					return path.concat(shortest);
				}
			} else {
				return null;
			}

			start = end;
		}
	}

	var toArray = function (list, offset) {
		try {
			return Array.prototype.slice.call(list, offset);
		} catch (e) {
			var a = [];
			for (var i = offset || 0, l = list.length; i < l; ++i) {
				a.push(list[i]);
			}
			return a;
		}
	}

	var Graph = function (map) {
		this.map = map;
	}

	Graph.prototype.findShortestPath = function (start, end) {
		if (Object.prototype.toString.call(start) === '[object Array]') {
			return findShortestPath(this.map, start);
		} else if (arguments.length === 2) {
			return findShortestPath(this.map, [start, end]);
		} else {
			return findShortestPath(this.map, toArray(arguments));
		}
	}

	Graph.findShortestPath = function (map, start, end) {
		if (Object.prototype.toString.call(start) === '[object Array]') {
			return findShortestPath(map, start);
		} else if (arguments.length === 3) {
			return findShortestPath(map, [start, end]);
		} else {
			return findShortestPath(map, toArray(arguments, 1));
		}
	}

	return Graph;

})();

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
   contenBoxInfo.innerText = 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?';
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
  
  var pts = {4:{3:16.1,2:28.3,1:38.1,6:35.3,7:27.6,10:20.6},10:{11:5.1,12:8.1,13:14.4,6:8.9,4:16.4,8:24.2},9:{8:7.6,3:14.5,2:20.2,1:25.9,6:21.0,13:18.5}}
  var m = {1:{2:11.8,3:22.1},2:{1:11.8,3:25.5},3:{1:22.1,2:25.5}}
  var alg = {a:{b:3,c:1},b:{a:2,c:1},c:{a:4,b:1}}
  
  graph = new Graph(pts);
  // var path = graph.findShortestPath(4,10);
  console.log(graph.findShortestPath('4','10'));

  //Extending the dijkstra's algorithm

  var curr_node=0;
  map.on('click', function (e) {
   var node = [];
   curr_node = curr_node+1;
   node[0] = e.latlng.lat;
   node[1] = e.latlng.lng;
   addNodes(node,curr_node);

   console.log(node);
   console.log(curr_node);
});

var textarea_nodes = document.getElementById('textarea_nodes')
function addNodes(polyNodes,num){
   var marker = L.marker([polyNodes[0], polyNodes[1]]).addTo(map);
   var myIcon = L.icon({
       iconUrl: 'assets/icons/building.png',
       iconSize: [32, 32],
       iconAnchor: [16, 16],
       popupAnchor: [-3, -76]
   });
   marker.setIcon(myIcon);
   marker.on('click',(event) => {
       if(window.event.ctrlKey){
        console.log('control click');
           curr_ctrl_pt = [polyNodes[0], polyNodes[1]];
           var oldText = $('#textarea_nodes').val();
          //  var oldText = textarea_nodes.innerText;
           console.log('oldText : '+oldText)
          //  textarea_nodes.innerText = oldText + num + ':{';
           $('#textarea_nodes').val(oldText + num + ':{');
           var myIcon_2 = L.icon({
               iconUrl: 'assets/icons/hotspot.png',
               iconSize: [32, 32],
               iconAnchor: [16, 16],
               popupAnchor: [-3, -76]
           });
           marker.setIcon(myIcon_2); // custom marker to show that the node has been declared. This is just for your own reference
       }
       if(window.event.altKey){
        console.log('alt click');
           var oldText = $('#textarea_nodes').val();
        //  var oldText = textarea_nodes.innerText;
        //  textarea_nodes.innerText = oldText + num + ':' + getDistanceFromLatLonInM(polyNodes[0], polyNodes[1],curr_ctrl_pt[0],curr_ctrl_pt[1]) + ',';
         console.log('oldText : '+oldText)
           $('#textarea_nodes').val(oldText + num + ':' + getDistanceFromLatLonInM(polyNodes[0], polyNodes[1],curr_ctrl_pt[0],curr_ctrl_pt[1]) + ',');
           }
       })
   }
   function getDistanceFromLatLonInM(lat1,lon1,lat2,lon2) {
     var R = 6371; // Radius of the earth in km
     var dLat = deg2rad(lat2-lat1);  // deg2rad below
     var dLon = deg2rad(lon2-lon1); 
     var a = 
       Math.sin(dLat/2) * Math.sin(dLat/2) +
       Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
       Math.sin(dLon/2) * Math.sin(dLon/2)
       ; 
     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
     var d = R * c; // Distance in km
     return (d * 1000).toFixed(1);
   }
   
   function deg2rad(deg) {
     return deg * (Math.PI/180)
   }

   var g = Graph(map);
   console.log('g : '+g);

  // Creating a Layer object
  // var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
  var layer = new L.TileLayer('',{ maxZoom: 21,minZoom: 17});
  var layerKarnatakaGarden = new L.imageOverlay('assets/testImg1.png', [[11.402839908787264, 76.6852570126544],
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
  iconUrl: 'assets/icons/building.png',
  iconSize: [60, 60],
  iconAnchor: [27, 60],
  popupAnchor: [-3, -76],
});

var amenityIcon = L.icon({
   iconUrl: 'assets/icons/amenity.png',
   iconSize: [60, 60],
   iconAnchor: [27, 60],
   popupAnchor: [-3, -76],
 });

 var hotspotIcon = L.icon({
   iconUrl: 'assets/icons/hotspot.png',
   iconSize: [60, 60],
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
         openInfoPanel(jsonInfo.Name,'assets/garden.jpg',jsonInfo.description,'link');
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
      openInfoPanel(jsonInfo.Name,'assets/garden.jpg',jsonInfo.description,'link');
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
      openInfoPanel(jsonInfo.Name,'assets/garden.jpg',jsonInfo.description,'link');
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
    //  fetch('assets/KGH.kml')
    //         .then(res => res.text())
    //         .then(kmltext => {
    //             // Create new kml overlay
    //             const parser = new DOMParser();
    //             const kml = parser.parseFromString(kmltext, 'text/xml');
    //             const track = new L.KML(kml);
    //             map.addLayer(track);

    //             // Adjust map to show the kml
    //             const bounds = track.getBounds();
    //             map.fitBounds(bounds);
    //         });