'use strict';

var module = angular.module('dashboardApp');

module.directive('mapChart', function(colorService) {
  return {
    restrict: 'E',
    scope: {
      title: '=',
      data: '='
    },

    link: function (scope, element, attrs) {
      //var map = new AmCharts.AmMap();
      // set path to images
      /*var countryData = {
        africa: {
          title: "Africa",
          color: "#de4c4f",
          countries: ["AO", "BF", "BI", "BJ", "BW", "CD", "CF", "CG", "CI", "CM", "DJ", "DZ", "EG", "ER", "ET", "GA", "GH", "GM", "GN", "GQ", "GW", "KE", "LR", "LS", "LY", "MA", "MU", "MG", "ML", "MR", "MW", "MZ", "NA", "NE", "NG", "RW", "SD", "SL", "SN", "SO", "SS", "SZ", "TD", "TG", "TN", "TZ", "UG", "ZA", "ZM", "ZW", "EH", "KM", "GO", "JU", "SH", "ST", "YT", "BV", "CV"]
        },
        europe: {
          title: "Europe",
          color: "#d8854f",
          countries: ["AL", "AM", "AT", "AZ", "BA", "BE", "BG", "BY", "CH", "CY", "CZ", "DE", "DK", "EE", "ES", "FI", "FR", "GB", "GE", "GR", "HR", "HU", "IE", "IS", "IT", "KV", "LT", "LU", "LV", "MD", "ME", "MK", "NL", "NO", "PL", "PT", "RO", "RS", "RU_europe", "SE", "SI", "SJ", "SK", "TR", "UA", "RU", "VA", "MT", "MC", "XK", "LI", "IM", "GI", "FO", "AD", "AX", "GG", "JE", "SM"]
        },
        asia: {
          title: "Asia",
          color: "#eea638",
          countries: ["AE", "AF", "BD", "BN", "BT", "CN", "ID", "IL", "IN", "IQ", "IR", "JO", "JP", "KG", "KH", "KP", "KR", "KW", "KZ", "LA", "LB", "LK", "MM", "MN", "MY", "NP", "OM", "PH", "PK", "PS", "QA", "RU-asia", "SA", "SY", "TH", "TJ", "TL", "TM", "TW", "UZ", "VN", "YE", "HK", "MV", "BH", "SG"]
        },
        north_america: {
          title: "North America",
          color: "#a7a737",
          countries: ["BS", "BZ", "CA", "CR", "CU", "DO", "GL", "GT", "HN", "HT", "JM", "MX", "NI", "PA", "PR", "SV", "US", "AG", "AW", "BB", "BL", "GD", "KN", "LC", "MQ", "TC", "VG", "AI", "BM", "DM", "PM", "GP", "KY", "MF", "MS", "SX", "TT", "VC", "VI", "BQ", "CW"]
        },
        south_america: {
          title: "South America",
          color: "#86a965",
          countries: ["AR", "BO", "BR", "CL", "CO", "EC", "FK", "GF", "GY", "PE", "PY", "SR", "UY", "VE", "GS"]
        },
        australia: {
          title: "Australia & Oceania",
          color: "#8aabb0",
          countries: ["AS", "AU", "CC", "CX", "FJ", "FM", "GU", "HM", "IO", "KI", "MH", "MO", "MP", "NC", "NF", "NR", "NU", "NZ", "PG", "PW", "RE", "SB", "SC", "TF", "TK", "TO", "TV", "UM-81", "UM-84", "UM-67", "UM-71", "UM-79", "VU", "WF", "WS", "CK", "UM-86", "PF", "PN"]
        }
      };*/

      var map = AmCharts.makeChart("location-map", {
        type: 'map',
        theme: 'light',
        pathToImages: "/src/lib/ammap/images/",

        dataProvider: {
          map: "continentsLow",
          /*getAreasFromMap: true,*/
          zoomLevel: 1,
          areas: [{
            id: "africa",
            value: '10'/*,
             color: countryData.africa.color*/
          }, {
            id: "asia",
            value: '172'/*,
             color: countryData.asia.color*/
          }, {
            id: "australia",
            value: '517'/*,
             color: countryData.australia.color*/
          }, {
            id: "europe",
            value: '824'/*,
             color: countryData.europe.color*/
          }, {
            id: "north_america",
            value: '950'/*,
             color: countryData.north_america.color*/
          }, {
            id: "south_america",
            value: '23'/*,
             color: countryData.south_america.color*/
          }]
        },
        areasSettings: {
          autoZoom: false,
          balloonText: "[[title]]: [[value]] users"
        },
        valueLegend: {
          right: 10
/*          minValue: '0',
          maxValue: '2300'*/
        }
      });
    }
  };
});