import css from './Message.module.css'
import PropTypes from 'prop-types';
import { IoLogoTableau } from "react-icons/io5";


export const Message = ({ text }) => {
  return (
    <div className={css.message}>
      <IoLogoTableau className={css.icon} size={25} />
      <p>{text}</p>
      <IoLogoTableau className={css.icon} size={25}/>
    </div>
  )
}

Message.propTypes = {
  text: PropTypes.string
} 