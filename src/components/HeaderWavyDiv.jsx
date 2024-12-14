import React, { useEffect, useRef } from "react";

const HeaderWavyDiv = () => {
  const waveRef = useRef(null);

  useEffect(() => {
    const animateWave = () => {
      let t = 0;

      const generateWavePath = (offset) => {
        const points = [];
        const amplitude = 20; // Wave height
        const wavelength = 200; // Distance between waves
        const baseHeight = 0; // Base height of the wave
        const width = 1440; // Width of the viewBox
        const bottom = 500; // Height of the div and wave's bottom alignment

        for (let x = 0; x <= width; x += 50) {
          const y = baseHeight + amplitude * Math.sin((x + offset) / wavelength);
          points.push(`${x},${y}`);
        }

        // Ensure the wave perfectly touches the right edge and bottom
        const lastY = baseHeight + amplitude * Math.sin((width + offset) / wavelength);
        points.push(`${width},${lastY}`);

        // Return the full SVG path
        return `M${points[0]} ` + points.slice(1).map((p) => `L${p}`).join(" ") + ` L${width},${bottom} L0,${bottom} Z`;
      };

      const animate = () => {
        t += 2; // Adjust the speed
        const wavePath = generateWavePath(t);

        if (waveRef.current) {
          waveRef.current.setAttribute("d", wavePath);
        }

        requestAnimationFrame(animate);
      };

      animate();
    };

    animateWave();
  }, []);

  return (
    <div style={{ position: "relative", backgroundColor: "#000", height: "30vh", overflow: "hidden" }}>
      {/* Header Content */}
      <div style={{ padding: "20px", color: "#fff", textAlign: "center" }}>
        <h1>Boat Pass Check-in</h1>
      </div>

      {/* SVG with animated wave */}
      <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "100%" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 10"
          style={{ width: "100%", height: "100%" }}
        >
          <path
            ref={waveRef}
            fill="#008F82"
            fillOpacity="1"
            d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,245.3C672,267,768,277,864,256C960,235,1056,181,1152,149.3C1248,117,1344,107,1392,101.3L1440,96L1440,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default HeaderWavyDiv;
