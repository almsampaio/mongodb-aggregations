db.trips.aggregate([
  {
    $match: {
      startTime: { $gte: ISODate("2016-03-10") },
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
      duracaoMediaEmMinutos: { $round: ["$duracaoMediaEmMinutos", 0] },
    },
  },
]);
