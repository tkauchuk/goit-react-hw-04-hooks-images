import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

class Modal extends Component {

    static propTypes = {
        source: PropTypes.string,
        descr: PropTypes.string
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleEscapeKeydown);
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleEscapeKeydown);
    }

    handleEscapeKeydown = event => {
        if (event.code === 'Escape') {
            this.props.onModalClose();
        }
    }
    handleBackdropClick = event => {
        if (event.target === event.currentTarget) {
            this.props.onModalClose();
        }
    }
    render() {
        const { source, descr } = this.props;
        return (
            <div className={styles.overlay} onClick={this.handleBackdropClick}>
                <div className={styles.modal}>
                    <img src={source} alt={descr} />
                </div>
            </div>
        );
    }
}

export default Modal;