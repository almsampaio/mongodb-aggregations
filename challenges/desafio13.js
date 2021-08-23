db.trips.aggregate([
  { $match: { startTime: {
    $gte: ISODate("2016-03-10T00:00:00.000"),
    $lt: ISODate("2016-03-11T00:00:00.000"),
  } } },
  { $addFields:
    {
      dateDiff: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] },
          60000,
        ],
      },
    },
  },
  { $group: {
    _id: null,
    minDur: { $avg: "$dateDiff" },
  } },
  { $project: {
    _id: 0,
    duracaoMediaEmMinutos: { $ceil: "$minDur" },
  } },
]);
