const axios = require('axios');

const movieCache = {};

async function handleMovie(req, res) {

  const searchQuery  = req.query;// 
  // console.log("handleMovie call")
  console.log(req.query.query, 'line 9');
  if (movieCache[searchQuery] !== undefined) {
//     console.log(searchQuery.query,"city")
// console.log(movieCache[searchQuery], "query")
    res.status(200).send(movieCache[searchQuery]);
  } else {

    console.log(searchQuery.query,"city")
    //https://api.themoviedb.org/3/search/movie?api_key=30f44418c0a68b803dede650cbc9098e&query=amman
    const cityMovie = await axios.get(`http://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery.query}`);
    console.log(cityMovie.data.results, 'result');
    try {
      const movieArr=cityMovie.data.results.map((item)=>new Movie(item));
      console.log(movieArr)
      res.status(200).send(movieArr);
      // const movieArr = cityMovie.data.results.map(item => {
      //   new Movie(item);
      //   console.log(movieArr, "item")
      //   movieCache[searchQuery] = movieArr;
      //   console.log(movieCache, "cache");
      //   return res.status(200).send(movieArr);


    } catch (error) {
      res.status(400).send(error);
      return;
    }
  }
}

// class to take the data from weather api
class Movie {
  constructor(item) {
    this.title = item.title;
    this.overview = item.overview;
    this.average_votes = item.vote_average;
    this.total_votes = item.vote_count;
    this.image_url = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
    this.popularity = item.popularity;
    this.released_on = item.release_date;

  }
}

module.exports = { handleMovie };
