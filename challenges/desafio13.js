db.trips.aggregate([
  { $addFields: { duracaoMediaEmMinutos: { $subtract: ["$stopTime", "$startTime"] } } },
  { $match: { startTime: { $gte: ISODate("2016-03-10T00:00:00.0Z"), $lte: ISODate("2016-03-10T23:59:59.59Z") } } },
  { $group: { _id: null, duracaoMediaEmMinutos: { $avg: { $divide: ["$duracaoMediaEmMinutos", 60000] } } } },
  { $project: { _id: 0, duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" } } },
]);
