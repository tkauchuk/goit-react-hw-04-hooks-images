import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';

function Searchbar({onSubmit}) {

    const [query, setQuery] = useState('');

    const onQueryInputChange = event => {
        const { value } = event.target;
        setQuery(value);
    }

    const onQueryFormSubmit = event => {
        event.preventDefault();

        if (query.trim().length < 1) {
            return;
        }
        onSubmit(query.toLowerCase().trim());
    };

    return (
      <header className={styles.searchbar}>
          <form className={styles.form} onSubmit={onQueryFormSubmit}>
              <button type='submit' className={styles.button} disabled={!query.trim().length > 0}>
                  <span className={styles.label}>Search</span>
              </button>
              <input
                className={styles.input}
                type='text'
                value={query}
                autoComplete='off'
                autoFocus
                placeholder='Search images and photos'
                onChange={onQueryInputChange}
              />
          </form>
      </header>
    );
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func
}

export default Searchbar;