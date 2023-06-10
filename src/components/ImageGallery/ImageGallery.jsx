import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem"
import { Modal } from "components/Modal/Modal"
import { useState } from "react"
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css'
import { AnimatePresence } from "framer-motion";

export const ImageGallery = ({data}) => {

  const [showModal, setShowModal] = useState(false);
  const [hugeURL, setHugeURL] = useState('');

  function openModal (evt) {
    window.addEventListener("keydown", closeModalonESC);
    setHugeURL(evt.currentTarget.getAttribute('huge'));
    setShowModal(true)
  }

  function closeModalonESC (evt)  {
    if (evt.code === 'Escape') {
      setShowModal(false)
      window.removeEventListener("keydown", closeModalonESC)
    }
  }

  function closeModalonOverlay (evt) {
    if (evt.target === evt.currentTarget) {
      setShowModal(false)
      window.removeEventListener("keydown", closeModalonESC)
    }
  }

    return (
      <>
        <ul className={css.imageList} >
          {data.map((image) => <ImageGalleryItem modalOpen={openModal} key={image.id} image={image} />)}
        </ul>
        <AnimatePresence initial={false} onExitComplete={() => null}>
          {showModal && <Modal closeModal={closeModalonOverlay} hugeImg={hugeURL} />}
        </AnimatePresence>
        
      </>
    )
}

 ImageGallery.propTypes = {
        data: PropTypes.array.isRequired,
    }