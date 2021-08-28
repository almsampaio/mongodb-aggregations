// use("aggregations")
/* db.trips.find({
  bikeid: 17827
}); */

// Fazer os seguintes pontos usando parte da lógica da pipeline anterior:
// $group no Id de todas as bicicletas
// Fazer a média $avg de cada tipo de bicicleta
// $sort na média anterior: -1
// Arredondar a média para cima $ceil

db.trips.aggregate([
  { $addFields: {
    viagemEmMinutos: {
      $divide: [
        { $subtract: ["$stopTime", "$startTime"] },
        60000,
      ],
    },
  } },
  { $group: {
    _id: "$bikeid",
    mediaViagens: {
      $avg: "$viagemEmMinutos",
    },
  } },
  { $sort: {
    mediaViagens: -1,
  } },
  { $limit: 5 },
  { $project: {
    _id: 0,
    bikeId: "$_id",
    duracaoMedia: {
      $ceil: "$mediaViagens",
    },
  } },
]);
