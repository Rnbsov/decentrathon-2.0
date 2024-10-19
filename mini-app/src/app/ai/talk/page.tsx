
'use client'

import Image from 'next/image';
import styles from './styles.module.css';

import blob from './../../_assets/blob.png';
import waves from './../../_assets/waves-3.svg';

import { cn } from '@/core/utils';
import Action from './action/action';
import { useState } from 'react';

function Talk() {

    let [isRecording, setRecording] = useState(false);
    let [text, setText] = useState('');

    return (
        <div className={styles.talk}>
            <div className={styles.talk__content}>

                <Waves></Waves>

                <div className={styles.title}>
                    <div className={styles.title__text}>
                        AI Buddy
                    </div>
                </div>

                <div className={styles.status}>
                    <div className={styles.status__dot}/>
                    <div className={styles.status__text}>
                        Online
                    </div>
                </div>

                <div className={cn(styles.blob, isRecording ? styles.blob__animate : styles.blob__reset)}>
                    <Image className={styles.blob__image} src={blob} alt='blob__image'></Image>
                </div>

                <div className={styles.speech}>
                    <div className={styles.speech__text}>
                        {text == "" ? "Чем я могу вам помочь?" : text}
                    </div>
                </div>

                <Action isRecording={isRecording} setRecording={setRecording} setText={setText}></Action>

            </div>
        </div>
    );
}

function Waves() {
    return (
        <div className={styles.waves}>
            <Image className={styles.waves__image} src={waves} alt='waves'></Image>
        </div>
    )
}

export default Talk;