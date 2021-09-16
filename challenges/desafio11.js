db.trips.aggregate([
  { $group: {
    _id: { $dayOfWeek: "$startTime" },
    totalSum: { $sum: 1 },
  } },
  { $project: {
    _id: 0,
    diaDaSemana: "$_id",
    total: "$totalSum",
  } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
