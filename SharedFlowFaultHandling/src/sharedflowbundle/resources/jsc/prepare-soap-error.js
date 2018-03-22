
context.setVariable('guid',context.getVariable('guid')||context.getVariable('error.header.RequestTrackingId')||context.getVariable('request.header.RequestTrackingId'));
context.setVariable('apiError.code', context.getVariable("flow.myapi.error.code")|| 'SERVER');
context.setVariable('apiError.message', context.getVariable("flow.myapi.error.message") || context.getVariable("error.message"));
context.setVariable('apiError.remediationInfo', context.getVariable("flow.myapi.error.remediationInfo")|| 'Not Specified');
context.setVariable('apiError.userMessage', context.getVariable("flow.myapi.error.userMessage")|| 'Not Specified');
 
//Override with defacto http error code, if one was not provided explicitly
if(!context.getVariable("flow.myapi.error.httpStatusCode")){
    context.setVariable("flow.myapi.error.httpStatusCode",context.getVariable("error.status.code"));
}

//Override with defacto http error reason phase, if one was not provided explicitly
if(!context.getVariable("flow.myapi.error.httpStatusReason")){
    context.setVariable("flow.myapi.error.httpStatusReason",context.getVariable("error.reason.phrase"));
}
    