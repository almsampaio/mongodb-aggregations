db.trips.aggregate([
  { $match: {
    $expr: {
      $eq: [
        { $dayOfWeek: "$startTime" },
        5,
      ],
    },
  } },
  { $group: {
    _id: "$startStationName",
    contador: { $sum: 1 },
  } },
  { $sort: {
    contador: -1,
  } },
  { $limit: 1 },
  { $project: {
    nomeEstacao: "$_id",
    total: "$contador",
    _id: 0,
  } },
]);
