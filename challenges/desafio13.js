const collection = db.trips;

collection.aggregate([
  { $match: { startTime: { $gt: ISODate("2016-03-10"), $lt: ISODate("2016-03-11") } } },
  {
    $group: {
      _id: null,
      duracaoMedia: {
        $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60 * 1000] },
      },
    },
  },
  { $project: { _id: 0, duracaoMediaEmMinutos: { $ceil: "$duracaoMedia" } } },
]);
