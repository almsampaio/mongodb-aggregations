db.trips.aggregate([
  { $addFields: { weekDay: { $dayOfWeek: "$startTime" } } },
  { $group: { _id: { station: "$startStationName", day: "$weekDay" }, total: { $sum: 1 } } },
  { $project: { nomeEstacao: "$_id.station", total: "$total", _id: 0 } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
