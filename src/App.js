import React from 'react';
import './App.css';

class App extends React.Component {

  state={
    memes:[],
    loading:false,
    text:'',
  }

  getMemes = async (e) => {
    // this line prevents the page from reloading (which is the default for <form> elements)
    e.preventDefault()
    // set "loading" to true in the state so we can show a spinner
    this.setState({loading: true})
    // here is our giphy api key
    var key = 'jhQazp87aPuMIRIZoFu2kaI2Uk5GjZRJ'
    // this line make a URL string, I got this from their documentation
    var url = `http://api.giphy.com/v1/gifs/search?q=${this.state.text}&api_key=${key}`
    // "fetch" calls the giphy API!
    var r = await fetch(url)
    // this lines extracts JSON (javascript object notation)
    var json = await r.json()
    // set the memes in state, and loading to false, and the text to blank again
    this.setState({memes: json.data, loading:false, text:''})
  }

  render() {
    var {memes, loading, text} = this.state
    return (
      <div className="App">
        <form className="App-header" onSubmit={this.getMemes}>
          <input value={text}
            onChange={e=> this.setState({text: e.target.value})}
          />
          <button disabled={loading || !text} type="submit">
            Search
          </button>
        </form>
        <main>
          {memes.map(m=>{
            return <img alt="meme" key={m.id}
              src={m.images.fixed_height.url}
            />
          })}
        </main>
      </div>
    );
  }
}

export default App;
