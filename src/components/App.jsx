import React, { useState, useEffect} from 'react';
import Searchbar from "./Searchbar";
import ImageGallery from './ImageGallery';
import { Button } from './Button/Button.styled';
import { PER_PAGE, getImages } from './api/api';
import Loader from 'components/Loader';
import Modal from './Modal';
import Notiflix from 'notiflix';


export default function App() {

  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalParams, setmodalParams] = useState({ imageModal:'', tagModal:''});
  const [totalPage, setTotalPage] = useState(0);
  const {imageModal, tagModal} = modalParams;

  useEffect(() => {
    const getPhotos = async () => {
      if (!query) { return }

      setLoading(true); // start loader
      try {
        const { totalHits, hits } = await getImages(query, page);
        if (totalHits === 0) {
          setTotalPage(0);
          Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
          return;
        }
        if (page === 1) {
          Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
          setTotalPage(totalHits / PER_PAGE); // count totalPage
        };

        if (page === totalPage) {
          Notiflix.Notify.warning(
            "We're sorry, but you've reached the end of search results.");
        }
        setImages(prevState => [...prevState, ...hits]);
      } catch (err) {
        Notiflix.Notify.failure("Something went wrong. Please try again.");
      } finally {
        setLoading(false); // finish loader
      };
    }
    getPhotos();
  }, [query, page, totalPage]
  );

    // ! ====== Write user query to state ======
    const handleFormSubmit = query => {
      setQuery(query);
      setImages([]);
      setPage(1);
    };

    // ! ====== Increment page number (+1) after click button "Load More" ======
    const handleButtonClick = () => {
      setPage(prevState => prevState + 1);
    }

    // ! ====== Open Modal =======
    const onOpenModal = (largeImageURL, tag) => {
      setShowModal(true)
      setmodalParams({ imageModal: largeImageURL, tagModal: tag });

  };

    // ! ====== Close Modal =======
    const onCloseModal = () => {
      setShowModal( false );
  };

      return (
        <>
          <Searchbar onSubmit={handleFormSubmit} />

          <ImageGallery images={images} openModal={onOpenModal} />


          {loading && <Loader isLoading={loading} />}
          {(!loading && totalPage > 1 && page < totalPage) &&
            <Button onClick={handleButtonClick}>Load more</Button>}

          {showModal && (
          <Modal onClose={onCloseModal}>
            <img src={imageModal} alt={tagModal} />
          </Modal>
        )}
        </>
      );
};


