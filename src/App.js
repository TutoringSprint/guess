import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {

  const [guessor, setGuessor] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [length, setLength] = React.useState(0);
  const [weight, setWeight] = React.useState(0);

  const [guesses, setGuesses] = React.useState();

  const [loading, setLoading] = React.useState(false);
  const [response, setResponse] = React.useState("");
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    axios.get("https://tjnz1pstx0.execute-api.ap-southeast-2.amazonaws.com/dev")
    .then(res => {
      console.log(res.data)
      setGuesses(res.data)
    }).catch(err => {
      console.log(error.occurred)
    })
  }, [])

  function handleNameChange(event) {
    setGuessor(event.target.value)
  };

  function handleGenderChange(event) {
    setGender(event.target.value)
  }

  function handleLengthChange(event) {
    setLength(event.target.value)
  }

  function handleWeightChange(event) {
    setWeight(event.target.value)
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("")
    setResponse("")
    setLoading(true)

    await axios.post(
      'https://tjnz1pstx0.execute-api.ap-southeast-2.amazonaws.com/dev/create',
      { "guessor": guessor, "gender": gender, "bb_length": length, "bb_weight": weight }
    ).then(res => {
      setResponse("Successfully saved message.")
    })

    await axios.get("https://tjnz1pstx0.execute-api.ap-southeast-2.amazonaws.com/dev")
    .then(res => {
      setGuesses(res.data)
      setLoading(false)
    })
    .catch(err => {
      setError("An error occurred.")
      setLoading(false)
    })

  }


  return (
    <div>
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
          onChange={handleLengthChange}
          value={length}
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
        <table>
          <thead>
            <tr>
              <th>Guessor</th>
              <th>Gender</th>
              <th>Weight</th>
              <th>Length</th>
            </tr>
          </thead>
          <tbody>
          {guesses && guesses.map(guess => {return (
            <tr key={guess['date']}>
              <td>{guess['guessor']}</td>
              <td>{guess['gender']}</td>
              <td>{guess['bb_weight']}</td>
              <td>{guess['bb_length']}</td>
            </tr>
          )
          })}
          </tbody>
        </table>
    </div>

  );
}

export default App;
