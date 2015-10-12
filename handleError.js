(function() {
    var HandleError = function() {};

    HandleError.prototype.display = function(errorResponse) {
        switch (errorResponse) {
            case "invalid_auth":
                throw new Error("The authentication in your env.json config is invalid.");
                break;
            case "account_inactive":
                throw new Error("Authentication token is for a deleted user or team.");
                break;
            case "not_authed":
                throw new Error("No authentication token provided. Check your config file.");
                break;
            case "user_not_found":
                throw new Error("The user identifier for your bot is not found, have you setup the integration in your slack yet?");
                break;
            default:
                throw new Error("An Unknown error occurred: " + errorResponse);
                break;
        }
    };

    module.exports = new HandleError();
})();