const favoriteAct = ["Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney",
];

db.movies.aggregate([
  { $match: {
    $and: [
      { countries: "USA" },
      { "tomatoes.viewer.rating": { $gte: 3 } },
      { cast: { $in: favoriteAct } },
    ],
  },
  },
  { $addFields:
    {
      num_favs: {
        $size: { $setIntersection: [favoriteAct, "$cast"] },
      },
    },
  },
  { $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 } },
  { $project: { title: 1, _id: 0 } },
  { $skip: 24 },
  { $limit: 1 },
]);

// referência para a conclusão do requisito:
// https://docs.mongodb.com/manual/reference/operator/aggregation/setIntersection/

// faço um filtro comparando o countries com "USA",
// o tomatoes.viewer.rating precisa ser maior ou igual a 3
// e o cast precisa conter pelo menos um dos nomes presentes na variável favoriteAct

// adiciono um novo campo com a
// utilização do size para pegar o tamanho do resultado da intersection
// entre os campos favoriteAct e $cast.

// realizo o sort para ordenar de forma decrescente pelo num_favs,
// tomatoes.viewer.rating e pelo title

// projeto apenas o title e retiro o _id

// utilizo o skip para pular os primeiros 24 resultados
// utilizo o limit para retornar apenas um documento
