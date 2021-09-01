// challenge 12;
// https://github.com/tryber/sd-010-a-mongodb-aggregations/pull/105/commits/d77ccda73345c406d6d59fa755c396087c41baad

db.trips.aggregate(
  [
    { $addFields: { diaDaSemana: { $dayOfWeek: "$startTime" } } },
    { $match: { diaDaSemana: 5 } },
    { $group: { _id: "$startStationName", total: { $sum: 1 } } },
    { $project: { nomeEstacao: "$_id", total: "$total", _id: 0 } },
    { $sort: { total: -1 } },
    { $limit: 1 },
  ],
);
