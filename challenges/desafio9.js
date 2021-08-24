db.trips.aggregate([{
  $match: {
    $and: [
      { birthYear: { $not: { $eq: "" } } },
      { birthYear: { $exists: true } },
    ],
  },
},
{ $group: {
  _id: null,
  maiorAnoNascimento: { $max: { $toInt: "$birthYear" } },
  menorAnoNascimento: { $min: { $toInt: "$birthYear" } },
} },
{ $project: { maiorAnoNascimento: true, menorAnoNascimento: true, _id: false } },
]);
