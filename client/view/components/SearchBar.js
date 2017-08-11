import React, { Component } from 'react';

class SearchBar extends Component {
  state = {
    userInput: ''
  }

  onInputChange = userInput => {
    this.setState({ userInput });
    this.props.searchMovies(userInput);
  }

  render() {
    return (
      <div className='header-container'>
       <div className='header'>
         <div className="title-container">
           <h3>{this.props.title}</h3>
         </div>

         <div className="searchbar-container">
           <div className="search">
             <input
               type="search"
               placeholder="search for movies by title"
               value={this.state.userInput}
               onChange={event => this.onInputChange(event.target.value)} />
           </div>
         </div>
       </div>
      </div>
    );
  }
}

export default SearchBar;
