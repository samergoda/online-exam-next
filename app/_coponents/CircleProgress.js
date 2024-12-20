function CircleProgress({ percentage }) {
    const radius = 16;
    const circumference =Math.floor( 2 * Math.PI * radius);
    const offset = Math.floor(circumference - (percentage / 100) * circumference);
  
    return (
      <svg width="100" height="100" viewBox="0 0 36 36">
        <circle
          cx="18"
          cy="18"
          r="16"
          stroke="#CC1010"
          strokeWidth="3"
          fill="none"
 
          strokeLinecap="round" // Rounded edges

        />
        <circle
          cx="18"
          cy="18"
          r="16"
          stroke="#02369C"
          strokeWidth="3"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 18 18)"
          strokeLinecap="round" // Rounded edges
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="10"
          fill="#000"
        >
          {percentage.toFixed(1)}%
        </text>
      </svg>
    );
  }
  export default CircleProgress






  