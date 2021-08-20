db.movies.aggragate(
  [
    {
      $match: {
        awards: { $regex: /^Won \d+ Oscar/ }, // SRC: https://www.regextutorial.org/regex-for-numbers-and-ranges.php
      },
    },
    {
      $group: {
        _id: null,
        maior_rating: { $max: "$imdb.rating" },
        menor_rating: { $min: "$imdb.rating" },
        media_rating: { $avg: "$imdb.rating" },
        desvio_padrao: { $stdDevSamp: "$imdb.rating" }, // Calcula o desvio padrão dos valores.
      },
    },
    {
      $project: {
        _id: 0,
        maior_rating: 1,
        menor_rating: 1,
        media_rating: 1,
        desvio_padrao: 1,
      },
    },
  ],
);
