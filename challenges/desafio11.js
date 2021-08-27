db.trips.aggregate([
  { $addFields: { day: { $dayOfWeek: "$startTime" } } },

  { $group: { _id: "$day", total: { $sum: 1 } } },

  { $sort: { total: -1 } },

  { $project: { diaDaSemana: "$_id", total: "$total", _id: 0 } },

  { $limit: 1 },
]);
