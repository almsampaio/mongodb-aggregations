// Desafio 13
db.trips.aggregate([
  {
    $match: {
      startTime: { $gte: ISODate("2016-03-10"), $lt: ISODate("2016-03-11") },
    },
  },
  {
    $addFields: {
      inMinutes: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 6e4] },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: { $avg: "$inMinutes" },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" },
    },
  },
]);
