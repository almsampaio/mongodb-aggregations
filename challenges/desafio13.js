db.trips.aggregate([
  { $match: {
    startTime: { $gte: ISODate("2016-03-10T00:00:00.000Z"), $lt: ISODate("2016-03-10T23:59:59.000Z") },
  } },
  { $group: {
    _id: null,
    duracaoMediaEmMinutos: { $avg: {
      $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000],
    } },
  } },
  { $project: {
    _id: 0,
    duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" },
  } },
]);
