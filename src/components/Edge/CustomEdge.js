import React from 'react';
import { getSmoothStepPath } from 'reactflow';

const ArrowHead = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style }) => {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <path
      id={id}
      className="react-flow__edge-path"
      d={edgePath}
      markerEnd="url(#arrow)"
      style={{ stroke: '#ddd', strokeWidth: 2, ...style }}
    />
  );
};

export default ArrowHead;
