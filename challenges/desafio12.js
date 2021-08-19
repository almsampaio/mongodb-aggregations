db.trips.aggregate([
  { $group: { _id: { day: { $dayOfWeek: "$startTime" }, station: "$startStationName" }, count: { $sum: 1 } } },
  { $project: { nomeEstacao: "$_id.station", total: "$count", _id: 0 } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
