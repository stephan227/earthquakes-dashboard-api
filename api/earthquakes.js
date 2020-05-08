const connectToDatabase = require('../mongodb/connection');

/**
 * @api {get} /earthquakes
 * @apiName GetEarhquakes
 * @apiGroup Earthquakes
 *
 * @apiSuccess {integer} mag Magnitude
 * @apiSuccess {date} time UTC Date
 * @apiSuccess {integer} tz Timezone Offset 
 * @apiSuccess {object} coordinates Coordinates
 * @apiSuccess {integer} depth Depth in km
 * @apiSuccess {string} id USGS generated ID
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      [
 *        {
 *          mag: 3,
 *          time: "2020-05-06 04:53:40.480Z",
 *          coordinates: [-66.9661, 17.9785],
 *          depth: 5,
 *          id: "pr2020127011"
 *        }
 *      ]
 *
 * @apiParam {time} from From time 
 * 
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

module.exports = async (req, res) => {

  const req_query = req.query;
  let find_query = {};

  // convert year parameter string to int if it exists 
  if (req_query.from){
    find_query["time"] = { $gte : new Date(req_query.from) }
  }

  const db = await connectToDatabase(process.env.MONGODB_URI)
  const collection = await db.collection('earthquakes')

  const earthquakes = await collection.find({...location_query, ...find_query}, {projection:{_id:0}}).sort({time: -1}).limit(1000).toArray();
  res.status(200).json(earthquakes)
}