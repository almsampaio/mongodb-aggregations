
db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10T00:00:00.000+00:00"),
        $lte: ISODate("2016-03-10T23:59:59.000+00:00"),
      },
    },
  },
  {
    $addFields: {
      milliseconds: { $subtract: ["$stopTime", "$startTime"] },
    },
  },
  {
    $addFields: {
      millisecondsToMinutes: { $divide: ["$milliseconds", 60000] },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: {
        $avg: "$millisecondsToMinutes",
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
