db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10T00:00:00.000Z"),
        $lte: ISODate("2016-03-10T23:59:59.000Z"),
      },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: {
        $avg: {
          $subtract: [
            "$stopTime",
            "$startTime",
          ],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: {
        $round: [
          { $divide: ["$duracaoMediaEmMinutos", 6e4] },
        ],
      },
    },
  },
]);
