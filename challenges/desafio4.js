// Desafio 4
use("aggregations");
db.movies.aggregate([
  {
    $project: { _id: 0, title_split: { $split: ["title", " "] } },
  },
  {
    $match: { title_split: { $size: 1 } }, /* verifica e delimita tamanho do array */
  },
  {
    $sort: { title_split: 1 },
  },
]);
