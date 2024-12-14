import React from "react";

const WavyDiv = () => {
  return (
    <div style={{ position: "relative", backgroundColor: "#000", height: "30vh", overflow: "hidden" }}>
      {/* The content inside the div */}


      {/* SVG for the wavy top */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "auto" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          style={{ width: "100%", height: "100%" }}
        >
          <path
            fill="#008F82"
            fillOpacity="1"
            d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,245.3C672,267,768,277,864,256C960,235,1056,181,1152,149.3C1248,117,1344,107,1392,101.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>

        {/* Other content */}
  
        <div style={{ position: "absolute", bottom: "0", left: "0", width: "100%", textAlign: "center", padding: "5px", color: "#121212" }}>
        <p>&copy; BanyanTree Maldives 2024</p>
        </div>
      </div>

  );
};

export default WavyDiv;
