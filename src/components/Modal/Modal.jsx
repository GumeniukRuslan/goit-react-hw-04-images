import css from './Modal.module.css'
import PropTypes from 'prop-types';


export const Modal = ({ hugeImg, closeModal }) => {
  return (
    <div overlay='true' onClick={closeModal} className={css.overlay}>
      <div className={css.modal}>
        <img src={hugeImg} alt="" />
      </div>
    </div>
  )
}

Modal.propTypes = {
  hugeImg: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired
} 