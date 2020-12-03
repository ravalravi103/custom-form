[
    // Input Type Radio
    {
        "fieldName" : "input",
        "fieldConfig": {
            "type":"radio"
        },
        "attributes": {
              "name":"gender",
              "value": "Female"
        },
        "validation": {
            "required": true
        } 
      },


    // Input Type Password
    {
        "fieldName" : "input",
        "fieldConfig": {
            "type":"password",
            "value": ""
            
        },
        "attributes": {
              "name": "password",
              "value": "",
              "minLength": "minLength",
              "maxlength": "maxLength",
              "placeholder":"Password*",
              "size": "size",
              "randomly": "true",
              "list": "list"
        },
        "validation": {
            "required": true
        } 
      },



    //   Input Type text
    {
        "fieldName" : "input",
        "fieldConfig": {
            "type":"text"
        },
        "attributes": {
              "name": "email",
              "value": "",
              "minLength": "minLength",
              "maxlength": "maxLength",
              "placeholder":"Email*",
              "size": "size",
              "randomly": "true",
              "list": "list"
        },
        "validation": {
            "required": true
        } 
      },

    //   Input Type Range 
    {
        "fieldName" : "input",
        "fieldConfig": {
            "type":"range"
        },
        "attributes": {
              "name": "email",
              "max":100,
              "min": 1,
              "size": "size",
              "randomly": "true",
              "list": "list"
        },
        "validation": {
            "required": true
        } 
      },

      //   Input Type Date 
    {
        "fieldName" : "input",
        "fieldConfig": {
            "type":"date"
        },
        "attributes": {
              "name": "date",
        },
        "validation": {
            "required": true
        } 
      },



    // Select Element 
    {
        "fieldName" : "select",
        "fieldConfig": {
            "type":"text"
        },
        "options":[
            {"key":"India","value":"India","displayName":"India"},
            {"key":"Pakistan","value":"Pakistan","displayName":"Pakistan"},
            {"key":"Japan","value":"Japan","displayName":"Japan"},
            {"key":"Canada","value":"canada","displayName":"canada"}
        ],
        "attributes": {
              "name": "email",
              "value": ""
        }
      },

    //  "Button Type Submit"
    {
        "fieldName" : "button",
        "fieldConfig": {
            "type":"submit"
        },
        "attributes": {
              "name": "email",
              "value": "Submit"
        }
      },

