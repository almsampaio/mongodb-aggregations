db.trips.aggregate([{ $addFields: { diaDaSemana: { $dayOfWeek: "$startTime" } } },
  { $group: { _id: {
    diaDaSemana: "$diaDaSemana",
    station: "$startStationName",
  },
  total: { $sum: 1 } } },
  { $sort: { total: -1 } },
  { $limit: 1 },
  { $project:
    {
      _id: 0,
      nomeEstacao: "$_id.station",
      total: "$total",
    } }]);
