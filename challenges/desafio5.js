// use("aggregations")

// Fazer um match dos seguintes pontos:
// 1. countries: "USA"
// 2. tomatoes.viewer.rating -> $gte: 3
// 3. Depois criar um campo $addFields: num_favs
// 4. esse campo conta quantos atores/atrizes favoritas tem no cast
// 5. fazer um $sort de num_favs, tomatoes.viewer.rating, title (todos -1)
// 6. pegar o 25º filme
// Obs: para contar devo armazenar todos os nomes que sejam iguais aos favoritos
// em um novo array usando $setIntersection

// método $setIntersection encontrado no link
// https://docs.mongodb.com/manual/reference/operator/aggregation/setIntersection/

// Ajuda de Heloísa Hackenhaar no uso do $skip

db.movies.aggregate([
  { $match: {
    countries: "USA",
    "tomatoes.viewer.rating": {
      $gte: 3,
    },
  } },
  { $addFields: {
    arrayFavoritos: {
      $setIntersection: [
        "$cast",
        ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"],
      ],
    },
  } },
  { $match: {
    arrayFavoritos: { $not: { $eq: null } },
  } },
  { $addFields: {
    num_favs: { $size: "$arrayFavoritos" },
  } },
  { $sort: {
    num_favs: -1,
    "tomatoes.viewer.rating": -1,
    title: -1,
  } },
  { $skip: 24 },
  { $limit: 1 },
  { $project: {
    _id: 0,
    title: 1,
  } },
]);
