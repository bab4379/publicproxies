print(context.getVariable('request.header.content-type'))
 var httpCodeToErrorCodeMapping = 
             {
             '400' :'gateway.client.badrequest',
             '401' :'gateway.authentication.failure',
             '403': 'gateway.authentication.forbidden',
             '500': 'gateway.internal.error'
             };
             
var error = prepareError();
error = JSON.stringify(error)

context.setVariable('apiError', error);

/**
 * Prepares a generic structure for any kind of error encountered within the platform or a target API  
 */
function prepareError(){
    
    //If a security threat is detected, do not send details to the client
    if (context.getVariable("threatDetected") === true)  {
        context.setVariable("flow.myapi.error.message","Bad String");
    }
    
    context.setVariable("guid",context.getVariable('guid')||context.getVariable('error.header.RequestTrackingId'));
    
    //Now preparing error
    var error = {
        
        "code" :context.getVariable("flow.myapi.error.code")|| translateHttpCode(context.getVariable("error.status.code")) ,
        "message" : context.getVariable("flow.myapi.error.message") || context.getVariable("error.message"),
        "trackingId" : context.getVariable('guid')||context.getVariable('error.header.RequestTrackingId'),
        "transient" : context.getVariable("flow.myapi.error.transient") || false
    }
    
     //Override with defacto http error code, if one was not provided explicitly
    if(!context.getVariable("flow.myapi.error.httpStatusCode")){
        context.setVariable("flow.myapi.error.httpStatusCode",context.getVariable("error.status.code"));
    }
    
    //Override with defacto http error reason phase, if one was not provided explicitly
    if(!context.getVariable("flow.myapi.error.httpStatusReason")){
        context.setVariable("flow.myapi.error.httpStatusReason",context.getVariable("error.reason.phrase"));
    }
    
    
    const properties = ['remediationInfo','userMessage', 'documentationUrl'];
    
    properties.forEach(function (property){
        
        var fullyQualifiedPropertyName = 'flow.myapi.error.'+property
        
        if(context.getVariable(fullyQualifiedPropertyName)){
            error[property] = context.getVariable(fullyQualifiedPropertyName);
        }
    })
    
   
    
    if(context.getVariable('showErrorDetails')==="true"){
       error.debugInfo = prepareDebugInfo()
    }
    
    var validationErrors = prepareValidationErrors()
    
    if(validationErrors){
        error.errors = validationErrors;
    }
  
    return error;
}

/**
 * Prepares a debug attachment to aid developers in debugging
 * 
 * Proxy Developers have the choice to populate an explicit reason or allow the backend error response to pass through
 * 
 * Target API Developers can populate a nested debugInfo object as well
 * 
 */
function prepareDebugInfo(){
    
    //If the proxy set an explicit reason for failure, use it. Otherwise, keep defaulting
    var errorReason = context.getVariable("flow.myapi.error.debugInfo.reason") || context.getVariable("error.content")||context.getVariable("response.content")
    
    try{
        errorReason = JSON.parse(errorReason)
    }catch(e){
        //If the error reason is not JSON, just send the stingified version back
        errorReason = ('"'+errorReason+'"')
    }
    
     var debugInfo = {
        "type" : context.getVariable("flow.myapi.error.debugInfo.type") || "error" ,
        "reason" : errorReason,
        "remediationMsg" : context.getVariable("flow.myapi.error.debugInfo.message")|| "Not Specified"
      
    }
    
    var nestedDebugInfo = context.getVariable("flow.myapi.error.debugInfo.debugInfo")
    
        try{
        nestedDebugInfo = JSON.parse(nestedDebugInfo)
    }catch(e){
        //If the error reason is not JSON, just send the stingified version back
        nestedDebugInfo = ('"'+nestedDebugInfo+'"')
    }
    
     if(nestedDebugInfo){
         debugInfo.debugInfo = nestedDebugInfo;
        }
    
   return debugInfo;
   
}

//Allows Target API's to provide a series of validation errors, acts as a pass through
function prepareValidationErrors(){
    
      return context.getVariable("flow.myapi.error.errors")|| [] ;
   
}

/**
 *  Validates if the incoming string has a JSON compliant format
 * */
function isJSON(string){

    try {
        JSON.parse(string);
    } catch (e) {
        return false;
    }
    return true;
}

function translateHttpCode(code){
   return httpCodeToErrorCodeMapping[code]
}

 
             