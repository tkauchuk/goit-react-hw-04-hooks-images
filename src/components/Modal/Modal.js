import PropTypes from 'prop-types';
import styles from './Modal.module.css';
import { useEffect } from 'react';

function Modal({source, descr, onModalClose}) {

    useEffect(() => {
        const handleEscapeKeydown = event => {
            if (event.code === 'Escape') {
                onModalClose(null);
            }
        }

        window.addEventListener('keydown', handleEscapeKeydown);

        return () => {
            window.removeEventListener('keydown', handleEscapeKeydown);
        }
    }, [onModalClose])

    const handleBackdropClick = event => {
        if (event.target === event.currentTarget) {
            onModalClose(null);
        }
    }

    return (
      <div className={styles.overlay} onClick={handleBackdropClick}>
          <div className={styles.modal}>
              <img src={source} alt={descr} />
          </div>
      </div>
    );
}

Modal.propTypes = {
    source: PropTypes.string,
    descr: PropTypes.string
}

export default Modal;