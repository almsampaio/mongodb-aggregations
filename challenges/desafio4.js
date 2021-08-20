// Desafio 4
db.movies.aggregate([
  {
    $match: {
      $expr: { //$expr para verificar a igualdade do split com o size feita com ajuda do PR do Murilo
        $eq: [{ $size: { $split: ["$title", " "] } }, 1],
      },
    },
  },
  { $sort: { title: 1 } },
  { $project: { _id: 0, title_split: { $split: ["$title", " "] } } },
]);
