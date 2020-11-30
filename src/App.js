import './App.css';

import React,{useState} from 'react';

import fieldData from './data/data.json';

function App() {

   let allFields = [];
   let element = ''

   function createLabel() {
     
   }

   function createTextArea(field){
      return element = (<textarea 
                          name={field.attributes.name}
                          rows={field.attributes.rows}
                          cols={field.attributes.cols}
                          ></textarea>)
   }

  function createButton(field){
  return element = (<button
                      formAction={field.attributes.formAction}
                      formEncType={field.attributes.formEncType}
                      formMethod={field.attributes.formMethod}
                      formTarget={field.attributes.target}
                      >
                      {field.attributes.value}
                    </button>)
  }

  function createSelectField(field){
      return element = (
                  <select name={field.attributes.name}>
                      {field.options.map(option => {
                            <option 
                                key={option.key} 
                                value={option.value}>
                                  {option.displayValue}
                            </option>
                      })}
                  </select>)
        
  }

  function checkInputTypeField(field){
    switch(field.fieldConfig.type){
      case 'text':
        element =  (<input
                      type={field.fieldConfig.type}
                      name={field.attributes.name}
                      placeholder={field.attributes.placeholder}
                      maxLength={field.attributes.maxLength}
                      minLength={field.attributes.minLength}
                      size={field.attributes.size}
                      list={field.attributes.list}
                      required={field.validation.required}
                  />)
          break;
        case 'password':
              element = (<input
                type={field.fieldConfig.type}
                name={field.attributes.name}
                placeholder={field.attributes.placeholder}
                maxLength={field.attributes.maxLength}
                minLength={field.attributes.minLength}
                size={field.attributes.size}
                list={field.attributes.list}
                required={field.validation.required}
            />)
          break;
        case 'radio': 
                element = (<input
                  type={field.fieldConfig.type}
                  name={field.attributes.name}
                  placeholder={field.attributes.placeholder} 
                  value={field.attributes.value}      
                  required={field.validation.required}
                />)

    }
    return element
  }

  const createField = () => {
    fieldData.map(field => {
          switch(field.fieldName) {
            case 'input':
                element =  checkInputTypeField(field);
                allFields.push(element)
               break;
             case 'select':
                 element = createSelectField(field);
                 allFields.push(element)
               break;
             case "button": 
                  element = createButton(field);
                  allFields.push(element);
                break;
              case 'textarea':
                  element = createTextArea(field);
                  allFields.push(element);
                break;
              case 'label': 
                   element = createLabel(field);
                   allFields.push(element);
                break;
           }
           
    })
    return allFields;
}
  
  return (
    <div className="App" >
         {createField()}
    </div>
  );
}

export default App;
