db.trips.aggregate([
  { $addFields: {
    diaDaSemana: { $dayOfWeek: "$startTime" },
  } },
  { $group: {
    _id: "$diaDaSemana",
    total: { $sum: 1 },
  } },
  { $sort: {
    total: -1,
  } },
  { $project: {
    diaDaSemana: "$_id",
    total: 1,
    _id: 0,
  } },
  { $limit: 1 },
]);

// Source:
// https://docs.mongodb.com/manual/reference/operator/aggregation/dayOfWeek/
