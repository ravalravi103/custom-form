import './App.css';

import React,{useState} from 'react'

import fieldData from './data/data.json';

function App() {
  const [value,setValue] = useState('');

  const onInputChange = (e) => {
      setValue(e.target.value)
  }
  
  return (
    <div className="App" >
             <div>
             <h1>Contact Form</h1>
             {fieldData.map((field,i) => {
            return (
              <div key={i} className="input-card">
                   <label>{field.UILabel}</label>
                   <input 
                    type={field.type}
                    onChange={(e) => onInputChange(e)}
                    placeholder={field.attributes.placeholder}
                    min={field.attributes.min}
                    max={field.attributes.max}
                    maxLength={field.attributes.maxLength}
                    minLength={field.attributes.minLength}
                    multiple={field.attributes.multiple}
                    step={field.attributes.step}
                    formAction={field.attributes.formaction}
                    formEncType={field.attributes.formenctype}
                    formNoValidate={field.attributes.fromonvalidate}
                    formTarget={field.attributes.formTarget}
                    fromonvalidate={field.attributes.fromonvalidate}
                    src={field.attributes.src}
                    width={field.attributes.width}
                    height={field.attributes.height}
                    alt={field.attributes.alt}
                    required={field.attributes.required}
                    checked={field.attributes.checked}
                    pattern={field.attributes.pattern}
                    list={field.attributes.list}
                    value={field.attributes.value}
                    name={field.attributes.name}
                    />
              </div>
            )
          })}
             </div>


          <div>{value}</div>
    </div>
  );
}

export default App;
