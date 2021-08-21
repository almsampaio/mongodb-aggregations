// Desafio 8
db.air_routes.aggregate([
  {
    $match: {
      airplane: /^747$|^380/,
    },
  },
  {
    $lookup: {
      from: "air_alliances",
      localField: "airline.name",
      foreignField: "airlines",
      as: "alliance",
    },
  },
  { $unwind: "$alliance" },
  { $group: {
    _id: "$alliance.name",
    totalRotas: { $sum: 1 },
  } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
// Requisito feito com consulta do PR do Murilo Gonçalves