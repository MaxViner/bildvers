
import React, { useState } from 'react';
import { ThemeToggle } from '../UI/ThemeToggle/ThemeToggle';
import style from './sideBar.module.css';
import { Button } from '../UI/Button/Buttnon';
import { WeatherCard } from './weatherCard/WeatherCard';
import { SearchPanel } from './searchPanel/SearchPanel';
 export const SideBar = ({}) => {
  const [searchPaneIsOpen, setSearchPaneIsOpen] = useState(false);
   return (
    <section className={style.sideBar}>
      <Button btnType="search" text="Поиск города" onClick={() => setSearchPaneIsOpen(true)} />
      <ThemeToggle />
      <SearchPanel searchPaneIsOpen={searchPaneIsOpen} setSearchPaneIsOpen={setSearchPaneIsOpen} />
      <WeatherCard />
    </section>
  );
};