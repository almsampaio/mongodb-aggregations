// Desafio 10
db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 3.6e6] } },
    },
    // O resultado da subtração retorna um valor em milisegundos,
    // logo é necessário dividir o valor por 3.6e6 que é o equivalente a 1 hora
    // e assim conseguir o valor em horas para extrair a média no formato pedido no desafio.
    // lógica da divisão extraída do PR #4 do Murilo Gonçalves
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
    },
  },
  {
    $sort: {
      duracaoMedia: 1,
    },
  },
]);
