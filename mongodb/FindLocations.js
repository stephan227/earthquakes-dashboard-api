/**
  Find Mongodb records based on Coordinates
*/

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const { MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_IP_ADDRESS } = process.env;
const url = `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_IP_ADDRESS}`;

// Database Name
const dbName = 'earthquakes';

// [ [ [ 0, 0 ], [ 3, 6 ], [ 6, 1 ], [ 0, 0 ] ] ]
/**
 * Find locations inside an Area
 * Use https://geojson.io to generate the area where to search (Polygon square area)
 * {
   location: {
      $geoWithin: {
         $geometry: {

           type : "Polygon" , 
             coordinates:  
              [
                [
                  [
                    -67.6043701171875,
                    17.5628650763021
                  ],
                  [
                    -66.10198974609375,
                    17.5628650763021
                  ],
                  [
                    -66.10198974609375,
                    18.393623895475336
                  ],
                  [
                    -67.6043701171875,
                    18.393623895475336
                  ],
                  [
                    -67.6043701171875,
                    17.5628650763021
                  ]
                ]
              ]
             
             
         }
      }
   }
}
 */


 /** Find locations near a latitude and longitude 
      const location_query = {
        "location": {
          $near: {
            $geometry: {
                type: "Point" ,
                coordinates: [ -66.9661 , 17.9785 ]
            },
            $maxDistance: 6000
          }
        }
      }
 */

const location_query = {
    location: {
      $geoWithin: {
          $geometry: {
            type : "Polygon", 
              coordinates: 
              [
                [
                  [
                    -67.6043701171875,
                    17.5628650763021
                  ],
                  [
                    -66.10198974609375,
                    17.5628650763021
                  ],
                  [
                    -66.10198974609375,
                    18.393623895475336
                  ],
                  [
                    -67.6043701171875,
                    18.393623895475336
                  ],
                  [
                    -67.6043701171875,
                    17.5628650763021
                  ]
                ]
              ]
          }
      }
    }
}
module.exports = function FindLocations(findLocationsCallback) {
  const client = new MongoClient(url);

  client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const dbs = client.db(dbName);
    dbs.collection("earthquakes").find({location_query})
      .toArray(function(err, result) {
        if (err) {
          throw err;
        }
        
        console.log(result.length);
        // db.close();
        client.close();
        findLocationsCallback(result);
      });

  });
}
// FindLocations()