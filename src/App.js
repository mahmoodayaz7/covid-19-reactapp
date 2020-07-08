import React from "react";

//import CountryPicker from "./components/CountryPicker/CountryPicker";
//import Cards from "./components/Cards/Cards";
//import Charts from "./components/Charts/Charts";

//Import Components
import { Cards, CountryPicker, Charts } from "./components";

//Import Styles
import styles from "./App.module.css";

//Import API
import { fetchData } from "./api";

//Import Images
import cororaTrakerImage from "./images/banner.png";
import "fontsource-roboto";

class App extends React.Component {
  //Create State for Storing Data and Pasing to another Component
  state = {
    data: {},
    country: "",
  };

  //CAlling API Fetch Data
  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
    //console.log(fetchedData);
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country });
    //console.log(fetchedData);
    //console.log(country);
    // fetch the data
    // set the state
  };

  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.container}>
        <img
          className={styles.image}
          src={cororaTrakerImage}
          alt="COVID-19"
        ></img>
        <Cards data={data}></Cards>
        <CountryPicker
          handleCountryChange={this.handleCountryChange}
        ></CountryPicker>
        <Charts data={data} country={country}></Charts>
      </div>
    );
  }
}

export default App;
