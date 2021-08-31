// challenge 11;
// https://github.com/tryber/sd-010-a-mongodb-aggregations/commit/6c260a6043c2df9e1f1427f8abbaab15ac2e4b55

db.trips.aggregate(
  [
    { $group: { _id: { $dayOfWeek: "$startTime" }, total: { $sum: 1 } } },
    { $project: { _id: 0, diaDaSemana: "$_id", total: "$total" } },
    { $sort: { total: -1 } }, { $limit: 1 },
  ],
);
