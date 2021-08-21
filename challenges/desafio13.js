db.trips.aggregate([
  { $match: { startTime: { $gte: ISODate("2016-03-10T00:00:00.0Z"), $lt: ISODate("2016-03-11T00:00:00.0Z") } } },
  { $addFields: { duration: { $round: [{ $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000] }, 2] }, date: { $dateToString: { format: "%Y-%m-%d", date: "$startTime" } } } },
  { $group: { _id: "$date", duracaoMediaEmMinutos: { $avg: "$duration" } } },
  { $project: { duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" }, _id: 0 } },
]);
