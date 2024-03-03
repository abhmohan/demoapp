import Logout from '../Logout';
import styles from './Header.module.css';

const Header = () => {
    return (
        <div className={styles.header}>
            <Logout />
        </div>
    )
};

export default Header;