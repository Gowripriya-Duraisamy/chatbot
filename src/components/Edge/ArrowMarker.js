import React from 'react';

// ArrowMarker component defines a marker for arrowheads on SVG paths
const ArrowMarker = () => {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }}>
      <defs>
        {/* Marker definition with id="arrow" */}
        <marker
          id="arrow"
          viewBox="0 0 10 10" // Viewbox for marker coordinates
          refX="5" // X coordinate for reference point
          refY="5" // Y coordinate for reference point
          markerWidth="5" // Marker width
          markerHeight="5" // Marker height
          orient="auto" // Automatic orientation
        >
          {/* Arrowhead path */}
          <path d="M 0 0 L 10 5 L 0 10 Z" fill="#ddd" /> 
        </marker>
      </defs>
    </svg>
  );
};

export default ArrowMarker; // Export ArrowMarker component as default
