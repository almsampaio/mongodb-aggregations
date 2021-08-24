db.trips.aggregate([
  { $project: { diaDaSemana: { $dayOfWeek: "$startTime" }, _id: false } },
  { $group: {
    _id: "$diaDaSemana",
    total: { $sum: 1 },
  } },
  { $project: { diaDaSemana: "$_id", total: "$total", _id: false } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
