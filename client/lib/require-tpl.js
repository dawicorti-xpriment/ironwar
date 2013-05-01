
define(['text'], function(text){

    var buildMap = {},
        templateExtension = ".hbs",
        tplParse = function(tpl){

            return tpl.replace(
                /(?:__\(['"])(.+?)(?:['"](?:[ ]*,(.+?))?\))/gi,
                '<span data-i18n="$1" data-vars="$2" />'
            );
//            tpl = tpl.replace(/#%21/g, '#!'); // fix bug firefox
        };

    //API
    return {
        load : function(name, req, onLoad, config) {
            var path = name.substring(name.lastIndexOf(".")) == templateExtension ? name : name + templateExtension;
            text.get(req.toUrl(path), function(data) {
                if (config.isBuild) {
                    buildMap[name] = tplParse(data);
                }
                onLoad(tplParse(data));
            });

        },

        //write method based on RequireJS official text plugin by James Burke
        //https://github.com/jrburke/requirejs/blob/master/text.js
        write : function(pluginName, moduleName, write) {
            if(moduleName in buildMap){
                var content = buildMap[moduleName];
                var content = JSON.stringify(content);
                write('define("'+ pluginName +'!'+ moduleName +'", function(){ return '+ content +';});\n');
            }
        },


       writeFile: function (pluginName, moduleName, req, write, config) {
                var parsed = text.parseName(moduleName),
                nonStripName = parsed.moduleName + parsed.ext,
                fileName = req.toUrl(parsed.moduleName + parsed.ext);


                this.load(nonStripName, req, function (value) {
                    var textWrite = function (contents) {
                        return write(fileName, contents);
                    };
                    textWrite.asModule = function (moduleName, contents) {
                        return write.asModule(moduleName, fileName, contents);
                    };

                    text.write(pluginName, nonStripName, textWrite, config);
                }, config);
            }

    };
});
