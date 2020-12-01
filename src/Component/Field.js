import React,{useState} from 'react'

function Field({fieldData}) {

    const [text,setText] = useState('')
    const [fieldValue,setFieldValue] = useState([]);
    const [finalFormData, setFinalFormData] = useState()

    let allFields = [];
    let element = ''



   

    function handleOnchange(e,field) {
        setText(e.target.value)
    } 

    function handleBulr(e,field){ 
      //apply validation here 
        if(e.target.value==="") return
        if(fieldValue.length===0) return setFieldValue([...fieldValue,{name:field.attributes.name,value:e.target.value}])
        if(fieldValue.length>0){
            if(fieldValue.find(field => field.name===e.target.value)===undefined){
              setFieldValue([...fieldValue,{name:field.attributes.name,value:e.target.value}])
            }
            const tempArr=fieldValue.filter(field => field.name!==e.target.name)
            tempArr.push({name: field.attributes.name,value: e.target.value})
            setFieldValue(tempArr)
        }
    }

    function createLabel(field) {
        return element = (<label>{field.attributes.value}</label>)
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
           console.log(field)
           return element = (
                       <select name={field.attributes.name}>
                           {field.options.map(option => {
                               return(
                                <option 
                                    key={option.key} 
                                    value={option.value}>
                                  {option.displayName}
                            </option>
                               )
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
                          onChange={(e) => handleOnchange(e,field)}
                          onBlur={(e) => handleBulr(e,field)}
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
                    onChange={(e) => setText(e.target.value)}
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
                      onChange={(e) => setText(e.target.value)}
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
    
    function displayDataHandler(){
      
    }

    return (
        <div>
           {createField()}
           {finalFormData && finalFormData.map(form => <h1>{form}</h1>)}
           <div className>
                <button onClick={(e) => setFinalFormData(fieldValue.map(field => field.value))}>Get Data</button>
           </div>
   
        </div>
    )
}

export default Field
