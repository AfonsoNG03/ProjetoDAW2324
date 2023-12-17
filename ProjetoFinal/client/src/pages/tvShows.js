import { useState, useEffect } from "react";
import TvShowCard from "../components/TvShowCard";

const API_BASE = "http://localhost:8080";

function TvShows() {
    const [tvShows, setTvShows] = useState([]);

    useEffect(() => {
        getTvShows();
    }, []);

    const getTvShows = async () => {
        try {
            const response = await fetch(API_BASE + "/tvShows");
            const data = await response.json();
            setTvShows(data);
            console.log(data);
        }
        catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          {tvShows.map((tvShow) => (
            <div className="col-sm-3" key={tvShow._id}>
              <TvShowCard tvShow={tvShow} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TvShows;