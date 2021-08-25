// Trocando de contexto, vamos utilizar nossa outra coleção que
// contém dados de empresas aéreas, suas rotas,
// seus voos e parcerias.
// use("aggregations");
db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  {
    $lookup: {
      from: "air_routes",
      localField: "airlines",
      foreignField: "airline.name",
      as: "routes",
    },
  },
  { $unwind: "$routes" },
  {
    $match: { "routes.airplane": { $in: ["747", "380"] } },
  },
  { $group: { _id: "$name", totalRotas: { $sum: 1 } } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
