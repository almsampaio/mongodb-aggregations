db.trips.aggregate([
  { $match: {
    $and: [{ birthYear: { $exists: true } }, { birthYear: { $not: { $eq: "" } } }],
  } },
  { $addFields: { year: { $toInt: "$birthYear" } } },
  { $group: {
    _id: null,
    maiorAnoNascimento: { $max: "$year" },
    menorAnoNascimento: { $min: "$year" } } },
  { $project: { maiorAnoNascimento: 1, menorAnoNascimento: 1, _id: 0 } },
]);
