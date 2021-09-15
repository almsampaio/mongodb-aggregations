db.trips.aggregate([
  {
    $addFields: {
      timediff: {
        $divide: [
          {
            $abs: {
              $subtract: ["$startTime", "$stopTime"],
            },
          },
          3600000,
        ],
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: "$timediff" },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
    },
  },
  { $sort: { duracaoMedia: 1 } },
]);
