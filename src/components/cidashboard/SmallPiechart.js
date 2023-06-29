import { PieChart } from "react-minimal-pie-chart";
import './smallPiechart.css';
import { useState, useRef } from "react";

export default function SmallPiechart(props) {
  const [hoveredSlice, setHoveredSlice] = useState(null);
  const tooltip = useRef(null);

  const handleMouseEnter = (index) => {
    setHoveredSlice(index);
  };

  const handleMouseLeave = () => {
    setHoveredSlice(null);
  };

  return (
    <div className="small-piechart">
      <PieChart
        data={props.dataToDisplay}
        label={({ dataEntry }) => dataEntry.value}
        labelStyle={(index) => ({
          fill: props.dataToDisplay[index].labelColor,
          fontSize: '18px',
          fontFamily: 'sans-serif',
        })}
        onMouseEnter={(index) => handleMouseEnter(index)}
        onMouseLeave={handleMouseLeave}
        onMouseMove={({ clientX, clientY, target }) => {
          const rect = target.getBoundingClientRect();
          const tooltipX = clientX - rect.left + window.scrollX;
          const tooltipY = clientY - rect.top + window.scrollY;
          const additionalInfo =
            hoveredSlice !== null ? props.dataToDisplay[hoveredSlice].additionalInfo : null;
          if (additionalInfo && tooltip.current) {
            tooltip.current.style.display = 'block';
            tooltip.current.style.left = `${tooltipX}px`;
            tooltip.current.style.top = `${tooltipY}px`;
            tooltip.current.textContent = additionalInfo;
          } else if (tooltip.current) {
            tooltip.current.style.display = 'none';
          }
        }}
      />
      <div ref={tooltip} className="tooltip" />
    </div>
  );
}
