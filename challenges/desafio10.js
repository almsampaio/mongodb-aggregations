db.trips.aggregate([
  {
    $addFields: {
      totalHours: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] },
          1000 * 60 * 60,
        ],
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      hoursAVG: { $avg: "$totalHours" },
    },
  },
  {
    $sort: {
      hoursAVG: 1,
    },
  },
  {
    $project: {
      tipo: "$_id",
      _id: 0,
      duracaoMedia: { $round: ["$hoursAVG", 2] },
    },
  },
]);
