var environment = context.getVariable('targetHost');
var proxyEndPoint = context.getVariable("proxy.pathsuffix");
var queryString = context.getVariable("request.querystring");
context.setVariable('isTargetUrlEmpty', true);
if((environment !== null) && (environment !== "") && (environment !== undefined)) {
    var url = context.getVariable("target.url");
    var resourcePath='';
    var splitURL = url.split('/');
    var targetUrl = '';
    for(var i=3; (splitURL.length > 3 && i < splitURL.length); i++) {
	    resourcePath =resourcePath + "/" + splitURL[i];
    }
    if((proxyEndPoint !== null)&& (proxyEndPoint !== "") && (proxyEndPoint !== undefined)){
    	targetUrl =  environment + resourcePath + proxyEndPoint;
	}
	else if((proxyEndPoint === null) || (proxyEndPoint === "") || (proxyEndPoint === undefined)){
		targetUrl =  environment + resourcePath;
	}
    if((queryString !== null) && (queryString !== "") && (queryString !== undefined)){
    	targetUrl =  targetUrl+ '?' + queryString;
    }
    context.setVariable("target.url", targetUrl);
    context.setVariable('isTargetUrlEmpty', false);
} else {
	context.setVariable("target.url", "http://" + " ");
	context.setVariable('isTargetUrlEmpty', true);
}
