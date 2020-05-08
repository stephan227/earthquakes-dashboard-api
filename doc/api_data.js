define({ "api": [
  {
    "type": "get",
    "url": "/earthquakes",
    "title": "",
    "name": "GetEarhquakes",
    "group": "Earthquakes",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "integer",
            "optional": false,
            "field": "mag",
            "description": "<p>Magnitude</p>"
          },
          {
            "group": "Success 200",
            "type": "date",
            "optional": false,
            "field": "time",
            "description": "<p>UTC Date</p>"
          },
          {
            "group": "Success 200",
            "type": "integer",
            "optional": false,
            "field": "tz",
            "description": "<p>Timezone Offset</p>"
          },
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "coordinates",
            "description": "<p>Coordinates</p>"
          },
          {
            "group": "Success 200",
            "type": "integer",
            "optional": false,
            "field": "depth",
            "description": "<p>Depth in km</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>USGS generated ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n [\n   {\n     mag: 3,\n     time: \"2020-05-06 04:53:40.480Z\",\n     coordinates: [-66.9661, 17.9785],\n     depth: 5,\n     id: \"pr2020127011\"\n   }\n ]",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "time",
            "optional": false,
            "field": "from",
            "description": "<p>From time</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/earthquakes.js",
    "groupTitle": "Earthquakes"
  }
] });
