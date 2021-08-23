// 10. Encontre a duração média de viagens por tipo de usuário.
db.trips.aggregate([
  { $group: {
    _id: "$usertype",
    duracaoMedia: { $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 3600000] } },
  } },
  { $project: {
    tipo: "$_id",
    _id: 0,
    duracaoMedia: {
      $round: ["$duracaoMedia", 2],
    },
  } },
  { $sort: {
    tipo: -1,
  } },
]);

// Source:
// https://stackoverflow.com/questions/41138877/how-to-calculate-timestamp-difference-in-mongodb-in-hours
