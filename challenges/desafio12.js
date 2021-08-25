db.trips.aggregate([
  {
    $addFields: {
      diaDaSemana: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $group: {
      _id: {
        diaDaSemana: "$diaDaSemana",
        estacao: "$startStationName",
      },
      total: { $sum: 1 },
    },
  },
  {
    $project: {
      nomeEstacao: "$_id.estacao",
      total: "$total",
      _id: 0,
    },
  },
  {
    $sort: {
      total: -1,
    },
  },
  {
    $limit: 1,
  },
]);
