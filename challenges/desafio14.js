// Baseado na duração média das viagens, determine quais são as 5
// bicicletas que foram mais utilizadas.
// Exiba o resultado em minutos arredondados para cima e em
// ordem decrescente.

db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      duration: { $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000] } },
    },
  },
  {
    $sort: {
      duration: -1,
    },
  },
  {
    $limit: 5,
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$duration" },
    },
  },
]);
