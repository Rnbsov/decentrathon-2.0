
import Cards from './cards/cards';
import Header from './header/header';
import History from './history/History';
import styles from './styles.module.css';
import Effect from './effect/effect';

function Home() {
    return (
        <div className={styles.home}>

            <Effect></Effect>

            <Header></Header>

            <div className={styles.title}>
                How may I help <br/> you today?
            </div>

            <Cards></Cards>

            <History></History>            

        </div>
    );
}

export default Home;