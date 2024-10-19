
import styles from './waves.module.css';

import Image from "next/image";
import waves from './../../../_assets/waves.svg';

function Waves() {
    return (
        <div className={styles.waves}>
            <Image className={styles.waves__image} src={waves} alt='Robot'></Image>
        </div>
    );
}

export default Waves;