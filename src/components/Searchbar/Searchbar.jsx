import css from './Searchbar.module.css'
import PropTypes from 'prop-types';
import { AiOutlineArrowRight } from "react-icons/ai";

export const Searchbar = ({ onSubmit }) => {
  return (
  <header className={css.searchbar}>
    <form className={css.searchForm} onSubmit={onSubmit}>
      <button type="submit" className={css.button}>
          <AiOutlineArrowRight className={css.arrow} size={20}/>  
        <span className="button-label">Search</span>
      </button>
        <input
        name="search"
        className={css.input}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
      />
    </form>
  </header>
  )
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired
} 