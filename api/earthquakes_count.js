const connectToDatabase = require("../mongodb/connection");

/**
 * @api {get} /earthquakes_count
 * @apiName GetEarhquakesCount
 * @apiGroup Earthquakes
 *
 * @apiDescription Returns the earhtquake counts by date.
 *
 * @apiSuccess {integer} count Amount of earthquakes for a given date
 * @apiSuccess {date} time Date
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      [
 *        {
 *          "count":9,
 *          "date":"2018-11-26"
 *        }
 *      ]
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
  const db = await connectToDatabase(process.env.MONGODB_URI);
  const collection = await db.collection("earthquakes");

  // Aggreggate query
  // 1 - Filters by location
  // 2 - Groups and countrs by date
  // 3 - Projects date and count
  const earthquakesCount = await collection
    .aggregate([
      { $match: { ...location_query } },
      {
        $group: {
          _id: {
            day: { $dayOfMonth: "$time" },
            month: { $month: "$time" },
            year: { $year: "$time" },
          },
          count: { $sum: 1 },
          date: { $first: "$time" },
        },
      },
      {
        $project: {
          date: {
            $dateToString: { format: "%Y-%m-%d", date: "$date" },
          },
          count: 1,
          _id: 0,
        },
      },
      { $sort: { date: 1 } },
    ])
    .toArray();

  res.status(200).json(earthquakesCount);
};
