import React from 'react';

const DemoVid = () => (
  <div className="demo_container">
    <div className="demo_hero">
      <p>See a preview of what you'll get after signing up</p>
    </div>

    <div className="vid_container">
      <iframe
        src="https://www.youtube.com/embed/Zxf1mnP5zcw"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  </div>
);

export default DemoVid;
