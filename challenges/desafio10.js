db.trips.aggregate([
  { $addFields: { tripDuration: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 3.6e+6] } } },
  { $group: {
    _id: "$usertype",
    duracaoMedia: { $avg: "$tripDuration" },
  } },
  { $project: { tipo: "$_id", duracaoMedia: { $round: ["$duracaoMedia", 2] }, _id: 0 } },
  { $sort: { duracaoMedia: 1 } },
]);

// criei um novo campo que vai guardar o valor do calculo da diferença entre dois campos
// são eles o stopTime e o startTime, no final do calculo eu tenho o tempo de viagem de cada viagem
// após conseguir esse valor, eu utilizo o group para agrupar pelo tipo de usuário e consigo a
// média desse tempo de viagem com o avg.
// após ter a média, eu apenas arredondo com o round, e ordeno em ordem crescente utilizando o sort.
