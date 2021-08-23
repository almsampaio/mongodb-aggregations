// 13. Determine a duração média das viagens iniciadas no dia 10/03/2016, em minutos.

db.trips.aggregate([
  { $addFields: { dataCmp:
    { $dateToString: {
      date: "$startTime",
      format: "%d-%m-%Y",
    } } } },
  { $match: {
    dataCmp: { $eq: "10-03-2016" },
  } },
  { $group: {
    _id: null,
    duracaoMediaEmMinutos: { $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000] } },
  } },
  { $project: {
    duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" },
    _id: 0,
  } },
]);

// Source:
// https://docs.mongodb.com/manual/reference/operator/aggregation/dateToString/
// https://docs.mongodb.com/manual/reference/operator/aggregation/ceil/
