/* Desafio 10 - Encontre a duração média de viagens por tipo de usuário.
1. Exiba o valor em horas com apenas duas casas decimais
2. Exiba a média de viagens ordenada de forma crescente.
3. Para arredondar a média use o $round. */
db.trips.aggregate([
  { $match: { usertype: { $exists: true } } },
  { $group:
    { _id: "$usertype",
      duracaoMedia: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
    },
  },
  { $project:
    {
      duracaoMedia: { $round: [{ $divide: ["$duracaoMedia", 1000 * 60 * 60] }, 2] },
    },
  },
  { $project: { _id: false, tipo: "$_id", duracaoMedia: "$duracaoMedia" } },
  { $sort: { duracaoMedia: 1 } },
]);
