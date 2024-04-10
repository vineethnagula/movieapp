import { useEffect, useState } from "react";
import "./App.css";
import Banner from "./components/Banner";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import Watchlist from "./components/Watchlist";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

    let [watchlist , setWatchList] =useState([])


    let handleAddtoWatchlist =(movieObj)=>{
      let newWatchList = [...watchlist , movieObj]
      localStorage.setItem('moviesApp' , JSON.stringify(newWatchList))
      setWatchList(newWatchList)
      console.log(newWatchList)
    }

      let handleRemoveFromWatchlist = (movieObj)=>{
        let filteredWatchlist =watchlist.filter((movie)=>{
        return movie.id != movieObj.id
      })
        localStorage.setItem('moviesApp' , JSON.stringify(filteredWatchlist))

      setWatchList(filteredWatchlist)
      console.log(filteredWatchlist)
    }

    useEffect(()=>{
      let moviesFromLocalStorage = localStorage.getItem('moviesApp')
      if(!moviesFromLocalStorage) {
        return
      }

      setWatchList(JSON.parse(moviesFromLocalStorage))

    }, [])



  return ( 
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <>
                
                <Banner /> <Movies watchlist={watchlist} handleAddtoWatchList={handleAddtoWatchlist} handleRemoveFromWatchlist={handleRemoveFromWatchlist}/>
              </>
            }
          />
          <Route path="/watchlist" element={<Watchlist watchlist={watchlist} setWatchList={setWatchList} handleRemoveFromWatchlist={handleRemoveFromWatchlist}/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
