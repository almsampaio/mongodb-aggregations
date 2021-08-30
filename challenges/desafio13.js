// Determine a duração média das viagens iniciadas no dia 10/03/2016, em minutos.
// Arredonde o resultado para cima

db.trips.aggregate([
  { $match: {
    startTime: { $gte: ISODate("2016-03-10"), $lt: ISODate("2016-03-11") },
  },
  },
  { $group: {
    _id: null,
    media: {
      $avg: { $subtract: ["$stopTime", "$startTime"] },
    },
  },
  },
  { $project: {
    _id: 0,
    duracaoMediaEmMinutos: {
      $ceil: { $divide: ["$media", 60 * 1000] },
    },
  },
  },
]);
