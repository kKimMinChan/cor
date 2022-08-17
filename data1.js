import data from "./data.json" assert { type: "json" };

function myMap() {
  let azit = new Array();
  let azitColor = new Array();
  let avg = new Array();

  azitColor[0] = "GREEN";
  azitColor[1] = "RED";
  azitColor[2] = "BLACK";
  azitColor[3] = "YELLOW";
  azitColor[4] = "RED";
  azitColor[5] = "BLACK";

  for (let i = 0; i < data.length; i++) {
    if (
      data.hi[i].conc1 > 0 ||
      data.hi[i].conc2 > 0 ||
      data.hi[i].conc3 > 0 ||
      data.hi[i].conc4 > 0 ||
      data.hi[i].conc5 > 0 ||
      data.hi[i].conc6 > 0 ||
      data.hi[i].conc7 > 0 ||
      data.hi[i].conc8 > 0 ||
      data.hi[i].conc9 > 0 ||
      data.hi[i].conc10 > 0
    ) {
      azit[i] = new google.maps.LatLng(data.hi[i].lat, data.hi[i].lon);
      avg[i] =
        (data.hi[i].conc1 +
          data.hi[i].conc2 +
          data.hi[i].conc3 +
          data.hi[i].conc4 +
          data.hi[i].conc5 +
          data.hi[i].conc6 +
          data.hi[i].conc7 +
          data.hi[i].conc8 +
          data.hi[i].conc9 +
          data.hi[i].conc10) /
        10;
      console.log(avg[i]);
    }
  }
  azit[0] = new google.maps.LatLng(data.hi[0].lat, data.hi[0].lon);
  let mapCanvas = document.getElementById("map");
  let mapOptions = { center: azit[0], zoom: 16 };
  let map = new google.maps.Map(mapCanvas, mapOptions);
  for (let k in azit) {
    let i;
    if (avg[k] > 1) {
      i = 1;
    } else i = 2;
    let myCity = new google.maps.Circle({
      center: azit[k],
      radius: 3,
      strokeColor: azitColor[i],
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: azitColor[i],
      fillOpacity: 1,
    });
    myCity.setMap(map);
  }
}
myMap();
