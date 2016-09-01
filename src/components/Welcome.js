import React from 'react';

const Welcome = () => {
  return (
    <div className="centered">
      <h2>Welcome</h2>
      <p>Welcome to the 'Trail' project.</p>
      <p>This is a small React example project built from React Starterify.</p>
      <p>It enables us to query the <a href="https://market.mashape.com/trailapi/trailapi">trail api</a>.</p> 
      <p>
        This api gives access to information and photos for tens of thousands of outdoor recreation 
        locations including hiking and mountain biking trails, campgrounds, ski resorts, ATV trails, and more.
      </p>
    </div>
  );
};

export default Welcome;
