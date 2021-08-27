db.trips.aggregate([
  { $group: { _id: { $dayOfWeek: "$startTime" }, flightQty: { $sum: 1 } } },
  { $project: { _id: 0, diaDaSemana: "$_id", total: "$flightQty" } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
