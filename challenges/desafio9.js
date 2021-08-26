db.trips.aggregate([
  { $match: { birthYear: { $exists: 1, $ne: "" } } },

  { $addFields: { year: { $toInt: "$birthYear" } } },

  {
    $group: {
      _id: 1,
      maiorAnoNascimento: { $max: "$year" },
      menorAnoNascimento: { $min: "$year" } },
  },

  { $project: { _id: 0 } },
]);
