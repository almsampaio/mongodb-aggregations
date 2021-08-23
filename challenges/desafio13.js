db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10T00:00:00Z"),
        $lt: ISODate("2016-03-11T00:00:00Z"),
      },
    },
  },
  {
    $addFields: {
      difference: {
        $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000],
      },
    },
  },
  {
    $group: { _id: null, count: { $avg: "$difference" } },
  },
  {
    $project: { duracaoMediaEmMinutos: { $ceil: "$count" }, _id: 0 },
  },
]);
