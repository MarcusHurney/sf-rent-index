import React from 'react';

const MoviePreviewCard = ({ movie: { title, vote_count } }) => (
  <div className="photo-grid-item">
    <p>{title}</p>
    <p>{vote_count}</p>
  </div>
);

export default MoviePreviewCard;
