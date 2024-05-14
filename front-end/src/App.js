import { Route, Routes } from 'react-router-dom';
import './App.css';
import { CustomerRouter } from './routers/CustomerRouter';
import Error404 from './error/404';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/*' element={<CustomerRouter/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
