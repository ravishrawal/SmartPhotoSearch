import logo from './logo.svg';
import UploadPhoto from './uploadPhoto';
import SearchBar from './searchBar';
import {Route, BrowserRouter, Link} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div className="container">
      	  <h1 className="display-4"> Photo Album </h1>
      	  <hr />
	      <div className="row">
		      <UploadPhoto />
	      </div>
	      <hr />
	      <div className="row">
		  	  <SearchBar />
	  	  </div>
  	  </div>
    </div>
  );
}

export default App;
