import React from 'react';
import API_CONFIG from '../../config/api-config.js';
const { IMAGE_PATH } = API_CONFIG;

const MoviePreviewCard = ({ movie: { title, poster_path } }) => (
  <div className="movie-card">
    { poster_path ?
      <img src={`${IMAGE_PATH}${poster_path}`} /> :
      <div className="no-poster">
        <p>{title}</p>
      </div>
    }

    <div className="movie-preview-info">
      <p>{title}</p>
    </div>
  </div>
);

export default MoviePreviewCard;
