db.trips.aggregate([
  {
    $match: {
      startTime: { $gte: ISODate("2016-03-10"), $lt: ISODate("2016-03-11") },
    },
  },
  {
    $group: {
      _id: null,
      time: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
    },
  },
  {
    $project: {
      duracaoMediaEmMinutos: { $ceil: { $divide: ["$time", 60000] } },
      _id: 0,
    },
  },
]);
