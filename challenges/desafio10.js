db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
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
      tipo: "$_id",
      duracaoMedia: {
        $abs: {
          $round: [
            { $divide: ["$tempo", 1000 * 60 * 60] },
            2,
          ],
        },
      },
    },
  },
  {
    $sort: { duracaoMedia: 1 },
  },
]);
