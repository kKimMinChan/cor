const fs = require("fs");

const { parse } = require("csv-parse");

const data = new Array();

fs.createReadStream("./modelingData.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    data.push(row);
    // console.log(row)
  })
  .on("end", function () {
    console.log(data);
    console.log(data.length);
  })
  .on("error", function (error) {
    console.log(error.message);
  });

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
      data[i][2] > 0 ||
      data[i][3] > 0 ||
      data[i][4] > 0 ||
      data[i][5] > 0 ||
      data[i][6] > 0 ||
      data[i][7] > 0 ||
      data[i][8] > 0 ||
      data[i][9] > 0 ||
      data[i][10] > 0 ||
      data[i][11] > 0
    ) {
      azit[i] = new google.maps.LatLng(data[i][1], data[i][0]);
      avg[i] =
        (data[i][2] +
          data[i][3] +
          data[i][4] +
          data[i][5] +
          data[i][6] +
          data[i][7] +
          data[i][8] +
          data[i][9] +
          data[i][10] +
          data[i][11]) /
        10;
      console.log(avg[i]);
    }
  }

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
