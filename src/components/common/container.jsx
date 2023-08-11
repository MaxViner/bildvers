import React from "react";
import style from './container.module.css';


export const Container = ({children, containerRef}) => {
	return (
		<div className={style['main-container']} ref={containerRef}> 
			{children}
		</div>
	);
};