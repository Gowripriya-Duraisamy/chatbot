const ArrowMarker = () => {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }}>
      <defs>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 Z" fill="#ddd" />
        </marker>
      </defs>
    </svg>
  );
};

export default ArrowMarker;
