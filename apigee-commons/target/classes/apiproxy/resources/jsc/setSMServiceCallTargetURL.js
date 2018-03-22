var spsTargetURL = context.getVariable('sps.targeturl');
var targetenv = context.getVariable('verifyapikey.verify-Api-Key.environment')
var authenticateTargetURL = context.getVariable('sps.authenticate.targetPath');
authenticateTargetURL = authenticateTargetURL.replace('Environment', targetenv + '-swp' );
var authorizeTargetURL = context.getVariable('sps.authorize.targetPath');
authorizeTargetURL = authorizeTargetURL.replace('Environment', targetenv + '-swp' );
context.setVariable('servicecallout.smAuthenticationRequestCallout.target.url', spsTargetURL);
context.setVariable('sps.authenticate.targetPath', authenticateTargetURL);
context.setVariable('servicecallout.smAuthorizationRequestCallout.target.url', spsTargetURL);
context.setVariable('sps.authorize.targetPath', authorizeTargetURL);
