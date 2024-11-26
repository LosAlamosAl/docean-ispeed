// Define the API URL
const apiUrl = "http://localhost:3001/losalamosal?format=highcharts";

const request = new XMLHttpRequest();
request.open("GET", apiUrl, false); // `false` makes the request synchronous
request.send(null);

if (request.status !== 200) {
  console.log("Error getting speeds");
}

//console.log(request.responseText);
let data = JSON.parse(request.responseText);
//console.log(data);

var hourlyData = data.map((arr) => {
  var narr = [];
  var speed = parseInt(arr["d"].split(" ")[0]);
  if (isNaN(speed)) speed = null;
  narr.push(Date.parse(arr["t"]), speed);
  return narr;
});

//console.log(hourlyData);

/*
Highcharts.stockChart("daily", {
  rangeSelector: {
    selected: 1,
  },

  title: {
    text: "iSpeed: Internet Speed Monitor",
  },

  tooltip: {
    valueSuffix: "Mbps",
    valueDecimals: 0,
  },

  series: [
    {
      type: "hlc",
      name: "Daily",
      useOhlcData: true,
      data: hourlyData,
    },
  ],
});
*/

Highcharts.stockChart("hourly", {
  rangeSelector: {
    selected: 1,
  },

  plotOptions: {
    line: {
      connectNulls: false,
    },
  },

  title: {
    text: "Hourly Download Speed",
  },

  navigator: {
    yAxis: {
      min: 0,
    },
  },

  xAxis: {},

  yAxis: {
    min: 0,
    plotLines: [
      {
        value: 500,
        color: "green",
        dashStyle: "shortdash",
        width: 2,
      },
    ],
  },
  series: [
    {
      name: "Mbps",
      data: hourlyData,
      id: "dlspeed",
      linewidth: 1,
      tooltip: {
        valueDecimals: 2,
      },
    },
    {},
  ],
});
