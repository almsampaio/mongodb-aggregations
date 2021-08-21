db.trips.aggregate(
  [
    { $group:
      {
        _id:
          {
            diaSemana: { $dayOfWeek: "$startTime" },
            estacaoNome: "$startStationName",
          },
        total: { $sum: 1 },
      },
    },
    { $sort: { total: -1 } },
    { $limit: 1 },
    { $project:
      {
        _id: 0,
        nomeEstacao: "$_id.estacaoNome",
        total: "$total",
      },
    },
  ],
);
