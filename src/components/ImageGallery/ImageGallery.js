import { useState, Fragment, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import Loader from "react-loader-spinner";
import styles from './ImageGallery.module.css'

import ImageGalleryItem from "../ImageGalleryItem";
import Button from "../Button";
import Modal from "../Modal";
import getNewImages from "../../service/images-api";
import scrollToElement from "../../service/scroll-to-el";

const key = '23015734-ca5f063b9797e09c36ee88a0d';


function ImageGallery({keyword}) {
    const [images, setImages] = useState([]);
    const [query, setQuery] = useState(null);
    const [page, setPage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [largeImageData, setLargeImageData] = useState(null);


    useEffect(() => {
        if (keyword === '') {
            return;
        }
        setImages([]);
        setPage(1);
        setQuery({query: keyword});
    }, [keyword])

    useEffect(() => {
        if (!page) {
            return;
        }

        setLoading(true);
        const url = `https://pixabay.com/api/?q=${keyword}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`;
        getNewImages(url)
          .then(({ hits }) => {
               images.length > 0
                ? setImages(state => [...state, ...hits])
                : setImages(hits);
          })
          .then(() => {
              if (page === 1) {
                  return;
              }
              scrollToElement();
          })
          .catch(error => setError(error))
          .finally(() => setLoading(false));
    }, [page, query]) //eslint-disable-line react-hooks/exhaustive-deps

    const onLoadMoreButtonClick = () => {
        setPage(state => state + 1);
    }

    return (
      <Fragment>
          {error && (
            <h1>{error}</h1>
          )}
          {loading && (
            <div className={styles.loader}>
                <Loader
                  type='ThreeDots'
                  color='#00BFFF'
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
                            onModalClick={setLargeImageData}
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
                  handleLoading={onLoadMoreButtonClick}
                  isImageLoading={loading}
                />
                {
                    largeImageData && (
                      <Modal
                        source={largeImageData.src}
                        descr={largeImageData.alt}
                        onModalClose={setLargeImageData}
                      />
                    )}
            </Fragment>
          )}
      </Fragment>
    );
}

ImageGallery.propTypes = {
    keyword: PropTypes.string,
};

export default ImageGallery;