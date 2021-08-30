// challenge 9;

db.trips.aggregate(
  [
    { $match: { birthYear: { $ne: "" } } },
    { $group: { maiorAnoNascimento: { $max: { $toInt: "$birthYear" } }, _id: null, menorAnoNascimento: { $min: { $toInt: "$birthYear" } } } },
    { $project: { _id: 0, maiorAnoNascimento: 1, menorAnoNascimento: 1 } },
  ],
);
