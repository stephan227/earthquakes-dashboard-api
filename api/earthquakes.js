const connectToDatabase = require('../mongodb/connection');

/**
 * @api {get} /earthquakes
 * @apiName GetEarhquakes
 * @apiGroup Earthquakes
 *
 * @apiSuccess {integer} mag Earhtquake Magnitude
 * @apiSuccess {integer} utc_timestamp Earthquake UTC data timestamp
 * @apiSuccess {float} local_time Earthquake Local Time
 * @apiSuccess {object} coordinates Earthquake Coordinates
 * @apiSuccess {integer} depth Earhquakes depth in km
 * @apiSuccess {string} id USGS generated ID
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      [
 *        {
 *          mag: 3,
 *          utc_timestamp: 1588755460480,
 *          local_time: "2020-05-06 04:53:40.480",
 *          coordinates: [-66.9661, 17.9785],
 *          depth: 5,
 *          id: "pr2020127011"
 *        }
 *      ]
 *
 */

module.exports = async (req, res) => {
  const db = await connectToDatabase(process.env.MONGODB_URI)
  const collection = await db.collection('earthquakes')
  
  const earthquakes = await collection.find({}, {projection:{_id:0}}).limit(100).toArray();
  res.status(200).json(earthquakes)
}