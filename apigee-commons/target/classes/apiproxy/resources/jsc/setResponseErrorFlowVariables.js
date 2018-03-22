context.setVariable("flow.myapi.error.code",context.getVariable("error.status.code"));
context.setVariable("flow.myapi.error.message",context.getVariable("error.message"));
context.setVariable("flow.myapi.error.status",context.getVariable("error.status.code"));
if (context.getVariable("response.content") === null) {
    context.setVariable("flow.myapi.error.info",context.getVariable("error.reason.phrase"));
    
} else {
 context.setVariable("flow.myapi.error.info", context.getVariable("response.content"));
}
context.setVariable("flow.myapi.error.reason",context.getVariable("error.reason.phrase"));
context.setVariable("error.header.RequestTrackingId",context.getVariable("guid"));