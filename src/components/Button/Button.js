import Loader from "react-loader-spinner";
import styles from './Button.module.css';
import PropTypes from 'prop-types';

function Button({isImageLoading, handleLoading}) {

    return (
      <div className={styles.container}>
          {
              isImageLoading
                ?
                <Loader
                  type='ThreeDots'
                  color='#00BFFF'
                  height={100}
                  width={100}
                  timeout={3000}
                />
                :
                <button type='button' className={styles.button} onClick={handleLoading}>
                    Load more
                </button>
          }
      </div>
    );
}

Button.propTypes = {
    isImageLoading: PropTypes.bool,
    handleLoading: PropTypes.func
}

export default Button;