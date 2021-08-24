db.trips.aggregate([
  { $match: {
    startTime: { $gte: ISODate("2016-03-10"), $lt: ISODate("2016-03-11") },
  } },
  { $group: {
    _id: "null",
    duracao: { $avg: { $abs: { $subtract: ["$startTime", "$stopTime"] } } },
  } },
  { $project: { _id: false,
    duracaoMediaEmMinutos: { $ceil: { $divide: ["$duracao", 1000 * 60] } } } },
]);
