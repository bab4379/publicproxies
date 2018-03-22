var request_headers = context.getVariable("request.headers.names");
context.setVariable('paramError', false);
requestHeaders = request_headers + '';
requestHeaders = requestHeaders.slice(1, -1).split(', ');
requestHeaders.forEach(function(x)
{
    var values = context.getVariable("request.header." + x );
    if (/<s*script[^>]*>[^<]+<s*\/s*scripts*>/g.test(values)) {
        context.setVariable("paramError", true);
    }
});
