import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Home from './components/Home/Home';
import Features from './components/Features/Features';
import Footer from './components/Footer/Footer';

import Calendar from './components/Calendar/Calendar';
import Details from './components/Details/Details';

import FetchData from './service/FetchData';

import './style.css';

// const app = React.createElement('div', {classNameNme: 'App'}, 'Привет мир!');

class App extends React.Component {

  fetchData = new FetchData();

  state = {
    rocket: 'Falcon 1',
    rocketFeatures: null,
    rockets: [],
    companyInfo: null
  };

  componentDidMount() {
    this.updateFooter();
    this.updateRocket();
  }

  updateFooter() {
    this.fetchData.getCompany()
      .then(companyInfo => {
        this.setState({companyInfo});
      });
  }

  updateRocket() {
    this.fetchData.getRocket()
      .then(data => {
        this.setState({rockets: data.map(item => item.name)});
        return data;
      })
      .then(data => data.find(item => item.name === this.state.rocket))
      .then(rocketFeatures => {
        this.setState({ rocketFeatures });
      });
  }

  changeRocket = (rocket) => {
    this.setState({ rocket }, this.updateRocket);
  };

  render() {
    return (
      <BrowserRouter>
        <Header rockets={this.state.rockets} changeRocket={this.changeRocket} />

        <Route exact path='/'>
          {this.state.companyInfo && <Home company={this.state.companyInfo} />}
        </Route>

        <Route path='/rocket'>
          {this.state.rocketFeatures && <Features {...this.state.rocketFeatures}/>}
        </Route>

        <Route path='/calendar'>
          <Calendar />
        </Route>

        <Route path='/details'>
          <Details />
        </Route>
        
        {this.state.companyInfo && <Footer links={this.state.companyInfo.links} />}
      </BrowserRouter>
    );
  }
}

export default App;
