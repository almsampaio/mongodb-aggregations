db.movies.aggregate([
  { $addFields: {
    title_split: { $split: ["$title", " "] },
  },
  },
  { $match: {
    title_split: { $size: 1 },
  },
  },
  { $project: { title_split: 1, _id: 0 } },
  { $sort: { title_split: 1 } },
]);

// primeiro eu adiciono um novo campo, e passo como valor desse campo,
// o title transformado em array pelo split
// depois faço o filtro pelo tamanho do array do novo campo, realizo a projeção e por ultimo ordeno.
