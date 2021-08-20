db.trips.aggregate([
  { $addFields: {
    dia: { $dayOfWeek: "$startTime" },
  } },
  { $group: {
    _id: "$dia",
    total: { $sum: 1 },
  } },
  { $sort: { total: -1 } },
  { $limit: 1 },
  { $project: {
    diaDaSemana: "$_id",
    _id: 0,
    total: "$total",
  } },
]);
