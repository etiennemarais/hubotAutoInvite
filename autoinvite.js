(function() {
    var request = require('request');
    var Invite = function(config) {
        this.config = config;
    };

    Invite.prototype.run = function() {
        // Get the available channels using the slack token
        // Get the user ID of jarvis
        // Loop over the channels and see if jarvis is invited to that channel
        // Auto invite Jarvis to the channel
    };

    var common = require('./common.js')
    var config = common.config();
    module.exports = new Invite(config);
})();
