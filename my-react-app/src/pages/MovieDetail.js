import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './MovieDetail.css';  // Ensure you create and import the CSS file

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`)
      .then(response => {
        setMovie(response.data);
      });
    
    axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`)
      .then(response => {
        setCast(response.data.cast);
      });
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movie-detail-container">
      <div className="top-box">
        <div className="movie-info">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <div className="movie-details">
            <h2>{movie.title}</h2>
            <p><strong>Rating: </strong>{movie.vote_average.toFixed(1)}</p>
            <p><strong>Release Date: </strong>{movie.release_date}</p>
            <p><strong>Overview: </strong>{movie.overview}</p>
          </div>
        </div>
      </div>
      <h2>Cast</h2>
      <div className="cast-grid">
        {cast.map(member => (
          <div key={member.cast_id} className="cast-card">
            <img src={`https://image.tmdb.org/t/p/w500${member.profile_path}`} className="cast-photo" alt={member.name} />
            <p>{member.name} <br/>Character: {member.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetail;
