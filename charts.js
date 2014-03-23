$(function () {

  var colors = Highcharts.getOptions().colors,
    categories = ['Free', 'Payed'],
    data = [
      {
        y: 60,
        color: colors[0],
        drilldown: {
          name: 'Free version',
          categories: ['Free 1', 'Free 2'],
          data: [25, 35],
          color: colors[0]
        }
      },
      {
        y: 40,
        color: colors[1],
        drilldown: {
          name: 'Payed versions',
          categories: ['Pro', 'Business', 'Enterprise'],
          data: [10, 15, 15],
          color: colors[1]
        }
      }
    ];


  // Build the data arrays
  var plansData = [];
  var versionsData = [];
  for (var i = 0; i < data.length; i++) {
    // add plans data
    plansData.push({
      name: categories[i],
      y: data[i].y,
      color: data[i].color
    });

    // add version data
    for (var j = 0; j < data[i].drilldown.data.length; j++) {
      var brightness = 0.2 - (j / data[i].drilldown.data.length) / 5 ;
      versionsData.push({
        name: data[i].drilldown.categories[j],
        y: data[i].drilldown.data[j],
        color: Highcharts.Color(data[i].color).brighten(brightness).get()
      });
    }
  }

  // Create the chart
  $('#container').highcharts({
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Users plan share'
    },
    plotOptions: {
      pie: {
        shadow: false,
        center: ['50%', '50%']
      }
    },
    tooltip: {
      valueSuffix: '%'
    },
    series: [
      {
        name: 'Plans',
        data: plansData,
        size: '60%',
        dataLabels: {
          formatter: function() {
            return this.y > 5 ? this.point.name : null;
          },
          color: 'white',
          distance: -60
        }
      },
      {
        name: 'Versions',
        data: versionsData,
        size: '80%',
        innerSize: '60%',
        dataLabels: {
          formatter: function() {
            // display only if larger than 1
            return this.y > 1 ? '<b>'+ this.point.name +':</b> '+ this.y +'%'  : null;
          }
        }
      }
    ]
  });
});

