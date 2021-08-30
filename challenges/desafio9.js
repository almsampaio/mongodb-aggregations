db.trips.aggregate([
  { $match: { birthYear: { $exists: 1, $ne: "" } } },
  { $group: {
    _id: null,
    maiorAnoNascimento: { $max: { $toInt: "$birthYear" } },
    menorAnoNascimento: { $min: { $toInt: "$birthYear" } },
  } },
  { $project: { maiorAnoNascimento: 1, menorAnoNascimento: 1, _id: 0 } },
]);
