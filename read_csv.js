const fs = require("fs");
const { parse } = require("csv-parse");
const { deflateRaw } = require("zlib");

const data = new Array();

// data = fs.createReadStream('./modelingData.csv')

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
