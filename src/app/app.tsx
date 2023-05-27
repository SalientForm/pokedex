import { Outlet } from 'react-router';
import { defaultLayoutConfig } from './config/default-layout.config';
import DefaultLayout from './layout/default-layout';

export function App() {
  return (
    <DefaultLayout layoutProps={defaultLayoutConfig}>
      <Outlet />
    </DefaultLayout>
  );
}

export default App;
