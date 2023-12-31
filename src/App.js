
import Header from "./components/Header/Header";
import './App.css'
import SimpleBottomNavigation from "./components/Navbar/MainNav";
import { Container} from "@mui/material";
import {BrowserRouter, Route,Routes} from 'react-router-dom';

import Trending from "./Pages/Trending/Trending";
import Series from "./Pages/Series/Series";
import Movies from "./Pages/Movies/Movies";
import Search from "./Pages/Search/Search";






function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="app">
        <Container>
          <Routes>
            <Route path='/' element={<Trending/>} exact/>
            <Route path='/movies' element={<Movies/>}/>
            <Route path='/series' element={<Series/>}/>
            <Route path='/search' element={<Search/>}/>
            
            </Routes>
       
        </Container>
      </div>
      <SimpleBottomNavigation/>

    </BrowserRouter>  
    
  );
}

export default App;
