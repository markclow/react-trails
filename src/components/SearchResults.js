import React from 'react';
import { List, ListItem, ListItemContent, ListItemAction, Icon } from 'react-mdl';
import { Link } from 'react-router';

class SearchResults extends React.Component {

  render() {
    if (this.props.searchResults.length == 0) {
      return null;
    }
    const searchResultList = this.props.searchResults.map(function (value, index) {
      let linkTo = `/details/${value.lat}/${value.lon}`;
      return <ListItem key={value.unique_id}>
        <ListItemContent avatar="person">{value.name} {value.state} {value.country}</ListItemContent>
        <ListItemAction>
          <Link to={linkTo}>Details</Link>
        </ListItemAction>
      </ListItem>;
    });
    return (
      <div>
        <h2>Results</h2>
        <List>
          {searchResultList}
        </List>
      </div>);
  }
}

export default SearchResults;