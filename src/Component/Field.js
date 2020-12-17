import React,{useEffect, useState} from 'react'

function Field({fieldData}) {
  
    const [fieldValue,setFieldValue] = useState([]);
    const [finalFormData, setFinalFormData] = useState([]);
    const [allJsxElement,setAllJsxElement] = useState([]);

    const [allError,setAllError] = useState([]);

    // all Global Variable;
    let allFields = [];
    let element = '';

    // all The Regex for Validation
    const emailRegEx  =  /^([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)@([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)[\\.]([a-zA-Z]{2,9})$/;
    const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    useEffect(() => {
      setAllJsxElement(createField());
    },[fieldValue])

    function handlerButtonTypeButton(){
      console.log("Button Type Button Clicked !")
    }

    function handleButtonTypesubmit(){
      if(allError.length>0) return
         setFinalFormData(fieldValue.map(field => field));
    } 
   
    function handleButtonTypeReset() {
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

  function validatePasswordFiled(e){
    if(!passwordRegEx.test(e.target.value)){
      if(allError.find(err => err.name==='password')) return
      setAllError([...allError,{name: 'password',message: 'Invalid password(It has to be Combination of small-captial-number-and special symbol)'}])
      return;
 }
 else{
    setAllError(allError.filter(err => err.name!=='password'));
 }
  }

  function validateEmail(e){
    if(!emailRegEx.test(e.target.value)){
         if(allError.find(err => err.name==='email')) return
         setAllError([...allError,{name: 'email',message: 'Invalid Email'}])
         return;
    }
    else{
       setAllError(allError.filter(err => err.name!=='email'));
    }
  }

    function validateFiled(e,field){
            switch(field.fieldConfig.type){
                 case 'password': 
                    validatePasswordFiled(e);
                    break;
                 case 'email':
                    validateEmail(e)
                    break
            }
    }

    function handleBulr(e,field){  
      validateFiled(e,field);
      console.log(allError.length)
        if(e.target.value==="") return
        const tempArr = [...fieldValue];
        const currobj = tempArr.find(field => field.name===e.target.name);
         if(!currobj){
          setFieldValue([...fieldValue,{name:e.target.name,value:e.target.value}]);
         }
         else{
           currobj.value = e.target.value;
           setFieldValue(tempArr);
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

       function getAllProps(field) {
          return (
            { ...basicInputProps(field),
              maxLength: field.attributes.maxLength,
              minLength:field?.attributes.minLength,
              size:field?.attributes.size,
              list:field?.attributes.list,
              max:field?.attributes.max,
              min:field?.attributes.min,
              value: field.attributes.value,  required:field?.validation.required,
              placeholder:field?.attributes.placeholder
            }
          )
       }

       function basicInputProps(field){
        return (
         {
           type:field.fieldConfig.type,
           name:field.fieldConfig.name,
           onBlur:(e) => handleBulr(e,field),
          
          }
        )
      }  

    function checkInputTypeField(field){
        switch(field.fieldConfig.type){
          case 'text':
            element =  (<input {...getAllProps(field)}/>)
            break;
          case 'email':
             element =  (<input {...getAllProps(field)}/>)
             break;
          case 'password':
            element = (<input {...getAllProps(field)}/>)
            break;
          case 'range':
             element = (<input {...getAllProps(field)}/>)
             break;
          case 'date':
            element = (<input {...getAllProps(field)}/>)
            break;
          case 'time':
            element = (<input {...getAllProps(field)}/>)
            break;
          case 'radio': 
              element = (<><label>{field.attributes.value}</label><input {...getAllProps(field)}/></>)
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
           {allError.map(eMassage => <p>{eMassage.message}</p>)}
           <div className="container">
            <div className="form"> 
   
             {allJsxElement.map((field,i) => {
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
