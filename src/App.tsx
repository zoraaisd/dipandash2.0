import AppRouter from './routes/AppRouter';
import { useLenis } from './hooks/useLenis';

const App = () => {
  useLenis();
  return <AppRouter />;
};

export default App;
