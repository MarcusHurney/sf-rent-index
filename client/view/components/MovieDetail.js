import React, { Component } from 'react';
import { GridLoader } from 'halogen';
import API_CONFIG from '../../config/api-config.js';

const { IMAGE_PATH } = API_CONFIG;

class MovieDetail extends Component {
  renderContent = () => {
    if (!this.props.data.loading) {
      const {
        poster_path,
        title,
        overview,
        release_date,
        original_language,
        vote_count,
        vote_average,
        status,
        revenue,
        budget,
        tagline
      } = this.props.data.findMovie;

      return (
        <div className="content-container">
          <div className="movie-content">
            <div className="poster-container">
              { poster_path ?
                <img src={`${IMAGE_PATH}${poster_path}`} /> :
                <div className="poster-filler">
                  <p>Poster N/A</p>
                </div>
              }
            </div>

            <div className="description-container">
              <div className="description-header">
                <h1>{title}</h1>
                <p>{overview}</p>
              </div>

              <div className="description-body">
                <div>
                  <p><span>Release Date: </span>{release_date}</p>
                  <p><span>Original Language: </span>{original_language}</p>
                  <p><span>Status: </span>{status}</p>
                  <p><span>Tagline: </span>"{tagline}"</p>
                </div>

                <div>
                  <p><span>Total Votes: </span>{vote_count}</p>
                  <p><span>Vote Average: </span>{vote_average}</p>
                  <p><span>Budget: </span>${budget}</p>
                  <p><span>Revenue: </span>${revenue}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <div className="gridloader"><GridLoader color={'#D8D8D8'}/></div>;
  }

  render() {
    return (
      <div className="movie-detail-root">
        {this.renderContent()}
      </div>
    );
  }
}

export default MovieDetail;
