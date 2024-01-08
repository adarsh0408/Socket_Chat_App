import { Route } from 'react-router-dom';
import './App.css';
import { Button } from '@chakra-ui/react';
import HomePage from './HomePage';
import ChatPage from './ChatPage';
function App() {
  return (
   <>
   <Route path="/" component={HomePage} exact/>
   <Route path="/chatpage" component={ChatPage}/>
   </>
  );
}

export default App;
