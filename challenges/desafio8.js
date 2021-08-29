/* Desafio 8 - Trocando de contexto, vamos utilizar nossa outra coleção que
contém dados de empresas aéreas, suas rotas, seus voos e parcerias.

Liste todas as parcerias da coleção "air_alliances", que voam rotas com um
"Boing 747" ou um "Airbus A380" , para descobrir qual delas tem o maior
número de rotas com esses aviões.

No campo "airplane", na coleção air_routes:
1. Boing 747 está abreviado para 747
2. Airbus A380 está abreviado para 380

O resultado da sua query deve ter exatamente o seguinte formato
(incluindo a ordem dos campos): */
db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  {
    $lookup: {
      from: "air_routes",
      localField: "airlines",
      foreignField: "airline.name",
      as: "parcerias",
    },
  },
  { $unwind: "$parcerias" },
  { $match: { "parcerias.airplane": { $in: ["747", "380"] } } },
  { $group: { _id: "$name", totalRotas: { $sum: 1 } } },
  { $project: { _id: true, totalRotas: true } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
