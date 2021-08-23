db.trips.aggregate([
  { $match: { birthYear: {
    $exists: true,
    $ne: "",
  } } },
  { $group: {
    maiorAnoNascimento: { $max: { $toInt: "$birthYear" } },
    menorAnoNascimento: { $min: { $toInt: "$birthYear" } },
    _id: null,
  } },
  { $project: { _id: 0 } },
]);
