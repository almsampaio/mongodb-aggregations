/* Desafio 13 - Determine a duração média das viagens iniciadas no
dia 10/03/2016, em minutos.

Arredonde o resultado para cima. */
db.trips.aggregate([
  { $match:
    { startTime: {
      $exists: true, $gte: ISODate("2016-03-10"), $lt: ISODate("2016-04-10") },
    },
  }, //
  { $group:
    {
      _id: null,
      duracaoMediaEmMinutos: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
    },
  }, //
  { $project:
    {
      duracaoMediaEmMinutos: { $ceil: { $divide: ["$duracaoMediaEmMinutos", 1000 * 60] } },
    },
  }, //
  { $project: { _id: false, duracaoMediaEmMinutos: true } },
]);
