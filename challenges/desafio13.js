db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10"),
      },
    },
  },
  {
    $project: {
      duracaoMediaEmMinutos: { $subtract: ["$stopTime", "$startTime"] },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: {
        $avg: { $divide: ["$duracaoMediaEmMinutos", 60000] },
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" },
    },
  },
]);
