db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10"),
        $lt: ISODate("2016-03-11"),
      },
    },
  },
  {
    $addFields: {
      DURACAO: {
        $subtract: [
          "$stopTime",
          "$startTime",
        ],
      },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: {
        $avg: "$DURACAO",
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: {
        $ceil: {
          $divide: [
            "$duracaoMediaEmMinutos",
            60000,
          ],
        },
      },
    },
  },
]);
