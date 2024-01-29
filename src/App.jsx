import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState("");

  const fetchCountries = async () => {
    try {
        const data = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(data.data);
    } catch (error) {
        console.log(error);
    }
  };

  const fetchSearchCountries = async (searchText) => {
    try {
        const data = await axios.get(`https://restcountries.com/v3.1/name/${searchText}`);
        setCountries(data.data);
    } catch (error) {
      if(error.response.data.status == 404){
        setCountries([])
        console.log(error.message);
      }
    }
  };

  const handleChange =(e) => {
    setSearchText(e.target.value);
  }

  const inputDiv = {
    width: "100%",
    backgroundColor: "#33464c",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  }

  const inputTag = {
    width: "600px",
    height:"30px",

  }

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

  useEffect(() => {
    fetchSearchCountries(searchText);

  },[searchText, countries]);

  return (
    <div>
      <div style={inputDiv}>
        <input style={inputTag} type="text" placeholder="Search for countries" onChange={handleChange} value={searchText}/>
      </div>
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
    </div>
  );
}
