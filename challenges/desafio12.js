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
        nomeEstacao: "$startStationName",
      },
      total: { $sum: 1 },
    },
  },
  {
    $match: {
      "_id.diaDaSemana": 5,
    },
  },
  {
    $sort: {
      total: -1,
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
    $limit: 1,
  },
]);
