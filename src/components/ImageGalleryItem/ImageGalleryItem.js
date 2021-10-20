import { Component } from "react";
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
    
    static propTypes = {
        id: PropTypes.number,
        onModalClick: PropTypes.func,
        source: PropTypes.string,
        alt: PropTypes.string,
        largeImageSrc: PropTypes.string
    }

    render() {
        const { id, onModalClick, source, alt, largeImageSrc } = this.props;
        return (
            <li className={styles.item} key={id} onClick={onModalClick}>
                <img src={source} alt={alt} data-source={largeImageSrc} className={styles.image} />
            </li>
        );
    }
}

export default ImageGalleryItem;