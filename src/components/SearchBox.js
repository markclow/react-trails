import React from 'react';
import { Textfield } from 'react-mdl';

class SearchBox extends React.Component {

  render() {
    if (this.props.autoFocus) {
      return (
        <Textfield
          ref="input"
          autoFocus
          onChange={ this.props.searchChangeHandler }
          label={ this.props.label }
          style={{ width: '200px' }}
          value={ this.props.searchText }
          />);

    } else {
      return (
        <Textfield
          ref="input"
          onChange={ this.props.searchChangeHandler }
          label={ this.props.label }
          style={{ width: '200px' }}
          value={ this.props.searchText }
          />);
    }
  }
}

export default SearchBox;
