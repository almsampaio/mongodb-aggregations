// use("aggregations")
// db.trips.find()

// Fazer os seguintes pontos:
// 1. Adicionar um novo campo $addFields que vai exibir o horário de uso
// 2. Fazer um $group do usetype e da média do novo campo
// 3. Fazer um $project do $round da média de horário com duas casas decimais
// 4. Fazer um $sort das médias

db.trips.aggregate([
  { $addFields: {
    horas: {
      $divide: [
        { $subtract: [
          "$stopTime",
          "$startTime",
        ] },
        3600000,
      ],
    },
  } },
  { $group: {
    _id: "$usertype",
    mediaHoras: {
      $avg: "$horas",
    },
  } },
  { $project: {
    _id: 0,
    tipo: "$_id",
    duracaoMedia: {
      $round: ["$mediaHoras", 2],
    },
  } },
  { $sort: {
    duracaoMedia: 1,
  } },
]);
