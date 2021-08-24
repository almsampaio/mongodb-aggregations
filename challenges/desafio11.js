db.trips.aggregate([
  { $group: {
    _id: { $dayOfWeek: "$startTime" },
    contador: { $sum: 1 },
  } },
  { $sort: {
    contador: -1,
  } },
  { $limit: 1 },
  { $project: {
    diaDaSemana: "$_id",
    total: "$contador",
    _id: 0,
  } },
]);
