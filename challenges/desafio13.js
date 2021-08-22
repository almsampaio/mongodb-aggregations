db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10"),
      },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMedia: { $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000] } },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$duracaoMedia" },
    },
  },
]);
