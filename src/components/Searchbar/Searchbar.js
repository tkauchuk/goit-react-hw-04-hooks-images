import { Component } from "react";
import styles from './Searchbar.module.css';

class Searchbar extends Component {

    state = {
        query: ''
    }

    onQueryInputChange = event => {
        const { value } = event.target;

        this.setState({ query: value });
    }

    onQueryFormSubmit = event => {
        event.preventDefault();
        const { query } = this.state;

        if (query.trim().length < 1) {
            return;
        }
        this.props.onSubmit(query.toLowerCase().trim());
    }

    render() {
        const { query } = this.state;

        return (
            <header className={styles.searchbar}>
                <form className={styles.form} onSubmit={this.onQueryFormSubmit}>
                    <button type="submit" className={styles.button} disabled={!query.trim().length > 0}>
                        <span className={styles.label}>Search</span>
                    </button>
                    <input
                        className={styles.input}
                        type="text"
                        value={query}
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={this.onQueryInputChange}
                    />
                </form>
            </header>
        );
    }
}

export default Searchbar;