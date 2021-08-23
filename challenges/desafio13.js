/**
 * Consultei o repositório do Diego para resolver essa parte.
 * Link: https://github.com/tryber/sd-09-mongodb-aggregations/tree/diego-vini-mongodb-aggregations
 */
db.trips.aggregate([
  { $match: { startTime: { $gte: ISODate("2016-03-10"), $lt: ISODate("2016-03-11") } } },
  { $group: { _id: null, duracaoMediaEmMinutos: { $avg: { $subtract: ["$stopTime", "$startTime"] } } } },
  { $project: { _id: 0, duracaoMediaEmMinutos: { $ceil: { $divide: ["$duracaoMediaEmMinutos", 60 * 1000] } } } },
]);
