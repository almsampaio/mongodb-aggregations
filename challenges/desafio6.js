const database = "aggregations";
use(database);
db.movies.find();

db.movies.aggregate([
  {
    $match: {
      awards: { $regex: /won \d oscar/i },
    },
  },
  {
    $group: {
      _id: null,
      maior_rating: { $max: "$imdb.rating" },
      menor_rating: { $min: "$imdb.rating" },
      media_rating: { $avg: "$imdb.rating" },
      desvio_padrão: { $stdDevSamp: "$imdb.rating" },
    },
  },
]);
