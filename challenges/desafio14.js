db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      media: {
        $avg: {
          $subtract: ["$stopTime", "$startTime"],
        },
      },
    },
  },
  {
    $project: {
      bikeId: "$_id",
      _id: 0,
      duracaoMedia: {
        $ceil: [
          {
            $divide: [
              "$media", 60000,
            ],
          },
        ],
      },
    },
  },
  {
    $sort: {
      duracaoMedia: -1,
    },
  },
  {
    $limit: 5,
  },
]);
