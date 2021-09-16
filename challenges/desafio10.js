// Consultei o repositório https://github.com/tryber/sd-010-a-mongodb-aggregations/pull/139/files para entender como usaria o $avg
db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: {
        $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 3600000] },
      },
    },
  }, {
    $sort: { duracaoMedia: 1 },
  }, {
    $project: {
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
      _id: 0,
    },
  },
]);
