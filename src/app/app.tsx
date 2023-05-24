// eslint-disable-next-line @typescript-eslint/no-unused-vars
import DefaultLayout from './layout/default-layout';
import styles from './app.module.scss';

export function App() {
  return (
    <div className={styles.host}>
      <DefaultLayout />
    </div>
  );
}

export default App;
