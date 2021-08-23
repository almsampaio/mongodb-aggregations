db.trips.aggregate([
  { $addFields: {
    diaDaSemana: { $dayOfWeek: "$startTime" },
  } },
  { $group: {
    _id: "$diaDaSemana",
    total: { $sum: 1 },
  } },
  { $project: {
    diaDaSemana: "$_id",
    _id: 0,
    total: "$total",
  } },
  { $sort: {
    total: -1,
  } },
  { $limit: 1 },
]);

// Source:
// https://docs.mongodb.com/manual/reference/operator/aggregation/dayOfWeek/
