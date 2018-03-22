 var b1 = JSON.parse(response.content),
    propertiesToRemove = ['action', 'application',
                         'params', 'path',
                         'uri','timestamp','duration','organization','applicationName','count','entities.[0].metadata'];//$[:1].unicode
//'entities.uuid','entities.type','entities.created','entities.modified'

    propertiesToRemove.forEach(function(item){
      delete b1[item];
    });


context.setVariable('response.content', JSON.stringify(b1, null, 2));