// use("aggregations")
// db.movies.find({ languages: { $exists: true } }).limit(5);

// a pipeline deve ter:
// 1. imdb.rating -> $gte: 7
// 2. genres -> $nin: ["Crime", "Horror"]
// 3. rated -> $in: ["PG", "G"],
// 4. languages -> $all: ["English", "Spanish"]
db.movies.aggregate([
  { $match: {
    "imdb.rating": { $gte: 7 },
    genres: { $nin: ["Crime", "Horror"] },
    rated: { $in: ["PG", "G"] },
    languages: { $all: ["English", "Spanish"] },
  } },
]);
// .itcount()
