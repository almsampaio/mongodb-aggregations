db.trips.aggregate([
  { $addFields: {
    weekDay: { $dayOfWeek: "$startTime" },
  } },
  { $match: { weekDay: { $eq: 5 } } },
  { $group: {
    _id: "$startStationName",
    totalSum: { $sum: 1 },
  } },
  { $project: {
    _id: 0,
    nomeEstacao: "$_id",
    total: "$totalSum",
  } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
