/* Desafio 14 - Baseado na duração média das viagens, determine quais
são as 5 bicicletas que foram mais utilizadas.
Arredonde o resultado para cima. */
db.trips.aggregate([
  { $match: { startTime: { $exists: true } } }, //
  { $group:
    {
      _id: "$bikeid",
      duracaoMedia: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
    },
  }, //
  { $project:
    {
      duracaoMedia: { $ceil: { $divide: ["$duracaoMedia", 1000 * 60] } },
    },
  }, //
  { $project: { _id: false, bikeid: "$_id", duracaoMedia: "$duracaoMedia" } },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);
