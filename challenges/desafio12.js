db.trips.aggregate([
  { $addFields: { dayOfWeek: { $dayOfWeek: "$startTime" } } },
  { $match: { dayOfWeek: 5 } },
  { $group: {
    _id: "$startStationName",
    total: { $sum: 1 },
  } },
  { $sort: { total: -1 } },
  { $limit: 1 },
  { $project: {
    _id: false,
    nomeEstacao: "$_id",
    total: "$total",
  } },
]);
