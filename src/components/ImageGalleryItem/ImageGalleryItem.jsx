import css from './ImageGalleryItem.module.css'
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ image, modalOpen }) => {
  return (
    <li onClick={modalOpen} huge={image.largeImageURL} id='item' className={css.galleryItem}>
      <img  height='200' width='300' src={image.webformatURL}  alt="" />
    </li>
  )
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  modalOpen: PropTypes.func.isRequired
} 