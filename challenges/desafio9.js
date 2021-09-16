db.trips.aggregate([
  { $match: { birthYear: { $ne: "" } },
  },
  { $group: {
    _id: "vasco",
    maiorAnoNascimento: { $max: { $toInt: "$birthYear" } },
    menorAnoNascimento: { $min: { $toInt: "$birthYear" } },
  } },
  { $project: { _id: 0, maiorAnoNascimento: 1, menorAnoNascimento: 1 } },
]);
