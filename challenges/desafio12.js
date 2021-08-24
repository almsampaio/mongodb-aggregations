db.trips.aggregate([
  { $addFields: {
    weekDay: { $dayOfWeek: "$startTime" } },
  },
  { $match: { weekDay: 5 } },
  { $group: {
    _id: "$startStationName",
    count: { $sum: 1 },
  } },
  { $sort: { count: -1 } },
  { $limit: 1 },
  { $project: { nomeEstacao: "$_id",
    total: "$count",
    _id: 0 },
  },
]);
