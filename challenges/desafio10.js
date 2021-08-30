// use("aggregations");
db.trips.aggregate([
  {
    $group: {
      _id: { tipo: "$usertype" },
      time: { $avg: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] }, 3600000,
        ] },
      },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id.tipo",
      duracaoMedia: {
        $round: ["$time", 2] },
    },
  },
  {
    $sort: { duracaoMedia: 1 },
  },
]);
