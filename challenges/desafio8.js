// Trocando de contexto, vamos utilizar nossa outra coleção que contém
//  dados de empresas aéreas, suas rotas, seus voos e parcerias.

// Liste todas as parcerias da coleção air_alliances, que voam rotas
// com um Boing 747 ou um Airbus A380 , para descobrir qual delas tem
// o maior número de rotas com esses aviões.
// No campo airplane, na coleção air_routes:

// Boing 747 está abreviado para 747
// Airbus A380 está abreviado para 380
db.air_alliances.aggregate([
  {
    $lookup: {
      from: "air_routes",
      let: { alliances: "$airlines" },
      pipeline: [
        { $match: {
          $expr: {
            $in: ["$airline.name", "$$alliances"],
          },
        } },
      ],
      as: "joinList",
    },
  },
  { $unwind: "$joinList" },
  { $match: { "joinList.airplane": { $in: ["747", "380"] } } },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: 1 },
    },
  },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
