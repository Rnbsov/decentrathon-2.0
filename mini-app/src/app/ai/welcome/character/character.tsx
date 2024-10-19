
import styles from './character.module.css';
import robot from './../../../_assets/robot.png';
import Image from 'next/image';

function Character() {
    return (
        <div className={styles.character}>
            <div className={styles.character__title}>
                Personal AI Buddy
            </div>
            <div className={styles.character__robot}>
                <Image className={styles.character__image} src={robot} alt='Robot'></Image>
            </div>
        </div>
    );
}

export default Character;