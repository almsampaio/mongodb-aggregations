db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      tempo: {
        $avg: {
          $subtract: ["$startTime", "$stopTime"],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: {
        $ceil: {
          $abs: {
            $divide: [
              { $divide: ["$tempo", 1000] }, 60,
            ],
          },
        },
      },
    },
  },
  {
    $sort: { duracaoMedia: -1 },
  },
  {
    $limit: 5,
  },
]);
