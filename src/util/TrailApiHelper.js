import $ from 'jquery';
const baseUrl = 'https://trailapi-trailapi.p.mashape.com?';
const json = 'application/json';
const mashapeKey = 'OxWYjpdztcmsheZU9AWLNQcE9g9wp1qdRkFjsneaEp2Yf68nYH';
const dataTypeJson = 'json';

const TrailApiHelper = {

  searchByActivityAndCity(activity, city) {
    const radius = 25;
    let activityParameter = '';
    if (activity) {
      activityParameter = 'q[activities_activity_type_name_eq]=' + encodeURIComponent(activity);
    }
    let cityParameter = '';
    if (city) {
      cityParameter = 'q[city_cont]=' + encodeURIComponent(city) + '&radius=' + radius;
    }
    const url = baseUrl + ((activity && city) ? activityParameter + '&' + cityParameter : (activity) ? activityParameter : (city) ? cityParameter : '');
    return ($.ajax({
      type: 'GET',
      url: url,
      headers: {
        'Accept': json,
        'Content-Type': json,
        'X-Mashape-Key': mashapeKey
      },
      dataType: dataTypeJson
    }));
  }

  ,

  searchByLatAndLon(lat, lon) {
    const url = baseUrl + 'lat=' + lat + '&lon=' + lon + '&radius=1';
    return ($.ajax({
      type: 'GET',
      url: url,
      headers: {
        'Accept': json,
        'Content-Type': json,
        'X-Mashape-Key': mashapeKey
      },
      dataType: dataTypeJson
    }));
  }

};

export default TrailApiHelper;
