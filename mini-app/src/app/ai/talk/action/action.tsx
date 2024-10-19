'use client'

import { cn } from '@/core/utils';
import styles from './action.module.css';
import Image from 'next/image';

import keyboard from './../../../_assets/keyboard.svg';
import exit from './../../../_assets/exit.svg';
import micro from './../../../_assets/micro.svg';
import { useEffect, useState } from 'react';

import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';

function Action(props: {isRecording: boolean, setRecording: Function, setText: Function}) {

    let {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();

    const startRecord = () => {
        resetTranscript();
        props.setRecording(true)
        SpeechRecognition.startListening()
    } 

    const stopRecord = () => {
        props.setRecording(false)
        SpeechRecognition.stopListening()
    }

    useEffect(() => {
        props.setText(transcript);
    }, [transcript])

    return (
        <div className={styles.action}>
            <div className={styles.action__content}>
                <div className={cn(styles.action__item, styles.keyboard)}>
                    <Image className={styles.action__item__icon} src={keyboard} alt='keyboard'></Image>
                </div>
                <div className={cn(styles.record__button, props.isRecording ? styles.record__animate : "")} 
                    onMouseDown={startRecord} 
                    onMouseUp={stopRecord} 
                    onTouchStart={startRecord}
                    onTouchEnd={stopRecord}>
                    <div className={cn(styles.action__item, styles.record)}>
                        <Image className={cn(styles.action__item__icon, styles.record__icon)} src={micro} alt='speech'></Image>
                    </div>
                </div>
                <div className="exit">
                    <div className={cn(styles.action__item, styles.exit)}>
                        <Image className={cn(styles.action__item__icon, styles.exit__icon)} src={exit} alt='exit'></Image>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Action;