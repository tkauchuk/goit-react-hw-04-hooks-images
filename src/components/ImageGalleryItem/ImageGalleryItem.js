import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

function ImageGalleryItem({ id, onModalClick, source, alt, largeImageSrc }) {

    return (
      <li className={styles.item} key={id} onClick={() => {onModalClick({ src: largeImageSrc, alt})}}>
          <img src={source} alt={alt} className={styles.image} />
      </li>
    );
}

ImageGalleryItem.propTypes = {
    id: PropTypes.number,
    onModalClick: PropTypes.func,
    source: PropTypes.string,
    alt: PropTypes.string,
    largeImageSrc: PropTypes.string
}

export default ImageGalleryItem;