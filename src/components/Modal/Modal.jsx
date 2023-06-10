import { Backdrop } from 'components/Backdrop/Backdrop';
import { motion } from "framer-motion";
import css from './Modal.module.css'
import PropTypes from 'prop-types';

const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };

export const Modal = ({ hugeImg, closeModal }) => {
  return (
    <Backdrop onClick={closeModal} className={css.overlay}>
      <div className={css.plug}>
        <p>Image is coming...</p>
      </div>
       
      <motion.div className={css.modal} variants={dropIn} initial="hidden" animate="visible" exit="exit">
        <img src={hugeImg} alt="" />
      </motion.div>
    </Backdrop>
  )
}

Modal.propTypes = {
  hugeImg: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired
} 
