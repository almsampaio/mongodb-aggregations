db.trips.aggregate([
  { $addFields: { diaDaSemana: { $dayOfWeek: "$startTime" } } },
  { $group: { _id: "$diaDaSemana", diaDaSemana: { $max: "$diaDaSemana" }, total: { $sum: 1 } } },
  { $project: { _id: 0, diaDaSemana: 1, total: 1 } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
