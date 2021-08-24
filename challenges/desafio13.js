db.trips.aggregate([
  {
    $match: {
      startTime: { $gte: ISODate("2016-03-10"), $lt: ISODate("2016-03-11") },
    },
  },
  {
    $group: {
      _id: null,
      tempoMedio: {
        $avg: { $subtract: ["$stopTime", "$startTime"] },
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: {
        $ceil: {
          $divide: ["$tempoMedio", 60000],
        },
      },
    },
  },
]);
