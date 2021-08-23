/* Encontre a duração média de viagens por tipo de usuário.
Exiba o valor em horas com apenas duas casas decimais
Exiba a média de viagens ordenada de forma crescente. */
db.trips.aggregate([
  {
    $project: {
      _id: 0,
      user_type: "$usertype",
      travel_hours: {

        $divide: [
          { $subtract: ["$stopTime", "$startTime"] },
          { $multiply: [60, 60, 1000] },
        ],

      },
    },
  },
  {
    $group: {
      _id: "$user_type",
      duracao_Media: { $avg: "$travel_hours" },
    },
  },
  {
    $project: {
      tipo: "$_id",
      _id: 0,
      duracaoMedia: {
        $round: ["$duracao_Media", 2],
      },
    },
  },
  {
    $sort: { duracaoMedia: 1 },
  },
]);
