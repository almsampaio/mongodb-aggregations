db.trips.aggregate([
  {
    $set: {
      days: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $match: {
      days: { $eq: 5 },
    },
  },
  {
    $group: {
      _id: "$startStationName",
      sum: { $sum: 1 },
    },
  },
  { $sort: { sum: -1 } },
  { $limit: 1 },
  {
    $project: {
      nomeEstacao: "$_id",
      total: "$sum",
      _id: 0,
    },
  },
]);
