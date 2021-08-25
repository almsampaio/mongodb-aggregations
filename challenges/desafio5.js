db.movies.aggregate([{ $match: {
  countries: { $in: ["USA"] },
  "tomatoes.viewer.rating": { $gte: 3 },
  cast: { $in: ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"] },
} }, { $project: {
  _id: 0,
  title: 1,
  tomatoesRating: "$tomatoes.viewer.rating",
  num_favs:
  { $setIntersection: ["$cast", ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"],
  ] },
} }, { $project: { title: 1, tomatoesRating: 1, num_favs: { $size: "$num_favs" } } },
{ $sort: { num_favs: -1, tomatoesRating: -1, title: -1 } },
{ $skip: 24 }, // pula os 24 primeiros resultados pos-agregacao
{ $limit: 1 }, // exibe apenas 1 resultado na tela
{ $project: { title: 1 } }]);
