import React, { useState } from "react";
import Select from "react-select";

function App() {
  const [inputData, setInputData] = useState("");
  const [response, setResponse] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (event) => {
    setInputData(event.target.value);
  };

  const handleSelectChange = (options) => {
    setSelectedOptions(options);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/bfhl", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: inputData }),
    })
      .then((response) => response.json())
      .then((data) => setResponse(data));
  };

  const renderResponse = () => {
    if (Object.keys(response).length === 0) return null;
    const filteredResponse = {};
    selectedOptions.forEach((option) => {
      if (option.value === "alphabets") {
        filteredResponse.alphabets = response.alphabets;
      } else if (option.value === "numbers") {
        filteredResponse.numbers = response.numbers;
      } else if (option.value === "highestAlphabet") {
        filteredResponse.highestAlphabet = response.highestAlphabet;
      }
    });
    return (
      <div>
        {Object.keys(filteredResponse).map((key) => (
          <div key={key}>
            <h2>{key}</h2>
            <ul>
              {filteredResponse[key].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1>BFHL Frontend</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputData}
          onChange={handleInputChange}
          placeholder="Enter JSON data"
        />
        <button type="submit">Submit</button>
      </form>
      <Select
        isMulti
        options={[
          { value: "alphabets", label: "Alphabets" },
          { value: "numbers", label: "Numbers" },
          { value: "highestAlphabet", label: "Highest Alphabet" },
        ]}
        value={selectedOptions}
        onChange={handleSelectChange}
      />
      {renderResponse()}
    </div>
  );
}

export default App;
