db.trips.aggregate([
  { $addFields: { day: { $dayOfWeek: "$startTime" } } },
  { $group: { _id: "$day", total: { $sum: 1 } } },
  { $project: { diaDaSemana: "$_id", total: "$total", _id: 0 } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
