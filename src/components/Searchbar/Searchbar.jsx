import React, { useState} from 'react';
import { SearchForm, SearchFormButton, SearchFormInput, SearchbarHeader } from './Searchbar.styled';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';


export default function Searchbar({onSubmit}) {
   const [query, setQuery] = useState('');

// ! ====== Function reset of query after submit to App ======
  const reset = () => setQuery('');

// !====== Function write in query after enter 1 letter ======
  const onChange = e => {
    setQuery(e.target.value.trim());
  };

// ! ====== Function broadcast query to App ==================
    const onSubmitQuery = e => {
    e.preventDefault();

    if (query === ""){
       Notiflix.Notify.info('Please enter keyword for photos you are looking for')
      return;
    }
    onSubmit(query);
    reset();
  };

  // ! ====== render ======

    return (
      <>
        <SearchbarHeader >
        <SearchForm onSubmit={onSubmitQuery}>
            <SearchFormButton type="submit" >
              <HiMagnifyingGlass size="24" />
          </SearchFormButton>

          <SearchFormInput
            className="input"
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={onChange}
            value={query}
          />
        </SearchForm>
      </SearchbarHeader>
      </>
    );
  }

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
