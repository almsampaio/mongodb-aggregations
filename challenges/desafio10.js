db.trips.aggregate([
  {
    $addFields: {
      userTripDateDifference: {
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
      tripHoursAverage: { $avg: "$userTripDateDifference" }
    }
  },
  {
    $sort: {
      tripHoursAverage: 1
    }
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$tripHoursAverage", 2] },
    }
  },
]);