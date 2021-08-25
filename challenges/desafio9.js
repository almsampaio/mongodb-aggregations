db.trips.aggregate([{
  $match: {
    $and: [
      { birthYear: { $exists: true } },
      { birthYear: { $ne: "" } },
    ] } },
{ $project: { birthYear: { $toInt: "$birthYear" } } },
{ $group: {
  _id: null,
  maiorAnoNascimento: { $max: "$birthYear" },
  menorAnoNascimento: { $min: "$birthYear" } } },
{ $project: { maiorAnoNascimento: 1, menorAnoNascimento: 1, _id: 0 } }]);
