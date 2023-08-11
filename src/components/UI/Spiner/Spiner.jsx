import { useCallback } from "react";
import { ThemeContext } from "../ThemeToggle/themeContext";
import './Spiner.css'
export const Spiner=()=>{
    const {theme}=useCallback(ThemeContext)
    const loaderStyles = {
        background: theme === 'dark' ? 'F1F1F1' : '100E1C'
      };
    return(
        <div class="lds-roller">
            <div style={loaderStyles}></div>
            <div style={loaderStyles}></div>
            <div style={loaderStyles}></div>
            <div style={loaderStyles}></div>
                    
            <div style={loaderStyles}></div>
            <div style={loaderStyles}></div>
            <div style={loaderStyles}></div>
            <div style={loaderStyles}></div>

            </div>
    )
}
