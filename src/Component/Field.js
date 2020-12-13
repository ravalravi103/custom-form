import React,{useState} from 'react'

function Field({fieldData}) {

    const [text,setText] = useState('')
    const [fieldValue,setFieldValue] = useState([]);
    const [finalFormData, setFinalFormData] = useState([])

    let allFields = [];
    let element = ''

    function handlerButtonTypeButton(){
      console.log("Button Type Button Clicked !")
    }

    function handleButtonTypesubmit(){
         console.log("Button Type Submit  clicked !")
         setFinalFormData(fieldValue.map(field => field));
    } 
   
    function handleButtonTypeReset() {
        setText('')
        setFinalFormData([]);
    }


   function fieldClickhandler(e) {
        switch(e.target.type){
          case 'button': 
             handlerButtonTypeButton();
             break;
           case 'submit': 
             handleButtonTypesubmit();
             break;
           case "reset":
             handleButtonTypeReset();
             break;
        }
   }

    function handleOnchange(e,field) {
        setText(e.target.value)
    } 

    function handleBulr(e,field){ 
       console.log('Valiodation Passed !')
        if(e.target.value==="") return
        if(fieldValue.length===0) return setFieldValue([{name:e.target.name,value:e.target.value}])
        if(fieldValue.length>0){
            if(fieldValue.find(field => field.name===e.target.value)===undefined){
              setFieldValue([...fieldValue,{name:e.target.name,value:e.target.value}])
            }
            const tempArr=fieldValue.filter(field => field.name!==e.target.name)
            tempArr.push({name: e.target.name,value: e.target.value})
            setFieldValue(tempArr)
        }
    }

    function createLabel(field) {
        return element = (<label>{field.attributes.value}</label>)
        }
     
        function createTextArea(field){
           return element = (<textarea 
                               name={field.fieldConfig.name}
                               rows={field.attributes.rows}
                               cols={field.attributes.cols}
                               ></textarea>)
        }
     
       function createButton(field){
       return element = (<button
                           type={field.fieldConfig.type}
                           formAction={field.attributes.formAction}
                           formEncType={field.attributes.formEncType}
                           formMethod={field.attributes.formMethod}
                           formTarget={field.attributes.target}
                           onClick={(e) => fieldClickhandler(e)}
                           >
                           {field.attributes.value}
                         </button>)
       }

       function createSelectField(field){
           return element = (
                       <select 
                         name={field.fieldConfig.name} 
                         onChange={(e) => handleOnchange(e)} 
                         onBlur={(e) => handleBulr(e)}>
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

       function basicInputProps(field){
        return (
         (!field.attributes) ? {
            type:field.fieldConfig.type,
            name:field.fieldConfig.name,
            onChange:(e) => handleOnchange(e,field),
            onBlur:(e) => handleBulr(e,field),
          } : {
           type:field.fieldConfig.type,
           name:field.fieldConfig.name,
           onChange:(e) => handleOnchange(e,field),
           onBlur:(e) => handleBulr(e,field),
           required:field.validation.required,
           placeholder:field.attributes.placeholder,  
          }
        )
      
      }  

    function checkInputTypeField(field){
        switch(field.fieldConfig.type){
          case 'text':
            element =  (<input
                          {...basicInputProps(field)}
                          maxLength={field.attributes.maxLength}
                          minLength={field.attributes.minLength}
                          size={field.attributes.size}
                          list={field.attributes.list}
                      />)
              break;
              case 'email':
                element =  (<input
                              {...basicInputProps(field)}
                              maxLength={field.attributes.maxLength}
                              minLength={field.attributes.minLength}
                              size={field.attributes.size}
                              list={field.attributes.list}
                          />)
                  break;
            case 'password':
                  element = (<input
                    {...basicInputProps(field)}
                    maxLength={field.attributes.maxLength}
                    minLength={field.attributes.minLength}
                />)
              break;
              case 'range':
                element = (<input
                  {...basicInputProps(field)}
                  max={field.attributes.max}
                  min={field.attributes.min}
              />)
            break;
            case 'date':
              element = (<input {...basicInputProps(field)}/>)
          break;
          case 'time':
            element = (<input {...basicInputProps(field)}/>)
        break;
            case 'radio': 
                 element = (<><label>{field.attributes.value}</label><input
                      {...basicInputProps(field)}
                      value={field.attributes.value}     
                    /></>)
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
        <div >
           <div className="container">
            <div className="form"> 
              {createField().map((field,i) => {
                return (
                  <div className="form-group" key={i}>
                       <div className="form-control">{field}</div>
                  </div>
                )
            })}
            </div>
            <div className="card">
                {finalFormData && finalFormData.map(form => {
                return (
                      <div className="card-data">
                        <h3>{form.name}: {form.value}</h3>
                      </div>
                )
              })}
            </div>
           </div>
        </div>
    )
}

export default Field
