(function() {

    var Invite = function(config, req) {
        this.config = config;
        this.req = req;
    };

    Invite.prototype.run = function() {
        // Get the available channels using the slack token
        var options = {
            url: this.config.slack.url + '/channels.list?token=' + this.config.slack.token
        };

        request(options, processChannels);
    };

    var processChannels = function(error, response, responseBody) {
        var data = JSON.parse(responseBody);
        console.log(data.channels);

        // Get the user ID of jarvis
        // Loop over the channels and see if jarvis is invited to that channel
        // Auto invite Jarvis to the channel
        // https://slack.com/api/channels.invite?token=MY_TOKEN&channel=<channelID>&user=<jarvisId>
    };

    var request = require('request');
    var common = require('./common.js');
    var config = common.config();
    module.exports = new Invite(config, request);
})();
