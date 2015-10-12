// Utility dependencies need to be available everywhere
var _ = require('lodash');

(function(_) {
    var Invite = function(config, req, handleError) {
        this.config = config;
        this.req = req;
        this.handleError = handleError;
    };

    Invite.prototype.run = function() {
        var options = {
            url: this.config.slack.url + '/channels.list?token=' + this.config.slack.token
        };

        // Get the available channels using the slack token
        this.req(options, processChannels.bind(this));
    };

    var processChannels = function(error, response, responseBody) {
        var data = JSON.parse(responseBody);
        var _self = this;

        if (data.ok === false) {
            try {
                this.handleError.display(data.error);
            } catch (e) {
                console.log(e.message);
            }
        }

        // TODO Try and find the bot from the user ID

        // Loop over the channels and see if jarvis is invited to that channel
        _.forEach(data.channels, function(item) {
            var channelId = (isBotAMemberOfChannel(item, _self.config.slack.botId)) ? item.id : '';

            // Auto invite hubot to the channel
            // TODO https://slack.com/api/channels.invite?token=MY_TOKEN&channel=<channelID>&user=<hubotId>
            console.log(channelId);
        });
    };

    // Checks if bot is a member of the current channel using the channel identifier
    var isBotAMemberOfChannel = function (item, botId) {
        return (_.indexOf(item.members, botId, true) < 0);
    };

    var request = require('request');
    var common = require('./common.js');
    var handleError = require('./handleError.js');
    var config = common.config();
    module.exports = new Invite(config, request, handleError);
})(_);
