import { Watch } from 'react-loader-spinner';
import { createPortal } from 'react-dom';
import styles from './Loader.module.css';

const Loader = () => {
    return createPortal(
        <div className={styles.loaderOverlay}>
            <Watch
                height="70"
                width="70"
                color="#F5D565"
                ariaLabel="loading-indicator"
            />
        </div>,
        document.body
    );
};

export default Loader;
