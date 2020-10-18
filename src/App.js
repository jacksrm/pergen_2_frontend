import React from 'react';
import Routes from './routes';

import background from './assets/pergen_background.svg'

import './global.css';

function App() {
  return (
    <div
      className="body"  
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed'
      }}
    >
      <Routes />
    </div>
  );
}

export default App;
