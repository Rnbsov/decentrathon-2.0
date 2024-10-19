import Image from 'next/image'
import styles from './cards.module.css'
import { cn } from '@/core/utils'

import conversation from './../../../_assets/cards/conversation.svg';
import picture from './../../../_assets/cards/picture.svg';
import rumor from './../../../_assets/cards/rumor.svg';

import arrow from './../../../_assets/cards/arrow.svg';
import Link from 'next/link';

function Cards() {
  return (
    <div className={styles.cards}>
      <div className={styles.cards__content}>

        <Side columns={false}>
          <Card isFull={true} icon={rumor} text={<>Talk <br /> with <br /> Bot</>} color='primary' url='/ai/talk'></Card>
        </Side>

        <Side columns={true}>
          <Card isFull={false} icon={conversation} text='Chat with Bot' color='purple' url='/'></Card>
          <Card isFull={false} icon={picture} text='Ask by Image' color='pink' url='/'></Card>
        </Side>

      </div>
    </div>
  )
}

function Side(props: {
  columns: boolean,
  children: any
}) {

  return (
    <div className={cn(styles.side, props.columns ? styles.side__col : '')}>
      {props.children}
    </div>
  )
}

function Card(props: {
  isFull: boolean,
  icon: any,
  text: string | any,
  color: 'primary' | 'pink' | 'purple',
  url: string
}) {

  let colors = {
    primary: styles.card__primary,
    pink: styles.card__pink,
    purple: styles.card__purple
  };

  return (
    <Link href={props.url}>
      <div className={cn(styles.card, props.isFull ? styles.card__full : '', colors[props.color] || '')}>

        <div className={styles.card__upper}>
          <div className={styles.card__upper__content}>
            <div className={styles.card__icon}>
              <Image className={styles.card__icon__image} alt='Icon' src={props.icon}></Image>
            </div>

            <div className={styles.card__arrow}>
              <Image className={styles.card__arrow__image} src={arrow} alt='arrow'></Image>
            </div>
          </div>
        </div>

        <div className={cn(styles.card__text, props.isFull ? styles.card__text__full : '')}>
          {props.text}
        </div>
      </div>
    </Link>
  )
}

export default Cards
