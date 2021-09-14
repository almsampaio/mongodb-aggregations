db.trips.aggregate([
  { $addFields: {
    day: {
      $dayOfWeek: "$startTime",
    },
  } },
  { $group: {
    _id: {
      day: "$day",
      startStationName: "$startStationName" },
    count: { $sum: 1 },
  } },
  { $sort: {
    count: -1,
  } },
  { $limit: 1 },
  { $project: {
    _id: 0,
    nomeEstacao: "$_id.startStationName",
    total: "$count",
  } },
]);
