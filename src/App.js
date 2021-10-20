import { Component } from "react";
import './App.css'

import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";

class App extends Component {
  
  state = {
    query: '',
  }

  handleQueryFormSubmit = value => {
    this.setState({query: value});
  }


  render() {
    return (
      <div className="AppContainer">
        <Searchbar
          onSubmit={this.handleQueryFormSubmit}
        />
        <ImageGallery
          keyword={this.state.query}
        />
      </div>
    );
  }
}

export default App;
