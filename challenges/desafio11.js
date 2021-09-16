db.trips.aggregate([
  { $project: { dayOfWeek: { $dayOfWeek: "$startTime" } } },
  { $group: {
    _id: "$dayOfWeek",
    total: { $sum: 1 },
  } },
  { $sort: { total: -1 } },
  { $limit: 1 },
  { $project: {
    _id: false,
    diaDaSemana: "$_id",
    total: "$total",
  } },
]);
