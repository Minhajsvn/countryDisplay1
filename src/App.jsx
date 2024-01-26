import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [countries, setCountries] = useState([]);

  const fetchCountries = async () => {
    try {
        const data = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(data.data);
    } catch (error) {
        console.log(error);
    }
  };

  const cardStyle = {
    width: "300px",
    height: "250px",
    objectFit: "contain",
    overflow: "hidden",
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "10px",
    margin: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const divStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  };

  useEffect(() => {
    fetchCountries();
  }, []);
  return (
    <div style={divStyle}>
      {countries.map((country) => (
        <div key={country.name.common} style={cardStyle}>
          <img
            src={country.flags.png}
            alt={`Flags of ${country.name.common}`}
          />
          <h3>{country.name.common}</h3>
        </div>
      ))}
    </div>
  );
}
