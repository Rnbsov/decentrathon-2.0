import { Page } from "@/components/Page"
import { useTranslations } from "next-intl"

import styles from './styles.module.css';
import { cn } from "@/core/utils";
import Character from "./character/character";

import Waves from "./waves/waves";
import Title from "./title/title";
import Action from "./action/action";

export default function AIWelcome() {
    const t = useTranslations('i18n')

    return (
        <div className={styles.welcome}>
            <div className={styles.welcome__content}>
                <Waves></Waves>
                <Character></Character>
                <Title></Title>
                <Action></Action>
            </div>
        </div>
    )
}