import { Component } from "react";
import Loader from "react-loader-spinner";
import styles from './Button.module.css';

class Button extends Component {
    render() {
        const { isImageLoading, handleLoading } = this.props;
        return (
            <div className={styles.container}>
                {
                    isImageLoading
                        ?
                        <Loader
                            type="ThreeDots"
                            color="#00BFFF"
                            height={100}
                            width={100}
                            timeout={3000} 
                        />
                        :
                        <button type="button" className={styles.button} onClick={handleLoading}>
                            Load more
                        </button>
                }
            </div>
        );
    }
}

export default Button;