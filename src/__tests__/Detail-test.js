jest.unmock('../components/Details');
jest.unmock('react-mdl');
jest.unmock('react-router');
jest.unmock('jquery');

import React from 'react';
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils';
import Details from '../components/Details';
import TrailApiHelper from '../util/TrailApiHelper';
import $ from 'jquery';
import { ListItem } from 'react-mdl';

describe('Detail Component', () => {
  let component = null;

  beforeEach(() => {

    // Mock returning one result from the ajax call.
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
          "description": "Great place!",
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
        }
      ]
    };
    const resolved = $.Deferred().resolve(responseData);
    TrailApiHelper.searchByLatAndLon.mockClear();
    TrailApiHelper.searchByLatAndLon.mockReturnValue(resolved.promise());
    
    let params = {lat: "32.79449", lon: "-82.3307"};
    component = TestUtils.renderIntoDocument(<Details params={params}/>);
  });

  it('renders', () => {
    expect(TestUtils.isCompositeComponent(component)).toBeTruthy();
    expect(TestUtils.isCompositeComponentWithType(component, Details)).toBeTruthy();
  });

  it('displays two lists', () => {

    // Should result in two lists.
    let listItems = TestUtils.scryRenderedDOMComponentsWithClass(component, 'mdl-list');
    expect(listItems.length).toBe(2);
  });

  it('displays the correct details', () => {

    // Should result in two lists.
    let listItems = TestUtils.scryRenderedDOMComponentsWithClass(component, 'mdl-list');
    expect(listItems.length).toBe(2);

    // Details
    expect(listItems[0].children[0].textContent).toContain("32.79449");
    expect(listItems[0].children[1].textContent).toContain("-82.3307");
    expect(listItems[0].children[2].textContent).toContain("Atlanta");
    expect(listItems[0].children[3].textContent).toContain("Georgia");
  });

  it('displays the correct activity', () => {

    // Should result in two lists.
    let listItems = TestUtils.scryRenderedDOMComponentsWithClass(component, 'mdl-list');
    expect(listItems.length).toBe(2);

    // One activity - hiking.
    expect(listItems[1].children[0].textContent).toContain("hiking");

  });

  it('displays the correct text', () => {

    // Should result in three paragraphs of text.
    let paragraphs = TestUtils.scryRenderedDOMComponentsWithTag(component, 'p');
    expect(paragraphs.length).toBe(3);

    // description
    expect(paragraphs[0].textContent).toContain("Great place!");

    // directions
    expect(paragraphs[1].textContent).toContain("85");

    // activity
    expect(paragraphs[2].textContent).toContain("Very recommended");
  });

});

