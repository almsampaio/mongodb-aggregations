db.trips.aggregate([
  { $group: {
      _id: {
        diaDaSemana: { $dayOfWeek: "$startTime" },
        estacao: "$startStationName",
      },
      qtn: { $count: {} },
    },
  },
  { $project: {
      _id: 0,
      nomeEstacao: "$_id.estacao",
      total: "$qtn",
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
