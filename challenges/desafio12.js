db.trips.aggregate([
  { $addFields: { dayAtWeek: { $dayOfWeek: "$startTime" } } },
  { $match: { dayAtWeek: 5 } },
  {
    $group: {
      _id: "$startStationName",
      totalOfStartStationName: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id",
      total: "$totalOfStartStationName",
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
