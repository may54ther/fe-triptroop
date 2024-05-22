
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "./layouts/layout";
import Error from "./pages/error/Error";
import './Common.css';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Layout/> }></Route>
          <Route path="*" element={ <Error/> }/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
