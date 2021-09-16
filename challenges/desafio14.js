db.trips.aggregate([
  {
    $addFields: {
      tripTime: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] },
          60000,
        ],
      },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: {
        $avg: "$tripTime",
      },
    },
  }, {
    $sort: {
      duracaoMedia: -1
    }
  }, {
    $limit: 5
  }, {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: {
        $ceil: "$duracaoMedia",
      },
    },
  },
]);
