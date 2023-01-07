import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <form>
        <fieldset>
          <label>
            <p>Name</p>
            <input name="name" />
          </label>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
