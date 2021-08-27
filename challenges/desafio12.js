db.trips.aggregate([
  { $addFields: { weekDay: { $dayOfWeek: "$startTime" } } },
  { $group: {
    _id: { day: "$weekDay", stationName: "$startStationName" },
    flightQty: { $sum: 1 },
  } },
  { $project: { _id: 0, nomeEstacao: "$_id.stationName", total: "$flightQty" } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
