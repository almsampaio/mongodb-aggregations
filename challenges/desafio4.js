db.movies.aggregate([
  {
    $project: {
      title_split: { $split: ["$title", " "] },
      _id: 0,
    },
    // Eu do futuro, o split está tirando todos os espaços (delimitador)
    // dos títulos dos filmes, no project já está também eliminando o id
    // depois só pegar no match o título que contem apenas 1 array pois ele
    // será o título de única palavra pedido no desafio.
  },
  {
    $match: { title_split: { $size: 1 } },
  },
  {
    $sort: { title_split: 1 },
  },
  {
    $limit: 8068,
  },
]);
