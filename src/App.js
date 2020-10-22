import React from 'react';

import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Features from './components/Features/Features';
import Footer from './components/Footer/Footer';

// import Calendar from './components/Calendar/Calendar';

import './style.css';

// const app = React.createElement('div', {classNameNme: 'App'}, 'Привет мир!');

function App() {
  return (
    <React.Fragment>
      <Header />
      <Main />
      <Features />
      <Footer />
    </React.Fragment>
  );
}

export default App;
