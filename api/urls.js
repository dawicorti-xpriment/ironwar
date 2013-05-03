module.resources = [
    require('./resources/users')
];

module.exports = {
    
    register: function (app) {
        module.resources.forEach(function (ResourceType) {
            app.get(new RegExp('^/api/' + ResourceType.prototype.name + '(/[0-9]+)*'), function (req, res) {
                var resource = new ResourceType();
                resource.resolve(req, res);
            });
        });
    }

}