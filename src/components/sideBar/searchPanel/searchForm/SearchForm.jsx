
import React from 'react';
import { Input } from '../../../UI/Input/Input';
import { Button } from '../../../UI/Button/Buttnon';
import style from '../SearchPanel.module.css';

const SearchForm = ({
  inputValue,
  setInputValue,
  handleBlur,
  handleFocus,
  handleChange,
  handleSearchClick,
  handleClear,
  inputRef,
  isLoading,
  ...rest
}) => {
  return (
    <form action="" className={style.searchPanelContent}>
      <Input
        handleClear={handleClear}
        inputType="search"
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleBlur={handleBlur}
        handleFocus={handleFocus}
        handleChange={handleChange}
        className={style.Input}
        inputRef={inputRef}
        isLoading={isLoading}
      />
      <Button
        disabled={inputValue === ''}
        btnType="submit"
        type="submit"
        onClick={handleSearchClick}
        className={style.submitBtn}
        text="найти"
      />
    </form>
  );
};

export default SearchForm;