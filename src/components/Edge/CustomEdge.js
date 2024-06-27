import React from 'react';
import { getBezierPath } from 'reactflow';

// ArrowHead component renders an SVG path representing an edge between nodes
const ArrowHead = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style
}) => {
  // Calculate edge path using getBezierPath function from reactflow
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  // Render SVG path element with calculated path and styling
  return (
    <path
      id={id}
      className="react-flow__edge-path" // Class name for styling purposes
      d={edgePath} // SVG path data attribute
      markerEnd="url(#arrow)" // Marker for arrow head at end of path
      style={{ stroke: '#ddd', strokeWidth: 2, ...style }} // Inline styles for stroke and other custom styles
    />
  );
};

export default ArrowHead; // Export ArrowHead component as default
