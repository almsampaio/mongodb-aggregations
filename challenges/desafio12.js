// Desafio 12
// Usando a pipeline anterior que retorna o dia com mais viagens, determine
// qual estação tem o maior número de viagens nesse dia da semana.
// Exiba apenas o nome da estação e o total de viagens.
// Dica: Utilize o operador $dayOfWeek para extrair o dia da semana como um
// número de uma data.

// O resultado da sua query deve ter exatamente o seguinte formato
// (incluindo a ordem dos campos):

// { "nomeEstacao" : <nome_da_estacao>, "total" : <total_de_viagens> }
db.trips.aggregate([
  {
    $addFields: {
      dayOfWeek: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $match: {
      dayOfWeek: 5,
    },
  },
  {
    $group: {
      _id: "$startStationName",
      totalTrips: { $sum: 1 },
    },
  },
  {
    $sort: {
      totalTrips: -1,
    },
  },
  {
    $limit: 1,
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id",
      total: "$totalTrips",
    },
  },
]);
