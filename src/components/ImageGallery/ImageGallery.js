import { Component, Fragment } from "react";
import PropTypes from 'prop-types';
import Loader from "react-loader-spinner";
import styles from './ImageGallery.module.css'

import ImageGalleryItem from "../ImageGalleryItem";
import Button from "../Button";
import Modal from "../Modal";
import getNewImages from "../../service/images-api";
import scrollToElement from "../../service/scroll-to-el";

const key = '23015734-ca5f063b9797e09c36ee88a0d';

class ImageGallery extends Component {
    
    static propTypes = {
        keyword: PropTypes.string
    }

    state = {
        images: [],
        page: null,
        error: null,
        loading: false,
        isModalShown: false,
        largeImageData: {}
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.keyword !== this.props.keyword) {
            this.setState({
                images: [],
                page: 1,
                loading: true
            }, () => {
                const { keyword } = this.props;
                const { page } = this.state;
                const url = `https://pixabay.com/api/?q=${keyword}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`;

                getNewImages(url)
                    .then(({ hits }) => this.setState({ images: hits }))
                    .catch(error => this.setState({error}))
                    .finally(() => this.setState({loading: false}))
            });
        }
    }
    
    onLoadMoreButtonClick = () => {
        this.setState(({page}) => {
            return {
                page: page + 1,
                loading: true
            }
        }, () => {
            const { keyword } = this.props;
            const { page } = this.state;
            const url = `https://pixabay.com/api/?q=${keyword}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`;
            
            getNewImages(url)
                .then(({ hits }) => this.setState(({ images }) => {
                    return {images: [...images, ...hits]}
                }))
                .then(() => {scrollToElement()})
                .catch(error => this.setState({ error }))
                .finally(() => {this.setState({loading: false})})
        })
    }

    toggleModalState = event => {
        this.setState(({ isModalShown }) => {
            return {isModalShown: !isModalShown};
        }, () => {
            if (this.state.isModalShown) {
                this.getLargeImageData(event.target);
            }
        })
    }

    getLargeImageData = image => {
            this.setState({
            largeImageData: {
                source: image.dataset.source,
                alt: image.alt
        }})        
    }

    render() {
        const { loading, images, isModalShown, largeImageData, } = this.state;


        return (
            <Fragment>
                {loading && (
                    <div className={styles.loader}>
                    <Loader
                        type="ThreeDots"
                        color="#00BFFF"
                        height={100}
                        width={100}
                        timeout={3000}
                    />
                    </div>)}
                {images.length > 0 && (
                    <Fragment>
                        <ul className={styles.gallery}>{
                            images.map(({ id, webformatURL, largeImageURL, tags }, index) => {
                                return (
                                    <ImageGalleryItem
                                        onModalClick={this.toggleModalState}
                                        key={index}
                                        id={id}
                                        source={webformatURL}
                                        alt={tags}
                                        largeImageSrc={largeImageURL}
                                    />
                                );
                            })
                        }
                        </ul>
                        <Button
                            handleLoading={this.onLoadMoreButtonClick}
                            isImageLoading={loading}
                        />
                        {
                            isModalShown && (
                                <Modal
                                    source={largeImageData.source}
                                    descr={largeImageData.alt}
                                    onModalClose={this.toggleModalState}
                                />
                            )}
                    </Fragment>
                )}
            </Fragment>    
        );
    }
}

export default ImageGallery;