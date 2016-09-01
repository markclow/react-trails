import React from 'react';
import TrailApiHelper from '../util/TrailApiHelper';
import { Tabs, Tab, ProgressBar, Snackbar, List, ListItem, ListItemContent, ListItemAction, Icon } from 'react-mdl';
import { Link } from 'react-router';

class Details extends React.Component {

  constructor(props) {
    super(props);

    this.updateSearchResults = this.updateSearchResults.bind(this);
    this.handleClickActionSnackbar = this.handleClickActionSnackbar.bind(this);
    this.handleTimeoutSnackbar = this.handleTimeoutSnackbar.bind(this);
    this.getTabs = this.getTabs.bind(this);
    this.getLocationList = this.getLocationList.bind(this);
    this.getActivitiesList = this.getActivitiesList.bind(this);
    this.getMap = this.getMap.bind(this);
    this.getSnackBar = this.getSnackBar.bind(this);

    this.state = {
      error: '',
      activeTab: 0,
      busy: true,
      details: {
        name: '',
        lat: '',
        lon: ''
      }
    };

  }

  componentDidMount() {
    TrailApiHelper.searchByLatAndLon(this.props.params.lat, this.props.params.lon)
      .done((data, textStatus, jqXHR) => {
        this.setState({ busy: false });
        this.updateSearchResults(data.places);
      })
      .fail((jqXHR, textStatus, errorThrown) => {
        this.setState({ busy: false, error: 'The following error occurred: ' + jqXHR.status + ' ' + errorThrown + '.' });
      });
  }

  updateSearchResults(places) {
    this.setState({ details: places.length > 0 ? places[0] : null });
  }

  handleClickActionSnackbar() {
    this.setState({ error: '' });
  }

  handleTimeoutSnackbar() {
    this.setState({ error: '' });
  }

  render() {
    const tab1Style = { display: this.state.activeTab == 0 ? '' : 'none' };
    const tab2Style = { display: this.state.activeTab == 1 ? '' : 'none' };
    const progressBarStyle = {
      display: this.state.busy ? '' : 'none'
    }
    return (
      <div className="centered">
        <div style={progressBarStyle}>
          <ProgressBar indeterminate />
        </div>
        <h2>{this.state.details.name}</h2>
        {this.getTabs()}
        <section>
          <div className="content">
            <div style={tab1Style}>
              {this.getLocationList() }
              <p>{this.state.details.description}</p>
              <p>{this.state.details.directions}</p>
            </div>
            <div style={tab2Style}>
              {this.getActivitiesList()}
            </div>
          </div>
        </section>
        {this.getMap()}
        {this.getSnackBar()}
      </div>
    );
  };

  getTabs() {
    return (<Tabs activeTab={this.state.activeTab} onChange={(tabId) => this.setState({ activeTab: tabId }) }>
      <Tab key={1}>Location</Tab>
      <Tab key={2}>Activities</Tab>
    </Tabs>);
  }

  getLocationList() {
    return (<List>
      <ListItem>
        <ListItemContent avatar="person">Latitude</ListItemContent>
        <ListItemAction>
          {this.state.details.lat}
        </ListItemAction>
      </ListItem>
      <ListItem>
        <ListItemContent avatar="person">Longtitude</ListItemContent>
        <ListItemAction>
          {this.state.details.lon}
        </ListItemAction>
      </ListItem>
      <ListItem>
        <ListItemContent avatar="person">City</ListItemContent>
        <ListItemAction>
          {this.state.details.city}
        </ListItemAction>
      </ListItem>
      <ListItem>
        <ListItemContent avatar="person">State</ListItemContent>
        <ListItemAction>
          {this.state.details.state}
        </ListItemAction>
      </ListItem>
    </List>);
  }

  getActivitiesList() {
    let activitiesList = null;
    if (this.state.details.activities) {
      activitiesList = this.state.details.activities.map(function (value, index) {
        let linkTo = `${value.url}`;
        return <div><List><ListItem key={value.unique_id}>
          <ListItemContent avatar="person">{value.activity_type_name}</ListItemContent>
          <ListItemAction>
            <a href={linkTo} target="_blank">Details</a>
          </ListItemAction>
        </ListItem></List><p dangerouslySetInnerHTML={{ __html: value.description }} /></div>;
      });
    }
    return activitiesList;
  }

  getMap() {
    let src =
      `http://maps.google.com/maps/api/staticmap?center=` +
      `${this.state.details.lat},${this.state.details.lon}` +
      `&zoom=8&size=400x300&sensor=false`;
    return (<img style={{ width: 800, height: 400 }} src={src}/>);
  }

  getSnackBar(){
    const isActive = (this.state.error != '');
    return (<Snackbar
      active={isActive}
      onClick={this.handleClickActionSnackbar}
      onTimeout={this.handleTimeoutSnackbar}
      action="Undo">{this.state.error}</Snackbar>);
  }
}
export default Details;
