import './App.css';
import { useEffect,useRef,useState } from 'react';
import { Container } from './components/common/container';
import { SideBar } from './components/sideBar/SideBar';
import DayDetails from './components/DayDetails/DayDetails'
import Forecast from './components/Forecast/Forecast'
import { ThemeProvider } from './components/UI/ThemeToggle/ThemeProvider';
import {  SearchProvider } from './context/searchContext';

function App() {
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);
  const [numCards, setNumCards] = useState(6); 
  const [btenWidible,setBtenVidible]=useState(true)

  const handleResize = () => {
    if (containerRef.current) {
      const width = containerRef.current.getBoundingClientRect().width;
      setContainerWidth(width);
        if (width >= 1440) { 
          setNumCards(6); 
          setBtenVidible(true); 
        } else if (width >= 850 && width < 1440) { 
          setBtenVidible(true); 
          setNumCards(3); 
        } else { 
          setNumCards(24); 
          setBtenVidible(false); 
        }   
  };
  }
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    handleResize();
  }, []);
  return (
    <ThemeProvider>
        <SearchProvider>     
          <div className="App">
            <Container containerRef={containerRef}>
              <div className='LeftBar'>
                <SideBar/>
              </div>
                <div className='Rigthbar'>
                <Forecast numCards={numCards} btenWidible={btenWidible}/>
                <DayDetails />
              </div>
            </Container>
      </div>
      </SearchProvider>
    </ThemeProvider>
  );
}

export default App;