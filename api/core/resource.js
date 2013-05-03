var _ = require('underscore');

function Resource(options) {
    _.bindAll(this);
    this.initialize(options);
}

Resource.prototype.initialize = function (options) {};

Resource.prototype.resolve = function (req, res) {
    var resolve_list = [
            {url: '^/api/' + this.name + '$', cb: this.fetchAll, method: 'get'},
            {url: '^/api/' + this.name + '/[0-9]+$', cb: this.fetchOne, method: 'get'},
        ],
        result = '';
    _.each(resolve_list, function (rule) {
        if (req.method.toLowerCase() === rule.method) {
            var pattern = req.url.match(new RegExp(rule.url)),
                options = {req: req, res: res};
            if (pattern) {
                if (pattern.length > 3) {
                    options.id = pattern[1];
                }
                rule.cb(options);
            }
        }
    }, this);
};

Resource.prototype.fetchAll = function (options) {
    var Model = require('../models/' + this.model);
    Model.find(function (err, objects) {
        if (!!err) console.log(err);
        options.res.send(objects);
    });
    
};

Resource.prototype.fetchOne = function (options) {
    options.res.send('one');
};


Resource.extend = function (def) {
    var constructor = Resource;
    function ChildConstructor(options) {
        _.bindAll(this);
        this.initialize(options);
    }
    _.extend(ChildConstructor.prototype, constructor.prototype);
    _.extend(ChildConstructor.prototype, def);
    return ChildConstructor;
}

module.exports = Resource;

