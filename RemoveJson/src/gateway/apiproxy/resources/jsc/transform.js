var respObj = response.content.asJSON;
response.content = '';
response.headers['Content-Type'] = 'application/json';
var body = response.content.asJSON;

body.apiVersion = "1.0";
body.potatos = [];

var data = respObj.entities;
for(var i in data)
{
     var potato = {
         "Notes1": data[i]["Notes"],
         "Price" : data[i]["Price"],
         "weight": data[i]["weight"]
     };
     body.potatos.push(potato);
} 