db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10"),
        $lte: ISODate("2016-03-11"),
      },
    },
  },
  {
    $group: {
      _id: null,
      tempo: {
        $avg: {
          $subtract: ["$startTime", "$stopTime"],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: {
        $ceil: {
          $abs: {
            $divide: [
              { $divide: ["$tempo", 1000] }, 60,
            ],
          },
        },
      },
    },
  },
]);
