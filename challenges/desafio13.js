db.trips.aggregate([
  {
    $match: {
      startTime: {
        $lt: ISODate("2016-03-11"),
        $gte: ISODate("2016-03-10"),
      },
    },
  },
  {
    $group: {
      _id: 0,
      duracaoMediaEmMinutos: {
        $avg:
        {
          $divide: [{ $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 1000] }, 60],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: {
        $ceil: "$duracaoMediaEmMinutos",
      },
    },
  },
]);
