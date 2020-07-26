import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {

  const [guessor, setGuessor] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [height, setHeight] = React.useState(0);
  const [weight, setWeight] = React.useState(0);

  const [loading, setLoading] = React.useState(false);
  const [response, setResponse] = React.useState("");
  const [error, setError] = React.useState("");

  function handleNameChange(event) {
    setGuessor(event.target.value)
  };

  function handleGenderChange(event) {
    setGender(event.target.value)
  }

  function handleHeightChange(event) {
    setHeight(event.target.value)
  }

  function handleWeightChange(event) {
    setWeight(event.target.value)
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("")
    setResponse("")
    setLoading(true)

    axios.post(
      'https://tjnz1pstx0.execute-api.ap-southeast-2.amazonaws.com/dev/create',
      { "guessor": guessor, "gender": gender, "bb_height": height, "bb_weight": weight }
    ).then(res => {
      setResponse("Successfully saved message.")
      setLoading(false)
    }).catch(err => {
      setError("An error occurred.")
      setLoading(false)
    })
  }


  return (
    <div>
      {/* <form onSubmit={handleSubmit}> */}
        <label>Guessor:</label>
        <input
          type="text"
          name="name"
          onChange={handleNameChange}
          value={guessor}
        />

        <label>Gender:</label>
        <input
          type="text"
          name="message"
          onChange={handleGenderChange}
          value={gender}
        />

        <label>Height:</label>
        <input
          type="text"
          name="message"
          onChange={handleHeightChange}
          value={height}
        />

        <label>Weight:</label>
        <input
          type="text"
          name="message"
          onChange={handleWeightChange}
          value={weight}
        />

        <button type="submit" onClick={handleSubmit} disabled={loading}>Send</button>
        {
          error && <div>{error}</div>
        }
        {
          response && <div>{response}</div>
        }
      {/* </form> */}
    </div>
  );
}

export default App;
