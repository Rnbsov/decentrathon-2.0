
import { cn } from "@/core/utils";
import styles from './title.module.css';

function Title() {
    return (
        <div className={cn(styles.title)}>
            How may I help <br/> you today!
        </div>
    );
}

export default Title;