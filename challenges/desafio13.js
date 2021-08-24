db.trips.aggregate([
  {
    $match: {
      startTime: { $gte: ISODate("2016-03-10"), $lte: ISODate("2016-03-11") },
    },
  },
  {
    $group: {
      _id: null,
      minutos: { $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60 * 1000] } },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$minutos" },
    },
  },
]);
