function getCookie(cname) {
    var cookieHeaders = context.getVariable('request.header.cookie.values')+'';
    var ca = cookieHeaders.substring(1, cookieHeaders.length-1).split(';');
    for (var i = 0; i < ca.length; i++) {
        var cookieSplit = ca[i].split('=');
        var cookieName = cookieSplit[0].trim();
        if (cookieName == cname) {
            return cookieSplit[1].trim();   
        }
    }
    return "";
}
var smgwpsession = getCookie("SMGWPSESSION");
context.setVariable('sessionToken', smgwpsession);
