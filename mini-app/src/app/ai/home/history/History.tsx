
import styles from './history.module.css';

import conversation from './../../../_assets/cards/conversation.svg';
import picture from './../../../_assets/cards/picture.svg';
import rumor from './../../../_assets/cards/rumor.svg';
import Image from 'next/image';
import { cn } from '@/core/utils';

function History() {
    return (
        <div className={styles.history}>

            <div className={styles.history__upper}>
                <div className={styles.title}>
                    History
                </div>
                <div className={styles.see_all}>
                    See all
                </div>
            </div>

            <div className={styles.history__content}>
                <Item text='My stomach hurts' type='speech'></Item>
                <Item text='Pain in the head' type='image'></Item>
                <Item text='Hello Cough tablets' type='chat'></Item>
            </div>

        </div>
    );
}

function Item(props: {
    type: 'speech' | 'chat' | 'image',
    text: string
}) {

    let types = {
        speech: {
            icon: rumor,
            style: styles.item__primary
        },
        chat: {
            icon: picture,
            style: styles.item__pink
        },
        image: {
            icon: conversation,
            style: styles.item__purple
        }
    };

    return (
        <div className={styles.item}>
            <div className={cn(styles.item__icon, types[props.type].style)}>
                <Image className={styles.item__icon__image} src={types[props.type].icon} alt='type'></Image>
            </div>
            <div className="item__text">
                {props.text}
            </div>
        </div>
    )
}

export default History;