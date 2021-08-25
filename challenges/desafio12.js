const collection = db.trips;

collection.aggregate([
  {
    $group: {
      // A PR do Iago me ajudou a fazer esse requisito
      // https://github.com/tryber/sd-010-a-mongodb-aggregations/blob/iagopferreira-mongodb-aggregations/challenges/desafio12.js
      _id: {
        day: { $dayOfWeek: "$startTime" },
        name: "$startStationName",
      },
      total: { $sum: 1 },
    },
  },
  { $project: { _id: 0, nomeEstacao: "$_id.name", total: "$total" } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
