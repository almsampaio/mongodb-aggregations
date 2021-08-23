// Liste todas as parcerias da coleção air_alliances, que voam rotas
// com um Boing 747 ou um Airbus A380 , para descobrir qual delas tem o
// maior número de rotas com esses aviões. No campo airplane, na coleção air_routes:

// Boing 747 está abreviado para 747
// Airbus A380 está abreviado para 380

db.air_routes.aggregate([
  { $match: { airplane: { $in: ["747", "380"] } } },
  { $lookup: { from: "air_alliances",
    localField: "airline.name",
    foreignField: "airlines",
    as: "airlines",
  } },
  { $unwind: "$airlines" },
  { $group: { _id: "$airlines.name", totalRotas: { $sum: 1 } } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
