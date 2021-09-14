db.trips.aggregate([
  { $addFields: {
    day: {
      $dayOfWeek: "$startTime",
    },
  } },
  { $group: {
    _id: "$day",
    count: { $sum: 1 },
  } },
  { $sort: {
    count: -1,
  } },
  { $limit: 1 },
  { $project: {
    _id: 0,
    diaDaSemana: "$_id",
    total: "$count",
  } },
]);
