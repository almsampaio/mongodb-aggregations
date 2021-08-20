db.trips.aggregate([
  {
    $group: {
      _id: {
        diaSemana: { $dayOfWeek: "$startTime" },
        nomeEstacao: "$startStationName",
      },
      total: { $sum: 1 },
    },
  },
  {
    $match: {
      "_id.diaSemana": 5,
    },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.nomeEstacao",
      total: "$total",
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
