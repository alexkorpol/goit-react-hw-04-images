import React, { Component } from 'react';
import Searchbar from "./Searchbar";
import ImageGallery from './ImageGallery';
import { Button } from './Button/Button.styled';
import { PER_PAGE, getImages } from './api/api';
import Loader from 'components/Loader';
import Modal from './Modal';
import Notiflix from 'notiflix';

const INITIAL_STATE = {
  query: '',
  page: 1,
  images: [],
  loading: false,
  showModal: false,
};

let totalPage = 0;


export default class App extends Component {
  state = {
    ...INITIAL_STATE,
  };

  // !====== componentDidUpdate =======
  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      await this.getPhotos(query, page);
    }
  }

  getPhotos = async (query, page) => {
    if (!query) { return }

    this.setState({ loading: true });
    try {
      const data = await getImages(query, page);
      const { totalHits, hits } = data;
      if (totalHits === 0) {
        totalPage = 0;
         Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        return;
      }
      if (page === 1) {
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        totalPage = Math.ceil(totalHits / PER_PAGE);
      };

      if (this.state.page === totalPage) {
        Notiflix.Notify.warning(
      "We're sorry, but you've reached the end of search results.");
      }
      this.setState((prevState) => ({
        images: [...prevState.images, ...hits],
      }))
    } catch (err) {
      Notiflix.Notify.failure("Something went wrong. Please try again.");
    } finally {
      this.setState({ loading: false })
    };
  }

    // ! ====== Write user query to state ======
    handleFormSubmit = query => {
      this.setState({ ...INITIAL_STATE, query })
    };
    // ! ====== Increment page number ======
    handleButtonClick = () => {

      this.setState(prevState => ({ page: prevState.page + 1 }
      ));
    }

    // ! ====== Open Modal =======
  onOpenModal = (imgUrl, tag) => {
    this.setState({ showModal: true, imgUrl, tag });
  };

    // ! ====== Close Modal =======
  onCloseModal = () => {
    this.setState({ showModal: false });
  };



    render() {
      const { images, page, loading, showModal, imgUrl, tag } = this.state;


      return (
        <>
          <Searchbar onSubmit={this.handleFormSubmit} />

          <ImageGallery images={images} openModal={this.onOpenModal} />


          {loading && <Loader isLoading={loading} />}
          {(!loading && totalPage > 1 && page < totalPage) &&
            <Button onClick={this.handleButtonClick}>Load more</Button>}

          {showModal && (
          <Modal onClose={this.onCloseModal}>
            <img src={imgUrl} alt={tag} />
          </Modal>
        )}



        </>

      );
    };
  }

