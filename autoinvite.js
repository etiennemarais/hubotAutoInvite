var _ = require('lodash');
(function(_) {
    var Invite = function(config, req) {
        this.config = config;
        this.req = req;
    };

    Invite.prototype.run = function() {
        var options = {
            url: this.config.slack.url + '/channels.list?token=' + this.config.slack.token
        };

        // Get the available channels using the slack token
        this.req(options, processChannels.bind(this.config));
    };

    var processChannels = function(error, response, responseBody) {
        var data = JSON.parse(responseBody);
        var _self = this;

        // TODO add error reporting for bad auth etc.

        // Loop over the channels and see if jarvis is invited to that channel
        _.forEach(data.channels, function(item) {
            var channelId = (isBotAMemberOfChannel(item, _self.slack.botId)) ? item.id : '';

            // Auto invite Jarvis to the channel
            // TODO https://slack.com/api/channels.invite?token=MY_TOKEN&channel=<channelID>&user=<jarvisId>
            console.log(channelId);
        });
    };

    var isBotAMemberOfChannel = function (item, botId) {
        return (_.indexOf(item.members, botId, true) < 0);
    };

    var request = require('request');
    var common = require('./common.js');
    var config = common.config();
    module.exports = new Invite(config, request);
})(_);
