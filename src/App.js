import './App.css';

import React,{useState} from 'react';

import Field from './Component/Field';
import fieldData from './data/data.json';

function App() {

  return (
    <div className="App" >
         <Field fieldData={fieldData}/>
    </div>
  );
}

export default App;
