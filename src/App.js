import './App.css';

import React,{useState} from 'react'

import fieldData from './data/data.json';

function App() {
  const [value,setValue] = useState('')
  return (
    <div className="App" >
          {fieldData.map((field,i) => {
            return (
              <div key={i} className="input-card">
                   <label>{field.UILabel}</label>
                   <input 
                    type={field.type}
                    // placeholder={field.attributes.placeholder}
                    // value={field.attributes.value}
                    />
              </div>
            )
          })}
    </div>
  );
}

export default App;
