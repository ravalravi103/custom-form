import React,{useState} from 'react'

function Field({fieldData}) {

    const [text,setText] = useState('')
    const [fieldValue,setFieldValue] = useState([])

    let allFields = [];
    let element = ''


    function storefieldata(e,field){
        
    }

    function validateField(e,field){
         
        //1. Validate Fields 

        // 2. If validation Pass Then store The data
            storefieldata(e,field);
    }


    function handleOnchange(e,field) {
        setText(e.target.value)
    } 

    function handleBulr(e,field){

        // 1. validate The Field
            // validateField(e,field);
            
        if(e.target.value==="") return
        // check all The Element of fieddata and 
        //fieldData.length===0 add Element 
        // fieldData.length>0
                // compare that element.name === target.name
                // element.name === target.name => Remove element value 
                // elment.name !== targtet.name => add Element Value

        if(fieldValue.length===0)  {
            console.log("[fieldvValue.length ===0]")
            console.log(e.target.value)
            setFieldValue([...fieldValue,{name:field.attributes.name,value:e.target.value}])
          
        }
        if(fieldValue.length>0){
            console.log("fieldValue.length >0")
            fieldValue.map(tempField => {
                if(tempField.name!==e.target.name){
                     // add The Element Value
                     console.log('Value for This Field Not Exist');
                     console.log(e.target.value)
                     setFieldValue([...fieldValue,{name:field.attributes.name,value:e.target.value}])
                     console.log(fieldValue);
                }
                else {
                    // Remove Element Value
                    console.log('value for This Field alreay Exist Remove The Value and add new value')
                    const tempArr = fieldValue.filter(field => field.name !==e.target.name)
                    console.log(tempArr)
                }
            })
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
      
    return (
        <div>
           {createField()}
           {text}
           {console.log(fieldValue)}
            {fieldValue.map(field => <h1>{field.value}</h1>)}
        </div>
    )
}

export default Field
