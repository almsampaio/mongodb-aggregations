db.trips.aggregate([
  { $match: { birthYear: { $nin: "" } } },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: "$birthYear" },
      menorAnoNascimento: { $min: "$birthYear" },
    },
  },
  { $project: { _id: 0 } },
]);
