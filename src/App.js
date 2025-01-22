import Header from './components/Header';
import Home from './components/Home';
import ContextProvider from './context/context';

function App() {
  return (
    <ContextProvider>
        <Header />
        <Home />
    </ContextProvider>
  );
}

export default App;
