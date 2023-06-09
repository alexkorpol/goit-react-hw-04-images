import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Grid from './ImageGallery.styled';

const ImageGallery = ({ images, openModal})  => {
return (
<Grid >
  <ImageGalleryItem images={images} openModal={openModal}/>
</Grid>
  )
}

export default  ImageGallery

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
};

