 var authorization = context.getVariable('request.header.Authorization');
 context.setVariable('tokenAvailable', false);
 if  (authorization.includes("Bearer")){
     context.setVariable('tokenAvailable', true);
 }

 