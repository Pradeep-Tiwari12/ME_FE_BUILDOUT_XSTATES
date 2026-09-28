import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // Get all countries
  async function apiCountry() {
    try {
      const response = await fetch(
        "https://location-selector.labs.crio.do/countries"
      );

      const data = await response.json();

      setCountry(data);
    } catch (error) {
      console.error(error);
    }
  }

  // Get states when country changes
  async function apiState(countryName) {
    try {
      const response = await fetch(
        `https://location-selector.labs.crio.do/country=${countryName}/states`
      );

      const data = await response.json();

      setState(data);
    } catch (error) {
      console.error(error);
    }
  }

  // Get cities when state changes
  async function apiCity(countryName, stateName) {
    try {
      const response = await fetch(
        `https://location-selector.labs.crio.do/country=${countryName}/state=${stateName}/cities`
      );

      const data = await response.json();

      setCity(data);
    } catch (error) {
      console.error(error);
    }
  }

  // Get countries when application loads
  useEffect(() => {
    apiCountry();
  }, []);

  // Country change
  function handleCountryChange(event) {
    const countryName = event.target.value;

    setSelectedCountry(countryName);

    // Reset state and city
    setSelectedState("");
    setSelectedCity("");
    setState([]);
    setCity([]);

    if (countryName) {
      apiState(countryName);
    }
  }

  // State change
  function handleStateChange(event) {
    const stateName = event.target.value;

    setSelectedState(stateName);

    // Reset city
    setSelectedCity("");
    setCity([]);

    if (stateName) {
      apiCity(selectedCountry, stateName);
    }
  }

  // City change
  function handleCityChange(event) {
    const cityName = event.target.value;

    setSelectedCity(cityName);
  }

  const containerStyle = {
    textAlign: "center",
    padding: "20px",
  };

  const mainStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  };

  const selectStyle = {
    width: "220px",
    height: "35px",
    padding: "5px",
  };

  return (
    <div style={containerStyle}>

      <h1>Select Location</h1>

      <main style={mainStyle}>

        {/* COUNTRY */}
        <select
          style={selectStyle}
          value={selectedCountry}
          onChange={handleCountryChange}
        >
          <option value="">Select Country</option>

          {country.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>


        {/* STATE */}
        <select
          style={selectStyle}
          value={selectedState}
          onChange={handleStateChange}
          disabled={!selectedCountry}
        >
          <option value="">Select State</option>

          {state.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>


        {/* CITY */}
        <select
          style={selectStyle}
          value={selectedCity}
          onChange={handleCityChange}
          disabled={!selectedState}
        >
          <option value="">Select City</option>

          {city.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

      </main>


      {/* RESULT */}
      {selectedCity && (
        <h2>
          You selected {selectedCity}, {selectedState},{" "}
          {selectedCountry}
        </h2>
      )}

    </div>
  );
}

export default App;