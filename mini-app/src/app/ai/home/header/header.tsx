
import styles from './header.module.css';
import avatar from './../../../_assets/avatar.jpg';
import menu_line from './../../../_assets/menu-line.svg';
import Image from 'next/image';

function Header() {
    return (
        <div className={styles.header}>
            <div className={styles.header__content}>
                <div className={styles.header__burger}>
                    <Image className={styles.header__burger__icon} src={menu_line} alt='menu'></Image>
                </div>
                
                <div className={styles.header__title}>
                    Hi, Michael 👋
                </div>

                <Image className={styles.header__user} src={avatar} alt='Avatar'></Image>
            </div>
        </div>
    );
}

export default Header;