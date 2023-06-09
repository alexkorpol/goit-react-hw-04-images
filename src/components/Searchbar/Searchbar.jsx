import React, { Component } from 'react';
import { SearchForm, SearchFormButton, SearchFormInput, SearchbarHeader } from './Searchbar.styled';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import Notiflix from 'notiflix';


const INITIAL_STATE = {
  query: '',
};

export default class Searchbar extends Component {

  state = {
    ...INITIAL_STATE,
  };

  onChange = e => {
    this.setState({ query: e.target.value.trim()});
  };

  onSubmit = e => {
    e.preventDefault();

    const { query } = this.state;

    if (query === ""){
       Notiflix.Notify.info('Please enter keyword for photos you are looking for')
      return;
    }
    
    this.props.onSubmit(query);
    this.reset();
  };

  reset = () => this.setState({ ...INITIAL_STATE });

  render() {
    const { query } = this.state;



    return (
      <>
        <SearchbarHeader >
        <SearchForm onSubmit={this.onSubmit}>
            <SearchFormButton type="submit" >
              <HiMagnifyingGlass size="24" />
          </SearchFormButton>

          <SearchFormInput
            className="input"
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onChange}
            value={query}
          />
        </SearchForm>
      </SearchbarHeader>

      </>


    );
  }
}

