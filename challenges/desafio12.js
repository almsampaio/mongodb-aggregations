db.trips.aggregate(
  {
    $group: {
      _id: {
        nomeEstacao: "$startStationName",
        diaDaSemana: { $dayOfWeek: "$startTime" },
      },
      total: { $sum: 1 },
    },
  },
  {
    $sort: {
      total: -1,
    },
  },
  {
    $project: {
      nomeEstacao: "$_id.nomeEstacao",
      total: "$total",
      _id: 0,
    },
  },
  {
    $limit: 1,
  },
);
