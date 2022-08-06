const axios = require('axios');

async function handleMovie(req,res){
  const {searchQuery}=req.query;
  console.log(searchQuery);

  //https://api.themoviedb.org/3/search/movie?api_key=30f44418c0a68b803dede650cbc9098e&query=amman
  const movieURL=`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;
  const cityMovie= await axios.get(movieURL);
  console.log(cityMovie)
  try {
    const movieArr = cityMovie.data.results.map(item => new Movie(item));
    //console.log(movieArr)
    res.status(200).send(movieArr);

  } catch (err) {
    res.status(400).send(error);
  }
}

// class to take the data from weather api
class Movie {
  constructor(item) {
    this.title = item.title;
    this.overview = item.overview;
    this.average_votes=item.vote_average;
    this.total_votes=item.vote_count;
    this.image_url = item.poster_path;
    this.popularity = item.popularity;
    this.released_on = item.release_date;

  }
}

module.exports={handleMovie};
