import React, { useEffect, useState } from "react";
import useGenre from "../../hooks/useGenre";
import Genres from "../../components/Genres/Genres";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import axios from "axios";
import axiosRetry from 'axios-retry';

axiosRetry(axios, { retries: 3 }); // Retry the request up to 3 times
const Series = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreforURL = useGenre(selectedGenres);
  
 

  useEffect(()=>{
    window.scroll(0, 0);
    fetchSeries()
  },[page,genreforURL])

  const fetchSeries = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
      );
       setContent(data?.results);
       setNumOfPages(data?.total_pages);
    } catch (error) {
      console.error("Error fetching series:", error);
    }
  };

  return (
    <div>
      <span className="pageTitle">TV Series</span>
      <Genres
        type="tv"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="trending">
        
           {Array.isArray(content) &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="tv"
              vote_average={c.vote_average}
            />
          ))}
          
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Series;
