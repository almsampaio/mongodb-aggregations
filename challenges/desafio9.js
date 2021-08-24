db.trips.aggregate([
  { $match: {
    birthYear: {
      $exists: 1,
      $ne: "",
    },
  } },
  { $project: {
    birthYear: { $toInt: "$birthYear" },
  } },
  { $group: {
    _id: null,
    maiorAnoNascimento: { $max: "$birthYear" },
    menorAnoNascimento: { $min: "$birthYear" },
  } },
  { $project: { _id: 0 } },
]);
