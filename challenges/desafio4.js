db.movies.aggregate([
  {
    $addFields: {
      title_split: { $split: ["$title", " "] },
      // separa os nomes em um array
    },
  },
  {
    $match: {
      title_split: { $size: 1 },
      // pego somente o array de nomes que tem apenas um indice,
      // indicando assim que tem somente um nome
    },
  },
  {
    $project: {
      title_split: 1,
      _id: 0,
    },
  },
  {
    $sort: {
      title_split: 1,
    },
  },
]);

// https://docs.mongodb.com/manual/reference/operator/aggregation/split/
