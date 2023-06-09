// import React from 'react';
import PropTypes from 'prop-types';
import { CardItem, ImageGalleryItemImage } from './ImageGalleryItem.styled';


const ImageGalleryItem = ({ images = [], openModal }) => {
  return (
    <>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <CardItem key={id} onClick={e => {e.preventDefault(); openModal(largeImageURL, tags)}}>
          <ImageGalleryItemImage src={webformatURL} alt={tags} loading="lazy"/>
        </CardItem>
      ))}
    </>

  )
}

export default ImageGalleryItem


ImageGalleryItem.propTypes = {
  images: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
};

