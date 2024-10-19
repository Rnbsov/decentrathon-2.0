
import Link from 'next/link';
import styles from './action.module.css';

function Action() {

    // const next = () => {
    //     route.push('/ai/home');
    // }

    return (
        <div className={styles.action}>
            <button className={styles.button}>
                Get Started
            </button>
        </div>
    );
}

export default Action;