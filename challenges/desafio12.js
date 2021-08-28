// Usando a pipeline anterior que retorna o dia com mais viagens,
// determine qual estação tem o maior número de viagens nesse dia
// da semana.
use("aggregtions");
db.trips.aggregate([
  {
    $group: {
      _id: {
        diaDeSemana: {
          $dayOfWeek: "$startTime",
        },
        estacao: "$startStationName",
      },
      total: { $sum: 1 },
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
  { $project: { _id: 0, nomeEstacao: "$_id.estacao", total: "$total" } },
]);
// para conseguir essa solução consultei o código do Mateus Alencar
// https://github.com/tryber/sd-010-a-mongodb-aggregations/pull/80
