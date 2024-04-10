import React from "react";
import MovieCard from "./MovieCard";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Pagination from "./Pagination";

function Movies({handleAddtoWatchList , handleRemoveFromWatchlist , watchlist}) {

    const [movies, setMovies] = useState([])
    const [pageNo, setPageNo] = useState(1)

    const handlePrev = ()=>{
        if(pageNo==1){
            setPageNo(1)
        }
        else{
            setPageNo(pageNo-1)
        }
    }

    const handleNext =()=>{
        setPageNo(pageNo+1)
    }




    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=b14541db4927455a7d97e16c590d2301&language=en-US&page=${pageNo}
        `).then(function(res){
            console.log(res.data.results)
            setMovies(res.data.results)

        })
    }, [pageNo])


  return (
    <div className="p-5">
      <div className="text-2xl m-5 font-bold text-center">Trending Movies</div>
      <div className="flex flex-row flex-wrap justify-around gap-4">
        {movies.map((movieObj)=>{
            return <MovieCard key={movieObj.id} movieObj={movieObj} poster_path={movieObj.poster_path} name={movieObj.original_title} handleAddtoWatchList={handleAddtoWatchList} handleRemoveFromWatchlist={handleRemoveFromWatchlist} watchlist={watchlist}/>
        })}

      </div>
      <Pagination pageNo={pageNo} handlePrev={handlePrev} handleNext={handleNext}/>
    </div>
  );
}

export default Movies;

// https://api.themoviedb.org/3/movie/popular?api_key=b14541db4927455a7d97e16c590d2301&language=en-US&page=2
