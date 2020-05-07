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
            "description": "<p>Earhtquake Magnitude</p>"
          },
          {
            "group": "Success 200",
            "type": "integer",
            "optional": false,
            "field": "utc_timestamp",
            "description": "<p>Earthquake UTC data timestamp</p>"
          },
          {
            "group": "Success 200",
            "type": "float",
            "optional": false,
            "field": "local_time",
            "description": "<p>Earthquake Local Time</p>"
          },
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "coordinates",
            "description": "<p>Earthquake Coordinates</p>"
          },
          {
            "group": "Success 200",
            "type": "integer",
            "optional": false,
            "field": "depth",
            "description": "<p>Earhquakes depth in km</p>"
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
          "content": "HTTP/1.1 200 OK\n [\n   {\n     mag: 3,\n     utc_timestamp: 1588755460480,\n     local_time: \"2020-05-06 04:53:40.480\",\n     coordinates: [-66.9661, 17.9785],\n     depth: 5,\n     id: \"pr2020127011\"\n   }\n ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/earthquakes.js",
    "groupTitle": "Earthquakes"
  }
] });
