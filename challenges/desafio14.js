// 14. Baseado na duração média das viagens,
// determine quais são as 5 bicicletas que foram mais utilizadas.

db.trips.aggregate([
  { $group: {
    _id: "$bikeid",
    duracaoMedia: { $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000] } },
  } },
  { $project: {
    bikeId: "$_id",
    _id: 0,
    duracaoMedia: { $ceil: "$duracaoMedia" },
  } },
  { $sort: {
    duracaoMedia: -1,
  } },
  { $limit: 5 },
]);

// Source:
// https://stackoverflow.com/questions/49211564/mongodb-pymongo-calculate-difference-of-two-times-in-minutes/49214308
// https://docs.mongodb.com/manual/reference/operator/aggregation/ceil/
