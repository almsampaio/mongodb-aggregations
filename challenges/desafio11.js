db.trips.aggregate([
  { $group: { _id: { $dayOfWeek: "$startTime" }, count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $project: { diaDaSemana: "$_id", total: "$count", _id: 0 } },
  { $limit: 1 },
]);
