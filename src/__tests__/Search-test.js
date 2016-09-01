jest.unmock('../components/Search');
jest.unmock('../components/SearchResults');
jest.unmock('react-mdl');
jest.unmock('react-router');
jest.unmock('jquery');

import React from 'react';
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils';
import Search from '../components/Search';
import SearchResults from '../components/SearchResults';
import TrailApiHelper from '../util/TrailApiHelper';
import $ from 'jquery';

describe('Search Component', () => {
  let component = null;

  beforeEach(() => {
        // Mock returning two results from the ajax call.
    const responseData = {
      places:
      [
        {
          "city": "Atlanta",
          "state": "Georgia",
          "country": "United States",
          "name": "Wallis Creek",
          "parent_id": null,
          "unique_id": 1402,
          "directions": "North on 85.",
          "lat": 32.79449,
          "lon": -82.3307,
          "description": null,
          "date_created": null,
          "children": [],
          "activities": [
            {
              "name": "Wallis Creek",
              "unique_id": "2-1287",
              "place_id": 1402,
              "activity_type_id": 2,
              "activity_type_name": "hiking",
              "url": "http://www.tripleblaze.com/trail.php?c=3&i=1302",
              "attribs": {
                "\"length\"": "\"1\""
              },
              "description": "Very recommended",
              "length": 1.0,
              "activity_type": {
                "created_at": "2012-08-15T16:12:21Z",
                "id": 2,
                "name": "hiking",
                "updated_at": "2012-08-15T16:12:21Z"
              },
              "thumbnail": null,
              "rank": null,
              "rating": 0.0
            }
          ]
        },
        {
          "city": "Atlanta",
          "state": "Georgia",
          "country": "United States",
          "name": "Peavine Creek",
          "parent_id": null,
          "unique_id": 1387,
          "directions": "From Briarcliff Road/North Decatur Rd go north and take right on N.",
          "lat": 33.79449,
          "lon": -84.3307,
          "description": null,
          "date_created": null,
          "children": [],
          "activities": [
            {
              "name": "Peavine Creek",
              "unique_id": "2-1287",
              "place_id": 1387,
              "activity_type_id": 2,
              "activity_type_name": "hiking",
              "url": "http://www.tripleblaze.com/trail.php?c=3&i=1287",
              "attribs": {
                "\"length\"": "\"1\""
              },
              "description": "Peavine Creek features 1 miles of hiking trails near Atlanta, GA.",
              "length": 1.0,
              "activity_type": {
                "created_at": "2012-08-15T16:12:21Z",
                "id": 2,
                "name": "hiking",
                "updated_at": "2012-08-15T16:12:21Z"
              },
              "thumbnail": null,
              "rank": null,
              "rating": 0.0
            }
          ]
        }
      ]
    };
    const resolved = $.Deferred().resolve(responseData);
    TrailApiHelper.searchByActivityAndCity.mockClear();
    TrailApiHelper.searchByActivityAndCity.mockReturnValue(resolved.promise());
    
    component = TestUtils.renderIntoDocument(<Search/>);
  });

  it('renders', () => {
    expect(TestUtils.isCompositeComponent(component)).toBeTruthy();
    expect(TestUtils.isCompositeComponentWithType(component, Search)).toBeTruthy();
  });

  it('performs a search and produces the correct results', () => {

    // Click on search.
    let buttonComponents = TestUtils.scryRenderedDOMComponentsWithClass(component, 'mdl-button');
    expect(buttonComponents.length).toBe(1);
    let searchButton = ReactDOM.findDOMNode(buttonComponents[0]);
    TestUtils.Simulate.click(searchButton);

    // Should result in two items listed.
    let searchResultsComponent = TestUtils.findRenderedComponentWithType(component, SearchResults);
    expect(searchResultsComponent).toBeTruthy();
    let listItems = TestUtils.scryRenderedDOMComponentsWithClass(searchResultsComponent, 'mdl-list__item');
    expect(listItems.length).toBe(2);

  });

});

