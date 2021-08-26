db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  { $lookup:
    {
      from: "air_routes",
      localField: "airlines",
      foreignField: "airline.name",
      as: "rotas-B747-A380",
    },
  },
  { $unwind: "$rotas-B747-A380" },
  { $match:
    {
      "rotas-B747-A380.airplane": { $in: ["380", "747"] },
    },
  },
  { $group:
    {
      _id: "$name",
      totalRotas: { $sum: 1 },
    },
  },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);

// No desafio pede para listar todas as parcerias que utilizam o B737 e A380
// Porém na pasta .Trybe informa que o resultado precisa ser apenas:
// { "_id" : "SkyTeam", "totalRotas" : 8 }
// Para fazer isso utilizei o $sort e o $limit das linhas 23 e 24.
