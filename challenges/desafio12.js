db.trips.aggregate([
  { $group: {
    _id: { diaDaSemana: { $dayOfWeek: "$startTime" }, nomeDaEstacao: "$startStationName" },
    total: { $sum: 1 },
  } },
  { $sort: { total: -1 } },
  { $limit: 1 },
  { $project: { _id: 0, nomeEstacao: "$_id.nomeDaEstacao", total: "$total" } },
]);

/* A parte sobre colocar mais um valor no _id eu acabei entendendo ao olhar o código do Mateus Alencar, pois dessa maneira eu pude utilizar minha pipeline anteriror de uma maneira dinâmica. Link: https://github.com/tryber/sd-010-a-mongodb-aggregations/pull/80/commits/ec4b5d0b3c9d8435d9622ccf4ccf82e8aaaf29df
 */
