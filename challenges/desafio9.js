db.trips.aggregate([
  { $match: { birthYear: {
    $exists: true,
    $ne: "",
  } } },
  { $project: { birthYear: { $toInt: "$birthYear" }, _id: 0 } },
  { $group: {
    _id: null,
    maiorAnoNascimento: { $max: "$birthYear" },
    menorAnoNascimento: { $min: "$birthYear" },
  } },
  { $project: { _id: 0 } },
]);
