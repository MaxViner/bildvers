
import React from "react";
import style from './HumidityScale.module.css';

const HumidityScale = ({ humidityPercentage }) => {
  const scaleWidth = humidityPercentage + "%";
  
  return (
    <>
      <div className={style.labelContainer}>
        <div className={style.label}>0</div>
        <div className={style.label}>50</div>
        <div className={style.label}>100</div>
      </div>
      
      <div className={style.humidityScale}>
        <div
          className={style.scale}
          style={{
            width: scaleWidth,
          }}
        ></div>
      </div>
      
      <div className={style.percentageLabel}>&#37;</div>
    </>
  );
};

export default HumidityScale;