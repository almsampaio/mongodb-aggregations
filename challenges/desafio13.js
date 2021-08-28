// use("aggregations")

// Fazer os seguintes pontos:
// 1. Fazer um $match das viagens que iniciaram em "10/03/2016"
// 2. Criar um campo $addFields que converte o valor das viagens para minutos
// 3. Agrupar todos e verificar a média das viagens $avg: campo anterior
// 4. arredondar o resultado para cima com $ceil

// método $dateToString para pegar apenas a data encontrado no link:
// https://docs.mongodb.com/v4.2/reference/operator/aggregation/dateToString/

db.trips.aggregate([
  { $addFields: {
    dataEmString: {
      $dateToString: {
        format: "%Y-%m-%d",
        date: "$startTime",
      },
    },
  } },
  { $match: {
    dataEmString: "2016-03-10",
  } },
  { $addFields: {
    viagemEmMinutos: {
      $divide: [
        { $subtract: ["$stopTime", "$startTime"] },
        60000,
      ],
    },
  } },
  { $group: {
    _id: null,
    mediaViagens: {
      $avg: "$viagemEmMinutos",
    },
  } },
  { $project: {
    _id: 0,
    duracaoMediaEmMinutos: {
      $ceil: "$mediaViagens",
    },
  } },
]);
