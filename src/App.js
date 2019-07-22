import React from 'react';
import './App.css';

// CHANGED!!!!!!

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
    // extract the pieces of state so we can use them easily in our HTML code
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
          {memes.map(meme=>{
            // "map" loops over each meme and returns a <Meme> component
            return <Meme key={meme.id} meme={meme} />
          })}
        </main>
      </div>
    );
  }
}

// the Meme component is very simple
// it just returns a <div> with an <img> inside it
// the "src" of the <img> is the URL that is given to us by the giphy API
function Meme(props){
  const {meme} = props
  const url = meme.images.fixed_height.url
  return (<div className="meme-wrap" onClick={()=>window.open(url, '_blank')}>
    <img height="200" alt="meme" src={url} />
  </div>)
}

export default App;
