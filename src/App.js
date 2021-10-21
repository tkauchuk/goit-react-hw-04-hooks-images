import { useState } from 'react';
import './App.css'

import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";

function App() {

  const [query, setQuery] = useState('');

  return (
    <div className='AppContainer'>
      <Searchbar
        onSubmit={setQuery}
      />
      <ImageGallery
        keyword={query}
      />
    </div>
  );
}

export default App;
