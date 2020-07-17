import React from "react";
import { store } from "./store/index.js";
import { Provider } from "react-redux";
//import CountryPicker from "./components/CountryPicker/CountryPicker";
//import Cards from "./components/Cards/Cards";
//import Charts from "./components/Charts/Charts";

//Import Components
import { Cards, CountryPicker, Charts, GlobalSummaryTable } from "./components";
import { Grid, Typography } from "@material-ui/core";
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
      <Provider store={store}>
        <div className={styles.container}>
          <img
            className={styles.image}
            src={cororaTrakerImage}
            alt="COVID-19"
          ></img>
          <Cards data={data}></Cards>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            style={{ marginBottom: "2rem" }}
          >
            <Typography style={{ marginBottom: "3rem" }} variant="h4">
              Covid-19 Summary
            </Typography>
            <Grid container spacing={2} justify="space-around">
              <Grid item xs={12} sm={12} md={12}>
                <GlobalSummaryTable />
              </Grid>
            </Grid>
          </Grid>
          <CountryPicker
            handleCountryChange={this.handleCountryChange}
          ></CountryPicker>
          <Charts data={data} country={country}></Charts>
        </div>
      </Provider>
    );
  }
}

export default App;
