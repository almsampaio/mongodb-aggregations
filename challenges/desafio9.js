db.trips.aggregate([
  { $match: { birthYear: { $ne: "" } } },
  { $group: { _id: null, max: { $max: { $toInt: "$birthYear" } }, min: { $min: { $toInt: "$birthYear" } } } },
  { $project: { maiorAnoNascimento: "$max", menorAnoNascimento: "$min", _id: 0 } },
]);
