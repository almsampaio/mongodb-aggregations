db.trips.aggregate(
  [
    { $match: {
      $and: [
        { birthYear: { $exists: true } },
        { birthYear: { $ne: "" } },
      ],
    } },
    { $addFields: {
      intBirthYear: { $toInt: "$birthYear" },
    } },
    { $group: {
      _id: null,
      maiorAnoNascimento: { $max: "$intBirthYear" },
      menorAnoNascimento: { $min: "$intBirthYear" },
    } },
    { $project: {
      _id: 0,
      maiorAnoNascimento: 1,
      menorAnoNascimento: 1,
    } },
  ],
);
