/* Baseado na duração média das viagens, determine quais são as 5 bicicletas
que foram mais utilizadas.
Exiba o resultado em minutos arredondados para cima e em ordem decrescente. */
db.trips.aggregate([
  {
    $addFields: {
      duracaoViage_em_Min: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] },
          60000,
        ],
      },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: {
        $avg: "$duracaoViage_em_Min",
      },
    },
  },
  {
    $project: {
      _id: 1,
      duracaoMediaEmMinutos: { $ceil: "$duracaoMedia" },
    },
  },
  {
    $sort: { duracaoMediaEmMinutos: -1 },
  },
  {
    $limit: 5,
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$duracaoMediaEmMinutos" },
    },
  },
]);
