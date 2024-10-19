import Image from "next/image";

import styles from './effect.module.css';
import wavesa from './../../../_assets/waves-2.png';

function Effect() {
    return (
        <div className={styles.effect}>
            <div className={styles.glow}></div>
            <Image className={styles.waves} alt="waves" src={wavesa}></Image>
        </div>
    );
}

export default Effect;