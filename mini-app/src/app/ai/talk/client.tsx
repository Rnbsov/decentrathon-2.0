'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import { xiorClassic } from '@/api/instance'

import blob from './../../_assets/blob.png'
import waves from './../../_assets/waves-3.svg'
import Action from './action/action'
import styles from './styles.module.css'
import { cn } from '@/core/utils'

function Talk() {
  let [isRecording, setRecording] = useState(false)
  let [text, setText] = useState('')
  let [finalText, setFinalText] = useState('')

  let [answer, setAnswer] = useState('')

  const fetchData = async () => {
    console.log('DET')
    await xiorClassic
      .post('api/v1/request_to_openai', {
        user_id: '67122d83ae38a25d1d362979',
        message: finalText
      })
      .then((response) => {
        setAnswer(response.data.response)
      })
      .catch((error) => {
        setAnswer('ERROR')
      })
  }

  // useEffect(() => {
  //     try {
  //         navigator.mediaDevices.getUserMedia({ audio: true });
  //         console.log("Access granted to the microphone");
  //     } catch (error) {
  //         console.error("Microphone access denied", error);
  //     }
  // }, [])

  useEffect(() => {
    if (finalText == '') {
      setAnswer('')
      return
    }

    setTimeout(() => {
      new Promise(async () => {
        await fetchData()
      })
    }, 1000)
  }, [finalText])

  return (
    <div className={styles.talk}>
      <div className={styles.talk__content}>
        <Waves></Waves>

        <div className={styles.title}>
          <div className={styles.title__text}>AI Buddy</div>
        </div>

        <div className={styles.status}>
          <div className={styles.status__dot} />
          <div className={styles.status__text}>Online</div>
        </div>

        {answer == '' ? (
          <div>
            <div className={cn(styles.blob, isRecording ? styles.blob__animate : styles.blob__reset)}>
              <Image className={styles.blob__image} src={blob} alt='blob__image'></Image>
            </div>

            <div className={styles.speech}>
              <div className={styles.speech__text}>{text == '' ? 'Чем я могу вам помочь?' : text}</div>
            </div>
          </div>
        ) : (
          <div className={styles.answer}>{answer}</div>
        )}

        <Action
          isRecording={isRecording}
          setRecording={setRecording}
          setText={setText}
          setFinalText={setFinalText}
        ></Action>
      </div>
    </div>
  )
}
function Waves() {
  return (
    <div className={styles.waves}>
      <Image className={styles.waves__image} src={waves} alt='waves'></Image>
    </div>
  )
}

export default Talk
