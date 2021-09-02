db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10T00:00:01"),
        $lte: ISODate("2016-03-10T23:59:59"),
      },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: {
        $avg: {
          $dateDiff: {
            startDate: "$startTime",
            endDate: "$stopTime",
            unit: "minute",
          },
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
