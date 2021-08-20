db.trips.aggregate([
  { $match: { birthYear:
    { $exists: true, $ne: "" },
  } },

  { $group: {
    _id: 0,
    maiorAnoNascimento: {
      $max: { $toInt: "$birthYear" } },
    menorAnoNascimento: {
      $min: { $toInt: "$birthYear" } },
  } },

  { $project: { _id: 0 } },
]);
