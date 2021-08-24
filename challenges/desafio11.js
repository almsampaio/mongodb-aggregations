db.trips.aggregate([
  { $project: {
    diaDaSemana: { $dayOfWeek: "$startTime" },
    _id: 0,
  } },
  { $group: {
    _id: "$diaDaSemana",
    total: { $sum: 1 },
  } },
  { $project: {
    diaDaSemana: "$_id",
    _id: 0,
    total: "$total",
  } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
