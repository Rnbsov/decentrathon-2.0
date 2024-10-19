'use client'

import styles from './action.module.css';
import { useRouter } from 'next/navigation';

function Action() {

    let router = useRouter();

    const next = () => {
        router.push('/ai/home');
    }

    return (
        <div className={styles.action}>
            <button className={styles.button} onClick={next}>
                Get Started
            </button>
        </div>
    );
}

export default Action;