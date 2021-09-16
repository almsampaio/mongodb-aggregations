db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10T00:00:00.0Z"),
        $lte: ISODate("2016-03-11T00:00:00.0Z"),
      },
    },
  }, {
    $group: {
      duracaoMediaEmMinutos: {
        $avg: {
          $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000],
        },
      },
      _id: null,

    },
  }, {
    $project: {
      duracaoMediaEmMinutos: {
        $ceil: "$duracaoMediaEmMinutos",
      },
      _id: 0,
    },
  },
]);
