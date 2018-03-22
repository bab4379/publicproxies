//This policy allows proxies to customize the error content without giving them control over the structure of the error
//The structure of the error is enforced globally and proxies do not have control
context.setVariable("flow.myapi.error.code",context.getVariable("flow.myapi.error.code")||context.getVariable("error.status.code"));

if(!context.getVariable("flow.myapi.error.message")){
    context.setVariable("flow.myapi.error.message",context.getVariable("error.message"));
}

//Override with defacto http error code, if one was not provided explicitly
if(!context.getVariable("flow.myapi.error.httpStatusCode")){
    context.setVariable("flow.myapi.error.httpStatusCode",context.getVariable("error.status.code"));
}

//Override with defacto http error reason phase, if one was not provided explicitly
if(!context.getVariable("flow.myapi.error.httpStatusReason")){
    context.setVariable("flow.myapi.error.httpStatusReason",context.getVariable("error.reason.phrase"));
}

// //If a security threat is detected, do not send details to the client
// if (context.getVariable("threatDetected") === true)  {
//     context.setVariable("flow.myapi.error.message","Bad String");
// }

var errorInfo = context.getVariable("flow.myapi.error.info") ? context.getVariable("flow.myapi.error.info") : ""

//If an explicit error info has not been sent AND Error Details must be displayed, begin to default
if(!errorInfo && (context.getVariable('showErrorDetails') === "true")){
    errorInfo=context.getVariable("error.content")||context.getVariable("response.content")
 }else if(context.getVariable('showErrorDetails') === "false"){
     errorInfo = "";
 }

//The error info from the above variables should ideally by JSON but may be XML/XHTML, Apigee should not fail even if
//target API doesn't return the expected content-type
errorInfo = isJSON(errorInfo) ? errorInfo : ('"'+errorInfo+'"')
context.setVariable('flow.myapi.error.info', errorInfo);

//Extract the request tracking id from the GUID or the header itself in case of proxy chaining
context.setVariable('error.header.RequestTrackingId', context.getVariable('guid')||context.getVariable('error.header.RequestTrackingId'));


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
