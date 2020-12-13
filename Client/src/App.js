import logo from './logo.svg';
import UploadPhoto from './uploadPhoto';
import SearchBar from './searchBar';
import {Route, BrowserRouter, Link} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <UploadPhoto />
  	  <SearchBar />
    </div>
  );
}

export default App;
