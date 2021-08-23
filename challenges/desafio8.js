// Esse requisito foi um dos mais difícies para mim,
// mas graça ao repositório da minha colega Ana Ventura(Turma 10 - Tribo A),
// tive uma luz para fazer o meu.
// Link do repositório:
// https://github.com/tryber/sd-010-a-mongodb-aggregations/pull/31/commits/cfe33e450146e01b66146b93cbaea39b1cccb4e8

db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  {
    $lookup: {
      from: "air_routes",
      localField: "airlines",
      foreignField: "airline.name",
      as: "parceriasDaColecao",
    },
  },
  { $unwind: "$parceriasDaColecao" },
  {
    $match: {
      "parceriasDaColecao.airplane": { $in: ["747", "380"] },
    },
  },
  {
    $group: {
      _id: "$name",
      totalRotas: {
        $sum: 1,
      },
    },
  },
  {
    $sort: {
      totalRotas: -1,
    },
  },
  { $limit: 1 },
]);
