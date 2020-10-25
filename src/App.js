import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/Header/Header';
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
    rocketsData: [],
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
        this.setState({
          rockets: data.map(item => item.name),
          rocketsData: data,
        });
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

  findRocketFeature(name) {
    return this.state.rocketsData.find(item => item.name.replace(' ', '_') === name);
  }

  render() {
    return (
      <BrowserRouter>
        <Header rockets={this.state.rockets} changeRocket={this.changeRocket} />

        <Route exact 
          path='/' 
          render={() => this.state.companyInfo && <Home company={this.state.companyInfo} />} />

        {/* 
        //такой вариант мало используют
        // в нем не передать параметры пути
        <Route path='/rocket'>
          {this.state.rocketFeatures && <Features {...this.state.rocketFeatures}/>}
        </Route> 
        */}
        <Route path='/rocket/:rocket'
          render={({match}) => {
            const feature = this.findRocketFeature(match.params.rocket);
            return feature && <Features {...feature} match={match}/>
          }} />

        <Route path='/calendar' component={Calendar} />
        <Route path='/details/:id' component={Details} />

        
        {this.state.companyInfo && <Footer links={this.state.companyInfo.links} />}
      </BrowserRouter>
    );
  }
}

export default App;
