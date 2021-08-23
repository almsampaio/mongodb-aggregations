db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: {
        $avg: {
          $subtract: [
            "$stopTime",
            "$startTime",
          ],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: {
        $ceil: [
          { $divide: ["$duracaoMedia", 6e4] },
        ],
      },
    },
  },
  {
    $sort: { duracaoMedia: -1 },
  },
  { $limit: 5 },
]);
