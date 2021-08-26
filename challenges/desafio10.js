db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: {
        $avg: {
          $subtract: ["$stopTime", "$startTime"],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      /* source: https://github.com/tryber/sd-010-a-mongodb-aggregations/pull/103 */
      duracaoMedia: { $round: [{ $divide: ["$duracaoMedia", 60 * 60 * 1000] }, 2] },
    },
  },
  {
    $sort: {
      duracaoMedia: 1,
    },
  },
]);
