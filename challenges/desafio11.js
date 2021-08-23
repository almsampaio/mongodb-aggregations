db.trips.aggregate([
  { $addFields: { dayOfWeek: { $dayOfWeek: "$startTime" } } },
  { $group: { _id: "$dayOfWeek", total: { $sum: 1 } } },
  { $sort: { total: -1 } },
  { $limit: 1 },
  { $project: {
    diaDaSemana: "$_id",
    total: "$total",
    _id: 0,
  } },
]);
