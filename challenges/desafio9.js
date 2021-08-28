db.trips.aggregate([
  { $match: { birthYear: { $gt: 0 } } },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: "$birthYear" },
      menorAnoNascimento: { $min: "$birthYear" },
    },
  },
  { $project: { _id: 0 } },
]);
