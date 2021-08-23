db.trips.aggregate(
  [
    {
      $group: {
        _id: "$usertype",
        duracaoMedia: { $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 3600000] } },
        // sub com datas traz o resultado em ms, devemos dividir por 3600000 p o resultado em horas.
      },
    },
    {
      $project: {
        tipo: "$_id",
        duracaoMedia: { $round: ["$duracaoMedia", 2] },
        _id: 0,
      },
    },
    {
      $sort: {
        tipo: -1,
      },
    },
  ],
);
