import React from 'react';
import TrailApiHelper from '../util/TrailApiHelper';
import SearchBox from './SearchBox';
import SearchResults from './SearchResults';
import { Button, Grid, Cell, ProgressBar, Snackbar } from 'react-mdl';

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchActivity: '',
      searchCity: '',
      searchResults: [],
      busy: false,
      error: ''
    };
    this.activityChangeHandler = this.activityChangeHandler.bind(this);
    this.cityChangeHandler = this.cityChangeHandler.bind(this);
    this.searchClickHandler = this.searchClickHandler.bind(this);
    this.updateSearchResults = this.updateSearchResults.bind(this);
    this.handleClickActionSnackbar = this.handleClickActionSnackbar.bind(this);
    this.handleTimeoutSnackbar = this.handleTimeoutSnackbar.bind(this);
    this.getProgressBar = this.getProgressBar.bind(this);
    this.getSnackBar = this.getSnackBar.bind(this);
  }

  activityChangeHandler(event) {
    const searchText = event.target.value;
    this.setState({ searchActivity: searchText });
  }

  cityChangeHandler(event) {
    const searchText = event.target.value;
    this.setState({ searchCity: searchText });
  }

  searchClickHandler() {
    this.setState({ busy: true });

    TrailApiHelper.searchByActivityAndCity(this.state.searchActivity, this.state.searchCity)
      .done((data, textStatus, jqXHR) => {
        this.setState({ busy: false });
        this.updateSearchResults(data.places);
      })
      .fail((jqXHR, textStatus, errorThrown) => {
        this.setState({ busy: false, error: 'An unexpected error occurred: (' + jqXHR.status + ' ' + errorThrown + ').' });
      });
  }

  updateSearchResults(places) {

    // Sort the list of places by name.
    var sortedPlaces = [];
    if (places) {
      sortedPlaces =
        places.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
    }

    // Set search results.
    this.setState({ searchResults: sortedPlaces });
  }

  handleClickActionSnackbar() {
    this.setState({ error: '' });
  }

  handleTimeoutSnackbar() {
    this.setState({ error: '' });
  }

  render() {
    return (
      <div className="centered">
        <h2>Search</h2>
        <SearchBox autoFocus="true" ref="activity" label="Activity eg hiking" busy={this.state.busy} searchText={this.state.searchActivity} searchChangeHandler={this.activityChangeHandler}/>
        &nbsp;
        <SearchBox label="City eg Atlanta" busy={this.state.busy} searchText={this.state.searchCity} searchChangeHandler={this.cityChangeHandler}/>
        &nbsp;
        <Button raised ripple disabled={this.state.busy} onClick={this.searchClickHandler}>Search</Button>
        {this.getProgressBar()}
        {this.getSnackBar()}
        <SearchResults searchResults={this.state.searchResults}/>
      </div>);
  };

  getProgressBar() {
    let progressBarStyle = {
      display: this.state.busy ? '' : 'none',
      marginTop: 10
    }
    return (<div style={progressBarStyle}>
      <ProgressBar indeterminate />
    </div>);
  }

  getSnackBar() {
    const isActive = (this.state.error != '');
    return (<Snackbar
      active={isActive}
      onClick={this.handleClickActionSnackbar}
      onTimeout={this.handleTimeoutSnackbar}
      action="Undo">{this.state.error}</Snackbar>
    );
  }

}
export default Search;