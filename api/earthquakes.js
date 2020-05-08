const connectToDatabase = require("../mongodb/connection");

/**
 * @api {get} /earthquakes?from=2020-05-05
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
 * @apiParam {date} from Start date
 *
 */

const location_query = {
  location: {
    $geoWithin: {
      $geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-67.6043701171875, 17.5628650763021],
            [-66.10198974609375, 17.5628650763021],
            [-66.10198974609375, 18.393623895475336],
            [-67.6043701171875, 18.393623895475336],
            [-67.6043701171875, 17.5628650763021],
          ],
        ],
      },
    },
  },
};

module.exports = async (req, res) => {
  const req_query = req.query;
  let find_query = {};

  // Find by From date or default to last 30 days
  if (req_query.from) {
    find_query["time"] = { $gte: new Date(req_query.from) };
  } else {
    // Get last 30 days by default
    find_query["time"] = {
      $gte: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
    };
  }

  const db = await connectToDatabase(process.env.MONGODB_URI);
  const collection = await db.collection("earthquakes");

  // Find by location, time
  // Remove mongodb _id
  // Sort by date
  const earthquakes = await collection
    .find({ ...location_query, ...find_query }, { projection: { _id: 0 } })
    .sort({ time: -1 })
    .toArray();

  res.status(200).json(
    earthquakes.map((doc) => {
      doc.coordinates = doc["location"].coordinates;
      delete doc["location"];
      return doc;
    })
  );
};
