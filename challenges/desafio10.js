use("aggregations");
db.trips.aggregate([
  {
    $addFields: {
      milliseconds: { $subtract: ["$stopTime", "$startTime"] },
    },
  },
  {
    $addFields: {
      millisecondsToHours: { $divide: ["$milliseconds", 3600000] },
    },
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: "$millisecondsToHours" },
    },
  },
  {
    $project: {
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
    },
  },
]);
