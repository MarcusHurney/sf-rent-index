import React from 'react';
import API_CONFIG from '../../config/api-config.js';
const { IMAGE_PATH } = API_CONFIG;

const MoviePreviewCard = ({ movie: { title, vote_count, poster_path } }) => (
  <div className="movie-card">
    <p>{title}</p>
    <p>{vote_count}</p>
    <img src={`${IMAGE_PATH}${poster_path}`}></img>
  </div>
);

export default MoviePreviewCard;
