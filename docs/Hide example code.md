Search
Deribit API v2.1.1
Overview
JSON-RPC
Methods
Authentication
Session management
Supporting
Subscription management
Market data
/public/get_book_summary_by_currency
/public/get_book_summary_by_instrument
/public/get_contract_size
/public/get_currencies
/public/get_delivery_prices
/public/get_funding_chart_data
/public/get_funding_rate_history
/public/get_funding_rate_value
/public/get_historical_volatility
/public/get_index
/public/get_index_price
/public/get_index_price_names
/public/get_instrument
/public/get_instruments
/public/get_last_settlements_by_currency
/public/get_last_settlements_by_instrument
/public/get_last_trades_by_currency
/public/get_last_trades_by_currency_and_time
/public/get_last_trades_by_instrument
/public/get_last_trades_by_instrument_and_time
/public/get_mark_price_history
/public/get_order_book
/public/get_order_book_by_instrument_id
/public/get_rfqs
/public/get_supported_index_names
/public/get_trade_volumes
/public/get_tradingview_chart_data
/public/get_volatility_index_data
/public/ticker
Trading
Combo Books
Block Trade
Wallet
Account management
Subscriptions
RPC Error Codes
FIX API
To the Deribit website
Documentation Powered by Slate
Deribit API v2.1.1
Overview
Deribit provides three different interfaces to access the API:

JSON-RPC over Websocket
JSON-RPC over HTTP
FIX (Financial Information eXchange)
Deribit features a testing environment, test.deribit.com, which can be used to test the API. For this reason all examples in this documentation refer to that environment. To reach the production environment it should be changed to www.deribit.com. Note that both environments are separate, which means that they require separate accounts and credentials (API keys) to authenticate using private methods - test credentials do not work in production environment and vice versa.

To see the list of your API keys check Account > API tab, where you'll also find a link to API Console (>\_ Api Console) which allows you to test JSON-RPC API, both via HTTP and Websocket.

Error Codes (HTTP and Websocket RPC Error codes)
Naming
Deribit tradeable assets or instruments use the following system of naming:

Kind Examples Template Comments
Future BTC-25MAR23, BTC-5AUG23 BTC-DMMMYY BTC is currency, DMMMYY is expiration date, D stands for day of month (1 or 2 digits), MMM - month (3 first letters in English), YY stands for year.
Perpetual BTC-PERPETUAL Perpetual contract for currency BTC.
Option BTC-25MAR23-420-C, BTC-5AUG23-580-P BTC-DMMMYY-STRIKE-K STRIKE is option strike price in USD. Template K is option kind: C for call options or P for put options.
In Linear Options d is used as a decimal point for decimal strikes.

Example: For XRP_USDC-30JUN23-0d625-C strike is 0.625.

Rate Limits
Rate limits are described in separate document.

JSON-RPC
JSON-RPC is a light-weight remote procedure call (RPC) protocol. The JSON-RPC specification defines the data structures that are used for the messages that are exchanged between client and server, as well as the rules around their processing. JSON-RPC uses JSON (RFC 4627) as data format.

JSON-RPC is transport agnostic: it does not specify which transport mechanism must be used. The Deribit API supports both Websocket (preferred) and HTTP (with limitations: subscriptions are not supported over HTTP).

Request messages
An example of a request message:

{
"jsonrpc": "2.0",
"id": 8066,
"method": "public/ticker",
"params": {
"instrument": "BTC-24AUG18-6500-P"
}
}
According to the JSON-RPC specification the requests must be JSON objects with the following fields.

Name Type Description
jsonrpc string The version of the JSON-RPC spec: "2.0"
id integer or string An identifier of the request. If it is included, then the response will contain the same identifier
method string The method to be invoked
params object The parameters values for the method. The field names must match with the expected parameter names. The parameters that are expected are described in the documentation for the methods, below.
The JSON-RPC specification describes two features that are currently not supported by the API:
Specification of parameter values by position
Batch requests
Response messages
An example of a response message:

{
"jsonrpc": "2.0",
"id": 5239,
"testnet": false,
"result": [
{
"coin_type": "BITCOIN",
"currency": "BTC",
"currency_long": "Bitcoin",
"fee_precision": 4,
"min_confirmations": 1,
"min_withdrawal_fee": 0.0001,
"withdrawal_fee": 0.0001,
"withdrawal_priorities": [
{
"value": 0.15,
"name": "very_low"
},
{
"value": 1.5,
"name": "very_high"
}
]
}
],
"usIn": 1535043730126248,
"usOut": 1535043730126250,
"usDiff": 2
}
The JSON-RPC API always responds with a JSON object with the following fields.

Name Type Description
id integer This is the same id that was sent in the request.
result any If successful, the result of the API call. The format for the result is described with each method.
error error object Only present if there was an error invoking the method. The error object is described below.
testnet boolean Indicates whether the API in use is actually the test API. false for production server, true for test server.
usIn integer The timestamp when the requests was received (microseconds since the Unix epoch)
usOut integer The timestamp when the response was sent (microseconds since the Unix epoch)
usDiff integer The number of microseconds that was spent handling the request
The fields testnet, usIn, usOut and usDiff are not part of the JSON-RPC standard.
In order not to clutter the examples they will generally be omitted from the example code.

An example of a response with an error:

{
"jsonrpc": "2.0",
"id": 8163,
"error": {
"code": 11050,
"message": "bad_request"
},
"testnet": false,
"usIn": 1535037392434763,
"usOut": 1535037392448119,
"usDiff": 13356
}
In case of an error the response message will contain the error field, with as value an object with the following with the following fields:

Name Type Description
code integer A number that indicates the kind of error.
message string A short description that indicates the kind of error.
data any Additional data about the error. This field may be omitted.
Detailed response for private/cancel_all\* and private/cancel_by_label methods
An example of a positive execution of cancellation trigger orders in ETH-PERPETUAL when one order was canceled:

{
"currency": "BTC",
"type": "trigger",
"instrument_name": "ETH-PERPETUAL",
"result": [{
"web": true,
"triggered": false,
"trigger_price": 1628.7,
"trigger": "last_price",
"time_in_force": "good_til_cancelled",
"replaced": false,
"reduce_only": false,
"price": "market_price",
"post_only": false,
"order_type": "stop_market",
"order_state": "untriggered",
"order_id": "ETH-SLTS-250756",
"max_show": 100,
"last_update_timestamp": 1634206091071,
"label": "",
"is_rebalance": false,
"is_liquidation": false,
"instrument_name": "ETH-PERPETUAL",
"direction": "sell",
"creation_timestamp": 1634206000230,
"api": false,
"amount": 100
}]
}
When boolean parameter detailed with value true is added to cancel_all\* or cancel_by_label methods response format is changed. Instead of the number of canceled orders there is a returned list of execution reports objects for every requested instrument, order type and currency: results of positive or erroneous execution. It is done this way because internally during processing cancel_all request there are done separate requests for every currency, order type and book.

Positive execution report
It is returned only when there were orders that were canceled!
Positive execution report is object with fields:

currency
type - trigger or limit
instrument_name
result - array of orders formatted like in private/cancel response
Erroneous execution report
Erroneous execution report is object with fields:

currency
type - trigger or limit
instrument_name - it is attached only if the error is related to specific instrument
error - error message formatted as usual
An example of information that cancel of limit orders in ETH failed:

{
"currency": "ETH",
"type": "limit",
"error": {
"message": "matching_engine_queue_full",
"code": 10047
}
}
Security keys
Request that may require security key authorization

{
"method": "private/list_api_keys",
"params": {}
}
Some methods may require additional authorization using Security Keys (depending on the user's account configuration). In this case, instead of a normal response, there is a returned response with field security_key_authorization_required set to true. When that happens the client is required to resend a request with additional parameters: authorization_data and challenge.

For example, after client sends request that needs Security Key confirmation, like private/list_api_keys server return (non error) response with field: security_key_authorization_required set to true. Other fields are attached too:

security_keys - a list of security keys that can be used for authentication. Fields in Security Key object are:
type - type of security key: tfa for TOTP Two Factor Authentication, u2f for authentication with Yubikey
name - name of security key
credential_id - optional filed for U2F keys only
rp_id - relying party identifier (need to be used with WebAuthn)
challenge - this string needs to be resend, it is valid for 1 minute
Example of response with request to make Security Key authorization:

{
"jsonrpc": "2.0",
"result": {
"security_keys": [
{
"type": "tfa",
"name": "tfa"
}
],
"security_key_authorization_required": true,
"rp_id": "test.deribit.com",
"challenge": "+Di4SKN9VykrSoHlZO2KF3LEyEZF4ih9CZXVuudQiKQ="
}
}
TFA authorization
When the user chooses TFA authorization, he should read the TFA code from his application, and it should be added to original requests parameters as authorization_data. It is required to add to parameters challenge too. Then request should be repeated with those updated parameters.

Example of request when TFA code is 602051:

{
"id":88,
"method": "private/list_api_keys",
"params": {
"authorization_data": "602051",
"challenge": "+Di4SKN9VykrSoHlZO2KF3LEyEZF4ih9CZXVuudQiKQ="
}
}
U2F authorization
For details of U2F authorization ask our staff.

Errors:
When there is an error related to the Security Key authorization, a response with the error security_key_authorization_error (code: 13668) is returned. It will have a data.reason field that possible values are:

tfa_code_not_matched - provided TFA code was invalid
used_tfa_code - provided TFA code was already used
challenge_timeout - challenge is invalid
tfa_code_is_required - provided TFA code was empty
When an error occurrs, the request needs to be repeated without authorization_data to obtain a new challenge.

Example of erroneous response:

{
"jsonrpc":"2.0",
"error":{
"message":"security_key_authorization_error",
"data":{
"reason":"tfa_code_not_matched"
},
"code":13668
}
}
Notifications
An example of a notification:

{
"jsonrpc": "2.0",
"method": "subscription",
"params": {
"channel": "deribit_price_index.btc_usd",
"data": {
"timestamp": 1535098298227,
"price": 6521.17,
"index_name": "btc_usd"
}
}
}
API users can subscribe to certain types of notifications. This means that they will receive JSON-RPC notification-messages from the server when certain events occur, such as changes to the index price or changes to the order book for a certain instrument.

The API methods public/subscribe and private/subscribe are used to set up a subscription. Since HTTP does not support the sending of messages from server to client, these methods are only available when using the Websocket transport mechanism.

At the moment of subscription a "channel" must be specified. The channel determines the type of events that will be received. See Subscriptions for more details about the channels.

In accordance with the JSON-RPC specification, the format of a notification is that of a request message without an id field. The value of the method field will always be "subscription". The params field will always be an object with 2 members: channel and data. The value of the channel member is the name of the channel (a string). The value of the data member is an object that contains data that is specific for the channel.

Authentication
An example of a JSON request with token:

{
"id": 5647,
"method": "private/get_subaccounts",
"params": {
"access_token": "1582628593469.1MbQ-J_4.CBP-OqOwm_FBdMYj4cRK2dMXyHPfBtXGpzLxhWg31nHu3H_Q60FpE5_vqUBEQGSiMrIGzw3nC37NMb9d1tpBNqBOM_Ql9pXOmgtV9Yj3Pq1c6BqC6dU6eTxHMFO67x8GpJxqw_QcKP5IepwGBD-gfKSHfAv9AEnLJkNu3JkMJBdLToY1lrBnuedF3dU_uARm"
}
}
The API consists of public and private methods. The public methods do not require authentication. The private methods use OAuth 2.0 authentication. This means that a valid OAuth access token must be included in the request, which can be achieved by calling method public/auth.

When the token was assigned to the user, it should be passed along, with other request parameters, back to the server:

Connection type Access token placement
Websocket Inside request JSON parameters, as an access_token field
HTTP (REST) Header Authorization: bearerToken value
Additional authorization method - basic user credentials
Every private method could be accessed by providing, inside HTTP Authorization: Basic XXX header, values with user ClientId and assigned ClientSecret (both values can be found on the API page on the Deribit website) encoded with Base64:

Authorization: Basic BASE64(ClientId + : + ClientSecret)

This is the easiest way of authenticating HTTP (REST) requests. If you don't like the fact that you are sending ClientSecret over HTTPS connection, you can consider using one of the authorization methods described below.
Additional authorization method - Deribit signature credentials
The Derbit service provides a dedicated authorization method, which harnesses user generated signature to increase security level for passing request data. Generated value is passed inside Authorization header, coded as:

Authorization: deri-hmac-sha256 id=ClientId,ts=Timestamp,sig=Signature,nonce=Nonce

where:

Deribit credential Description
ClientId Can be found on the API page on the Deribit website (the user can configure up to 8 different IDs - with different privileges)
Timestamp Time when the request was generated - given as milliseconds. It's valid for 60 seconds since generation, after that time any request with an old timestamp will be rejected.
Signature Value for signature calculated as described below
Nonce Single usage, user generated initialization vector for the server token
The signature is generated by the following formula:

RequestData = UPPERCASE(HTTP_METHOD()) + "\n" + URI() + "\n" + RequestBody + "\n";
StringToSign = Timestamp + "\n" + Nonce + "\n" + RequestData;
Signature = HEX_STRING( HMAC-SHA256( ClientSecret, StringToSign ) );

Note the newline characters in RequestData and StringToSign variables. If RequestBody is omitted in RequestData, it's treated as an empty string, so these three newline characters must always be present.

Example using shell with openssl tool:

    ClientId=AMANDA
    ClientSecret=AMANDASECRECT
    Timestamp=$( date +%s000 )
    Nonce=$( cat /dev/urandom | tr -dc 'a-z0-9' | head -c8 )
    URI="/api/v2/private/get_account_summary?currency=BTC"
    HttpMethod=GET
    Body=""

    Signature=$( echo -ne "${Timestamp}\n${Nonce}\n${HttpMethod}\n${URI}\n${Body}\n" | openssl sha256 -r -hmac "$ClientSecret" | cut -f1 -d' ' )

    echo $Signature

    shell output> 9bfbc51a2bc372d72cc396cf1a213dc78d42eb74cb7dc272351833ad0de276ab (WARNING: Exact value depends on current timestamp and client credentials)

    curl -s -X ${HttpMethod} -H "Authorization: deri-hmac-sha256 id=${ClientId},ts=${Timestamp},nonce=${Nonce},sig=${Signature}" "https://www.deribit.com${URI}"

Additional authorization method - signature credentials (WebSocket API)
Example of authorization using client_signature:

// using CryptoJS library
var clientId = "AMANDA";
var clientSecret = "AMANDASECRECT";
var timestamp = Date.now();
var nonce = "abcd";
var data = "";
var signature = CryptoJS.HmacSHA256(`${timestamp}\n${nonce}\n${data}`, accessSecret).toString();

var msg = {
"jsonrpc" : "2.0",
"id" : 4316,
"method" : "public/auth",
"params" : {
"grant_type": "client_signature",
"client_id": clientId,
"timestamp": timestamp,
"signature": signature,
"nonce": nonce,
"data": data
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
When connecting through Websocket, user can request for authorization using client_signature method, which requires providing following parameters (as a part of JSON request):

JSON parameter Description
grant_type Must be client_signature
client_id Can be found on the API page on the Deribit website (the user can configure up to 8 different IDs - with different privileges)
timestamp Time when the request was generated - given as milliseconds. It's valid for 60 seconds since generation, after that time any request with an old timestamp will be rejected.
signature Value for signature calculated as described below
nonce Single usage, user generated initialization vector for the server token
data Optional field, which contains any user specific value
The signature is generated by the following formula:

StringToSign = Timestamp + "\n" + Nonce + "\n" + Data;
Signature = HEX_STRING( HMAC-SHA256( ClientSecret, StringToSign ) );

Note the newline characters separating parts of the StringToSign variable. If Data is omitted, it's treated as an empty string, so these two newline characters must always be present.

Example using shell with openssl tool:

    ClientId=AMANDA
    ClientSecret=AMANDASECRECT
    Timestamp=$( date +%s000 ) # e.g. 1576074319000
    Nonce=$( cat /dev/urandom | tr -dc 'a-z0-9' | head -c8 ) # e.g. 1iqt2wls
    Data=""

    Signature=$( echo -ne "${Timestamp}\n${Nonce}\n${Data}" | openssl sha256 -r -hmac "$ClientSecret" | cut -f1 -d' ' )

    echo $Signature

    shell output> 56590594f97921b09b18f166befe0d1319b198bbcdad7ca73382de2f88fe9aa1 (WARNING: Exact value depends on current timestamp and client credentials)

You can also check the signature value using some online tools like, e.g: https://codebeautify.org/hmac-generator (remember that you should use it only with your test credentials).

Here's a sample JSON request created using the values from the example above:

{
"jsonrpc" : "2.0",
"id" : 9929,
"method" : "public/auth",
"params" :
{
"grant_type" : "client_signature",
"client_id" : "AMANDA",
"timestamp": 1576074319000,
"nonce": "1iqt2wls",
"data": "",
"signature" : "56590594f97921b09b18f166befe0d1319b198bbcdad7ca73382de2f88fe9aa1"
}
}

Access scope
When asking for access token, the user can provide the required access level (called scope) which defines what type of functionality he/she wants to use, and whether requests are only going to check for some data or also to update them. Scopes are required and checked for private methods, so if you plan to use only public information you can stay with values assigned by default.

Scope Description
mainaccount It is set automatically by the server when the currently connecting user (his/her credentials) is the main user, otherwise it's not included in the final scope.
connection Access with requested parameters is granted when connection is open (or till expiration time). When the connection is closed, user need to repeat the authentication request to get new tokens. It is set and used automatically by the server when neither connection nor session scope is provided within the request.
session:name The server creates a new session with the name provided by the user, then generates tokens and binds them with the session. Access is granted during session lifetime. It allows users to reconnect to the server and reuse assigned tokens (before their expiration time). Note that only 16 sessions are allowed per user - when the limit is reached, the session with the shortest lifetime is removed.
When using WebSocket it also allows (due to the fact that tokens are bound to the created session) skipping providing access_token with every subsequent request.
account:read Access to account methods - read only data.
account:read_write Access to account methods - allows to manage account settings, add subaccounts, etc.
trade:read Access to trade methods - read only data.
trade:read_write Access to trade methods - required to create and modify orders.
wallet:read Access to wallet methods - read only data.
wallet:read_write Access to wallet methods - allows to withdraw, generate new deposit address, etc.
wallet:none, account:none, trade:none Blocked access to specified functionality.
expires:NUMBER Access token will expire after NUMBER of seconds.
ip:ADDR Token will work with connection from ADDR IPv4 address, when \* is provided as an ADDR token will work from all IP addresses.
block_trade:read Access to block_trade methods - reading info about block trades - read only data.
block_trade:read_write Access to block_trade methods - required to create block trades.
NOTICE: Depending on choosing an authentication method (grant type) some scopes could be narrowed by the server or limited by user API key configured scope, e.g. when grant_type = client_credentials and scope = wallet:read_write could be modified by the server as scope = wallet:read.

The user shouldn't assume that requested values are blindly accepted and should verify assigned scopes.

Creating/editing/removing API Keys
Creating, editing and removing API Keys is available only with access tokens with scope account:read_write. Additionally when the methods of the API Key management are called with access token with scope set than server ensures that we do allow to create/remove/manage (or show client secrets in case of private/list_api_keys) the keys up to the same level of the scopes as calling set from access token. If not error scope_exceeded (code: 13403) is returned.

JSON-RPC over websocket
Websocket is the preferred transport mechanism for the JSON-RPC API, because it is faster and because it can support subscriptions and cancel on disconnect. The code examples that can be found next to each of the methods show how websockets can be used from Python or Javascript/node.js.

JSON-RPC over HTTP
Besides websockets it is also possible to use the API via HTTP. The code examples for 'shell' show how this can be done using curl. Note that subscriptions and cancel on disconnect are not supported via HTTP.

Methods
Authentication
/public/auth
var msg =
{
"jsonrpc" : "2.0",
"id" : 9929,
"method" : "public/auth",
"params" : {
"grant_type" : "client_credentials",
"client_id" : "fo7WAPRm4P",
"client_secret" : "W0H6FJW4IRPZ1MOQ8FP6KMC5RZDUUKXS"
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 9929,
"result": {
"access_token": "1582628593469.1MbQ-J_4.CBP-OqOwm_FBdMYj4cRK2dMXyHPfBtXGpzLxhWg31nHu3H_Q60FpE5_vqUBEQGSiMrIGzw3nC37NMb9d1tpBNqBOM_Ql9pXOmgtV9Yj3Pq1c6BqC6dU6eTxHMFO67x8GpJxqw_QcKP5IepwGBD-gfKSHfAv9AEnLJkNu3JkMJBdLToY1lrBnuedF3dU_uARm",
"expires_in": 31536000,
"refresh_token": "1582628593469.1GP4rQd0.A9Wa78o5kFRIUP49mScaD1CqHgiK50HOl2VA6kCtWa8BQZU5Dr03BhcbXPNvEh3I_MVixKZXnyoBeKJwLl8LXnfo180ckAiPj3zOclcUu4zkXuF3NNP3sTPcDf1B3C1CwMKkJ1NOcf1yPmRbsrd7hbgQ-hLa40tfx6Oa-85ymm_3Z65LZcnCeLrqlj_A9jM",
"scope": "connection mainaccount",
"enabled_features": [],
"token_type": "bearer"
}
}

Retrieve an Oauth access token, to be used for authentication of 'private' requests.

Three methods of authentication are supported:

client_credentials - using the client id and client secret that can be found on the API page on the website
client_signature - using the client id that can be found on the API page on the website and user generated signature. The signature is calculated using some fields provided in the request, using formula described here Deribit signature credentials
refresh_token - using a refresh token that was received from an earlier invocation
The response will contain an access token, expiration period (number of seconds that the token is valid) and a refresh token that can be used to get a new set of tokens.

Try in API console

Parameters
Parameter Required Type Enum Description
grant_type true string client_credentials
client_signature
refresh_token Method of authentication
client_id true string Required for grant type client_credentials and client_signature
client_secret true string Required for grant type client_credentials
refresh_token true string Required for grant type refresh_token
timestamp true integer Required for grant type client_signature, provides time when request has been generated (milliseconds since the UNIX epoch)
signature true string Required for grant type client_signature; it's a cryptographic signature calculated over provided fields using user secret key. The signature should be calculated as an HMAC (Hash-based Message Authentication Code) with SHA256 hash algorithm
nonce false string Optional for grant type client_signature; delivers user generated initialization vector for the server token
data false string Optional for grant type client_signature; contains any user specific value
state false string Will be passed back in the response
scope false string Describes type of the access for assigned token, possible values: connection, session:name, trade:[read, read_write, none], wallet:[read, read_write, none], account:[read, read_write, none], expires:NUMBER, ip:ADDR.

Details are elucidated in Access scope
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› access_token string
› enabled_features array of string List of enabled advanced on-key features. Available options:

-   restricted_block_trades: Limit the block_trade read the scope of the API key to block trades that have been made using this specific API key
-   block_trade_approval: Block trades created using this API key require additional user approval
    › expires_in integer Token lifetime in seconds
    › refresh_token string Can be used to request a new token (with a new lifetime)
    › scope string Type of the access for assigned token
    › sid string Optional Session id
    › state string Copied from the input (if applicable)
    › token_type string Authorization type, allowed value - bearer
    /public/exchange_token
    var msg =
    {
    "jsonrpc" : "2.0",
    "id" : 7619,
    "method" : "public/exchange_token",
    "params" : {
    "refresh_token" : "1568800656974.1CWcuzUS.MGy49NK4hpTwvR1OYWfpqMEkH4T4oDg4tNIcrM7KdeyxXRcSFqiGzA_D4Cn7mqWocHmlS89FFmUYcmaN2H7lNKKTnhRg5EtrzsFCCiuyN0Wv9y-LbGLV3-Ojv_kbD50FoScQ8BDXS5b_w6Ir1MqEdQ3qFZ3MLcvlPiIgG2BqyJX3ybYnVpIlrVrrdYD1-lkjLcjxOBNJvvUKNUAzkQ",
    "subject_id" : 10
    }
    };
    var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
    ws.onmessage = function (e) {
    // do something with the response...
    console.log('received from server : ', e.data);
    };
    ws.onopen = function () {
    ws.send(JSON.stringify(msg));
    };
    The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 9929,
"result": {
"access_token": "1582628593469.1MbQ-J_4.CBP-OqOwm_FBdMYj4cRK2dMXyHPfBtXGpzLxhWg31nHu3H_Q60FpE5_vqUBEQGSiMrIGzw3nC37NMb9d1tpBNqBOM_Ql9pXOmgtV9Yj3Pq1c6BqC6dU6eTxHMFO67x8GpJxqw_QcKP5IepwGBD-gfKSHfAv9AEnLJkNu3JkMJBdLToY1lrBnuedF3dU_uARm",
"expires_in": 31536000,
"refresh_token": "1582628593469.1GP4rQd0.A9Wa78o5kFRIUP49mScaD1CqHgiK50HOl2VA6kCtWa8BQZU5Dr03BhcbXPNvEh3I_MVixKZXnyoBeKJwLl8LXnfo180ckAiPj3zOclcUu4zkXuF3NNP3sTPcDf1B3C1CwMKkJ1NOcf1yPmRbsrd7hbgQ-hLa40tfx6Oa-85ymm_3Z65LZcnCeLrqlj_A9jM",
"scope": "session:named_session mainaccount",
"token_type": "bearer"
}
}
Generates a token for a new subject id. This method can be used to switch between subaccounts.

Try in API console

Parameters
Parameter Required Type Enum Description
refresh_token true string Refresh token
subject_id true integer New subject id
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› access_token string
› expires_in integer Token lifetime in seconds
› refresh_token string Can be used to request a new token (with a new lifetime)
› scope string Type of the access for assigned token
› sid string Optional Session id
› token_type string Authorization type, allowed value - bearer
/public/fork_token
var msg =
{
"jsonrpc" : "2.0",
"id" : 7620,
"method" : "public/fork_token",
"params" : {
"refresh_token" : "1568800656974.1CWcuzUS.MGy49NK4hpTwvR1OYWfpqMEkH4T4oDg4tNIcrM7KdeyxXRcSFqiGzA_D4Cn7mqWocHmlS89FFmUYcmaN2H7lNKKTnhRg5EtrzsFCCiuyN0Wv9y-LbGLV3-Ojv_kbD50FoScQ8BDXS5b_w6Ir1MqEdQ3qFZ3MLcvlPiIgG2BqyJX3ybYnVpIlrVrrdYD1-lkjLcjxOBNJvvUKNUAzkQ",
"session_name" : "forked_session_name"
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 9929,
"result": {
"access_token": "1582628593469.1MbQ-J_4.CBP-OqOwm_FBdMYj4cRK2dMXyHPfBtXGpzLxhWg31nHu3H_Q60FpE5_vqUBEQGSiMrIGzw3nC37NMb9d1tpBNqBOM_Ql9pXOmgtV9Yj3Pq1c6BqC6dU6eTxHMFO67x8GpJxqw_QcKP5IepwGBD-gfKSHfAv9AEnLJkNu3JkMJBdLToY1lrBnuedF3dU_uARm",
"expires_in": 31536000,
"refresh_token": "1582628593469.1GP4rQd0.A9Wa78o5kFRIUP49mScaD1CqHgiK50HOl2VA6kCtWa8BQZU5Dr03BhcbXPNvEh3I_MVixKZXnyoBeKJwLl8LXnfo180ckAiPj3zOclcUu4zkXuF3NNP3sTPcDf1B3C1CwMKkJ1NOcf1yPmRbsrd7hbgQ-hLa40tfx6Oa-85ymm_3Z65LZcnCeLrqlj_A9jM",
"scope": "session:named_session mainaccount",
"token_type": "bearer"
}
}
Generates a token for a new named session. This method can be used only with session scoped tokens.

Try in API console

Parameters
Parameter Required Type Enum Description
refresh_token true string Refresh token
session_name true string New session name
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› access_token string
› expires_in integer Token lifetime in seconds
› refresh_token string Can be used to request a new token (with a new lifetime)
› scope string Type of the access for assigned token
› sid string Optional Session id
› token_type string Authorization type, allowed value - bearer
/private/logout
This method is only available via websockets.

var msg =
{"jsonrpc": "2.0",
"method": "private/logout",
"id": 42,
"params": {
"access_token": "1529453804065.h2QrBgvn.oS36pCOmuK9EX7954lzCSkUioEtTMg7F5ShToM0ZfYlqU05OquXkQIe2_DDEkPhzmoPp1fBp0ycXShR_0jf-SMSXEdVqxLRWuOw-\_StG5BMjToiAl27CbHY4P92MPhlMblTOtTImE81-5dFdyDVydpBwmlfKM3OSQ39kulP9bbfw-2jhyegOL0AgqJTY_tj554oHCQFTbq0A0ZWukukmxL2yu6iy34XdzaJB26Igy-3UxGBMwFu53EhjKBweh7xyP2nDm57-wybndJMtSyTGDXH3vjBVclo1iup5yRP",
"invalidate_token": true}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
This method has no response body

Gracefully close websocket connection, when COD (Cancel On Disconnect) is enabled orders are not cancelled

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
invalidate_token false boolean If value is true all tokens created in current session are invalidated, default: true
Response
This method has no response body

Session management
/public/set_heartbeat
This method is only available via websockets.

var msg =
{
"jsonrpc" : "2.0",
"id" : 9098,
"method" : "public/set_heartbeat",
"params" : {
"interval" : 30
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 9098,
"result": "ok"
}
Signals the Websocket connection to send and request heartbeats. Heartbeats can be used to detect stale connections. When heartbeats have been set up, the API server will send heartbeat messages and test_request messages. Your software should respond to test_request messages by sending a /api/v2/public/test request. If your software fails to do so, the API server will immediately close the connection. If your account is configured to cancel on disconnect, any orders opened over the connection will be cancelled.

Try in API console

Parameters
Parameter Required Type Enum Description
interval true number The heartbeat interval in seconds, but not less than 10
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result string Result of method execution. ok in case of success
/public/disable_heartbeat
This method is only available via websockets.

var msg =
{
"jsonrpc" : "2.0",
"id" : 3562,
"method" : "public/disable_heartbeat",
"params" : {

}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 3562,
"result": "ok"
}

Stop sending heartbeat messages.

Try in API console

Parameters
This method takes no parameters

Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result string Result of method execution. ok in case of success
/private/enable_cancel_on_disconnect
var msg =
{
"jsonrpc" : "2.0",
"id" : 7859,
"method" : "private/enable_cancel_on_disconnect",
"params" : {
"scope" : "account"
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 7859,
"result": "ok"
}

Enable Cancel On Disconnect for the connection. After enabling Cancel On Disconnect all orders created by the connection will be removed when the connection is closed.

NOTICE It does not affect orders created by other connections - they will remain active !

When change is applied for the account, then every newly opened connection will start with active Cancel on Disconnect.

Scope: account:read_write

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
scope false string connection
account Specifies if Cancel On Disconnect change should be applied/checked for the current connection or the account (default - connection)

NOTICE: Scope connection can be used only when working via Websocket.
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result string Result of method execution. ok in case of success
/private/disable_cancel_on_disconnect
var msg =
{
"jsonrpc" : "2.0",
"id" : 1569,
"method" : "private/disable_cancel_on_disconnect",
"params" : {
"scope" : "account"
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 1569,
"result": "ok"
}

Disable Cancel On Disconnect for the connection.

When change is applied for the account, then every newly opened connection will start with inactive Cancel on Disconnect.

Scope: account:read_write

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
scope false string connection
account Specifies if Cancel On Disconnect change should be applied/checked for the current connection or the account (default - connection)

NOTICE: Scope connection can be used only when working via Websocket.
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result string Result of method execution. ok in case of success
/private/get_cancel_on_disconnect
var msg =
{
"jsonrpc" : "2.0",
"id" : 220,
"method" : "private/get_cancel_on_disconnect",
"params" : {
"scope" : "account"
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 220,
"result": {
"scope" : "account",
"enabled": false
}
}

Read current Cancel On Disconnect configuration for the account.

Scope: account:read

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
scope false string connection
account Specifies if Cancel On Disconnect change should be applied/checked for the current connection or the account (default - connection)

NOTICE: Scope connection can be used only when working via Websocket.
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› enabled boolean Current configuration status
› scope string Informs if Cancel on Disconnect was checked for the current connection or the account
Supporting
/public/get_time
var msg =
{
"jsonrpc" : "2.0",
"id" : 7365,
"method" : "public/get_time",
"params" : {

}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 7365,
"result": 1550147385946
}

Retrieves the current time (in milliseconds). This API endpoint can be used to check the clock skew between your software and Deribit's systems.

Try in API console

Parameters
This method takes no parameters

Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result integer Current timestamp (milliseconds since the UNIX epoch)
/public/hello
This method is only available via websockets.

var msg =
{
"jsonrpc" : "2.0",
"id" : 2841,
"method" : "public/hello",
"params" : {
"client_name" : "My Trading Software",
"client_version" : "1.0.2"
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 2841,
"result": {
"version": "1.2.26"
}
}

Method used to introduce the client software connected to Deribit platform over websocket. Provided data may have an impact on the maintained connection and will be collected for internal statistical purposes. In response, Deribit will also introduce itself.

Try in API console

Parameters
Parameter Required Type Enum Description
client_name true string Client software name
client_version true string Client software version
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› version string The API version
/public/status
var msg =
{
"jsonrpc" : "2.0",
"id" : 55,
"method" : "public/status",
"params" : {

}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 55,
"result": {
"locked_currencies": ["BTC", "ETH"],
"locked": true
}
}

Method used to get information about locked currencies

Try in API console

Parameters
This method takes no parameters

Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› locked string true when platform is locked in all currencies, partial when some currencies are locked, false - when there are not currencies locked
› locked_currencies array List of currencies in which platform is locked
/public/test
var msg =
{
"jsonrpc" : "2.0",
"id" : 8212,
"method" : "public/test",
"params" : {

}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 8212,
"result": {
"version": "1.2.26"
}
}

Tests the connection to the API server, and returns its version. You can use this to make sure the API is reachable, and matches the expected version.

Try in API console

Parameters
Parameter Required Type Enum Description
expected_result false string exception The value "exception" will trigger an error response. This may be useful for testing wrapper libraries.
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› version string The API version
Subscription management
Subscription works as notifications, so users will automatically (after subscribing) receive messages from the server. Overview for each channel response format is described in subscriptions section.

/public/subscribe
This method is only available via websockets.

var msg =
{
"jsonrpc" : "2.0",
"id" : 3600,
"method" : "public/subscribe",
"params" : {
"channels" : [
"deribit_price_index.btc_usd"
]
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 3600,
"result": [
"deribit_price_index.btc_usd"
]
}

Subscribe to one or more channels.

This is the same method as /private/subscribe, but it can only be used for 'public' channels.

Try in API console

Parameters
Parameter Required Type Enum Description
channels true array A list of channels to subscribe to.
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result array of string A list of subscribed channels.
/public/unsubscribe
This method is only available via websockets.

var msg =
{
"jsonrpc" : "2.0",
"id" : 8691,
"method" : "public/unsubscribe",
"params" : {
"channels" : [
"deribit_price_index.btc_usd"
]
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 8691,
"result": [
"deribit_price_index.btc_usd"
]
}

Unsubscribe from one or more channels.

Try in API console

Parameters
Parameter Required Type Enum Description
channels true array A list of channels to unsubscribe from.
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result array of string A list of subscribed channels.
/public/unsubscribe_all
This method is only available via websockets.

var msg =
{
"jsonrpc" : "2.0",
"id" : 153,
"method" : "public/unsubscribe_all",
"params" : {

}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 153,
"result": "ok"
}

Unsubscribe from all the channels subscribed so far.

Try in API console

Parameters
This method takes no parameters

Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result string Result of method execution. ok in case of success
/private/subscribe
This method is only available via websockets.

var msg =
{
"jsonrpc" : "2.0",
"id" : 4235,
"method" : "private/subscribe",
"params" : {
"channels" : [
"deribit_price_index.btc_usd"
]
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 4235,
"result": [
"deribit_price_index.btc_usd"
]
}

Subscribe to one or more channels.

The name of the channel determines what information will be provided, and in what form.

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
channels true array A list of channels to subscribe to.
label false string Optional label which will be added to notifications of private channels (max 16 characters).
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result array of string A list of subscribed channels.
/private/unsubscribe
This method is only available via websockets.

var msg =
{
"jsonrpc" : "2.0",
"id" : 3370,
"method" : "private/unsubscribe",
"params" : {
"channels" : [
"deribit_price_index.btc_usd"
]
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 3370,
"result": [
"deribit_price_index.btc_usd"
]
}

Unsubscribe from one or more channels.

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
channels true array A list of channels to unsubscribe from.
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result array of string A list of subscribed channels.
/private/unsubscribe_all
This method is only available via websockets.

var msg =
{
"jsonrpc" : "2.0",
"id" : 154,
"method" : "private/unsubscribe_all",
"params" : {

}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 154,
"result": "ok"
}

Unsubscribe from all the channels subscribed so far.

Try in API console

This is a private method; it can only be used after authentication.
Parameters
This method takes no parameters

Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result string Result of method execution. ok in case of success
Market data
/public/get_book_summary_by_currency
var msg =
{
"jsonrpc" : "2.0",
"id" : 9344,
"method" : "public/get_book_summary_by_currency",
"params" : {
"currency" : "BTC",
"kind" : "future"
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 9344,
"result": [
{
"volume_usd": 0,
"volume": 0,
"quote_currency": "USD",
"price_change": -11.1896349,
"open_interest": 0,
"mid_price": null,
"mark_price": 3579.73,
"mark_iv": 80,
"low": null,
"last": null,
"instrument_name": "BTC-22FEB19",
"high": null,
"estimated_delivery_price": 3579.73,
"creation_timestamp": 1550230036440,
"bid_price": null,
"base_currency": "BTC",
"ask_price": null
},
{
"volume_usd": 22440,
"volume": 6.24,
"quote_currency": "USD",
"price_change": -60.8183509,
"open_interest": 183180,
"mid_price": null,
"mark_price": 3579.73,
"mark_iv": 80,
"low": 3591,
"last": 3595,
"instrument_name": "BTC-PERPETUAL",
"high": 3595,
"funding_8h": 0.0002574,
"estimated_delivery_price": 3579.73,
"current_funding": 0,
"creation_timestamp": 1550230036440,
"bid_price": null,
"base_currency": "BTC",
"ask_price": null
}
]
}

Retrieves the summary information such as open interest, 24h volume, etc. for all instruments for the currency (optionally filtered by kind).

Try in API console

Parameters
Parameter Required Type Enum Description
currency true string BTC
ETH
USDC
USDT
EURR The currency symbol
kind false string future
option
spot
future_combo
option_combo Instrument kind, if not provided instruments of all kinds are considered
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result array of object
› ask_price number The current best ask price, null if there aren't any asks
› base_currency string Base currency
› bid_price number The current best bid price, null if there aren't any bids
› creation_timestamp integer The timestamp (milliseconds since the Unix epoch)
› current_funding number Current funding (perpetual only)
› estimated_delivery_price number Optional (only for derivatives). Estimated delivery price for the market. For more details, see Contract Specification > General Documentation > Expiration Price.
› funding_8h number Funding 8h (perpetual only)
› high number Price of the 24h highest trade
› instrument_name string Unique instrument identifier
› interest_rate number Interest rate used in implied volatility calculations (options only)
› last number The price of the latest trade, null if there weren't any trades
› low number Price of the 24h lowest trade, null if there weren't any trades
› mark_iv number (Only for option) implied volatility for mark price
› mark_price number The current instrument market price
› mid_price number The average of the best bid and ask, null if there aren't any asks or bids
› open_interest number Optional (only for derivatives). The total amount of outstanding contracts in the corresponding amount units. For perpetual and futures the amount is in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› price_change number 24-hour price change expressed as a percentage, null if there weren't any trades
› quote_currency string Quote currency
› underlying_index string Name of the underlying future, or 'index_price' (options only)
› underlying_price number underlying price for implied volatility calculations (options only)
› volume number The total 24h traded volume (in base currency)
› volume_notional number Volume in quote currency (futures and spots only)
› volume_usd number Volume in USD
/public/get_book_summary_by_instrument
var msg =
{
"jsonrpc" : "2.0",
"id" : 3659,
"method" : "public/get_book_summary_by_instrument",
"params" : {
"instrument_name" : "ETH-22FEB19-140-P"
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 3659,
"result": [
{
"volume": 0.55,
"underlying_price": 121.38,
"underlying_index": "index_price",
"quote_currency": "USD",
"price_change": -26.7793594,
"open_interest": 0.55,
"mid_price": 0.2444,
"mark_price": 0.179112,
"mark_price": 80,
"low": 0.34,
"last": 0.34,
"interest_rate": 0.207,
"instrument_name": "ETH-22FEB19-140-P",
"high": 0.34,
"creation_timestamp": 1550227952163,
"bid_price": 0.1488,
"base_currency": "ETH",
"ask_price": 0.34
}
]
}

Retrieves the summary information such as open interest, 24h volume, etc. for a specific instrument.

Try in API console

Parameters
Parameter Required Type Enum Description
instrument_name true string Instrument name
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result array of object
› ask_price number The current best ask price, null if there aren't any asks
› base_currency string Base currency
› bid_price number The current best bid price, null if there aren't any bids
› creation_timestamp integer The timestamp (milliseconds since the Unix epoch)
› current_funding number Current funding (perpetual only)
› estimated_delivery_price number Optional (only for derivatives). Estimated delivery price for the market. For more details, see Contract Specification > General Documentation > Expiration Price.
› funding_8h number Funding 8h (perpetual only)
› high number Price of the 24h highest trade
› instrument_name string Unique instrument identifier
› interest_rate number Interest rate used in implied volatility calculations (options only)
› last number The price of the latest trade, null if there weren't any trades
› low number Price of the 24h lowest trade, null if there weren't any trades
› mark_iv number (Only for option) implied volatility for mark price
› mark_price number The current instrument market price
› mid_price number The average of the best bid and ask, null if there aren't any asks or bids
› open_interest number Optional (only for derivatives). The total amount of outstanding contracts in the corresponding amount units. For perpetual and futures the amount is in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› price_change number 24-hour price change expressed as a percentage, null if there weren't any trades
› quote_currency string Quote currency
› underlying_index string Name of the underlying future, or 'index_price' (options only)
› underlying_price number underlying price for implied volatility calculations (options only)
› volume number The total 24h traded volume (in base currency)
› volume_notional number Volume in quote currency (futures and spots only)
› volume_usd number Volume in USD
/public/get_contract_size
var msg =
{"jsonrpc": "2.0",
"method": "public/get_contract_size",
"id": 42,
"params": {
"instrument_name": "BTC-PERPETUAL"}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this:

{
"jsonrpc": "2.0",
"result": {
"contract_size": 10
}
}
Retrieves contract size of provided instrument.

Try in API console

Parameters
Parameter Required Type Enum Description
instrument_name true string Instrument name
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› contract_size integer Contract size, for futures in USD, for options in base currency of the instrument (BTC, ETH, ...)
/public/get_currencies
var msg =
{
"jsonrpc" : "2.0",
"id" : 7538,
"method" : "public/get_currencies",
"params" : {

}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 7538,
"result": [
{
"coin_type": "ETHER",
"currency": "ETH",
"currency_long": "Ethereum",
"fee_precision": 4,
"min_confirmations": 1,
"min_withdrawal_fee": 0.0001,
"withdrawal_fee": 0.0006,
"withdrawal_priorities": []
},
{
"coin_type": "BITCOIN",
"currency": "BTC",
"currency_long": "Bitcoin",
"fee_precision": 4,
"min_confirmations": 1,
"min_withdrawal_fee": 0.0001,
"withdrawal_fee": 0.0001,
"withdrawal_priorities": [
{
"value": 0.15,
"name": "very_low"
},
{
"value": 1.5,
"name": "very_high"
}
]
}
]
}

Retrieves all cryptocurrencies supported by the API.

Try in API console

Parameters
This method takes no parameters

Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result array of object
› coin_type string The type of the currency.
› currency string The abbreviation of the currency. This abbreviation is used elsewhere in the API to identify the currency.
› currency_long string The full name for the currency.
› fee_precision integer fee precision
› in_cross_collateral_pool boolean true if the currency is part of the cross collateral pool
› min_confirmations integer Minimum number of block chain confirmations before deposit is accepted.
› min_withdrawal_fee number The minimum transaction fee paid for withdrawals
› withdrawal_fee number The total transaction fee paid for withdrawals
› withdrawal_priorities array of object
› › name string
› › value number
/public/get_delivery_prices
var msg =
{
"jsonrpc" : "2.0",
"id" : 3601,
"method" : "public/get_delivery_prices",
"params" : {
"index_name" : "btc_usd",
"offset" : 0,
"count" : 5
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 3601,
"result": {
"data": [
{
"date": "2020-01-02",
"delivery_price": 7131.214606410254
},
{
"date": "2019-12-21",
"delivery_price": 7150.943217777777
},
{
"date": "2019-12-20",
"delivery_price": 7175.988445532345
},
{
"date": "2019-12-19",
"delivery_price": 7189.540776143791
},
{
"date": "2019-12-18",
"delivery_price": 6698.353743857118
}
],
"records_total": 58
}
}
Retrieves delivery prices for then given index

Try in API console

Parameters
Parameter Required Type Enum Description
index_name true string ada_usd
algo_usd
avax_usd
bch_usd
btc_usd
doge_usd
dot_usd
eth_usd
link_usd
ltc_usd
matic_usd
near_usd
shib_usd
sol_usd
trx_usd
uni_usd
usdc_usd
xrp_usd
ada_usdc
bch_usdc
algo_usdc
avax_usdc
btc_usdc
doge_usdc
dot_usdc
bch_usdc
eth_usdc
link_usdc
ltc_usdc
matic_usdc
near_usdc
shib_usdc
sol_usdc
trx_usdc
uni_usdc
xrp_usdc
ada_usdt
algo_usdt
avax_usdt
bch_usdt
bnb_usdt
bnb_usdt
btc_usdt
btc_usdt
doge_usdt
dot_usdt
eth_usdt
eth_usdt
link_usdt
ltc_usdt
luna_usdt
matic_usdt
near_usdt
shib_usdt
sol_usdt
trx_usdt
uni_usdt
xrp_usdt
btcdvol_usdc
ethdvol_usdc Index identifier, matches (base) cryptocurrency with quote currency
offset false integer The offset for pagination, default - 0
count false integer Number of requested items, default - 10
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› data array of object
› › date string The event date with year, month and day
› › delivery_price number The settlement price for the instrument. Only when state = closed
› records_total number Available delivery prices
/public/get_funding_chart_data
var msg =
{"jsonrpc": "2.0",
"method": "public/get_funding_chart_data",
"id": 42,
"params": {
"instrument_name": "BTC-PERPETUAL",
"length": "8h"}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this:

{
"jsonrpc": "2.0",
"result": {
"current_interest": 0.0050006706,
"data": [{
"index_price": 8247.27,
"interest_8h": 0.0049995114,
"timestamp": 1536569522277
}],
"interest_8h": 0.0040080897
}
}
Retrieve the list of the latest PERPETUAL funding chart points within a given time period.

Try in API console

Parameters
Parameter Required Type Enum Description
instrument_name true string Instrument name
length true string 8h
24h
1m Specifies time period. 8h - 8 hours, 24h - 24 hours, 1m - 1 month
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› current_interest number Current interest
› data array of object
› › index_price number Current index price
› › interest_8h number Historical interest 8h value
› › timestamp integer The timestamp (milliseconds since the Unix epoch)
› interest_8h number Current interest 8h
/public/get_funding_rate_history
var msg =
{
"jsonrpc" : "2.0",
"id" : 7617,
"method" : "public/get_funding_rate_history",
"params" : {
"instrument_name" : "BTC-PERPETUAL",
"start_timestamp" : 1569888000000,
"end_timestamp" : 1569902400000
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 7617,
"result": [
{
"timestamp": 1569891600000,
"index_price": 8222.87,
"prev_index_price": 8305.72,
"interest_8h": -0.00009234260068476106,
"interest_1h": -4.739622041017375e-7
},
{
"timestamp": 1569895200000,
"index_price": 8286.49,
"prev_index_price": 8222.87,
"interest_8h": -0.00006720918180255509,
"interest_1h": -2.8583510923267753e-7
},
{
"timestamp": 1569898800000,
"index_price": 8431.97,
"prev_index_price": 8286.49,
"interest_8h": -0.00003544496169694662,
"interest_1h": -0.000003815906848177951
},
{
"timestamp": 1569902400000,
"index_price": 8422.36,
"prev_index_price": 8431.97,
"interest_8h": -0.00001404147515584998,
"interest_1h": 8.312033064379086e-7
}
]
}

Retrieves hourly historical interest rate for requested PERPETUAL instrument.

Try in API console

Parameters
Parameter Required Type Enum Description
instrument_name true string Instrument name
start_timestamp true integer The earliest timestamp to return result from (milliseconds since the UNIX epoch)
end_timestamp true integer The most recent timestamp to return result from (milliseconds since the UNIX epoch)
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result array of object
› index_price number Price in base currency
› interest_1h float 1hour interest rate
› interest_8h float 8hour interest rate
› prev_index_price number Price in base currency
› timestamp integer The timestamp (milliseconds since the Unix epoch)
/public/get_funding_rate_value
var msg =
{
"jsonrpc" : "2.0",
"id" : 7617,
"method" : "public/get_funding_rate_value",
"params" : {
"instrument_name" : "BTC-PERPETUAL",
"start_timestamp" : 1569888000000,
"end_timestamp" : 1569974400000
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 7617,
"result": -0.00025056853702101664
}

Retrieves interest rate value for requested period. Applicable only for PERPETUAL instruments.

Try in API console

Parameters
Parameter Required Type Enum Description
instrument_name true string Instrument name
start_timestamp true integer The earliest timestamp to return result from (milliseconds since the UNIX epoch)
end_timestamp true integer The most recent timestamp to return result from (milliseconds since the UNIX epoch)
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result float
/public/get_historical_volatility
var msg =
{
"jsonrpc" : "2.0",
"id" : 8387,
"method" : "public/get_historical_volatility",
"params" : {
"currency" : "BTC"
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 8387,
"result": [
[
1549720800000,
14.747743607344217
],
[
1549720800000,
14.747743607344217
],
[
1549724400000,
14.74257778551467
],
[
1549728000000,
14.73502799931767
],
[
1549731600000,
14.73502799931767
],
[
1549735200000,
14.73502799931767
],
[
1550228400000,
46.371891307340015
]
]
}

Provides information about historical volatility for given cryptocurrency.

Try in API console

Parameters
Parameter Required Type Enum Description
currency true string BTC
ETH
USDC
USDT
EURR The currency symbol
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result array of [timestamp, value]
/public/get_index
var msg =
{"jsonrpc": "2.0",
"method": "public/get_index",
"id": 42,
"params": {
"currency": "BTC"}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this:

{
"jsonrpc": "2.0",
"result": {
"BTC": 11628.81,
"edp": 11628.81
}
}
Retrieves the current index price for the instruments, for the selected currency.

Try in API console

This method is deprecated and will be removed in the future.
Parameters
Parameter Required Type Enum Description
currency true string BTC
ETH
USDC
USDT
EURR The currency symbol
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› BTC number The current index price for BTC-USD (only for selected currency == BTC)
› ETH number The current index price for ETH-USD (only for selected currency == ETH)
› edp number Estimated delivery price for the currency. For more details, see Documentation > General > Expiration Price
/public/get_index_price
var msg =
{"jsonrpc": "2.0",
"method": "public/get_index_price",
"id": 42,
"params": {
"index_name": "ada_usd"}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this:

{
"jsonrpc": "2.0",
"result": {
"estimated_delivery_price": 11628.81,
"index_price": 11628.81
}
}
Retrieves the current index price value for given index name.

Try in API console

Parameters
Parameter Required Type Enum Description
index_name true string ada_usd
algo_usd
avax_usd
bch_usd
btc_usd
doge_usd
dot_usd
eth_usd
link_usd
ltc_usd
matic_usd
near_usd
shib_usd
sol_usd
trx_usd
uni_usd
usdc_usd
xrp_usd
ada_usdc
bch_usdc
algo_usdc
avax_usdc
btc_usdc
doge_usdc
dot_usdc
bch_usdc
eth_usdc
link_usdc
ltc_usdc
matic_usdc
near_usdc
shib_usdc
sol_usdc
trx_usdc
uni_usdc
xrp_usdc
ada_usdt
algo_usdt
avax_usdt
bch_usdt
bnb_usdt
bnb_usdt
btc_usdt
btc_usdt
doge_usdt
dot_usdt
eth_usdt
eth_usdt
link_usdt
ltc_usdt
luna_usdt
matic_usdt
near_usdt
shib_usdt
sol_usdt
trx_usdt
uni_usdt
xrp_usdt
btcdvol_usdc
ethdvol_usdc Index identifier, matches (base) cryptocurrency with quote currency
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› estimated_delivery_price number Estimated delivery price for the market. For more details, see Documentation > General > Expiration Price
› index_price number Value of requested index
/public/get_index_price_names
var msg =
{"jsonrpc": "2.0",
"method": "public/get_index_price_names",
"id": 42
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 7617,
"result": [
"btc_usd",
"eth_usd",
"btc_usdc",
"eth_usdc"
]
}

Retrieves the identifiers of all supported Price Indexes

Try in API console

Parameters
This method takes no parameters

Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result array of string
/public/get_instrument
var msg =
{
"method" : "public/get_instrument",
"params" : {
"instrument_name" : "BTC-13JAN23-16000-P"
},
"jsonrpc" : "2.0",
"id" : 2
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 2,
"result": {
"tick_size": 0.0005,
"tick_size_steps": [
{
"above_price": 120,
"tick_size": 0.001
},
{
"above_price": 200,
"tick_size": 0.003
}
],
"taker_commission": 0.0003,
"strike": 16000,
"settlement_period": "week",
"settlement_currency": "BTC",
"rfq": false,
"quote_currency": "BTC",
"price_index": "btc_usd",
"option_type": "put",
"min_trade_amount": 0.1,
"maker_commission": 0.0003,
"kind": "option",
"is_active": true,
"instrument_name": "BTC-13JAN23-16000-P",
"instrument_id": 144613,
"expiration_timestamp": 1673596800000,
"creation_timestamp": 1671696002000,
"counter_currency": "USD",
"contract_size": 1,
"block_trade_tick_size": 0.0001,
"block_trade_min_trade_amount": 25,
"block_trade_commission": 0.00015,
"base_currency": "BTC"
}
}

Retrieves information about instrument

Try in API console

Parameters
Parameter Required Type Enum Description
instrument_name true string Instrument name
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› base_currency string The underlying currency being traded.
› block_trade_commission number Block Trade commission for instrument.
› block_trade_min_trade_amount number Minimum amount for block trading.
› block_trade_tick_size number Specifies minimal price change for block trading.
› contract_size integer Contract size for instrument.
› counter_currency string Counter currency for the instrument.
› creation_timestamp integer The time when the instrument was first created (milliseconds since the UNIX epoch).
› expiration_timestamp integer The time when the instrument will expire (milliseconds since the UNIX epoch).
› future_type string Future type (only for futures)(field is deprecated and will be removed in the future, instrument_type should be used instead).
› instrument_id integer Instrument ID
› instrument_name string Unique instrument identifier
› instrument_type string Type of the instrument. linear or reversed
› is_active boolean Indicates if the instrument can currently be traded.
› kind string Instrument kind: "future", "option", "spot", "future_combo", "option_combo"
› maker_commission number Maker commission for instrument.
› max_leverage integer Maximal leverage for instrument (only for futures).
› max_liquidation_commission number Maximal liquidation trade commission for instrument (only for futures).
› min_trade_amount number Minimum amount for trading. For perpetual and futures - in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› option_type string The option type (only for options).
› price_index string Name of price index that is used for this instrument
› quote_currency string The currency in which the instrument prices are quoted.
› rfq boolean Whether or not RFQ is active on the instrument.
› settlement_currency string Optional (not added for spot). Settlement currency for the instrument.
› settlement_period string Optional (not added for spot). The settlement period.
› strike number The strike value (only for options).
› taker_commission number Taker commission for instrument.
› tick_size number Specifies minimal price change and, as follows, the number of decimal places for instrument prices.
› tick_size_steps object
› › above_price number The price from which the increased tick size applies
› › tick_size number Tick size to be used above the price. It must be multiple of the minimum tick size.
/public/get_instruments
var msg =
{
"method" : "public/get_instruments",
"params" : {
"currency" : "BTC",
"kind" : "future"
},
"jsonrpc" : "2.0",
"id" : 1
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 1,
"result": [
{
"tick_size": 2.5,
"tick_size_steps": [],
"taker_commission": 0.0005,
"settlement_period": "month",
"settlement_currency": "BTC",
"rfq": false,
"quote_currency": "USD",
"price_index": "btc_usd",
"min_trade_amount": 10,
"max_liquidation_commission": 0.0075,
"max_leverage": 50,
"maker_commission": 0,
"kind": "future",
"is_active": true,
"instrument_name": "BTC-29SEP23",
"instrument_id": 138583,
"instrument_type": "reversed",
"expiration_timestamp": 1695974400000,
"creation_timestamp": 1664524802000,
"counter_currency": "USD",
"contract_size": 10,
"block_trade_tick_size": 0.01,
"block_trade_min_trade_amount": 200000,
"block_trade_commission": 0.00025,
"base_currency": "BTC"
},
{
"tick_size": 0.5,
"tick_size_steps": [],
"taker_commission": 0.0005,
"settlement_period": "perpetual",
"settlement_currency": "BTC",
"rfq": false,
"quote_currency": "USD",
"price_index": "btc_usd",
"min_trade_amount": 10,
"max_liquidation_commission": 0.0075,
"max_leverage": 50,
"maker_commission": 0,
"kind": "future",
"is_active": true,
"instrument_name": "BTC-PERPETUAL",
"instrument_id": 124972,
"instrument_type": "reversed",
"expiration_timestamp": 32503708800000,
"creation_timestamp": 1534167754000,
"counter_currency": "USD",
"contract_size": 10,
"block_trade_tick_size": 0.01,
"block_trade_min_trade_amount": 200000,
"block_trade_commission": 0.00025,
"base_currency": "BTC"
}
]
}

Retrieves available trading instruments. This method can be used to see which instruments are available for trading, or which instruments have recently expired.

Try in API console

Parameters
Parameter Required Type Enum Description
currency true string BTC
ETH
USDC
USDT
EURR
any The currency symbol or "any" for all
kind false string future
option
spot
future_combo
option_combo Instrument kind, if not provided instruments of all kinds are considered
expired false boolean Set to true to show recently expired instruments instead of active ones.
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result array of object
› base_currency string The underlying currency being traded.
› block_trade_commission number Block Trade commission for instrument.
› block_trade_min_trade_amount number Minimum amount for block trading.
› block_trade_tick_size number Specifies minimal price change for block trading.
› contract_size integer Contract size for instrument.
› counter_currency string Counter currency for the instrument.
› creation_timestamp integer The time when the instrument was first created (milliseconds since the UNIX epoch).
› expiration_timestamp integer The time when the instrument will expire (milliseconds since the UNIX epoch).
› future_type string Future type (only for futures)(field is deprecated and will be removed in the future, instrument_type should be used instead).
› instrument_id integer Instrument ID
› instrument_name string Unique instrument identifier
› instrument_type string Type of the instrument. linear or reversed
› is_active boolean Indicates if the instrument can currently be traded.
› kind string Instrument kind: "future", "option", "spot", "future_combo", "option_combo"
› maker_commission number Maker commission for instrument.
› max_leverage integer Maximal leverage for instrument (only for futures).
› max_liquidation_commission number Maximal liquidation trade commission for instrument (only for futures).
› min_trade_amount number Minimum amount for trading. For perpetual and futures - in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› option_type string The option type (only for options).
› price_index string Name of price index that is used for this instrument
› quote_currency string The currency in which the instrument prices are quoted.
› rfq boolean Whether or not RFQ is active on the instrument.
› settlement_currency string Optional (not added for spot). Settlement currency for the instrument.
› settlement_period string Optional (not added for spot). The settlement period.
› strike number The strike value (only for options).
› taker_commission number Taker commission for instrument.
› tick_size number Specifies minimal price change and, as follows, the number of decimal places for instrument prices.
› tick_size_steps object
› › above_price number The price from which the increased tick size applies
› › tick_size number Tick size to be used above the price. It must be multiple of the minimum tick size.
/public/get_last_settlements_by_currency
var msg =
{
"jsonrpc" : "2.0",
"id" : 4497,
"method" : "public/get_last_settlements_by_currency",
"params" : {
"currency" : "BTC",
"type" : "delivery",
"count" : 2
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 4497,
"result": {
"settlements": [
{
"type": "delivery",
"timestamp": 1550242800013,
"session_profit_loss": 4.703907906,
"profit_loss": -0.427669766,
"position": 64,
"mark_price": 0.121679828,
"instrument_name": "BTC-15FEB19-4000-P",
"index_price": 3566.08
},
{
"type": "delivery",
"timestamp": 1550242800013,
"session_profit_loss": 3.135938604,
"profit_loss": -2.539278115,
"position": 206,
"mark_price": 0,
"instrument_name": "BTC-15FEB19-4000-C",
"index_price": 3566.08
}
],
"continuation": "29XjjMM7Zc6U4oytmV27f7a6YRb5aSdVijwfuYhHRTLphugjRf1edP8uGLo3w2mWKV23QgrxsmenRGqzucc7"
}
}
Retrieves historical settlement, delivery and bankruptcy events coming from all instruments within a given currency.

Try in API console

Parameters
Parameter Required Type Enum Description
currency true string BTC
ETH
USDC
USDT
EURR The currency symbol
type false string settlement
delivery
bankruptcy Settlement type
count false integer Number of requested items, default - 20
continuation false string Continuation token for pagination
search_start_timestamp false integer The latest timestamp to return result from (milliseconds since the UNIX epoch)
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› continuation string Continuation token for pagination.
› settlements array of object
› › funded number funded amount (bankruptcy only)
› › funding number funding (in base currency ; settlement for perpetual product only)
› › index_price number underlying index price at time of event (in quote currency; settlement and delivery only)
› › instrument_name string instrument name (settlement and delivery only)
› › mark_price number mark price for at the settlement time (in quote currency; settlement and delivery only)
› › position number position size (in quote currency; settlement and delivery only)
› › profit_loss number profit and loss (in base currency; settlement and delivery only)
› › session_bankruptcy number value of session bankruptcy (in base currency; bankruptcy only)
› › session_profit_loss number total value of session profit and losses (in base currency)
› › session_tax number total amount of paid taxes/fees (in base currency; bankruptcy only)
› › session_tax_rate number rate of paid taxes/fees (in base currency; bankruptcy only)
› › socialized number the amount of the socialized losses (in base currency; bankruptcy only)
› › timestamp integer The timestamp (milliseconds since the Unix epoch)
› › type string The type of settlement. settlement, delivery or bankruptcy.
/public/get_last_settlements_by_instrument
var msg =
{
"jsonrpc" : "2.0",
"id" : 5482,
"method" : "public/get_last_settlements_by_instrument",
"params" : {
"instrument_name" : "BTC-22FEB19",
"type" : "settlement",
"count" : 1
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 5482,
"result": {
"settlements": [
{
"type": "settlement",
"timestamp": 1550502000023,
"session_profit_loss": 0.116509752,
"profit_loss": -9.999999999886402e-10,
"position": 240,
"mark_price": 3578.16,
"instrument_name": "BTC-22FEB19",
"index_price": 3796.43
}
],
"continuation": "2Z7mdtavzYvfuyYcHkJXvPTr9ZSMsEzM3sLCH7AbYEDd1AzTXY2hnhegQDiaP1TtU4b5iSJZ4"
}
}
Retrieves historical public settlement, delivery and bankruptcy events filtered by instrument name.

Try in API console

Parameters
Parameter Required Type Enum Description
instrument_name true string Instrument name
type false string settlement
delivery
bankruptcy Settlement type
count false integer Number of requested items, default - 20
continuation false string Continuation token for pagination
search_start_timestamp false integer The latest timestamp to return result from (milliseconds since the UNIX epoch)
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› continuation string Continuation token for pagination.
› settlements array of object
› › funded number funded amount (bankruptcy only)
› › funding number funding (in base currency ; settlement for perpetual product only)
› › index_price number underlying index price at time of event (in quote currency; settlement and delivery only)
› › instrument_name string instrument name (settlement and delivery only)
› › mark_price number mark price for at the settlement time (in quote currency; settlement and delivery only)
› › position number position size (in quote currency; settlement and delivery only)
› › profit_loss number profit and loss (in base currency; settlement and delivery only)
› › session_bankruptcy number value of session bankruptcy (in base currency; bankruptcy only)
› › session_profit_loss number total value of session profit and losses (in base currency)
› › session_tax number total amount of paid taxes/fees (in base currency; bankruptcy only)
› › session_tax_rate number rate of paid taxes/fees (in base currency; bankruptcy only)
› › socialized number the amount of the socialized losses (in base currency; bankruptcy only)
› › timestamp integer The timestamp (milliseconds since the Unix epoch)
› › type string The type of settlement. settlement, delivery or bankruptcy.
/public/get_last_trades_by_currency
var msg =
{
"jsonrpc" : "2.0",
"id" : 9290,
"method" : "public/get_last_trades_by_currency",
"params" : {
"currency" : "BTC",
"count" : 1
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 9290,
"result": {
"trades": [
{
"trade_seq": 36798,
"trade_id": "277976",
"timestamp": 1590476708320,
"tick_direction": 2,
"price": 8767.08,
"mark_price": 8829.7,
"instrument_name": "BTC-PERPETUAL",
"index_price": 8878.53,
"direction": "sell",
"amount": 100
}
],
"has_more": true
}
}

Retrieve the latest trades that have occurred for instruments in a specific currency symbol.

Try in API console

Parameters
Parameter Required Type Enum Description
currency true string BTC
ETH
USDC
USDT
EURR The currency symbol
kind false string future
option
spot
future_combo
option_combo
combo
any Instrument kind, "combo" for any combo or "any" for all. If not provided instruments of all kinds are considered
start_id false string The ID of the first trade to be returned. Number for BTC trades, or hyphen name in ex. "ETH-15" # "ETH_USDC-16"
end_id false string The ID of the last trade to be returned. Number for BTC trades, or hyphen name in ex. "ETH-15" # "ETH_USDC-16"
start_timestamp false integer The earliest timestamp to return result from (milliseconds since the UNIX epoch). When param is provided trades are returned from the earliest
end_timestamp false integer The most recent timestamp to return result from (milliseconds since the UNIX epoch). Only one of params: start_timestamp, end_timestamp is truly required
count false integer Number of requested items, default - 10
sorting false string asc
desc
default Direction of results sorting (default value means no sorting, results will be returned in order in which they left the database)
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› has_more boolean
› trades array of object
› › amount number Trade amount. For perpetual and futures - in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› › block_trade_id string Block trade id - when trade was part of a block trade
› › block_trade_leg_count integer Block trade leg count - when trade was part of a block trade
› › contracts number Trade size in contract units (optional, may be absent in historical trades)
› › direction string Direction: buy, or sell
› › index_price number Index Price at the moment of trade
› › instrument_name string Unique instrument identifier
› › iv number Option implied volatility for the price (Option only)
› › liquidation string Optional field (only for trades caused by liquidation): "M" when maker side of trade was under liquidation, "T" when taker side was under liquidation, "MT" when both sides of trade were under liquidation
› › mark_price number Mark Price at the moment of trade
› › price number Price in base currency
› › tick_direction integer Direction of the "tick" (0 = Plus Tick, 1 = Zero-Plus Tick, 2 = Minus Tick, 3 = Zero-Minus Tick).
› › timestamp integer The timestamp of the trade (milliseconds since the UNIX epoch)
› › trade_id string Unique (per currency) trade identifier
› › trade_seq integer The sequence number of the trade within instrument
/public/get_last_trades_by_currency_and_time
var msg =
{
"jsonrpc" : "2.0",
"id" : 1469,
"method" : "public/get_last_trades_by_currency_and_time",
"params" : {
"currency" : "BTC",
"start_timestamp" : 1590470022768,
"end_timestamp" : 1590480022768,
"count" : 1
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 1469,
"result": {
"trades": [
{
"trade_seq": 3471,
"trade_id": "48077291",
"timestamp": 1590470616101,
"tick_direction": 2,
"price": 0.032,
"mark_price": 0.04070324,
"iv": 74.74,
"instrument_name": "BTC-25SEP20-6000-P",
"index_price": 8899.93,
"direction": "sell",
"amount": 0.5
}
],
"has_more": true
}
}
Retrieve the latest trades that have occurred for instruments in a specific currency symbol and within a given time range.

Scope: trade:read

Try in API console

Parameters
Parameter Required Type Enum Description
currency true string BTC
ETH
USDC
USDT
EURR The currency symbol
kind false string future
option
spot
future_combo
option_combo
combo
any Instrument kind, "combo" for any combo or "any" for all. If not provided instruments of all kinds are considered
start_timestamp true integer The earliest timestamp to return result from (milliseconds since the UNIX epoch). When param is provided trades are returned from the earliest
end_timestamp true integer The most recent timestamp to return result from (milliseconds since the UNIX epoch). Only one of params: start_timestamp, end_timestamp is truly required
count false integer Number of requested items, default - 10
sorting false string asc
desc
default Direction of results sorting (default value means no sorting, results will be returned in order in which they left the database)
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› has_more boolean
› trades array of object
› › amount number Trade amount. For perpetual and futures - in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› › block_trade_id string Block trade id - when trade was part of a block trade
› › block_trade_leg_count integer Block trade leg count - when trade was part of a block trade
› › contracts number Trade size in contract units (optional, may be absent in historical trades)
› › direction string Direction: buy, or sell
› › index_price number Index Price at the moment of trade
› › instrument_name string Unique instrument identifier
› › iv number Option implied volatility for the price (Option only)
› › liquidation string Optional field (only for trades caused by liquidation): "M" when maker side of trade was under liquidation, "T" when taker side was under liquidation, "MT" when both sides of trade were under liquidation
› › mark_price number Mark Price at the moment of trade
› › price number Price in base currency
› › tick_direction integer Direction of the "tick" (0 = Plus Tick, 1 = Zero-Plus Tick, 2 = Minus Tick, 3 = Zero-Minus Tick).
› › timestamp integer The timestamp of the trade (milliseconds since the UNIX epoch)
› › trade_id string Unique (per currency) trade identifier
› › trade_seq integer The sequence number of the trade within instrument
/public/get_last_trades_by_instrument
var msg =
{
"jsonrpc" : "2.0",
"id" : 9267,
"method" : "public/get_last_trades_by_instrument",
"params" : {
"instrument_name" : "BTC-PERPETUAL",
"count" : 1
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 9267,
"result": {
"trades": [
{
"trade_seq": 36798,
"trade_id": "277976",
"timestamp": 1590476708320,
"tick_direction": 2,
"price": 8767.08,
"mark_price": 8829.7,
"instrument_name": "BTC-PERPETUAL",
"index_price": 8878.53,
"direction": "sell",
"amount": 100
}
],
"has_more": true
}
}
Retrieve the latest trades that have occurred for a specific instrument.

Try in API console

Parameters
Parameter Required Type Enum Description
instrument_name true string Instrument name
start_seq false integer The sequence number of the first trade to be returned
end_seq false integer The sequence number of the last trade to be returned
start_timestamp false integer The earliest timestamp to return result from (milliseconds since the UNIX epoch). When param is provided trades are returned from the earliest
end_timestamp false integer The most recent timestamp to return result from (milliseconds since the UNIX epoch). Only one of params: start_timestamp, end_timestamp is truly required
count false integer Number of requested items, default - 10
sorting false string asc
desc
default Direction of results sorting (default value means no sorting, results will be returned in order in which they left the database)
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› has_more boolean
› trades array of object
› › amount number Trade amount. For perpetual and futures - in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› › block_trade_id string Block trade id - when trade was part of a block trade
› › block_trade_leg_count integer Block trade leg count - when trade was part of a block trade
› › contracts number Trade size in contract units (optional, may be absent in historical trades)
› › direction string Direction: buy, or sell
› › index_price number Index Price at the moment of trade
› › instrument_name string Unique instrument identifier
› › iv number Option implied volatility for the price (Option only)
› › liquidation string Optional field (only for trades caused by liquidation): "M" when maker side of trade was under liquidation, "T" when taker side was under liquidation, "MT" when both sides of trade were under liquidation
› › mark_price number Mark Price at the moment of trade
› › price number Price in base currency
› › tick_direction integer Direction of the "tick" (0 = Plus Tick, 1 = Zero-Plus Tick, 2 = Minus Tick, 3 = Zero-Minus Tick).
› › timestamp integer The timestamp of the trade (milliseconds since the UNIX epoch)
› › trade_id string Unique (per currency) trade identifier
› › trade_seq integer The sequence number of the trade within instrument
/public/get_last_trades_by_instrument_and_time
var msg =
{
"jsonrpc" : "2.0",
"id" : 3983,
"method" : "public/get_last_trades_by_instrument_and_time",
"params" : {
"instrument_name" : "ETH-PERPETUAL",
"end_timestamp" : 1590480022768,
"count" : 1
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 3983,
"result": {
"trades": [
{
"trade_seq": 1966031,
"trade_id": "ETH-2696055",
"timestamp": 1590479408216,
"tick_direction": 0,
"price": 203.6,
"mark_price": 203.41,
"instrument_name": "ETH-PERPETUAL",
"index_price": 203.45,
"direction": "buy",
"amount": 10
}
],
"has_more": true
}
}

Retrieve the latest trades that have occurred for a specific instrument and within a given time range.

Try in API console

Parameters
Parameter Required Type Enum Description
instrument_name true string Instrument name
start_timestamp true integer The earliest timestamp to return result from (milliseconds since the UNIX epoch). When param is provided trades are returned from the earliest
end_timestamp true integer The most recent timestamp to return result from (milliseconds since the UNIX epoch). Only one of params: start_timestamp, end_timestamp is truly required
count false integer Number of requested items, default - 10
sorting false string asc
desc
default Direction of results sorting (default value means no sorting, results will be returned in order in which they left the database)
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› has_more boolean
› trades array of object
› › amount number Trade amount. For perpetual and futures - in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› › block_trade_id string Block trade id - when trade was part of a block trade
› › block_trade_leg_count integer Block trade leg count - when trade was part of a block trade
› › contracts number Trade size in contract units (optional, may be absent in historical trades)
› › direction string Direction: buy, or sell
› › index_price number Index Price at the moment of trade
› › instrument_name string Unique instrument identifier
› › iv number Option implied volatility for the price (Option only)
› › liquidation string Optional field (only for trades caused by liquidation): "M" when maker side of trade was under liquidation, "T" when taker side was under liquidation, "MT" when both sides of trade were under liquidation
› › mark_price number Mark Price at the moment of trade
› › price number Price in base currency
› › tick_direction integer Direction of the "tick" (0 = Plus Tick, 1 = Zero-Plus Tick, 2 = Minus Tick, 3 = Zero-Minus Tick).
› › timestamp integer The timestamp of the trade (milliseconds since the UNIX epoch)
› › trade_id string Unique (per currency) trade identifier
› › trade_seq integer The sequence number of the trade within instrument
/public/get_mark_price_history
var msg =
{
"id" : 1,
"method" : "public/get_mark_price_history",
"params" : {
"instrument_name" : "BTC-25JUN21-50000-C",
"start_timestamp" : 1609376800000,
"end_timestamp" : 1609376810000
},
"jsonrpc" : "2.0"
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{"jsonrpc":"2.0",
"id": 25,
"result": [
[1608142381229,0.5165791606037885],
[1608142380231,0.5165737855432504],
[1608142379227,0.5165768236356326]
]
}
Public request for 5min history of markprice values for the instrument. For now the markprice history is available only for a subset of options which take part in the volatility index calculations. All other instruments, futures and perpetuals will return an empty list.

Try in API console

Parameters
Parameter Required Type Enum Description
instrument_name true string Instrument name
start_timestamp true integer The earliest timestamp to return result from (milliseconds since the UNIX epoch)
end_timestamp true integer The most recent timestamp to return result from (milliseconds since the UNIX epoch)
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result array Markprice history values as an array of arrays with 2 values each. The inner values correspond to the timestamp in ms and the markprice itself.
/public/get_order_book
var msg =
{
"jsonrpc" : "2.0",
"id" : 8772,
"method" : "public/get_order_book",
"params" : {
"instrument_name" : "BTC-PERPETUAL",
"depth" : 5
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc":"2.0",
"id":8772,
"result":{
"timestamp":1550757626706,
"stats":{
"volume":93.35589552,
"price_change": 0.6913,
"low":3940.75,
"high":3976.25
},
"state":"open",
"settlement_price":3925.85,
"open_interest":45.27600333464605,
"min_price":3932.22,
"max_price":3971.74,
"mark_price":3931.97,
"last_price":3955.75,
"instrument_name":"BTC-PERPETUAL",
"index_price":3910.46,
"funding_8h":0.00455263,
"current_funding":0.00500063,
"change_id":474988,
"bids":[
[
3955.75,
30.0
],
[
3940.75,
102020.0
],
[
3423.0,
42840.0
]
],
"best_bid_price":3955.75,
"best_bid_amount":30.0,
"best_ask_price":0.0,
"best_ask_amount":0.0,
"asks":[

        ]
    }

}
Retrieves the order book, along with other market values for a given instrument.

Try in API console

Parameters
Parameter Required Type Enum Description
instrument_name true string The instrument name for which to retrieve the order book, see public/get_instruments to obtain instrument names.
depth false integer 1
5
10
20
50
100
1000
10000 The number of entries to return for bids and asks.
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› ask_iv number (Only for option) implied volatility for best ask
› asks array of [price, amount] List of asks
› best_ask_amount number It represents the requested order size of all best asks
› best_ask_price number The current best ask price, null if there aren't any asks
› best_bid_amount number It represents the requested order size of all best bids
› best_bid_price number The current best bid price, null if there aren't any bids
› bid_iv number (Only for option) implied volatility for best bid
› bids array of [price, amount] List of bids
› current_funding number Current funding (perpetual only)
› delivery_price number The settlement price for the instrument. Only when state = closed
› funding_8h number Funding 8h (perpetual only)
› greeks object Only for options
› › delta number (Only for option) The delta value for the option
› › gamma number (Only for option) The gamma value for the option
› › rho number (Only for option) The rho value for the option
› › theta number (Only for option) The theta value for the option
› › vega number (Only for option) The vega value for the option
› index_price number Current index price
› instrument_name string Unique instrument identifier
› interest_rate number Interest rate used in implied volatility calculations (options only)
› last_price number The price for the last trade
› mark_iv number (Only for option) implied volatility for mark price
› mark_price number The mark price for the instrument
› max_price number The maximum price for the future. Any buy orders you submit higher than this price, will be clamped to this maximum.
› min_price number The minimum price for the future. Any sell orders you submit lower than this price will be clamped to this minimum.
› open_interest number The total amount of outstanding contracts in the corresponding amount units. For perpetual and futures the amount is in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› settlement_price number Optional (not added for spot). The settlement price for the instrument. Only when state = open
› state string The state of the order book. Possible values are open and closed.
› stats object
› › high number Highest price during 24h
› › low number Lowest price during 24h
› › price_change number 24-hour price change expressed as a percentage, null if there weren't any trades
› › volume number Volume during last 24h in base currency
› › volume_usd number Volume in usd (futures only)
› timestamp integer The timestamp (milliseconds since the Unix epoch)
› underlying_index number Name of the underlying future, or index_price (options only)
› underlying_price number Underlying price for implied volatility calculations (options only)
/public/get_order_book_by_instrument_id
var msg =
{"jsonrpc": "2.0",
"method": "public/get_order_book_by_instrument_id",
"id": 42,
"params": {
"instrument_id": 42,
"depth": 1}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc":"2.0",
"id":8772,
"result":{
"timestamp":1550757626706,
"stats":{
"volume":93.35589552,
"price_change": 0.6913,
"low":3940.75,
"high":3976.25
},
"state":"open",
"settlement_price":3925.85,
"open_interest":45.27600333464605,
"min_price":3932.22,
"max_price":3971.74,
"mark_price":3931.97,
"last_price":3955.75,
"instrument_name":"BTC-PERPETUAL",
"index_price":3910.46,
"funding_8h":0.00455263,
"current_funding":0.00500063,
"change_id":474988,
"bids":[
[
3955.75,
30.0
],
[
3940.75,
102020.0
],
[
3423.0,
42840.0
]
],
"best_bid_price":3955.75,
"best_bid_amount":30.0,
"best_ask_price":0.0,
"best_ask_amount":0.0,
"asks":[

        ]
    }

}
Retrieves the order book, along with other market values for a given instrument ID.

Try in API console

Parameters
Parameter Required Type Enum Description
instrument_id true integer The instrument ID for which to retrieve the order book, see public/get_instruments to obtain instrument IDs.
depth false integer 1
5
10
20
50
100
1000
10000 The number of entries to return for bids and asks.
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› ask_iv number (Only for option) implied volatility for best ask
› asks array of [price, amount] List of asks
› best_ask_amount number It represents the requested order size of all best asks
› best_ask_price number The current best ask price, null if there aren't any asks
› best_bid_amount number It represents the requested order size of all best bids
› best_bid_price number The current best bid price, null if there aren't any bids
› bid_iv number (Only for option) implied volatility for best bid
› bids array of [price, amount] List of bids
› current_funding number Current funding (perpetual only)
› delivery_price number The settlement price for the instrument. Only when state = closed
› funding_8h number Funding 8h (perpetual only)
› greeks object Only for options
› › delta number (Only for option) The delta value for the option
› › gamma number (Only for option) The gamma value for the option
› › rho number (Only for option) The rho value for the option
› › theta number (Only for option) The theta value for the option
› › vega number (Only for option) The vega value for the option
› index_price number Current index price
› instrument_name string Unique instrument identifier
› interest_rate number Interest rate used in implied volatility calculations (options only)
› last_price number The price for the last trade
› mark_iv number (Only for option) implied volatility for mark price
› mark_price number The mark price for the instrument
› max_price number The maximum price for the future. Any buy orders you submit higher than this price, will be clamped to this maximum.
› min_price number The minimum price for the future. Any sell orders you submit lower than this price will be clamped to this minimum.
› open_interest number The total amount of outstanding contracts in the corresponding amount units. For perpetual and futures the amount is in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› settlement_price number Optional (not added for spot). The settlement price for the instrument. Only when state = open
› state string The state of the order book. Possible values are open and closed.
› stats object
› › high number Highest price during 24h
› › low number Lowest price during 24h
› › price_change number 24-hour price change expressed as a percentage, null if there weren't any trades
› › volume number Volume during last 24h in base currency
› › volume_usd number Volume in usd (futures only)
› timestamp integer The timestamp (milliseconds since the Unix epoch)
› underlying_index number Name of the underlying future, or index_price (options only)
› underlying_price number Underlying price for implied volatility calculations (options only)
/public/get_rfqs
var msg =
{
"id" : 1,
"method" : "public/get_rfqs",
"params" : {
"currency" : "BTC",
"kind" : "future"
},
"jsonrpc" : "2.0"
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 1,
"result": [
{
"traded_volume": 0,
"amount": 10,
"side": "buy",
"last_rfq_tstamp": 1634816611595,
"instrument_name": "BTC-PERPETUAL"
}
]
}

Retrieve active RFQs for instruments in given currency.

Try in API console

Parameters
Parameter Required Type Enum Description
currency true string BTC
ETH
USDC
USDT
EURR The currency symbol
kind false string future
option
spot
future_combo
option_combo Instrument kind, if not provided instruments of all kinds are considered
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result array of object
› amount number It represents the requested order size. For perpetual and futures the amount is in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› instrument_name string Unique instrument identifier
› last_rfq_timestamp integer The timestamp of last RFQ (milliseconds since the Unix epoch)
› side string Side - buy or sell
› traded_volume number Volume traded since last RFQ
/public/get_supported_index_names
var msg =
{"jsonrpc": "2.0",
"method": "public/get_supported_index_names",
"id": 42,
"params": {
"type": "all"}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 25718,
"result": [
"btc_eth",
"btc_usdc",
"eth_usdc"
]
}

Retrieves the identifiers of all supported Price Indexes

Try in API console

Parameters
Parameter Required Type Enum Description
type false string all
spot
derivative Type of a cryptocurrency price index
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result array of string
/public/get_trade_volumes
var msg =
{
"jsonrpc" : "2.0",
"id" : 6387,
"method" : "public/get_trade_volumes"
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 6387,
"result": [
{
"puts_volume": 48,
"futures_volume": 6.25578452,
"currency": "BTC",
"calls_volume": 145,
"spot_volume": 11.1
},
{
"puts_volume": 122.65,
"futures_volume": 374.392173,
"currency": "ETH",
"calls_volume": 37.4,
"spot_volume": 57.7
}
]
}

Retrieves aggregated 24h trade volumes for different instrument types and currencies.

Try in API console

Parameters
Parameter Required Type Enum Description
extended false boolean Request for extended statistics. Including also 7 and 30 days volumes (default false)
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result array of object
› calls_volume number Total 24h trade volume for call options.
› calls_volume_30d number Total 30d trade volume for call options.
› calls_volume_7d number Total 7d trade volume for call options.
› currency string Currency, i.e "BTC", "ETH", "USDC"
› futures_volume number Total 24h trade volume for futures.
› futures_volume_30d number Total 30d trade volume for futures.
› futures_volume_7d number Total 7d trade volume for futures.
› puts_volume number Total 24h trade volume for put options.
› puts_volume_30d number Total 30d trade volume for put options.
› puts_volume_7d number Total 7d trade volume for put options.
› spot_volume number Total 24h trade for spot.
› spot_volume_30d number Total 30d trade for spot.
› spot_volume_7d number Total 7d trade for spot.
/public/get_tradingview_chart_data
var msg =
{
"jsonrpc" : "2.0",
"id" : 833,
"method" : "public/get_tradingview_chart_data",
"params" : {
"instrument_name" : "BTC-5APR19",
"start_timestamp" : 1554373800000,
"end_timestamp" : 1554376800000,
"resolution" : "30"
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 833,
"result": {
"volume": [
19.007942601,
20.095877981
],
"cost": [
19000.0,
23400.0
],
"ticks": [
1554373800000,
1554375600000
],
"status": "ok",
"open": [
4963.42,
4986.29
],
"low": [
4728.94,
4726.6
],
"high": [
5185.45,
5250.87
],
"close": [
5052.95,
5013.59
]
},
"usIn": 1554381680742493,
"usOut": 1554381680742698,
"usDiff": 205,
"testnet": false
}
Publicly available market data used to generate a TradingView candle chart.

Try in API console

Parameters
Parameter Required Type Enum Description
instrument_name true string Instrument name
start_timestamp true integer The earliest timestamp to return result from (milliseconds since the UNIX epoch)
end_timestamp true integer The most recent timestamp to return result from (milliseconds since the UNIX epoch)
resolution true string 1
3
5
10
15
30
60
120
180
360
720
1D Chart bars resolution given in full minutes or keyword 1D (only some specific resolutions are supported)
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› close array of number List of prices at close (one per candle)
› cost array of number List of cost bars (volume in quote currency, one per candle)
› high array of number List of highest price levels (one per candle)
› low array of number List of lowest price levels (one per candle)
› open array of number List of prices at open (one per candle)
› status string Status of the query: ok or no_data
› ticks array of integer Values of the time axis given in milliseconds since UNIX epoch
› volume array of number List of volume bars (in base currency, one per candle)
/public/get_volatility_index_data
var msg =
{
"jsonrpc" : "2.0",
"id" : 833,
"method" : "public/get_volatility_index_data",
"params" : {
"currency" : "BTC",
"start_timestamp" : 1599373800000,
"end_timestamp" : 1599376800000,
"resolution" : "60"
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc":"2.0",
"id":5,
"result":
{
"data": [
[1598019300000,0.210084879,0.212860821,0.210084879,0.212860821],
[1598019360000,0.212869011,0.212987527,0.212869011,0.212987527],
[1598019420000,0.212987723,0.212992597,0.212987723,0.212992597]
],
"continuation": null
}
}

Public market data request for volatility index candles.

Try in API console

Parameters
Parameter Required Type Enum Description
currency true string BTC
ETH
USDC
USDT
EURR The currency symbol
start_timestamp true integer The earliest timestamp to return result from (milliseconds since the UNIX epoch)
end_timestamp true integer The most recent timestamp to return result from (milliseconds since the UNIX epoch)
resolution true string 1
60
3600
43200
1D Time resolution given in full seconds or keyword 1D (only some specific resolutions are supported)
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object Volatility index candles.
› continuation integer Continuation - to be used as the end_timestamp parameter on the next request. NULL when no continuation.
› data array Candles as an array of arrays with 5 values each. The inner values correspond to the timestamp in ms, open, high, low, and close values of the volatility index correspondingly.
/public/ticker
var msg =
{
"jsonrpc" : "2.0",
"id" : 8106,
"method" : "public/ticker",
"params" : {
"instrument_name" : "BTC-PERPETUAL"
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 8106,
"result": {
"best_ask_amount": 53040,
"best_ask_price": 36290,
"best_bid_amount": 4600,
"best_bid_price": 36289.5,
"current_funding": 0,
"estimated_delivery_price": 36297.02,
"funding_8h": 0.00002203,
"index_price": 36297.02,
"instrument_name": "BTC-PERPETUAL",
"interest_value": 1.7362511643080387,
"last_price": 36289.5,
"mark_price": 36288.31,
"max_price": 36833.4,
"min_price": 35744.73,
"open_interest": 502231260,
"settlement_price": 36169.49,
"state": "open",
"stats": {
"high": 36824.5,
"low": 35213.5,
"price_change": 0.2362,
"volume": 7831.26548117,
"volume_usd": 282615600
},
"timestamp": 1623059681955
}
}

Get ticker for an instrument.

Try in API console

Parameters
Parameter Required Type Enum Description
instrument_name true string Instrument name
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› ask_iv number (Only for option) implied volatility for best ask
› best_ask_amount number It represents the requested order size of all best asks
› best_ask_price number The current best ask price, null if there aren't any asks
› best_bid_amount number It represents the requested order size of all best bids
› best_bid_price number The current best bid price, null if there aren't any bids
› bid_iv number (Only for option) implied volatility for best bid
› current_funding number Current funding (perpetual only)
› delivery_price number The settlement price for the instrument. Only when state = closed
› estimated_delivery_price number Estimated delivery price for the market. For more details, see Contract Specification > General Documentation > Expiration Price
› funding_8h number Funding 8h (perpetual only)
› greeks object Only for options
› › delta number (Only for option) The delta value for the option
› › gamma number (Only for option) The gamma value for the option
› › rho number (Only for option) The rho value for the option
› › theta number (Only for option) The theta value for the option
› › vega number (Only for option) The vega value for the option
› index_price number Current index price
› instrument_name string Unique instrument identifier
› interest_rate number Interest rate used in implied volatility calculations (options only)
› interest_value number Value used to calculate realized_funding in positions (perpetual only)
› last_price number The price for the last trade
› mark_iv number (Only for option) implied volatility for mark price
› mark_price number The mark price for the instrument
› max_price number The maximum price for the future. Any buy orders you submit higher than this price, will be clamped to this maximum.
› min_price number The minimum price for the future. Any sell orders you submit lower than this price will be clamped to this minimum.
› open_interest number The total amount of outstanding contracts in the corresponding amount units. For perpetual and futures the amount is in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› settlement_price number Optional (not added for spot). The settlement price for the instrument. Only when state = open
› state string The state of the order book. Possible values are open and closed.
› stats object
› › high number Highest price during 24h
› › low number Lowest price during 24h
› › price_change number 24-hour price change expressed as a percentage, null if there weren't any trades
› › volume number Volume during last 24h in base currency
› › volume_usd number Volume in usd (futures only)
› timestamp integer The timestamp (milliseconds since the Unix epoch)
› underlying_index number Name of the underlying future, or index_price (options only)
› underlying_price number Underlying price for implied volatility calculations (options only)
Trading
/private/buy
var msg =
{
"jsonrpc" : "2.0",
"id" : 5275,
"method" : "private/buy",
"params" : {
"instrument_name" : "ETH-PERPETUAL",
"amount" : 40,
"type" : "market",
"label" : "market0000234"
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 5275,
"result": {
"trades": [
{
"trade_seq": 1966056,
"trade_id": "ETH-2696083",
"timestamp": 1590483938456,
"tick_direction": 0,
"state": "filled",
"reduce_only": false,
"price": 203.3,
"post_only": false,
"order_type": "market",
"order_id": "ETH-584849853",
"matching_id": null,
"mark_price": 203.28,
"liquidity": "T",
"label": "market0000234",
"instrument_name": "ETH-PERPETUAL",
"index_price": 203.33,
"fee_currency": "ETH",
"fee": 0.00014757,
"direction": "buy",
"amount": 40
}
],
"order": {
"web": false,
"time_in_force": "good_til_cancelled",
"replaced": false,
"reduce_only": false,
"price": 207.3,
"post_only": false,
"order_type": "market",
"order_state": "filled",
"order_id": "ETH-584849853",
"max_show": 40,
"last_update_timestamp": 1590483938456,
"label": "market0000234",
"is_rebalance": false,
"is_liquidation": false,
"instrument_name": "ETH-PERPETUAL",
"filled_amount": 40,
"direction": "buy",
"creation_timestamp": 1590483938456,
"average_price": 203.3,
"api": true,
"amount": 40
}
}
}

Places a buy order for an instrument.

Scope: trade:read_write

Try in API console

This is a private method; it can only be used after authentication.
This is a matching engine method.
Parameters
Parameter Required Type Enum Description
instrument_name true string Instrument name
amount false number It represents the requested order size. For perpetual and inverse futures the amount is in USD units. For linear futures it is the underlying base currency coin. For options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH. The amount is a mandatory parameter if contracts parameter is missing. If both contracts and amount parameter are passed they must match each other otherwise error is returned.
contracts false number It represents the requested order size in contract units and can be passed instead of amount. The contracts is a mandatory parameter if amount parameter is missing. If both contracts and amount parameter are passed they must match each other otherwise error is returned.
type false string limit
stop_limit
take_limit
market
stop_market
take_market
market_limit
trailing_stop The order type, default: "limit"
label false string user defined label for the order (maximum 64 characters)
price false number
The order price in base currency (Only for limit and stop_limit orders)

When adding an order with advanced=usd, the field price should be the option price value in USD.

When adding an order with advanced=implv, the field price should be a value of implied volatility in percentages. For example, price=100, means implied volatility of 100%

time_in_force false string good_til_cancelled
good_til_day
fill_or_kill
immediate_or_cancel
Specifies how long the order remains in effect. Default "good_til_cancelled"

"good_til_cancelled" - unfilled order remains in order book until cancelled
"good_til_day" - unfilled order remains in order book till the end of the trading session
"fill_or_kill" - execute a transaction immediately and completely or not at all
"immediate_or_cancel" - execute a transaction immediately, and any portion of the order that cannot be immediately filled is cancelled
max_show false number Maximum amount within an order to be shown to other customers, 0 for invisible order
post_only false boolean
If true, the order is considered post-only. If the new price would cause the order to be filled immediately (as taker), the price will be changed to be just below the spread.

Only valid in combination with time_in_force="good_til_cancelled"

reject_post_only false boolean
If an order is considered post-only and this field is set to true then the order is put to the order book unmodified or the request is rejected.

Only valid in combination with "post_only" set to true

reduce_only false boolean If true, the order is considered reduce-only which is intended to only reduce a current position
trigger_price false number Trigger price, required for trigger orders only (Stop-loss or Take-profit orders)
trigger_offset false number The maximum deviation from the price peak beyond which the order will be triggered
trigger false string index_price
mark_price
last_price Defines the trigger type. Required for "Stop-Loss", "Take-Profit" and "Trailing" trigger orders
advanced false string usd
implv Advanced option order type. (Only for options. Advanced USD orders are not supported for linear options.)
mmp false boolean Order MMP flag, only for order_type 'limit'
valid_until false integer Timestamp, when provided server will start processing request in Matching Engine only before given timestamp, in other cases timed_out error will be responded. Remember that the given timestamp should be consistent with the server's time, use /public/time method to obtain current server time.
linked_order_type false string one_triggers_other
one_cancels_other
one_triggers_one_cancels_other
The type of the linked order.

"one_triggers_other" - Execution of primary order triggers the placement of one or more secondary orders.
"one_cancels_other" - The execution of one order in a pair automatically cancels the other, typically used to set a stop-loss and take-profit simultaneously.
"one_triggers_one_cancels_other" - The execution of a primary order triggers two secondary orders (a stop-loss and take-profit pair), where the execution of one secondary order cancels the other.
trigger_fill_condition false string first_hit
complete_fill
incremental
The fill condition of the linked order (Only for linked order types), default: first_hit.

"first_hit" - any execution of the primary order will fully cancel/place all secondary orders.
"complete_fill" - a complete execution (meaning the primary order no longer exists) will cancel/place the secondary orders.
"incremental" - any fill of the primary order will cause proportional partial cancellation/placement of the secondary order. The amount that will be subtracted/added to the secondary order will be rounded down to the contract size.
otoco_config false array of objects
List of trades to create or cancel when this order is filled.

› amount false number It represents the requested trade size. For perpetual and futures the amount is in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH
› direction true string buy
sell Direction of trade from the maker perspective
› type false string limit
stop_limit
take_limit
market
stop_market
take_market
market_limit
trailing_stop The order type, default: "limit"
› label false string user defined label for the order (maximum 64 characters)
› price false number
The order price in base currency (Only for limit and stop_limit orders)

When adding an order with advanced=usd, the field price should be the option price value in USD.

When adding an order with advanced=implv, the field price should be a value of implied volatility in percentages. For example, price=100, means implied volatility of 100%

› reduce_only false boolean If true, the order is considered reduce-only which is intended to only reduce a current position
› time_in_force false string good_til_cancelled
good_til_day
fill_or_kill
immediate_or_cancel
Specifies how long the order remains in effect. Default "good_til_cancelled"

"good_til_cancelled" - unfilled order remains in order book until cancelled
"good_til_day" - unfilled order remains in order book till the end of the trading session
"fill_or_kill" - execute a transaction immediately and completely or not at all
"immediate_or_cancel" - execute a transaction immediately, and any portion of the order that cannot be immediately filled is cancelled
› post_only false boolean
If true, the order is considered post-only. If the new price would cause the order to be filled immediately (as taker), the price will be changed to be just below or above the spread (according to the direction of the order).

Only valid in combination with time_in_force="good_til_cancelled"

› reject_post_only false boolean
If an order is considered post-only and this field is set to true then the order is put to the order book unmodified or the request is rejected.

Only valid in combination with "post_only" set to true

› trigger_price false number Trigger price, required for trigger orders only (Stop-loss or Take-profit orders)
› trigger_offset false number The maximum deviation from the price peak beyond which the order will be triggered
› trigger false string index_price
mark_price
last_price Defines the trigger type. Required for "Stop-Loss", "Take-Profit" and "Trailing" trigger orders
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› order object
› › reject_post_only boolean true if order has reject_post_only flag (field is present only when post_only is true)
› › label string User defined label (up to 64 characters)
› › quote_id string The same QuoteID as supplied in the private/mass_quote request.
› › order_state string Order state: "open", "filled", "rejected", "cancelled", "untriggered"
› › is_secondary_oto boolean true if the order is an order that can be triggered by another order, otherwise not present.
› › usd number Option price in USD (Only if advanced="usd")
› › implv number Implied volatility in percent. (Only if advanced="implv")
› › trigger_reference_price number The price of the given trigger at the time when the order was placed (Only for trailing trigger orders)
› › original_order_type string Original order type. Optional field
› › oco_ref string Unique reference that identifies a one_cancels_others (OCO) pair.
› › block_trade boolean true if order made from block_trade trade, added only in that case.
› › trigger_price number Trigger price (Only for future trigger orders)
› › api boolean true if created with API
› › mmp boolean true if the order is a MMP order, otherwise false.
› › oto_order_ids array of string The Ids of the orders that will be triggered if the order is filled
› › trigger_order_id string Id of the trigger order that created the order (Only for orders that were created by triggered orders).
› › cancel_reason string Enumerated reason behind cancel "user_request", "autoliquidation", "cancel_on_disconnect", "risk_mitigation", "pme_risk_reduction" (portfolio margining risk reduction), "pme_account_locked" (portfolio margining account locked per currency), "position_locked", "mmp_trigger" (market maker protection), "mmp_config_curtailment" (market maker configured quantity decreased), "edit_post_only_reject" (cancelled on edit because of reject_post_only setting), "oco_other_closed" (the oco order linked to this order was closed), "oto_primary_closed" (the oto primary order that was going to trigger this order was cancelled), "settlement" (closed because of a settlement)
› › primary_order_id string Unique order identifier
› › quote boolean If order is a quote. Present only if true.
› › risk_reducing boolean true if the order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users), otherwise false.
› › filled_amount number Filled amount of the order. For perpetual and futures the filled_amount is in USD units, for options - in units or corresponding cryptocurrency contracts, e.g., BTC or ETH.
› › instrument_name string Unique instrument identifier
› › max_show number Maximum amount within an order to be shown to other traders, 0 for invisible order.
› › app_name string The name of the application that placed the order on behalf of the user (optional).
› › mmp_cancelled boolean true if order was cancelled by mmp trigger (optional)
› › direction string Direction: buy, or sell
› › last_update_timestamp integer The timestamp (milliseconds since the Unix epoch)
› › trigger_offset number The maximum deviation from the price peak beyond which the order will be triggered (Only for trailing trigger orders)
› › mmp_group string Name of the MMP group supplied in the private/mass_quote request.
› › price number or string Price in base currency or "market_price" in case of open trigger market orders
› › is_liquidation boolean Optional (not added for spot). true if order was automatically created during liquidation
› › reduce_only boolean Optional (not added for spot). 'true for reduce-only orders only'
› › amount number It represents the requested order size. For perpetual and futures the amount is in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› › is_primary_otoco boolean true if the order is an order that can trigger an OCO pair, otherwise not present.
› › post_only boolean true for post-only orders only
› › mobile boolean optional field with value true added only when created with Mobile Application
› › trigger_fill_condition string
The fill condition of the linked order (Only for linked order types), default: first_hit.

"first_hit" - any execution of the primary order will fully cancel/place all secondary orders.
"complete_fill" - a complete execution (meaning the primary order no longer exists) will cancel/place the secondary orders.
"incremental" - any fill of the primary order will cause proportional partial cancellation/placement of the secondary order. The amount that will be subtracted/added to the secondary order will be rounded down to the contract size.
› › triggered boolean Whether the trigger order has been triggered
› › order_id string Unique order identifier
› › replaced boolean true if the order was edited (by user or - in case of advanced options orders - by pricing engine), otherwise false.
› › order_type string Order type: "limit", "market", "stop_limit", "stop_market"
› › time_in_force string Order time in force: "good_til_cancelled", "good_til_day", "fill_or_kill" or "immediate_or_cancel"
› › auto_replaced boolean Options, advanced orders only - true if last modification of the order was performed by the pricing engine, otherwise false.
› › quote_set_id string Identifier of the QuoteSet supplied in the private/mass_quote request.
› › contracts number It represents the order size in contract units. (Optional, may be absent in historical data).
› › trigger string Trigger type (only for trigger orders). Allowed values: "index_price", "mark_price", "last_price".
› › web boolean true if created via Deribit frontend (optional)
› › creation_timestamp integer The timestamp (milliseconds since the Unix epoch)
› › is_rebalance boolean Optional (only for spot). true if order was automatically created during cross-collateral balance restoration
› › average_price number Average fill price of the order
› › advanced string advanced type: "usd" or "implv" (Only for options; field is omitted if not applicable).
› trades array of object
› › timestamp integer The timestamp of the trade (milliseconds since the UNIX epoch)
› › label string User defined label (presented only when previously set for order by user)
› › fee number User's fee in units of the specified fee_currency
› › quote_id string QuoteID of the user order (optional, present only for orders placed with private/mass_quote)
› › liquidity string Describes what was role of users order: "M" when it was maker order, "T" when it was taker order
› › index_price number Index Price at the moment of trade
› › api boolean true if user order was created with API
› › mmp boolean true if user order is MMP
› › legs array Optional field containing leg trades if trade is a combo trade (present when querying for only combo trades and in combo_trades events)
› › trade_seq integer The sequence number of the trade within instrument
› › risk_reducing boolean true if user order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users)
› › instrument_name string Unique instrument identifier
› › fee_currency string Currency, i.e "BTC", "ETH", "USDC"
› › direction string Direction: buy, or sell
› › trade_id string Unique (per currency) trade identifier
› › tick_direction integer Direction of the "tick" (0 = Plus Tick, 1 = Zero-Plus Tick, 2 = Minus Tick, 3 = Zero-Minus Tick).
› › profit_loss number Profit and loss in base currency.
› › matching_id string Always null
› › price number Price in base currency
› › reduce_only string true if user order is reduce-only
› › amount number Trade amount. For perpetual and futures - in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› › post_only string true if user order is post-only
› › liquidation string Optional field (only for trades caused by liquidation): "M" when maker side of trade was under liquidation, "T" when taker side was under liquidation, "MT" when both sides of trade were under liquidation
› › combo_trade_id number Optional field containing combo trade identifier if the trade is a combo trade
› › order_id string Id of the user order (maker or taker), i.e. subscriber's order id that took part in the trade
› › block_trade_id string Block trade id - when trade was part of a block trade
› › order_type string Order type: "limit, "market", or "liquidation"
› › quote_set_id string QuoteSet of the user order (optional, present only for orders placed with private/mass_quote)
› › combo_id string Optional field containing combo instrument name if the trade is a combo trade
› › underlying_price number Underlying price for implied volatility calculations (Options only)
› › contracts number Trade size in contract units (optional, may be absent in historical trades)
› › mark_price number Mark Price at the moment of trade
› › iv number Option implied volatility for the price (Option only)
› › state string Order state: "open", "filled", "rejected", "cancelled", "untriggered" or "archive" (if order was archived)
› › advanced string Advanced type of user order: "usd" or "implv" (only for options; omitted if not applicable)
/private/sell
var msg =
{
"jsonrpc" : "2.0",
"id" : 2148,
"method" : "private/sell",
"params" : {
"instrument_name" : "ETH-PERPETUAL",
"amount" : 123,
"type" : "stop_limit",
"price" : 145.61,
"trigger_price" : 145,
"trigger" : "last_price"
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 2148,
"result": {
"trades": [],
"order": {
"triggered": false,
"trigger": "last_price",
"time_in_force": "good_til_cancelled",
"trigger_price": 145,
"reduce_only": false,
"price": 145.61,
"post_only": false,
"order_type": "stop_limit",
"order_state": "untriggered",
"order_id": "ETH-SLTS-28",
"max_show": 123,
"last_update_timestamp": 1550659803407,
"label": "",
"is_rebalance": false,
"is_liquidation": false,
"instrument_name": "ETH-PERPETUAL",
"direction": "sell",
"creation_timestamp": 1550659803407,
"api": true,
"amount": 123
}
}
}

Places a sell order for an instrument.

Scope: trade:read_write

Try in API console

This is a private method; it can only be used after authentication.
This is a matching engine method.
Parameters
Parameter Required Type Enum Description
instrument_name true string Instrument name
amount false number It represents the requested order size. For perpetual and inverse futures the amount is in USD units. For linear futures it is the underlying base currency coin. For options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH. The amount is a mandatory parameter if contracts parameter is missing. If both contracts and amount parameter are passed they must match each other otherwise error is returned.
contracts false number It represents the requested order size in contract units and can be passed instead of amount. The contracts is a mandatory parameter if amount parameter is missing. If both contracts and amount parameter are passed they must match each other otherwise error is returned.
type false string limit
stop_limit
take_limit
market
stop_market
take_market
market_limit
trailing_stop The order type, default: "limit"
label false string user defined label for the order (maximum 64 characters)
price false number
The order price in base currency (Only for limit and stop_limit orders)

When adding an order with advanced=usd, the field price should be the option price value in USD.

When adding an order with advanced=implv, the field price should be a value of implied volatility in percentages. For example, price=100, means implied volatility of 100%

time_in_force false string good_til_cancelled
good_til_day
fill_or_kill
immediate_or_cancel
Specifies how long the order remains in effect. Default "good_til_cancelled"

"good_til_cancelled" - unfilled order remains in order book until cancelled
"good_til_day" - unfilled order remains in order book till the end of the trading session
"fill_or_kill" - execute a transaction immediately and completely or not at all
"immediate_or_cancel" - execute a transaction immediately, and any portion of the order that cannot be immediately filled is cancelled
max_show false number Maximum amount within an order to be shown to other customers, 0 for invisible order
post_only false boolean
If true, the order is considered post-only. If the new price would cause the order to be filled immediately (as taker), the price will be changed to be just above the spread.

Only valid in combination with time_in_force="good_til_cancelled"

reject_post_only false boolean
If an order is considered post-only and this field is set to true then the order is put to the order book unmodified or the request is rejected.

Only valid in combination with "post_only" set to true

reduce_only false boolean If true, the order is considered reduce-only which is intended to only reduce a current position
trigger_price false number Trigger price, required for trigger orders only (Stop-loss or Take-profit orders)
trigger_offset false number The maximum deviation from the price peak beyond which the order will be triggered
trigger false string index_price
mark_price
last_price Defines the trigger type. Required for "Stop-Loss", "Take-Profit" and "Trailing" trigger orders
advanced false string usd
implv Advanced option order type. (Only for options. Advanced USD orders are not supported for linear options.)
mmp false boolean Order MMP flag, only for order_type 'limit'
valid_until false integer Timestamp, when provided server will start processing request in Matching Engine only before given timestamp, in other cases timed_out error will be responded. Remember that the given timestamp should be consistent with the server's time, use /public/time method to obtain current server time.
linked_order_type false string one_triggers_other
one_cancels_other
one_triggers_one_cancels_other
The type of the linked order.

"one_triggers_other" - Execution of primary order triggers the placement of one or more secondary orders.
"one_cancels_other" - The execution of one order in a pair automatically cancels the other, typically used to set a stop-loss and take-profit simultaneously.
"one_triggers_one_cancels_other" - The execution of a primary order triggers two secondary orders (a stop-loss and take-profit pair), where the execution of one secondary order cancels the other.
trigger_fill_condition false string first_hit
complete_fill
incremental
The fill condition of the linked order (Only for linked order types), default: first_hit.

"first_hit" - any execution of the primary order will fully cancel/place all secondary orders.
"complete_fill" - a complete execution (meaning the primary order no longer exists) will cancel/place the secondary orders.
"incremental" - any fill of the primary order will cause proportional partial cancellation/placement of the secondary order. The amount that will be subtracted/added to the secondary order will be rounded down to the contract size.
otoco_config false array of objects
List of trades to create or cancel when this order is filled.

› amount false number It represents the requested trade size. For perpetual and futures the amount is in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH
› direction true string buy
sell Direction of trade from the maker perspective
› type false string limit
stop_limit
take_limit
market
stop_market
take_market
market_limit
trailing_stop The order type, default: "limit"
› label false string user defined label for the order (maximum 64 characters)
› price false number
The order price in base currency (Only for limit and stop_limit orders)

When adding an order with advanced=usd, the field price should be the option price value in USD.

When adding an order with advanced=implv, the field price should be a value of implied volatility in percentages. For example, price=100, means implied volatility of 100%

› reduce_only false boolean If true, the order is considered reduce-only which is intended to only reduce a current position
› time_in_force false string good_til_cancelled
good_til_day
fill_or_kill
immediate_or_cancel
Specifies how long the order remains in effect. Default "good_til_cancelled"

"good_til_cancelled" - unfilled order remains in order book until cancelled
"good_til_day" - unfilled order remains in order book till the end of the trading session
"fill_or_kill" - execute a transaction immediately and completely or not at all
"immediate_or_cancel" - execute a transaction immediately, and any portion of the order that cannot be immediately filled is cancelled
› post_only false boolean
If true, the order is considered post-only. If the new price would cause the order to be filled immediately (as taker), the price will be changed to be just below or above the spread (according to the direction of the order).

Only valid in combination with time_in_force="good_til_cancelled"

› reject_post_only false boolean
If an order is considered post-only and this field is set to true then the order is put to the order book unmodified or the request is rejected.

Only valid in combination with "post_only" set to true

› trigger_price false number Trigger price, required for trigger orders only (Stop-loss or Take-profit orders)
› trigger_offset false number The maximum deviation from the price peak beyond which the order will be triggered
› trigger false string index_price
mark_price
last_price Defines the trigger type. Required for "Stop-Loss", "Take-Profit" and "Trailing" trigger orders
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› order object
› › reject_post_only boolean true if order has reject_post_only flag (field is present only when post_only is true)
› › label string User defined label (up to 64 characters)
› › quote_id string The same QuoteID as supplied in the private/mass_quote request.
› › order_state string Order state: "open", "filled", "rejected", "cancelled", "untriggered"
› › is_secondary_oto boolean true if the order is an order that can be triggered by another order, otherwise not present.
› › usd number Option price in USD (Only if advanced="usd")
› › implv number Implied volatility in percent. (Only if advanced="implv")
› › trigger_reference_price number The price of the given trigger at the time when the order was placed (Only for trailing trigger orders)
› › original_order_type string Original order type. Optional field
› › oco_ref string Unique reference that identifies a one_cancels_others (OCO) pair.
› › block_trade boolean true if order made from block_trade trade, added only in that case.
› › trigger_price number Trigger price (Only for future trigger orders)
› › api boolean true if created with API
› › mmp boolean true if the order is a MMP order, otherwise false.
› › oto_order_ids array of string The Ids of the orders that will be triggered if the order is filled
› › trigger_order_id string Id of the trigger order that created the order (Only for orders that were created by triggered orders).
› › cancel_reason string Enumerated reason behind cancel "user_request", "autoliquidation", "cancel_on_disconnect", "risk_mitigation", "pme_risk_reduction" (portfolio margining risk reduction), "pme_account_locked" (portfolio margining account locked per currency), "position_locked", "mmp_trigger" (market maker protection), "mmp_config_curtailment" (market maker configured quantity decreased), "edit_post_only_reject" (cancelled on edit because of reject_post_only setting), "oco_other_closed" (the oco order linked to this order was closed), "oto_primary_closed" (the oto primary order that was going to trigger this order was cancelled), "settlement" (closed because of a settlement)
› › primary_order_id string Unique order identifier
› › quote boolean If order is a quote. Present only if true.
› › risk_reducing boolean true if the order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users), otherwise false.
› › filled_amount number Filled amount of the order. For perpetual and futures the filled_amount is in USD units, for options - in units or corresponding cryptocurrency contracts, e.g., BTC or ETH.
› › instrument_name string Unique instrument identifier
› › max_show number Maximum amount within an order to be shown to other traders, 0 for invisible order.
› › app_name string The name of the application that placed the order on behalf of the user (optional).
› › mmp_cancelled boolean true if order was cancelled by mmp trigger (optional)
› › direction string Direction: buy, or sell
› › last_update_timestamp integer The timestamp (milliseconds since the Unix epoch)
› › trigger_offset number The maximum deviation from the price peak beyond which the order will be triggered (Only for trailing trigger orders)
› › mmp_group string Name of the MMP group supplied in the private/mass_quote request.
› › price number or string Price in base currency or "market_price" in case of open trigger market orders
› › is_liquidation boolean Optional (not added for spot). true if order was automatically created during liquidation
› › reduce_only boolean Optional (not added for spot). 'true for reduce-only orders only'
› › amount number It represents the requested order size. For perpetual and futures the amount is in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› › is_primary_otoco boolean true if the order is an order that can trigger an OCO pair, otherwise not present.
› › post_only boolean true for post-only orders only
› › mobile boolean optional field with value true added only when created with Mobile Application
› › trigger_fill_condition string
The fill condition of the linked order (Only for linked order types), default: first_hit.

"first_hit" - any execution of the primary order will fully cancel/place all secondary orders.
"complete_fill" - a complete execution (meaning the primary order no longer exists) will cancel/place the secondary orders.
"incremental" - any fill of the primary order will cause proportional partial cancellation/placement of the secondary order. The amount that will be subtracted/added to the secondary order will be rounded down to the contract size.
› › triggered boolean Whether the trigger order has been triggered
› › order_id string Unique order identifier
› › replaced boolean true if the order was edited (by user or - in case of advanced options orders - by pricing engine), otherwise false.
› › order_type string Order type: "limit", "market", "stop_limit", "stop_market"
› › time_in_force string Order time in force: "good_til_cancelled", "good_til_day", "fill_or_kill" or "immediate_or_cancel"
› › auto_replaced boolean Options, advanced orders only - true if last modification of the order was performed by the pricing engine, otherwise false.
› › quote_set_id string Identifier of the QuoteSet supplied in the private/mass_quote request.
› › contracts number It represents the order size in contract units. (Optional, may be absent in historical data).
› › trigger string Trigger type (only for trigger orders). Allowed values: "index_price", "mark_price", "last_price".
› › web boolean true if created via Deribit frontend (optional)
› › creation_timestamp integer The timestamp (milliseconds since the Unix epoch)
› › is_rebalance boolean Optional (only for spot). true if order was automatically created during cross-collateral balance restoration
› › average_price number Average fill price of the order
› › advanced string advanced type: "usd" or "implv" (Only for options; field is omitted if not applicable).
› trades array of object
› › timestamp integer The timestamp of the trade (milliseconds since the UNIX epoch)
› › label string User defined label (presented only when previously set for order by user)
› › fee number User's fee in units of the specified fee_currency
› › quote_id string QuoteID of the user order (optional, present only for orders placed with private/mass_quote)
› › liquidity string Describes what was role of users order: "M" when it was maker order, "T" when it was taker order
› › index_price number Index Price at the moment of trade
› › api boolean true if user order was created with API
› › mmp boolean true if user order is MMP
› › legs array Optional field containing leg trades if trade is a combo trade (present when querying for only combo trades and in combo_trades events)
› › trade_seq integer The sequence number of the trade within instrument
› › risk_reducing boolean true if user order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users)
› › instrument_name string Unique instrument identifier
› › fee_currency string Currency, i.e "BTC", "ETH", "USDC"
› › direction string Direction: buy, or sell
› › trade_id string Unique (per currency) trade identifier
› › tick_direction integer Direction of the "tick" (0 = Plus Tick, 1 = Zero-Plus Tick, 2 = Minus Tick, 3 = Zero-Minus Tick).
› › profit_loss number Profit and loss in base currency.
› › matching_id string Always null
› › price number Price in base currency
› › reduce_only string true if user order is reduce-only
› › amount number Trade amount. For perpetual and futures - in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› › post_only string true if user order is post-only
› › liquidation string Optional field (only for trades caused by liquidation): "M" when maker side of trade was under liquidation, "T" when taker side was under liquidation, "MT" when both sides of trade were under liquidation
› › combo_trade_id number Optional field containing combo trade identifier if the trade is a combo trade
› › order_id string Id of the user order (maker or taker), i.e. subscriber's order id that took part in the trade
› › block_trade_id string Block trade id - when trade was part of a block trade
› › order_type string Order type: "limit, "market", or "liquidation"
› › quote_set_id string QuoteSet of the user order (optional, present only for orders placed with private/mass_quote)
› › combo_id string Optional field containing combo instrument name if the trade is a combo trade
› › underlying_price number Underlying price for implied volatility calculations (Options only)
› › contracts number Trade size in contract units (optional, may be absent in historical trades)
› › mark_price number Mark Price at the moment of trade
› › iv number Option implied volatility for the price (Option only)
› › state string Order state: "open", "filled", "rejected", "cancelled", "untriggered" or "archive" (if order was archived)
› › advanced string Advanced type of user order: "usd" or "implv" (only for options; omitted if not applicable)
/private/edit
var msg =
{
"jsonrpc" : "2.0",
"id" : 3725,
"method" : "private/edit",
"params" : {
"order_id" : "438994",
"amount" : 4,
"price" : 222,
"advanced" : "implv"
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 3725,
"result": {
"trades": [],
"order": {
"time_in_force": "good_til_cancelled",
"reduce_only": false,
"price": 0.1448,
"post_only": false,
"order_type": "limit",
"order_state": "open",
"order_id": "438994",
"max_show": 4,
"last_update_timestamp": 1550585797677,
"label": "",
"is_rebalance": false,
"is_liquidation": false,
"instrument_name": "BTC-22FEB19-3500-C",
"implv": 222,
"filled_amount": 0,
"direction": "buy",
"creation_timestamp": 1550585741277,
"average_price": 0,
"api": false,
"amount": 4,
"advanced": "implv"
}
}
}

Change price, amount and/or other properties of an order.

Scope: trade:read_write

Try in API console

This is a private method; it can only be used after authentication.
This is a matching engine method.
Parameters
Parameter Required Type Enum Description
order_id true string The order id
amount false number It represents the requested order size. For perpetual and inverse futures the amount is in USD units. For linear futures it is the underlying base currency coin. For options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH. The amount is a mandatory parameter if contracts parameter is missing. If both contracts and amount parameter are passed they must match each other otherwise error is returned.
contracts false number It represents the requested order size in contract units and can be passed instead of amount. The contracts is a mandatory parameter if amount parameter is missing. If both contracts and amount parameter are passed they must match each other otherwise error is returned.
price false number
The order price in base currency.

When editing an option order with advanced=usd, the field price should be the option price value in USD.

When editing an option order with advanced=implv, the field price should be a value of implied volatility in percentages. For example, price=100, means implied volatility of 100%

post_only false boolean
If true, the order is considered post-only. If the new price would cause the order to be filled immediately (as taker), the price will be changed to be just below or above the spread (accordingly to the original order type).

Only valid in combination with time_in_force="good_til_cancelled"

reduce_only false boolean If true, the order is considered reduce-only which is intended to only reduce a current position
reject_post_only false boolean
If an order is considered post-only and this field is set to true then the order is put to the order book unmodified or the request is rejected.

Only valid in combination with "post_only" set to true

advanced false string usd
implv Advanced option order type. If you have posted an advanced option order, it is necessary to re-supply this parameter when editing it (Only for options)
trigger_price false number Trigger price, required for trigger orders only (Stop-loss or Take-profit orders)
trigger_offset false number The maximum deviation from the price peak beyond which the order will be triggered
mmp false boolean Order MMP flag, only for order_type 'limit'
valid_until false integer Timestamp, when provided server will start processing request in Matching Engine only before given timestamp, in other cases timed_out error will be responded. Remember that the given timestamp should be consistent with the server's time, use /public/time method to obtain current server time.
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› order object
› › reject_post_only boolean true if order has reject_post_only flag (field is present only when post_only is true)
› › label string User defined label (up to 64 characters)
› › quote_id string The same QuoteID as supplied in the private/mass_quote request.
› › order_state string Order state: "open", "filled", "rejected", "cancelled", "untriggered"
› › is_secondary_oto boolean true if the order is an order that can be triggered by another order, otherwise not present.
› › usd number Option price in USD (Only if advanced="usd")
› › implv number Implied volatility in percent. (Only if advanced="implv")
› › trigger_reference_price number The price of the given trigger at the time when the order was placed (Only for trailing trigger orders)
› › original_order_type string Original order type. Optional field
› › oco_ref string Unique reference that identifies a one_cancels_others (OCO) pair.
› › block_trade boolean true if order made from block_trade trade, added only in that case.
› › trigger_price number Trigger price (Only for future trigger orders)
› › api boolean true if created with API
› › mmp boolean true if the order is a MMP order, otherwise false.
› › oto_order_ids array of string The Ids of the orders that will be triggered if the order is filled
› › trigger_order_id string Id of the trigger order that created the order (Only for orders that were created by triggered orders).
› › cancel_reason string Enumerated reason behind cancel "user_request", "autoliquidation", "cancel_on_disconnect", "risk_mitigation", "pme_risk_reduction" (portfolio margining risk reduction), "pme_account_locked" (portfolio margining account locked per currency), "position_locked", "mmp_trigger" (market maker protection), "mmp_config_curtailment" (market maker configured quantity decreased), "edit_post_only_reject" (cancelled on edit because of reject_post_only setting), "oco_other_closed" (the oco order linked to this order was closed), "oto_primary_closed" (the oto primary order that was going to trigger this order was cancelled), "settlement" (closed because of a settlement)
› › primary_order_id string Unique order identifier
› › quote boolean If order is a quote. Present only if true.
› › risk_reducing boolean true if the order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users), otherwise false.
› › filled_amount number Filled amount of the order. For perpetual and futures the filled_amount is in USD units, for options - in units or corresponding cryptocurrency contracts, e.g., BTC or ETH.
› › instrument_name string Unique instrument identifier
› › max_show number Maximum amount within an order to be shown to other traders, 0 for invisible order.
› › app_name string The name of the application that placed the order on behalf of the user (optional).
› › mmp_cancelled boolean true if order was cancelled by mmp trigger (optional)
› › direction string Direction: buy, or sell
› › last_update_timestamp integer The timestamp (milliseconds since the Unix epoch)
› › trigger_offset number The maximum deviation from the price peak beyond which the order will be triggered (Only for trailing trigger orders)
› › mmp_group string Name of the MMP group supplied in the private/mass_quote request.
› › price number or string Price in base currency or "market_price" in case of open trigger market orders
› › is_liquidation boolean Optional (not added for spot). true if order was automatically created during liquidation
› › reduce_only boolean Optional (not added for spot). 'true for reduce-only orders only'
› › amount number It represents the requested order size. For perpetual and futures the amount is in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› › is_primary_otoco boolean true if the order is an order that can trigger an OCO pair, otherwise not present.
› › post_only boolean true for post-only orders only
› › mobile boolean optional field with value true added only when created with Mobile Application
› › trigger_fill_condition string
The fill condition of the linked order (Only for linked order types), default: first_hit.

"first_hit" - any execution of the primary order will fully cancel/place all secondary orders.
"complete_fill" - a complete execution (meaning the primary order no longer exists) will cancel/place the secondary orders.
"incremental" - any fill of the primary order will cause proportional partial cancellation/placement of the secondary order. The amount that will be subtracted/added to the secondary order will be rounded down to the contract size.
› › triggered boolean Whether the trigger order has been triggered
› › order_id string Unique order identifier
› › replaced boolean true if the order was edited (by user or - in case of advanced options orders - by pricing engine), otherwise false.
› › order_type string Order type: "limit", "market", "stop_limit", "stop_market"
› › time_in_force string Order time in force: "good_til_cancelled", "good_til_day", "fill_or_kill" or "immediate_or_cancel"
› › auto_replaced boolean Options, advanced orders only - true if last modification of the order was performed by the pricing engine, otherwise false.
› › quote_set_id string Identifier of the QuoteSet supplied in the private/mass_quote request.
› › contracts number It represents the order size in contract units. (Optional, may be absent in historical data).
› › trigger string Trigger type (only for trigger orders). Allowed values: "index_price", "mark_price", "last_price".
› › web boolean true if created via Deribit frontend (optional)
› › creation_timestamp integer The timestamp (milliseconds since the Unix epoch)
› › is_rebalance boolean Optional (only for spot). true if order was automatically created during cross-collateral balance restoration
› › average_price number Average fill price of the order
› › advanced string advanced type: "usd" or "implv" (Only for options; field is omitted if not applicable).
› trades array of object
› › timestamp integer The timestamp of the trade (milliseconds since the UNIX epoch)
› › label string User defined label (presented only when previously set for order by user)
› › fee number User's fee in units of the specified fee_currency
› › quote_id string QuoteID of the user order (optional, present only for orders placed with private/mass_quote)
› › liquidity string Describes what was role of users order: "M" when it was maker order, "T" when it was taker order
› › index_price number Index Price at the moment of trade
› › api boolean true if user order was created with API
› › mmp boolean true if user order is MMP
› › legs array Optional field containing leg trades if trade is a combo trade (present when querying for only combo trades and in combo_trades events)
› › trade_seq integer The sequence number of the trade within instrument
› › risk_reducing boolean true if user order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users)
› › instrument_name string Unique instrument identifier
› › fee_currency string Currency, i.e "BTC", "ETH", "USDC"
› › direction string Direction: buy, or sell
› › trade_id string Unique (per currency) trade identifier
› › tick_direction integer Direction of the "tick" (0 = Plus Tick, 1 = Zero-Plus Tick, 2 = Minus Tick, 3 = Zero-Minus Tick).
› › profit_loss number Profit and loss in base currency.
› › matching_id string Always null
› › price number Price in base currency
› › reduce_only string true if user order is reduce-only
› › amount number Trade amount. For perpetual and futures - in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› › post_only string true if user order is post-only
› › liquidation string Optional field (only for trades caused by liquidation): "M" when maker side of trade was under liquidation, "T" when taker side was under liquidation, "MT" when both sides of trade were under liquidation
› › combo_trade_id number Optional field containing combo trade identifier if the trade is a combo trade
› › order_id string Id of the user order (maker or taker), i.e. subscriber's order id that took part in the trade
› › block_trade_id string Block trade id - when trade was part of a block trade
› › order_type string Order type: "limit, "market", or "liquidation"
› › quote_set_id string QuoteSet of the user order (optional, present only for orders placed with private/mass_quote)
› › combo_id string Optional field containing combo instrument name if the trade is a combo trade
› › underlying_price number Underlying price for implied volatility calculations (Options only)
› › contracts number Trade size in contract units (optional, may be absent in historical trades)
› › mark_price number Mark Price at the moment of trade
› › iv number Option implied volatility for the price (Option only)
› › state string Order state: "open", "filled", "rejected", "cancelled", "untriggered" or "archive" (if order was archived)
› › advanced string Advanced type of user order: "usd" or "implv" (only for options; omitted if not applicable)
/private/edit_by_label
var msg =
{
"jsonrpc" : "2.0",
"method" : "private/edit_by_label",
"id" : 9,
"params" : {
"instrument_name" : "BTC-PERPETUAL",
"label" : "i_love_deribit",
"amount" : 150,
"price" : 50111
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 9,
"result": {
"trades": [],
"order": {
"web": false,
"time_in_force": "good_til_cancelled",
"replaced": true,
"reduce_only": false,
"price": 50111.0,
"post_only": false,
"order_type": "limit",
"order_state": "open",
"order_id": "94166",
"max_show": 150,
"last_update_timestamp": 1616155550773,
"label": "i_love_deribit",
"is_rebalance": false,
"is_liquidation": false,
"instrument_name": "BTC-PERPETUAL",
"filled_amount": 0,
"direction": "buy",
"creation_timestamp": 1616155547764,
"average_price": 0.0,
"api": true,
"amount": 150
}
}
}

Change price, amount and/or other properties of an order with a given label. It works only when there is one open order with this label

Scope: trade:read_write

Try in API console

This is a private method; it can only be used after authentication.
This is a matching engine method.
Parameters
Parameter Required Type Enum Description
label false string user defined label for the order (maximum 64 characters)
instrument_name true string Instrument name
amount false number It represents the requested order size. For perpetual and inverse futures the amount is in USD units. For linear futures it is the underlying base currency coin. For options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH. The amount is a mandatory parameter if contracts parameter is missing. If both contracts and amount parameter are passed they must match each other otherwise error is returned.
contracts false number It represents the requested order size in contract units and can be passed instead of amount. The contracts is a mandatory parameter if amount parameter is missing. If both contracts and amount parameter are passed they must match each other otherwise error is returned.
price false number
The order price in base currency.

When editing an option order with advanced=usd, the field price should be the option price value in USD.

When editing an option order with advanced=implv, the field price should be a value of implied volatility in percentages. For example, price=100, means implied volatility of 100%

post_only false boolean
If true, the order is considered post-only. If the new price would cause the order to be filled immediately (as taker), the price will be changed to be just below or above the spread (accordingly to the original order type).

Only valid in combination with time_in_force="good_til_cancelled"

reduce_only false boolean If true, the order is considered reduce-only which is intended to only reduce a current position
reject_post_only false boolean
If an order is considered post-only and this field is set to true then the order is put to the order book unmodified or the request is rejected.

Only valid in combination with "post_only" set to true

advanced false string usd
implv Advanced option order type. If you have posted an advanced option order, it is necessary to re-supply this parameter when editing it (Only for options)
trigger_price false number Trigger price, required for trigger orders only (Stop-loss or Take-profit orders)
mmp false boolean Order MMP flag, only for order_type 'limit'
valid_until false integer Timestamp, when provided server will start processing request in Matching Engine only before given timestamp, in other cases timed_out error will be responded. Remember that the given timestamp should be consistent with the server's time, use /public/time method to obtain current server time.
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› order object
› › reject_post_only boolean true if order has reject_post_only flag (field is present only when post_only is true)
› › label string User defined label (up to 64 characters)
› › quote_id string The same QuoteID as supplied in the private/mass_quote request.
› › order_state string Order state: "open", "filled", "rejected", "cancelled", "untriggered"
› › is_secondary_oto boolean true if the order is an order that can be triggered by another order, otherwise not present.
› › usd number Option price in USD (Only if advanced="usd")
› › implv number Implied volatility in percent. (Only if advanced="implv")
› › trigger_reference_price number The price of the given trigger at the time when the order was placed (Only for trailing trigger orders)
› › original_order_type string Original order type. Optional field
› › oco_ref string Unique reference that identifies a one_cancels_others (OCO) pair.
› › block_trade boolean true if order made from block_trade trade, added only in that case.
› › trigger_price number Trigger price (Only for future trigger orders)
› › api boolean true if created with API
› › mmp boolean true if the order is a MMP order, otherwise false.
› › oto_order_ids array of string The Ids of the orders that will be triggered if the order is filled
› › trigger_order_id string Id of the trigger order that created the order (Only for orders that were created by triggered orders).
› › cancel_reason string Enumerated reason behind cancel "user_request", "autoliquidation", "cancel_on_disconnect", "risk_mitigation", "pme_risk_reduction" (portfolio margining risk reduction), "pme_account_locked" (portfolio margining account locked per currency), "position_locked", "mmp_trigger" (market maker protection), "mmp_config_curtailment" (market maker configured quantity decreased), "edit_post_only_reject" (cancelled on edit because of reject_post_only setting), "oco_other_closed" (the oco order linked to this order was closed), "oto_primary_closed" (the oto primary order that was going to trigger this order was cancelled), "settlement" (closed because of a settlement)
› › primary_order_id string Unique order identifier
› › quote boolean If order is a quote. Present only if true.
› › risk_reducing boolean true if the order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users), otherwise false.
› › filled_amount number Filled amount of the order. For perpetual and futures the filled_amount is in USD units, for options - in units or corresponding cryptocurrency contracts, e.g., BTC or ETH.
› › instrument_name string Unique instrument identifier
› › max_show number Maximum amount within an order to be shown to other traders, 0 for invisible order.
› › app_name string The name of the application that placed the order on behalf of the user (optional).
› › mmp_cancelled boolean true if order was cancelled by mmp trigger (optional)
› › direction string Direction: buy, or sell
› › last_update_timestamp integer The timestamp (milliseconds since the Unix epoch)
› › trigger_offset number The maximum deviation from the price peak beyond which the order will be triggered (Only for trailing trigger orders)
› › mmp_group string Name of the MMP group supplied in the private/mass_quote request.
› › price number or string Price in base currency or "market_price" in case of open trigger market orders
› › is_liquidation boolean Optional (not added for spot). true if order was automatically created during liquidation
› › reduce_only boolean Optional (not added for spot). 'true for reduce-only orders only'
› › amount number It represents the requested order size. For perpetual and futures the amount is in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› › is_primary_otoco boolean true if the order is an order that can trigger an OCO pair, otherwise not present.
› › post_only boolean true for post-only orders only
› › mobile boolean optional field with value true added only when created with Mobile Application
› › trigger_fill_condition string
The fill condition of the linked order (Only for linked order types), default: first_hit.

"first_hit" - any execution of the primary order will fully cancel/place all secondary orders.
"complete_fill" - a complete execution (meaning the primary order no longer exists) will cancel/place the secondary orders.
"incremental" - any fill of the primary order will cause proportional partial cancellation/placement of the secondary order. The amount that will be subtracted/added to the secondary order will be rounded down to the contract size.
› › triggered boolean Whether the trigger order has been triggered
› › order_id string Unique order identifier
› › replaced boolean true if the order was edited (by user or - in case of advanced options orders - by pricing engine), otherwise false.
› › order_type string Order type: "limit", "market", "stop_limit", "stop_market"
› › time_in_force string Order time in force: "good_til_cancelled", "good_til_day", "fill_or_kill" or "immediate_or_cancel"
› › auto_replaced boolean Options, advanced orders only - true if last modification of the order was performed by the pricing engine, otherwise false.
› › quote_set_id string Identifier of the QuoteSet supplied in the private/mass_quote request.
› › contracts number It represents the order size in contract units. (Optional, may be absent in historical data).
› › trigger string Trigger type (only for trigger orders). Allowed values: "index_price", "mark_price", "last_price".
› › web boolean true if created via Deribit frontend (optional)
› › creation_timestamp integer The timestamp (milliseconds since the Unix epoch)
› › is_rebalance boolean Optional (only for spot). true if order was automatically created during cross-collateral balance restoration
› › average_price number Average fill price of the order
› › advanced string advanced type: "usd" or "implv" (Only for options; field is omitted if not applicable).
› trades array of object
› › timestamp integer The timestamp of the trade (milliseconds since the UNIX epoch)
› › label string User defined label (presented only when previously set for order by user)
› › fee number User's fee in units of the specified fee_currency
› › quote_id string QuoteID of the user order (optional, present only for orders placed with private/mass_quote)
› › liquidity string Describes what was role of users order: "M" when it was maker order, "T" when it was taker order
› › index_price number Index Price at the moment of trade
› › api boolean true if user order was created with API
› › mmp boolean true if user order is MMP
› › legs array Optional field containing leg trades if trade is a combo trade (present when querying for only combo trades and in combo_trades events)
› › trade_seq integer The sequence number of the trade within instrument
› › risk_reducing boolean true if user order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users)
› › instrument_name string Unique instrument identifier
› › fee_currency string Currency, i.e "BTC", "ETH", "USDC"
› › direction string Direction: buy, or sell
› › trade_id string Unique (per currency) trade identifier
› › tick_direction integer Direction of the "tick" (0 = Plus Tick, 1 = Zero-Plus Tick, 2 = Minus Tick, 3 = Zero-Minus Tick).
› › profit_loss number Profit and loss in base currency.
› › matching_id string Always null
› › price number Price in base currency
› › reduce_only string true if user order is reduce-only
› › amount number Trade amount. For perpetual and futures - in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› › post_only string true if user order is post-only
› › liquidation string Optional field (only for trades caused by liquidation): "M" when maker side of trade was under liquidation, "T" when taker side was under liquidation, "MT" when both sides of trade were under liquidation
› › combo_trade_id number Optional field containing combo trade identifier if the trade is a combo trade
› › order_id string Id of the user order (maker or taker), i.e. subscriber's order id that took part in the trade
› › block_trade_id string Block trade id - when trade was part of a block trade
› › order_type string Order type: "limit, "market", or "liquidation"
› › quote_set_id string QuoteSet of the user order (optional, present only for orders placed with private/mass_quote)
› › combo_id string Optional field containing combo instrument name if the trade is a combo trade
› › underlying_price number Underlying price for implied volatility calculations (Options only)
› › contracts number Trade size in contract units (optional, may be absent in historical trades)
› › mark_price number Mark Price at the moment of trade
› › iv number Option implied volatility for the price (Option only)
› › state string Order state: "open", "filled", "rejected", "cancelled", "untriggered" or "archive" (if order was archived)
› › advanced string Advanced type of user order: "usd" or "implv" (only for options; omitted if not applicable)
/private/cancel
var msg =
{
"jsonrpc" : "2.0",
"id" : 4214,
"method" : "private/cancel",
"params" : {
"order_id" : "ETH-SLIS-12"
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 4214,
"result": {
"triggered": false,
"trigger": "index_price",
"time_in_force": "good_til_cancelled",
"trigger_price": 144.73,
"reduce_only": false,
"price": "market_price",
"post_only": false,
"order_type": "stop_market",
"order_state": "untriggered",
"order_id": "ETH-SLIS-12",
"max_show": 5,
"last_update_timestamp": 1550575961291,
"label": "",
"is_rebalance": false,
"is_liquidation": false,
"instrument_name": "ETH-PERPETUAL",
"direction": "sell",
"creation_timestamp": 1550575961291,
"api": false,
"amount": 5
}
}

Cancel an order, specified by order id

Scope: trade:read_write

Try in API console

This is a private method; it can only be used after authentication.
This is a matching engine method.
Parameters
Parameter Required Type Enum Description
order_id true string The order id
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› reject_post_only boolean true if order has reject_post_only flag (field is present only when post_only is true)
› label string User defined label (up to 64 characters)
› quote_id string The same QuoteID as supplied in the private/mass_quote request.
› order_state string Order state: "open", "filled", "rejected", "cancelled", "untriggered"
› is_secondary_oto boolean true if the order is an order that can be triggered by another order, otherwise not present.
› usd number Option price in USD (Only if advanced="usd")
› implv number Implied volatility in percent. (Only if advanced="implv")
› trigger_reference_price number The price of the given trigger at the time when the order was placed (Only for trailing trigger orders)
› original_order_type string Original order type. Optional field
› oco_ref string Unique reference that identifies a one_cancels_others (OCO) pair.
› block_trade boolean true if order made from block_trade trade, added only in that case.
› trigger_price number Trigger price (Only for future trigger orders)
› api boolean true if created with API
› mmp boolean true if the order is a MMP order, otherwise false.
› oto_order_ids array of string The Ids of the orders that will be triggered if the order is filled
› trigger_order_id string Id of the trigger order that created the order (Only for orders that were created by triggered orders).
› cancel_reason string Enumerated reason behind cancel "user_request", "autoliquidation", "cancel_on_disconnect", "risk_mitigation", "pme_risk_reduction" (portfolio margining risk reduction), "pme_account_locked" (portfolio margining account locked per currency), "position_locked", "mmp_trigger" (market maker protection), "mmp_config_curtailment" (market maker configured quantity decreased), "edit_post_only_reject" (cancelled on edit because of reject_post_only setting), "oco_other_closed" (the oco order linked to this order was closed), "oto_primary_closed" (the oto primary order that was going to trigger this order was cancelled), "settlement" (closed because of a settlement)
› primary_order_id string Unique order identifier
› quote boolean If order is a quote. Present only if true.
› risk_reducing boolean true if the order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users), otherwise false.
› filled_amount number Filled amount of the order. For perpetual and futures the filled_amount is in USD units, for options - in units or corresponding cryptocurrency contracts, e.g., BTC or ETH.
› instrument_name string Unique instrument identifier
› max_show number Maximum amount within an order to be shown to other traders, 0 for invisible order.
› app_name string The name of the application that placed the order on behalf of the user (optional).
› mmp_cancelled boolean true if order was cancelled by mmp trigger (optional)
› direction string Direction: buy, or sell
› last_update_timestamp integer The timestamp (milliseconds since the Unix epoch)
› trigger_offset number The maximum deviation from the price peak beyond which the order will be triggered (Only for trailing trigger orders)
› mmp_group string Name of the MMP group supplied in the private/mass_quote request.
› price number or string Price in base currency or "market_price" in case of open trigger market orders
› is_liquidation boolean Optional (not added for spot). true if order was automatically created during liquidation
› reduce_only boolean Optional (not added for spot). 'true for reduce-only orders only'
› amount number It represents the requested order size. For perpetual and futures the amount is in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› is_primary_otoco boolean true if the order is an order that can trigger an OCO pair, otherwise not present.
› post_only boolean true for post-only orders only
› mobile boolean optional field with value true added only when created with Mobile Application
› trigger_fill_condition string
The fill condition of the linked order (Only for linked order types), default: first_hit.

"first_hit" - any execution of the primary order will fully cancel/place all secondary orders.
"complete_fill" - a complete execution (meaning the primary order no longer exists) will cancel/place the secondary orders.
"incremental" - any fill of the primary order will cause proportional partial cancellation/placement of the secondary order. The amount that will be subtracted/added to the secondary order will be rounded down to the contract size.
› triggered boolean Whether the trigger order has been triggered
› order_id string Unique order identifier
› replaced boolean true if the order was edited (by user or - in case of advanced options orders - by pricing engine), otherwise false.
› order_type string Order type: "limit", "market", "stop_limit", "stop_market"
› time_in_force string Order time in force: "good_til_cancelled", "good_til_day", "fill_or_kill" or "immediate_or_cancel"
› auto_replaced boolean Options, advanced orders only - true if last modification of the order was performed by the pricing engine, otherwise false.
› quote_set_id string Identifier of the QuoteSet supplied in the private/mass_quote request.
› contracts number It represents the order size in contract units. (Optional, may be absent in historical data).
› trigger string Trigger type (only for trigger orders). Allowed values: "index_price", "mark_price", "last_price".
› web boolean true if created via Deribit frontend (optional)
› creation_timestamp integer The timestamp (milliseconds since the Unix epoch)
› is_rebalance boolean Optional (only for spot). true if order was automatically created during cross-collateral balance restoration
› average_price number Average fill price of the order
› advanced string advanced type: "usd" or "implv" (Only for options; field is omitted if not applicable).
/private/cancel_all
var msg =
{
"jsonrpc" : "2.0",
"id" : 8748,
"method" : "private/cancel_all",
"params" : {

}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 8748,
"result": 37
}
This method cancels all users orders and trigger orders within all currencies and instrument kinds.

Scope: trade:read_write

Try in API console

This is a private method; it can only be used after authentication.
This is a matching engine method.
Parameters
Parameter Required Type Enum Description
detailed false boolean When detailed is set to true output format is changed. See description. Default: false
freeze_quotes false boolean Whether or not to reject incoming quotes for 1 second after cancelling (false by default). Related to private/mass_quote request.
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result number Total number of successfully cancelled orders
/private/cancel_all_by_currency
var msg =
{
"jsonrpc" : "2.0",
"id" : 5663,
"method" : "private/cancel_all_by_currency",
"params" : {
"currency" : "BTC",
"kind" : "option"
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 5663,
"result": 3
}
Cancels all orders by currency, optionally filtered by instrument kind and/or order type.

Scope: trade:read_write

Try in API console

This is a private method; it can only be used after authentication.
This is a matching engine method.
Parameters
Parameter Required Type Enum Description
currency true string BTC
ETH
USDC
USDT
EURR The currency symbol
kind false string future
option
spot
future_combo
option_combo
combo
any Instrument kind, "combo" for any combo or "any" for all. If not provided instruments of all kinds are considered
type false string all
limit
trigger_all
stop
take
trailing_stop Order type - limit, stop, take, trigger_all or all, default - all
detailed false boolean When detailed is set to true output format is changed. See description. Default: false
freeze_quotes false boolean Whether or not to reject incoming quotes for 1 second after cancelling (false by default). Related to private/mass_quote request.
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result number Total number of successfully cancelled orders
/private/cancel_all_by_currency_pair
var msg =
{
"jsonrpc" : "2.0",
"id" : 5663,
"method" : "private/cancel_all_by_currency_pair",
"params" : {
"currency_pair" : "BTC_USD",
"kind" : "option"
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 5663,
"result": 3
}
Cancels all orders by currency pair, optionally filtered by instrument kind and/or order type.

Scope: trade:read_write

Try in API console

This is a private method; it can only be used after authentication.
This is a matching engine method.
Parameters
Parameter Required Type Enum Description
currency_pair true string ada_usd
algo_usd
avax_usd
bch_usd
btc_usd
doge_usd
dot_usd
eth_usd
link_usd
ltc_usd
matic_usd
near_usd
shib_usd
sol_usd
trx_usd
uni_usd
usdc_usd
xrp_usd
ada_usdc
bch_usdc
algo_usdc
avax_usdc
btc_usdc
doge_usdc
dot_usdc
bch_usdc
eth_usdc
link_usdc
ltc_usdc
matic_usdc
near_usdc
shib_usdc
sol_usdc
trx_usdc
uni_usdc
xrp_usdc
ada_usdt
algo_usdt
avax_usdt
bch_usdt
bnb_usdt
bnb_usdt
btc_usdt
btc_usdt
doge_usdt
dot_usdt
eth_usdt
eth_usdt
link_usdt
ltc_usdt
luna_usdt
matic_usdt
near_usdt
shib_usdt
sol_usdt
trx_usdt
uni_usdt
xrp_usdt
btcdvol_usdc
ethdvol_usdc The currency pair symbol
kind false string future
option
spot
future_combo
option_combo
combo
any Instrument kind, "combo" for any combo or "any" for all. If not provided instruments of all kinds are considered
type false string all
limit
trigger_all
stop
take
trailing_stop Order type - limit, stop, take, trigger_all or all, default - all
detailed false boolean When detailed is set to true output format is changed. See description. Default: false
freeze_quotes false boolean Whether or not to reject incoming quotes for 1 second after cancelling (false by default). Related to private/mass_quote request.
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result number Total number of successfully cancelled orders
/private/cancel_all_by_instrument
var msg =
{
"jsonrpc" : "2.0",
"id" : 4122,
"method" : "private/cancel_all_by_instrument",
"params" : {
"instrument_name" : "ETH-22FEB19-120-P",
"type" : "all"
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 4122,
"result": 7
}
Cancels all orders by instrument, optionally filtered by order type.

Scope: trade:read_write

Try in API console

This is a private method; it can only be used after authentication.
This is a matching engine method.
Parameters
Parameter Required Type Enum Description
instrument_name true string Instrument name
type false string all
limit
trigger_all
stop
take
trailing_stop Order type - limit, stop, take, trigger_all or all, default - all
detailed false boolean When detailed is set to true output format is changed. See description. Default: false
include_combos false boolean When set to true orders in combo instruments affecting a given position will also be cancelled. Default: false
freeze_quotes false boolean Whether or not to reject incoming quotes for 1 second after cancelling (false by default). Related to private/mass_quote request.
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result number Total number of successfully cancelled orders
/private/cancel_all_by_kind_or_type
var msg =
{
"method" : "private/cancel_all_by_kind_or_type",
"params" : {
"currency" : [
"BTC",
"ETH"
],
"kind" : "future"
},
"jsonrpc" : "2.0",
"id" : 2
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 2,
"result": 6
}

Cancels all orders in currency(currencies), optionally filtered by instrument kind and/or order type.

Scope: trade:read_write

Try in API console

This is a private method; it can only be used after authentication.
This is a matching engine method.
Parameters
Parameter Required Type Enum Description
currency true string or array of strings The currency symbol, list of currency symbols or "any" for all
kind false string future
option
spot
future_combo
option_combo
combo
any Instrument kind, "combo" for any combo or "any" for all. If not provided instruments of all kinds are considered
type false string all
limit
trigger_all
stop
take
trailing_stop Order type - limit, stop, take, trigger_all or all, default - all
detailed false boolean When detailed is set to true output format is changed. See description. Default: false
freeze_quotes false boolean Whether or not to reject incoming quotes for 1 second after cancelling (false by default). Related to private/mass_quote request.
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result number Total number of successfully cancelled orders
/private/cancel_by_label
var msg =
{
"id" : 47,
"method" : "private/cancel_by_label",
"params" : {
"label" : "label"
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc":"2.0",
"id":47,
"result":4
}
Cancels orders by label. All user's orders (trigger orders too), with a given label are canceled in all currencies or in one given currency (in this case currency queue is used)

Scope: trade:read_write

Try in API console

This is a private method; it can only be used after authentication.
This is a matching engine method.
Parameters
Parameter Required Type Enum Description
label true string user defined label for the order (maximum 64 characters)
currency false string BTC
ETH
USDC
USDT
EURR The currency symbol
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result number Total number of successfully cancelled orders
/private/cancel_quotes
var msg =
{
"jsonrpc" : "2.0",
"id" : 5663,
"method" : "private/cancel_quotes",
"params" : {
"cancel_type" : "delta",
"min_delta" : 0.4,
"max_delta" : 0.6
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 5663,
"result": 3
}
Cancels quotes based on the provided type. delta cancels quotes within a Delta range defined by min_delta and max_delta. quote_set_id cancels quotes by a specific Quote Set identifier. instrument cancels all quotes associated with a particular instrument. kind cancels all quotes for a certain instrument kind. currency cancels all quotes in a specified currency. currency_pair cancels all quotes in a specified currency pair. all cancels all quotes.

Scope: trade:read_write

Try in API console

This is a private method; it can only be used after authentication.
This is a matching engine method.
Parameters
Parameter Required Type Enum Description
detailed false boolean When detailed is set to true output format is changed. See description. Default: false
freeze_quotes false boolean Whether or not to reject incoming quotes for 1 second after cancelling (false by default). Related to private/mass_quote request.
cancel_type true string delta
quote_set_id
instrument
instrument_kind
currency
currency_pair
all Type of cancel criteria.
min_delta false number Min delta to cancel by delta (for cancel_type: delta).
max_delta false number Max delta to cancel by delta (for cancel_type: delta).
quote_set_id false string Unique identifier for the Quote set.
instrument_name false string Instrument name.
kind false string future
option
spot
future_combo
option_combo
combo
any Instrument kind, "combo" for any combo or "any" for all. If not provided instruments of all kinds are considered
currency true string BTC
ETH
USDC
USDT
EURR The currency symbol
currency_pair true string ada_usd
algo_usd
avax_usd
bch_usd
btc_usd
doge_usd
dot_usd
eth_usd
link_usd
ltc_usd
matic_usd
near_usd
shib_usd
sol_usd
trx_usd
uni_usd
usdc_usd
xrp_usd
ada_usdc
bch_usdc
algo_usdc
avax_usdc
btc_usdc
doge_usdc
dot_usdc
bch_usdc
eth_usdc
link_usdc
ltc_usdc
matic_usdc
near_usdc
shib_usdc
sol_usdc
trx_usdc
uni_usdc
xrp_usdc
ada_usdt
algo_usdt
avax_usdt
bch_usdt
bnb_usdt
bnb_usdt
btc_usdt
btc_usdt
doge_usdt
dot_usdt
eth_usdt
eth_usdt
link_usdt
ltc_usdt
luna_usdt
matic_usdt
near_usdt
shib_usdt
sol_usdt
trx_usdt
uni_usdt
xrp_usdt
btcdvol_usdc
ethdvol_usdc The currency pair symbol
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result number Total number of successfully cancelled quotes
/private/close_position
var msg =
{
"jsonrpc" : "2.0",
"id" : 6130,
"method" : "private/close_position",
"params" : {
"instrument_name" : "ETH-PERPETUAL",
"type" : "limit",
"price" : 145.17
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 6130,
"result": {
"trades": [
{
"trade_seq": 1966068,
"trade_id": "ETH-2696097",
"timestamp": 1590486335742,
"tick_direction": 0,
"state": "filled",
"reduce_only": true,
"price": 202.8,
"post_only": false,
"order_type": "limit",
"order_id": "ETH-584864807",
"matching_id": null,
"mark_price": 202.79,
"liquidity": "T",
"instrument_name": "ETH-PERPETUAL",
"index_price": 202.86,
"fee_currency": "ETH",
"fee": 0.00007766,
"direction": "sell",
"amount": 21
}
],
"order": {
"web": false,
"time_in_force": "good_til_cancelled",
"replaced": false,
"reduce_only": true,
"price": 198.75,
"post_only": false,
"order_type": "limit",
"order_state": "filled",
"order_id": "ETH-584864807",
"max_show": 21,
"last_update_timestamp": 1590486335742,
"label": "",
"is_rebalance": false,
"is_liquidation": false,
"instrument_name": "ETH-PERPETUAL",
"filled_amount": 21,
"direction": "sell",
"creation_timestamp": 1590486335742,
"average_price": 202.8,
"api": true,
"amount": 21
}
}
}

Makes closing position reduce only order .

Scope: trade:read_write

Try in API console

This is a private method; it can only be used after authentication.
This is a matching engine method.
Parameters
Parameter Required Type Enum Description
instrument_name true string Instrument name
type true string limit
market The order type
price false number Optional price for limit order.
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› order object
› › reject_post_only boolean true if order has reject_post_only flag (field is present only when post_only is true)
› › label string User defined label (up to 64 characters)
› › quote_id string The same QuoteID as supplied in the private/mass_quote request.
› › order_state string Order state: "open", "filled", "rejected", "cancelled", "untriggered"
› › is_secondary_oto boolean true if the order is an order that can be triggered by another order, otherwise not present.
› › usd number Option price in USD (Only if advanced="usd")
› › implv number Implied volatility in percent. (Only if advanced="implv")
› › trigger_reference_price number The price of the given trigger at the time when the order was placed (Only for trailing trigger orders)
› › original_order_type string Original order type. Optional field
› › oco_ref string Unique reference that identifies a one_cancels_others (OCO) pair.
› › block_trade boolean true if order made from block_trade trade, added only in that case.
› › trigger_price number Trigger price (Only for future trigger orders)
› › api boolean true if created with API
› › mmp boolean true if the order is a MMP order, otherwise false.
› › oto_order_ids array of string The Ids of the orders that will be triggered if the order is filled
› › trigger_order_id string Id of the trigger order that created the order (Only for orders that were created by triggered orders).
› › cancel_reason string Enumerated reason behind cancel "user_request", "autoliquidation", "cancel_on_disconnect", "risk_mitigation", "pme_risk_reduction" (portfolio margining risk reduction), "pme_account_locked" (portfolio margining account locked per currency), "position_locked", "mmp_trigger" (market maker protection), "mmp_config_curtailment" (market maker configured quantity decreased), "edit_post_only_reject" (cancelled on edit because of reject_post_only setting), "oco_other_closed" (the oco order linked to this order was closed), "oto_primary_closed" (the oto primary order that was going to trigger this order was cancelled), "settlement" (closed because of a settlement)
› › primary_order_id string Unique order identifier
› › quote boolean If order is a quote. Present only if true.
› › risk_reducing boolean true if the order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users), otherwise false.
› › filled_amount number Filled amount of the order. For perpetual and futures the filled_amount is in USD units, for options - in units or corresponding cryptocurrency contracts, e.g., BTC or ETH.
› › instrument_name string Unique instrument identifier
› › max_show number Maximum amount within an order to be shown to other traders, 0 for invisible order.
› › app_name string The name of the application that placed the order on behalf of the user (optional).
› › mmp_cancelled boolean true if order was cancelled by mmp trigger (optional)
› › direction string Direction: buy, or sell
› › last_update_timestamp integer The timestamp (milliseconds since the Unix epoch)
› › trigger_offset number The maximum deviation from the price peak beyond which the order will be triggered (Only for trailing trigger orders)
› › mmp_group string Name of the MMP group supplied in the private/mass_quote request.
› › price number or string Price in base currency or "market_price" in case of open trigger market orders
› › is_liquidation boolean Optional (not added for spot). true if order was automatically created during liquidation
› › reduce_only boolean Optional (not added for spot). 'true for reduce-only orders only'
› › amount number It represents the requested order size. For perpetual and futures the amount is in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› › is_primary_otoco boolean true if the order is an order that can trigger an OCO pair, otherwise not present.
› › post_only boolean true for post-only orders only
› › mobile boolean optional field with value true added only when created with Mobile Application
› › trigger_fill_condition string
The fill condition of the linked order (Only for linked order types), default: first_hit.

"first_hit" - any execution of the primary order will fully cancel/place all secondary orders.
"complete_fill" - a complete execution (meaning the primary order no longer exists) will cancel/place the secondary orders.
"incremental" - any fill of the primary order will cause proportional partial cancellation/placement of the secondary order. The amount that will be subtracted/added to the secondary order will be rounded down to the contract size.
› › triggered boolean Whether the trigger order has been triggered
› › order_id string Unique order identifier
› › replaced boolean true if the order was edited (by user or - in case of advanced options orders - by pricing engine), otherwise false.
› › order_type string Order type: "limit", "market", "stop_limit", "stop_market"
› › time_in_force string Order time in force: "good_til_cancelled", "good_til_day", "fill_or_kill" or "immediate_or_cancel"
› › auto_replaced boolean Options, advanced orders only - true if last modification of the order was performed by the pricing engine, otherwise false.
› › quote_set_id string Identifier of the QuoteSet supplied in the private/mass_quote request.
› › contracts number It represents the order size in contract units. (Optional, may be absent in historical data).
› › trigger string Trigger type (only for trigger orders). Allowed values: "index_price", "mark_price", "last_price".
› › web boolean true if created via Deribit frontend (optional)
› › creation_timestamp integer The timestamp (milliseconds since the Unix epoch)
› › is_rebalance boolean Optional (only for spot). true if order was automatically created during cross-collateral balance restoration
› › average_price number Average fill price of the order
› › advanced string advanced type: "usd" or "implv" (Only for options; field is omitted if not applicable).
› trades array of object
› › timestamp integer The timestamp of the trade (milliseconds since the UNIX epoch)
› › label string User defined label (presented only when previously set for order by user)
› › fee number User's fee in units of the specified fee_currency
› › quote_id string QuoteID of the user order (optional, present only for orders placed with private/mass_quote)
› › liquidity string Describes what was role of users order: "M" when it was maker order, "T" when it was taker order
› › index_price number Index Price at the moment of trade
› › api boolean true if user order was created with API
› › mmp boolean true if user order is MMP
› › legs array Optional field containing leg trades if trade is a combo trade (present when querying for only combo trades and in combo_trades events)
› › trade_seq integer The sequence number of the trade within instrument
› › risk_reducing boolean true if user order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users)
› › instrument_name string Unique instrument identifier
› › fee_currency string Currency, i.e "BTC", "ETH", "USDC"
› › direction string Direction: buy, or sell
› › trade_id string Unique (per currency) trade identifier
› › tick_direction integer Direction of the "tick" (0 = Plus Tick, 1 = Zero-Plus Tick, 2 = Minus Tick, 3 = Zero-Minus Tick).
› › profit_loss number Profit and loss in base currency.
› › matching_id string Always null
› › price number Price in base currency
› › reduce_only string true if user order is reduce-only
› › amount number Trade amount. For perpetual and futures - in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› › post_only string true if user order is post-only
› › liquidation string Optional field (only for trades caused by liquidation): "M" when maker side of trade was under liquidation, "T" when taker side was under liquidation, "MT" when both sides of trade were under liquidation
› › combo_trade_id number Optional field containing combo trade identifier if the trade is a combo trade
› › order_id string Id of the user order (maker or taker), i.e. subscriber's order id that took part in the trade
› › block_trade_id string Block trade id - when trade was part of a block trade
› › order_type string Order type: "limit, "market", or "liquidation"
› › quote_set_id string QuoteSet of the user order (optional, present only for orders placed with private/mass_quote)
› › combo_id string Optional field containing combo instrument name if the trade is a combo trade
› › underlying_price number Underlying price for implied volatility calculations (Options only)
› › contracts number Trade size in contract units (optional, may be absent in historical trades)
› › mark_price number Mark Price at the moment of trade
› › iv number Option implied volatility for the price (Option only)
› › state string Order state: "open", "filled", "rejected", "cancelled", "untriggered" or "archive" (if order was archived)
› › advanced string Advanced type of user order: "usd" or "implv" (only for options; omitted if not applicable)
/private/get_margins
var msg =
{
"jsonrpc" : "2.0",
"id" : 7,
"method" : "private/get_margins",
"params" : {
"instrument_name" : "BTC-PERPETUAL",
"amount" : 10000,
"price" : 3725
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this:

{
"jsonrpc": "2.0",
"result": {
"buy": 0.01681367,
"max_price": 42.0,
"min_price": 42.0,
"sell": 0.01680479
}
}
Get margins for a given instrument, amount and price.

Scope: trade:read

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
instrument_name true string Instrument name
amount true number It represents the requested order size. For perpetual and inverse futures the amount is in USD units. For linear futures it is the underlying base currency coin. For options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
price true number Price
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› buy number Margin when buying
› max_price number The maximum price for the future. Any buy orders you submit higher than this price, will be clamped to this maximum.
› min_price number The minimum price for the future. Any sell orders you submit lower than this price will be clamped to this minimum.
› sell number Margin when selling
/private/get_mmp_config
var msg =
{
"jsonrpc" : "2.0",
"id" : 7859,
"method" : "private/get_mmp_config",
"params" : {
"index_name" : "btc_usd",
"mmp_group" : "MassQuoteBot7"
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 7859,
"result": {
"index_name": "btc_usd",
"mmp_group": "MassQuoteBot7",
"interval": 60,
"frozen_time": 0,
"quantity_limit": 0.5
}
}

Get MMP configuration for an index, if the parameter is not provided, a list of all MMP configurations is returned. Empty list means no MMP configuration.

Scope: trade:read

Try in API console

This is a private method; it can only be used after authentication.
This is a matching engine method.
Parameters
Parameter Required Type Enum Description
index_name false string btc_usd
eth_usd
btc_usdc
eth_usdc
ada_usdc
algo_usdc
avax_usdc
bch_usdc
doge_usdc
dot_usdc
link_usdc
ltc_usdc
matic_usdc
near_usdc
shib_usdc
sol_usdc
trx_usdc
uni_usdc
xrp_usdc
ada_usdt
algo_usdt
avax_usdt
bch_usdt
bnb_usdt
bnb_usdt
btc_usdt
btc_usdt
doge_usdt
dot_usdt
eth_usdt
eth_usdt
link_usdt
ltc_usdt
luna_usdt
matic_usdt
near_usdt
shib_usdt
sol_usdt
trx_usdt
uni_usdt
xrp_usdt
btcdvol_usdc
ethdvol_usdc Index identifier of derivative instrument on the platform; skipping this parameter will return all configurations
mmp_group false string Specifies the MMP group for which the configuration is being retrieved. MMP groups are used for Mass Quotes. If MMP group is not provided, the endpoint returns the configuration for the MMP settings for regular orders. The index_name must be specified before using this parameter
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result array of object
› delta_limit number Delta limit
› frozen_time integer MMP frozen time in seconds, if set to 0 manual reset is required
› index_name string Index identifier, matches (base) cryptocurrency with quote currency
› interval integer MMP Interval in seconds, if set to 0 MMP is disabled
› mmp_group string Specified MMP Group
› quantity_limit number Quantity limit
/private/get_open_orders
var msg =
{
"jsonrpc" : "2.0",
"id" : 1953,
"method" : "private/get_open_orders",
"params" : {

}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 1953,
"result": [
{
"time_in_force": "good_til_cancelled",
"reduce_only": false,
"price": 0.0028,
"post_only": false,
"order_type": "limit",
"order_state": "open",
"order_id": "146062",
"max_show": 10,
"last_update_timestamp": 1550050597036,
"label": "",
"is_rebalance": false,
"is_liquidation": false,
"instrument_name": "BTC-15FEB19-3250-P",
"filled_amount": 0,
"direction": "buy",
"creation_timestamp": 1550050597036,
"average_price": 0,
"api": true,
"amount": 10
}
]
}

Retrieves list of user's open orders across many currencies.

Scope: trade:read

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
kind false string future
option
spot
future_combo
option_combo Instrument kind, if not provided instruments of all kinds are considered
type false string all
limit
trigger_all
stop_all
stop_limit
stop_market
take_all
take_limit
take_market
trailing_all
trailing_stop Order type, default - all
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result array of object
› reject_post_only boolean true if order has reject_post_only flag (field is present only when post_only is true)
› label string User defined label (up to 64 characters)
› quote_id string The same QuoteID as supplied in the private/mass_quote request.
› order_state string Order state: "open", "filled", "rejected", "cancelled", "untriggered"
› is_secondary_oto boolean true if the order is an order that can be triggered by another order, otherwise not present.
› usd number Option price in USD (Only if advanced="usd")
› implv number Implied volatility in percent. (Only if advanced="implv")
› trigger_reference_price number The price of the given trigger at the time when the order was placed (Only for trailing trigger orders)
› original_order_type string Original order type. Optional field
› oco_ref string Unique reference that identifies a one_cancels_others (OCO) pair.
› block_trade boolean true if order made from block_trade trade, added only in that case.
› trigger_price number Trigger price (Only for future trigger orders)
› api boolean true if created with API
› mmp boolean true if the order is a MMP order, otherwise false.
› oto_order_ids array of string The Ids of the orders that will be triggered if the order is filled
› trigger_order_id string Id of the trigger order that created the order (Only for orders that were created by triggered orders).
› cancel_reason string Enumerated reason behind cancel "user_request", "autoliquidation", "cancel_on_disconnect", "risk_mitigation", "pme_risk_reduction" (portfolio margining risk reduction), "pme_account_locked" (portfolio margining account locked per currency), "position_locked", "mmp_trigger" (market maker protection), "mmp_config_curtailment" (market maker configured quantity decreased), "edit_post_only_reject" (cancelled on edit because of reject_post_only setting), "oco_other_closed" (the oco order linked to this order was closed), "oto_primary_closed" (the oto primary order that was going to trigger this order was cancelled), "settlement" (closed because of a settlement)
› primary_order_id string Unique order identifier
› quote boolean If order is a quote. Present only if true.
› risk_reducing boolean true if the order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users), otherwise false.
› filled_amount number Filled amount of the order. For perpetual and futures the filled_amount is in USD units, for options - in units or corresponding cryptocurrency contracts, e.g., BTC or ETH.
› instrument_name string Unique instrument identifier
› max_show number Maximum amount within an order to be shown to other traders, 0 for invisible order.
› app_name string The name of the application that placed the order on behalf of the user (optional).
› mmp_cancelled boolean true if order was cancelled by mmp trigger (optional)
› direction string Direction: buy, or sell
› last_update_timestamp integer The timestamp (milliseconds since the Unix epoch)
› trigger_offset number The maximum deviation from the price peak beyond which the order will be triggered (Only for trailing trigger orders)
› mmp_group string Name of the MMP group supplied in the private/mass_quote request.
› price number or string Price in base currency or "market_price" in case of open trigger market orders
› is_liquidation boolean Optional (not added for spot). true if order was automatically created during liquidation
› reduce_only boolean Optional (not added for spot). 'true for reduce-only orders only'
› amount number It represents the requested order size. For perpetual and futures the amount is in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› is_primary_otoco boolean true if the order is an order that can trigger an OCO pair, otherwise not present.
› post_only boolean true for post-only orders only
› mobile boolean optional field with value true added only when created with Mobile Application
› trigger_fill_condition string
The fill condition of the linked order (Only for linked order types), default: first_hit.

"first_hit" - any execution of the primary order will fully cancel/place all secondary orders.
"complete_fill" - a complete execution (meaning the primary order no longer exists) will cancel/place the secondary orders.
"incremental" - any fill of the primary order will cause proportional partial cancellation/placement of the secondary order. The amount that will be subtracted/added to the secondary order will be rounded down to the contract size.
› triggered boolean Whether the trigger order has been triggered
› order_id string Unique order identifier
› replaced boolean true if the order was edited (by user or - in case of advanced options orders - by pricing engine), otherwise false.
› order_type string Order type: "limit", "market", "stop_limit", "stop_market"
› time_in_force string Order time in force: "good_til_cancelled", "good_til_day", "fill_or_kill" or "immediate_or_cancel"
› auto_replaced boolean Options, advanced orders only - true if last modification of the order was performed by the pricing engine, otherwise false.
› quote_set_id string Identifier of the QuoteSet supplied in the private/mass_quote request.
› contracts number It represents the order size in contract units. (Optional, may be absent in historical data).
› trigger string Trigger type (only for trigger orders). Allowed values: "index_price", "mark_price", "last_price".
› web boolean true if created via Deribit frontend (optional)
› creation_timestamp integer The timestamp (milliseconds since the Unix epoch)
› is_rebalance boolean Optional (only for spot). true if order was automatically created during cross-collateral balance restoration
› average_price number Average fill price of the order
› advanced string advanced type: "usd" or "implv" (Only for options; field is omitted if not applicable).
/private/get_open_orders_by_currency
var msg =
{
"jsonrpc" : "2.0",
"id" : 1953,
"method" : "private/get_open_orders_by_currency",
"params" : {
"currency" : "BTC"
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 1953,
"result": [
{
"time_in_force": "good_til_cancelled",
"reduce_only": false,
"price": 0.0028,
"post_only": false,
"order_type": "limit",
"order_state": "open",
"order_id": "146062",
"max_show": 10,
"last_update_timestamp": 1550050597036,
"label": "",
"is_rebalance": false,
"is_liquidation": false,
"instrument_name": "BTC-15FEB19-3250-P",
"filled_amount": 0,
"direction": "buy",
"creation_timestamp": 1550050597036,
"average_price": 0,
"api": true,
"amount": 10
}
]
}

Retrieves list of user's open orders.

Scope: trade:read

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
currency true string BTC
ETH
USDC
USDT
EURR The currency symbol
kind false string future
option
spot
future_combo
option_combo Instrument kind, if not provided instruments of all kinds are considered
type false string all
limit
trigger_all
stop_all
stop_limit
stop_market
take_all
take_limit
take_market
trailing_all
trailing_stop Order type, default - all
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result array of object
› reject_post_only boolean true if order has reject_post_only flag (field is present only when post_only is true)
› label string User defined label (up to 64 characters)
› quote_id string The same QuoteID as supplied in the private/mass_quote request.
› order_state string Order state: "open", "filled", "rejected", "cancelled", "untriggered"
› is_secondary_oto boolean true if the order is an order that can be triggered by another order, otherwise not present.
› usd number Option price in USD (Only if advanced="usd")
› implv number Implied volatility in percent. (Only if advanced="implv")
› trigger_reference_price number The price of the given trigger at the time when the order was placed (Only for trailing trigger orders)
› original_order_type string Original order type. Optional field
› oco_ref string Unique reference that identifies a one_cancels_others (OCO) pair.
› block_trade boolean true if order made from block_trade trade, added only in that case.
› trigger_price number Trigger price (Only for future trigger orders)
› api boolean true if created with API
› mmp boolean true if the order is a MMP order, otherwise false.
› oto_order_ids array of string The Ids of the orders that will be triggered if the order is filled
› trigger_order_id string Id of the trigger order that created the order (Only for orders that were created by triggered orders).
› cancel_reason string Enumerated reason behind cancel "user_request", "autoliquidation", "cancel_on_disconnect", "risk_mitigation", "pme_risk_reduction" (portfolio margining risk reduction), "pme_account_locked" (portfolio margining account locked per currency), "position_locked", "mmp_trigger" (market maker protection), "mmp_config_curtailment" (market maker configured quantity decreased), "edit_post_only_reject" (cancelled on edit because of reject_post_only setting), "oco_other_closed" (the oco order linked to this order was closed), "oto_primary_closed" (the oto primary order that was going to trigger this order was cancelled), "settlement" (closed because of a settlement)
› primary_order_id string Unique order identifier
› quote boolean If order is a quote. Present only if true.
› risk_reducing boolean true if the order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users), otherwise false.
› filled_amount number Filled amount of the order. For perpetual and futures the filled_amount is in USD units, for options - in units or corresponding cryptocurrency contracts, e.g., BTC or ETH.
› instrument_name string Unique instrument identifier
› max_show number Maximum amount within an order to be shown to other traders, 0 for invisible order.
› app_name string The name of the application that placed the order on behalf of the user (optional).
› mmp_cancelled boolean true if order was cancelled by mmp trigger (optional)
› direction string Direction: buy, or sell
› last_update_timestamp integer The timestamp (milliseconds since the Unix epoch)
› trigger_offset number The maximum deviation from the price peak beyond which the order will be triggered (Only for trailing trigger orders)
› mmp_group string Name of the MMP group supplied in the private/mass_quote request.
› price number or string Price in base currency or "market_price" in case of open trigger market orders
› is_liquidation boolean Optional (not added for spot). true if order was automatically created during liquidation
› reduce_only boolean Optional (not added for spot). 'true for reduce-only orders only'
› amount number It represents the requested order size. For perpetual and futures the amount is in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› is_primary_otoco boolean true if the order is an order that can trigger an OCO pair, otherwise not present.
› post_only boolean true for post-only orders only
› mobile boolean optional field with value true added only when created with Mobile Application
› trigger_fill_condition string
The fill condition of the linked order (Only for linked order types), default: first_hit.

"first_hit" - any execution of the primary order will fully cancel/place all secondary orders.
"complete_fill" - a complete execution (meaning the primary order no longer exists) will cancel/place the secondary orders.
"incremental" - any fill of the primary order will cause proportional partial cancellation/placement of the secondary order. The amount that will be subtracted/added to the secondary order will be rounded down to the contract size.
› triggered boolean Whether the trigger order has been triggered
› order_id string Unique order identifier
› replaced boolean true if the order was edited (by user or - in case of advanced options orders - by pricing engine), otherwise false.
› order_type string Order type: "limit", "market", "stop_limit", "stop_market"
› time_in_force string Order time in force: "good_til_cancelled", "good_til_day", "fill_or_kill" or "immediate_or_cancel"
› auto_replaced boolean Options, advanced orders only - true if last modification of the order was performed by the pricing engine, otherwise false.
› quote_set_id string Identifier of the QuoteSet supplied in the private/mass_quote request.
› contracts number It represents the order size in contract units. (Optional, may be absent in historical data).
› trigger string Trigger type (only for trigger orders). Allowed values: "index_price", "mark_price", "last_price".
› web boolean true if created via Deribit frontend (optional)
› creation_timestamp integer The timestamp (milliseconds since the Unix epoch)
› is_rebalance boolean Optional (only for spot). true if order was automatically created during cross-collateral balance restoration
› average_price number Average fill price of the order
› advanced string advanced type: "usd" or "implv" (Only for options; field is omitted if not applicable).
/private/get_open_orders_by_instrument
var msg =
{
"jsonrpc" : "2.0",
"id" : 8442,
"method" : "private/get_open_orders_by_instrument",
"params" : {
"instrument_name" : "ETH-22FEB19-120-C"
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 8442,
"result": [
{
"time_in_force": "good_til_cancelled",
"reduce_only": false,
"price": 0.135,
"post_only": false,
"order_type": "limit",
"order_state": "open",
"order_id": "ETH-252017",
"max_show": 10,
"last_update_timestamp": 1550050594882,
"label": "",
"is_rebalance": false,
"is_liquidation": false,
"instrument_name": "ETH-22FEB19-120-C",
"filled_amount": 0,
"direction": "sell",
"creation_timestamp": 1550050594882,
"average_price": 0,
"api": true,
"amount": 10
}
]
}

Retrieves list of user's open orders within a given Instrument.

Scope: trade:read

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
instrument_name true string Instrument name
type false string all
limit
trigger_all
stop_all
stop_limit
stop_market
take_all
take_limit
take_market
trailing_all
trailing_stop Order type, default - all
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result array of object
› reject_post_only boolean true if order has reject_post_only flag (field is present only when post_only is true)
› label string User defined label (up to 64 characters)
› quote_id string The same QuoteID as supplied in the private/mass_quote request.
› order_state string Order state: "open", "filled", "rejected", "cancelled", "untriggered"
› is_secondary_oto boolean true if the order is an order that can be triggered by another order, otherwise not present.
› usd number Option price in USD (Only if advanced="usd")
› implv number Implied volatility in percent. (Only if advanced="implv")
› trigger_reference_price number The price of the given trigger at the time when the order was placed (Only for trailing trigger orders)
› original_order_type string Original order type. Optional field
› oco_ref string Unique reference that identifies a one_cancels_others (OCO) pair.
› block_trade boolean true if order made from block_trade trade, added only in that case.
› trigger_price number Trigger price (Only for future trigger orders)
› api boolean true if created with API
› mmp boolean true if the order is a MMP order, otherwise false.
› oto_order_ids array of string The Ids of the orders that will be triggered if the order is filled
› trigger_order_id string Id of the trigger order that created the order (Only for orders that were created by triggered orders).
› cancel_reason string Enumerated reason behind cancel "user_request", "autoliquidation", "cancel_on_disconnect", "risk_mitigation", "pme_risk_reduction" (portfolio margining risk reduction), "pme_account_locked" (portfolio margining account locked per currency), "position_locked", "mmp_trigger" (market maker protection), "mmp_config_curtailment" (market maker configured quantity decreased), "edit_post_only_reject" (cancelled on edit because of reject_post_only setting), "oco_other_closed" (the oco order linked to this order was closed), "oto_primary_closed" (the oto primary order that was going to trigger this order was cancelled), "settlement" (closed because of a settlement)
› primary_order_id string Unique order identifier
› quote boolean If order is a quote. Present only if true.
› risk_reducing boolean true if the order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users), otherwise false.
› filled_amount number Filled amount of the order. For perpetual and futures the filled_amount is in USD units, for options - in units or corresponding cryptocurrency contracts, e.g., BTC or ETH.
› instrument_name string Unique instrument identifier
› max_show number Maximum amount within an order to be shown to other traders, 0 for invisible order.
› app_name string The name of the application that placed the order on behalf of the user (optional).
› mmp_cancelled boolean true if order was cancelled by mmp trigger (optional)
› direction string Direction: buy, or sell
› last_update_timestamp integer The timestamp (milliseconds since the Unix epoch)
› trigger_offset number The maximum deviation from the price peak beyond which the order will be triggered (Only for trailing trigger orders)
› mmp_group string Name of the MMP group supplied in the private/mass_quote request.
› price number or string Price in base currency or "market_price" in case of open trigger market orders
› is_liquidation boolean Optional (not added for spot). true if order was automatically created during liquidation
› reduce_only boolean Optional (not added for spot). 'true for reduce-only orders only'
› amount number It represents the requested order size. For perpetual and futures the amount is in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› is_primary_otoco boolean true if the order is an order that can trigger an OCO pair, otherwise not present.
› post_only boolean true for post-only orders only
› mobile boolean optional field with value true added only when created with Mobile Application
› trigger_fill_condition string
The fill condition of the linked order (Only for linked order types), default: first_hit.

"first_hit" - any execution of the primary order will fully cancel/place all secondary orders.
"complete_fill" - a complete execution (meaning the primary order no longer exists) will cancel/place the secondary orders.
"incremental" - any fill of the primary order will cause proportional partial cancellation/placement of the secondary order. The amount that will be subtracted/added to the secondary order will be rounded down to the contract size.
› triggered boolean Whether the trigger order has been triggered
› order_id string Unique order identifier
› replaced boolean true if the order was edited (by user or - in case of advanced options orders - by pricing engine), otherwise false.
› order_type string Order type: "limit", "market", "stop_limit", "stop_market"
› time_in_force string Order time in force: "good_til_cancelled", "good_til_day", "fill_or_kill" or "immediate_or_cancel"
› auto_replaced boolean Options, advanced orders only - true if last modification of the order was performed by the pricing engine, otherwise false.
› quote_set_id string Identifier of the QuoteSet supplied in the private/mass_quote request.
› contracts number It represents the order size in contract units. (Optional, may be absent in historical data).
› trigger string Trigger type (only for trigger orders). Allowed values: "index_price", "mark_price", "last_price".
› web boolean true if created via Deribit frontend (optional)
› creation_timestamp integer The timestamp (milliseconds since the Unix epoch)
› is_rebalance boolean Optional (only for spot). true if order was automatically created during cross-collateral balance restoration
› average_price number Average fill price of the order
› advanced string advanced type: "usd" or "implv" (Only for options; field is omitted if not applicable).
/private/get_open_orders_by_label
var msg =
{
"jsonrpc" : "2.0",
"id" : 1953,
"method" : "private/get_open_orders_by_label",
"params" : {
"currency" : "BTC",
"label" : "fooBar"
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 1953,
"result": [
{
"time_in_force": "good_til_cancelled",
"reduce_only": false,
"price": 0.0028,
"post_only": false,
"order_type": "limit",
"order_state": "open",
"order_id": "146062",
"max_show": 10,
"last_update_timestamp": 1550050597036,
"label": "fooBar",
"is_rebalance": false,
"is_liquidation": false,
"instrument_name": "BTC-15FEB19-3250-P",
"filled_amount": 0,
"direction": "buy",
"creation_timestamp": 1550050597036,
"average_price": 0,
"api": true,
"amount": 10
}
]
}

Retrieves list of user's open orders for given currency and label.

Scope: trade:read

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
currency true string BTC
ETH
USDC
USDT
EURR The currency symbol
label false string user defined label for the order (maximum 64 characters)
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result array of object
› reject_post_only boolean true if order has reject_post_only flag (field is present only when post_only is true)
› label string User defined label (up to 64 characters)
› quote_id string The same QuoteID as supplied in the private/mass_quote request.
› order_state string Order state: "open", "filled", "rejected", "cancelled", "untriggered"
› is_secondary_oto boolean true if the order is an order that can be triggered by another order, otherwise not present.
› usd number Option price in USD (Only if advanced="usd")
› implv number Implied volatility in percent. (Only if advanced="implv")
› trigger_reference_price number The price of the given trigger at the time when the order was placed (Only for trailing trigger orders)
› original_order_type string Original order type. Optional field
› oco_ref string Unique reference that identifies a one_cancels_others (OCO) pair.
› block_trade boolean true if order made from block_trade trade, added only in that case.
› trigger_price number Trigger price (Only for future trigger orders)
› api boolean true if created with API
› mmp boolean true if the order is a MMP order, otherwise false.
› oto_order_ids array of string The Ids of the orders that will be triggered if the order is filled
› trigger_order_id string Id of the trigger order that created the order (Only for orders that were created by triggered orders).
› cancel_reason string Enumerated reason behind cancel "user_request", "autoliquidation", "cancel_on_disconnect", "risk_mitigation", "pme_risk_reduction" (portfolio margining risk reduction), "pme_account_locked" (portfolio margining account locked per currency), "position_locked", "mmp_trigger" (market maker protection), "mmp_config_curtailment" (market maker configured quantity decreased), "edit_post_only_reject" (cancelled on edit because of reject_post_only setting), "oco_other_closed" (the oco order linked to this order was closed), "oto_primary_closed" (the oto primary order that was going to trigger this order was cancelled), "settlement" (closed because of a settlement)
› primary_order_id string Unique order identifier
› quote boolean If order is a quote. Present only if true.
› risk_reducing boolean true if the order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users), otherwise false.
› filled_amount number Filled amount of the order. For perpetual and futures the filled_amount is in USD units, for options - in units or corresponding cryptocurrency contracts, e.g., BTC or ETH.
› instrument_name string Unique instrument identifier
› max_show number Maximum amount within an order to be shown to other traders, 0 for invisible order.
› app_name string The name of the application that placed the order on behalf of the user (optional).
› mmp_cancelled boolean true if order was cancelled by mmp trigger (optional)
› direction string Direction: buy, or sell
› last_update_timestamp integer The timestamp (milliseconds since the Unix epoch)
› trigger_offset number The maximum deviation from the price peak beyond which the order will be triggered (Only for trailing trigger orders)
› mmp_group string Name of the MMP group supplied in the private/mass_quote request.
› price number or string Price in base currency or "market_price" in case of open trigger market orders
› is_liquidation boolean Optional (not added for spot). true if order was automatically created during liquidation
› reduce_only boolean Optional (not added for spot). 'true for reduce-only orders only'
› amount number It represents the requested order size. For perpetual and futures the amount is in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› is_primary_otoco boolean true if the order is an order that can trigger an OCO pair, otherwise not present.
› post_only boolean true for post-only orders only
› mobile boolean optional field with value true added only when created with Mobile Application
› trigger_fill_condition string
The fill condition of the linked order (Only for linked order types), default: first_hit.

"first_hit" - any execution of the primary order will fully cancel/place all secondary orders.
"complete_fill" - a complete execution (meaning the primary order no longer exists) will cancel/place the secondary orders.
"incremental" - any fill of the primary order will cause proportional partial cancellation/placement of the secondary order. The amount that will be subtracted/added to the secondary order will be rounded down to the contract size.
› triggered boolean Whether the trigger order has been triggered
› order_id string Unique order identifier
› replaced boolean true if the order was edited (by user or - in case of advanced options orders - by pricing engine), otherwise false.
› order_type string Order type: "limit", "market", "stop_limit", "stop_market"
› time_in_force string Order time in force: "good_til_cancelled", "good_til_day", "fill_or_kill" or "immediate_or_cancel"
› auto_replaced boolean Options, advanced orders only - true if last modification of the order was performed by the pricing engine, otherwise false.
› quote_set_id string Identifier of the QuoteSet supplied in the private/mass_quote request.
› contracts number It represents the order size in contract units. (Optional, may be absent in historical data).
› trigger string Trigger type (only for trigger orders). Allowed values: "index_price", "mark_price", "last_price".
› web boolean true if created via Deribit frontend (optional)
› creation_timestamp integer The timestamp (milliseconds since the Unix epoch)
› is_rebalance boolean Optional (only for spot). true if order was automatically created during cross-collateral balance restoration
› average_price number Average fill price of the order
› advanced string advanced type: "usd" or "implv" (Only for options; field is omitted if not applicable).
/private/get_order_history_by_currency
var msg =
{
"jsonrpc" : "2.0",
"id" : 9305,
"method" : "private/get_order_history_by_currency",
"params" : {
"currency" : "BTC",
"kind" : "future",
"count" : 1
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 9305,
"result": [
{
"time_in_force": "good_til_cancelled",
"reduce_only": false,
"price": 3886.5,
"post_only": false,
"order_type": "limit",
"order_state": "filled",
"order_id": "146475",
"max_show": 40,
"last_update_timestamp": 1550661808761,
"label": "",
"is_rebalance": false,
"is_liquidation": false,
"instrument_name": "BTC-PERPETUAL",
"filled_amount": 40,
"direction": "buy",
"creation_timestamp": 1550661808761,
"average_price": 3659.8,
"api": true,
"amount": 40
}
]
}

Retrieves history of orders that have been partially or fully filled.

Scope: trade:read

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
currency true string BTC
ETH
USDC
USDT
EURR The currency symbol
kind false string future
option
spot
future_combo
option_combo
combo
any Instrument kind, "combo" for any combo or "any" for all. If not provided instruments of all kinds are considered
count false integer Number of requested items, default - 20
offset false integer The offset for pagination, default - 0
include_old false boolean Include in result orders older than 2 days, default - false
include_unfilled false boolean Include in result fully unfilled closed orders, default - false
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result array of object
› reject_post_only boolean true if order has reject_post_only flag (field is present only when post_only is true)
› label string User defined label (up to 64 characters)
› quote_id string The same QuoteID as supplied in the private/mass_quote request.
› order_state string Order state: "open", "filled", "rejected", "cancelled", "untriggered"
› is_secondary_oto boolean true if the order is an order that can be triggered by another order, otherwise not present.
› usd number Option price in USD (Only if advanced="usd")
› implv number Implied volatility in percent. (Only if advanced="implv")
› trigger_reference_price number The price of the given trigger at the time when the order was placed (Only for trailing trigger orders)
› original_order_type string Original order type. Optional field
› oco_ref string Unique reference that identifies a one_cancels_others (OCO) pair.
› block_trade boolean true if order made from block_trade trade, added only in that case.
› trigger_price number Trigger price (Only for future trigger orders)
› api boolean true if created with API
› mmp boolean true if the order is a MMP order, otherwise false.
› oto_order_ids array of string The Ids of the orders that will be triggered if the order is filled
› trigger_order_id string Id of the trigger order that created the order (Only for orders that were created by triggered orders).
› cancel_reason string Enumerated reason behind cancel "user_request", "autoliquidation", "cancel_on_disconnect", "risk_mitigation", "pme_risk_reduction" (portfolio margining risk reduction), "pme_account_locked" (portfolio margining account locked per currency), "position_locked", "mmp_trigger" (market maker protection), "mmp_config_curtailment" (market maker configured quantity decreased), "edit_post_only_reject" (cancelled on edit because of reject_post_only setting), "oco_other_closed" (the oco order linked to this order was closed), "oto_primary_closed" (the oto primary order that was going to trigger this order was cancelled), "settlement" (closed because of a settlement)
› primary_order_id string Unique order identifier
› quote boolean If order is a quote. Present only if true.
› risk_reducing boolean true if the order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users), otherwise false.
› filled_amount number Filled amount of the order. For perpetual and futures the filled_amount is in USD units, for options - in units or corresponding cryptocurrency contracts, e.g., BTC or ETH.
› instrument_name string Unique instrument identifier
› max_show number Maximum amount within an order to be shown to other traders, 0 for invisible order.
› app_name string The name of the application that placed the order on behalf of the user (optional).
› mmp_cancelled boolean true if order was cancelled by mmp trigger (optional)
› direction string Direction: buy, or sell
› last_update_timestamp integer The timestamp (milliseconds since the Unix epoch)
› trigger_offset number The maximum deviation from the price peak beyond which the order will be triggered (Only for trailing trigger orders)
› mmp_group string Name of the MMP group supplied in the private/mass_quote request.
› price number or string Price in base currency or "market_price" in case of open trigger market orders
› is_liquidation boolean Optional (not added for spot). true if order was automatically created during liquidation
› reduce_only boolean Optional (not added for spot). 'true for reduce-only orders only'
› amount number It represents the requested order size. For perpetual and futures the amount is in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› is_primary_otoco boolean true if the order is an order that can trigger an OCO pair, otherwise not present.
› post_only boolean true for post-only orders only
› mobile boolean optional field with value true added only when created with Mobile Application
› trigger_fill_condition string
The fill condition of the linked order (Only for linked order types), default: first_hit.

"first_hit" - any execution of the primary order will fully cancel/place all secondary orders.
"complete_fill" - a complete execution (meaning the primary order no longer exists) will cancel/place the secondary orders.
"incremental" - any fill of the primary order will cause proportional partial cancellation/placement of the secondary order. The amount that will be subtracted/added to the secondary order will be rounded down to the contract size.
› triggered boolean Whether the trigger order has been triggered
› order_id string Unique order identifier
› replaced boolean true if the order was edited (by user or - in case of advanced options orders - by pricing engine), otherwise false.
› order_type string Order type: "limit", "market", "stop_limit", "stop_market"
› time_in_force string Order time in force: "good_til_cancelled", "good_til_day", "fill_or_kill" or "immediate_or_cancel"
› auto_replaced boolean Options, advanced orders only - true if last modification of the order was performed by the pricing engine, otherwise false.
› quote_set_id string Identifier of the QuoteSet supplied in the private/mass_quote request.
› contracts number It represents the order size in contract units. (Optional, may be absent in historical data).
› trigger string Trigger type (only for trigger orders). Allowed values: "index_price", "mark_price", "last_price".
› web boolean true if created via Deribit frontend (optional)
› creation_timestamp integer The timestamp (milliseconds since the Unix epoch)
› is_rebalance boolean Optional (only for spot). true if order was automatically created during cross-collateral balance restoration
› average_price number Average fill price of the order
› advanced string advanced type: "usd" or "implv" (Only for options; field is omitted if not applicable).
/private/get_order_history_by_instrument
var msg =
{
"jsonrpc" : "2.0",
"id" : 1032,
"method" : "private/get_order_history_by_instrument",
"params" : {
"instrument_name" : "BTC-PERPETUAL",
"count" : 1
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 1032,
"result": [
{
"time_in_force": "good_til_cancelled",
"reduce_only": false,
"price": 3886.5,
"post_only": false,
"order_type": "limit",
"order_state": "filled",
"order_id": "146475",
"max_show": 40,
"last_update_timestamp": 1550661808761,
"label": "",
"is_rebalance": false,
"is_liquidation": false,
"instrument_name": "BTC-PERPETUAL",
"filled_amount": 40,
"direction": "buy",
"creation_timestamp": 1550661808761,
"average_price": 3659.8,
"api": true,
"amount": 40
}
]
}

Retrieves history of orders that have been partially or fully filled.

Scope: trade:read

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
instrument_name true string Instrument name
count false integer Number of requested items, default - 20
offset false integer The offset for pagination, default - 0
include_old false boolean Include in result orders older than 2 days, default - false
include_unfilled false boolean Include in result fully unfilled closed orders, default - false
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result array of object
› reject_post_only boolean true if order has reject_post_only flag (field is present only when post_only is true)
› label string User defined label (up to 64 characters)
› quote_id string The same QuoteID as supplied in the private/mass_quote request.
› order_state string Order state: "open", "filled", "rejected", "cancelled", "untriggered"
› is_secondary_oto boolean true if the order is an order that can be triggered by another order, otherwise not present.
› usd number Option price in USD (Only if advanced="usd")
› implv number Implied volatility in percent. (Only if advanced="implv")
› trigger_reference_price number The price of the given trigger at the time when the order was placed (Only for trailing trigger orders)
› original_order_type string Original order type. Optional field
› oco_ref string Unique reference that identifies a one_cancels_others (OCO) pair.
› block_trade boolean true if order made from block_trade trade, added only in that case.
› trigger_price number Trigger price (Only for future trigger orders)
› api boolean true if created with API
› mmp boolean true if the order is a MMP order, otherwise false.
› oto_order_ids array of string The Ids of the orders that will be triggered if the order is filled
› trigger_order_id string Id of the trigger order that created the order (Only for orders that were created by triggered orders).
› cancel_reason string Enumerated reason behind cancel "user_request", "autoliquidation", "cancel_on_disconnect", "risk_mitigation", "pme_risk_reduction" (portfolio margining risk reduction), "pme_account_locked" (portfolio margining account locked per currency), "position_locked", "mmp_trigger" (market maker protection), "mmp_config_curtailment" (market maker configured quantity decreased), "edit_post_only_reject" (cancelled on edit because of reject_post_only setting), "oco_other_closed" (the oco order linked to this order was closed), "oto_primary_closed" (the oto primary order that was going to trigger this order was cancelled), "settlement" (closed because of a settlement)
› primary_order_id string Unique order identifier
› quote boolean If order is a quote. Present only if true.
› risk_reducing boolean true if the order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users), otherwise false.
› filled_amount number Filled amount of the order. For perpetual and futures the filled_amount is in USD units, for options - in units or corresponding cryptocurrency contracts, e.g., BTC or ETH.
› instrument_name string Unique instrument identifier
› max_show number Maximum amount within an order to be shown to other traders, 0 for invisible order.
› app_name string The name of the application that placed the order on behalf of the user (optional).
› mmp_cancelled boolean true if order was cancelled by mmp trigger (optional)
› direction string Direction: buy, or sell
› last_update_timestamp integer The timestamp (milliseconds since the Unix epoch)
› trigger_offset number The maximum deviation from the price peak beyond which the order will be triggered (Only for trailing trigger orders)
› mmp_group string Name of the MMP group supplied in the private/mass_quote request.
› price number or string Price in base currency or "market_price" in case of open trigger market orders
› is_liquidation boolean Optional (not added for spot). true if order was automatically created during liquidation
› reduce_only boolean Optional (not added for spot). 'true for reduce-only orders only'
› amount number It represents the requested order size. For perpetual and futures the amount is in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› is_primary_otoco boolean true if the order is an order that can trigger an OCO pair, otherwise not present.
› post_only boolean true for post-only orders only
› mobile boolean optional field with value true added only when created with Mobile Application
› trigger_fill_condition string
The fill condition of the linked order (Only for linked order types), default: first_hit.

"first_hit" - any execution of the primary order will fully cancel/place all secondary orders.
"complete_fill" - a complete execution (meaning the primary order no longer exists) will cancel/place the secondary orders.
"incremental" - any fill of the primary order will cause proportional partial cancellation/placement of the secondary order. The amount that will be subtracted/added to the secondary order will be rounded down to the contract size.
› triggered boolean Whether the trigger order has been triggered
› order_id string Unique order identifier
› replaced boolean true if the order was edited (by user or - in case of advanced options orders - by pricing engine), otherwise false.
› order_type string Order type: "limit", "market", "stop_limit", "stop_market"
› time_in_force string Order time in force: "good_til_cancelled", "good_til_day", "fill_or_kill" or "immediate_or_cancel"
› auto_replaced boolean Options, advanced orders only - true if last modification of the order was performed by the pricing engine, otherwise false.
› quote_set_id string Identifier of the QuoteSet supplied in the private/mass_quote request.
› contracts number It represents the order size in contract units. (Optional, may be absent in historical data).
› trigger string Trigger type (only for trigger orders). Allowed values: "index_price", "mark_price", "last_price".
› web boolean true if created via Deribit frontend (optional)
› creation_timestamp integer The timestamp (milliseconds since the Unix epoch)
› is_rebalance boolean Optional (only for spot). true if order was automatically created during cross-collateral balance restoration
› average_price number Average fill price of the order
› advanced string advanced type: "usd" or "implv" (Only for options; field is omitted if not applicable).
/private/get_order_margin_by_ids
var msg =
{
"jsonrpc" : "2.0",
"id" : 5625,
"method" : "private/get_order_margin_by_ids",
"params" : {
"ids" : [
"ETH-349280",
"ETH-349279",
"ETH-349278"
]
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 5625,
"result": [
{
"order_id": "ETH-349278",
"initial_margin": 0.00091156,
"initial_margin_currency": "ETH"
},
{
"order_id": "ETH-349279",
"initial_margin": 0,
"initial_margin_currency": "ETH"
},
{
"order_id": "ETH-349280",
"initial_margin": 0,
"initial_margin_currency": "ETH"
}
]
}

Retrieves initial margins of given orders

Scope: trade:read

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
ids true array Ids of orders
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result array of object
› initial_margin number Initial margin of order
› initial_margin_currency string Currency of initial margin
› order_id string Unique order identifier
/private/get_order_state
var msg =
{
"jsonrpc" : "2.0",
"id" : 4316,
"method" : "private/get_order_state",
"params" : {
"order_id" : "ETH-331562"
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 4316,
"result": {
"time_in_force": "good_til_cancelled",
"reduce_only": false,
"price": 118.94,
"post_only": false,
"order_type": "limit",
"order_state": "filled",
"order_id": "ETH-331562",
"max_show": 37,
"last_update_timestamp": 1550219810944,
"label": "",
"is_rebalance": false,
"is_liquidation": false,
"instrument_name": "ETH-PERPETUAL",
"filled_amount": 37,
"direction": "sell",
"creation_timestamp": 1550219749176,
"average_price": 118.94,
"api": false,
"amount": 37
}
}

Retrieve the current state of an order.

Scope: trade:read

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
order_id true string The order id
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› reject_post_only boolean true if order has reject_post_only flag (field is present only when post_only is true)
› label string User defined label (up to 64 characters)
› quote_id string The same QuoteID as supplied in the private/mass_quote request.
› order_state string Order state: "open", "filled", "rejected", "cancelled", "untriggered"
› is_secondary_oto boolean true if the order is an order that can be triggered by another order, otherwise not present.
› usd number Option price in USD (Only if advanced="usd")
› implv number Implied volatility in percent. (Only if advanced="implv")
› trigger_reference_price number The price of the given trigger at the time when the order was placed (Only for trailing trigger orders)
› original_order_type string Original order type. Optional field
› oco_ref string Unique reference that identifies a one_cancels_others (OCO) pair.
› block_trade boolean true if order made from block_trade trade, added only in that case.
› trigger_price number Trigger price (Only for future trigger orders)
› api boolean true if created with API
› mmp boolean true if the order is a MMP order, otherwise false.
› oto_order_ids array of string The Ids of the orders that will be triggered if the order is filled
› trigger_order_id string Id of the trigger order that created the order (Only for orders that were created by triggered orders).
› cancel_reason string Enumerated reason behind cancel "user_request", "autoliquidation", "cancel_on_disconnect", "risk_mitigation", "pme_risk_reduction" (portfolio margining risk reduction), "pme_account_locked" (portfolio margining account locked per currency), "position_locked", "mmp_trigger" (market maker protection), "mmp_config_curtailment" (market maker configured quantity decreased), "edit_post_only_reject" (cancelled on edit because of reject_post_only setting), "oco_other_closed" (the oco order linked to this order was closed), "oto_primary_closed" (the oto primary order that was going to trigger this order was cancelled), "settlement" (closed because of a settlement)
› primary_order_id string Unique order identifier
› quote boolean If order is a quote. Present only if true.
› risk_reducing boolean true if the order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users), otherwise false.
› filled_amount number Filled amount of the order. For perpetual and futures the filled_amount is in USD units, for options - in units or corresponding cryptocurrency contracts, e.g., BTC or ETH.
› instrument_name string Unique instrument identifier
› max_show number Maximum amount within an order to be shown to other traders, 0 for invisible order.
› app_name string The name of the application that placed the order on behalf of the user (optional).
› mmp_cancelled boolean true if order was cancelled by mmp trigger (optional)
› direction string Direction: buy, or sell
› last_update_timestamp integer The timestamp (milliseconds since the Unix epoch)
› trigger_offset number The maximum deviation from the price peak beyond which the order will be triggered (Only for trailing trigger orders)
› mmp_group string Name of the MMP group supplied in the private/mass_quote request.
› price number or string Price in base currency or "market_price" in case of open trigger market orders
› is_liquidation boolean Optional (not added for spot). true if order was automatically created during liquidation
› reduce_only boolean Optional (not added for spot). 'true for reduce-only orders only'
› amount number It represents the requested order size. For perpetual and futures the amount is in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› is_primary_otoco boolean true if the order is an order that can trigger an OCO pair, otherwise not present.
› post_only boolean true for post-only orders only
› mobile boolean optional field with value true added only when created with Mobile Application
› trigger_fill_condition string
The fill condition of the linked order (Only for linked order types), default: first_hit.

"first_hit" - any execution of the primary order will fully cancel/place all secondary orders.
"complete_fill" - a complete execution (meaning the primary order no longer exists) will cancel/place the secondary orders.
"incremental" - any fill of the primary order will cause proportional partial cancellation/placement of the secondary order. The amount that will be subtracted/added to the secondary order will be rounded down to the contract size.
› triggered boolean Whether the trigger order has been triggered
› order_id string Unique order identifier
› replaced boolean true if the order was edited (by user or - in case of advanced options orders - by pricing engine), otherwise false.
› order_type string Order type: "limit", "market", "stop_limit", "stop_market"
› time_in_force string Order time in force: "good_til_cancelled", "good_til_day", "fill_or_kill" or "immediate_or_cancel"
› auto_replaced boolean Options, advanced orders only - true if last modification of the order was performed by the pricing engine, otherwise false.
› quote_set_id string Identifier of the QuoteSet supplied in the private/mass_quote request.
› contracts number It represents the order size in contract units. (Optional, may be absent in historical data).
› trigger string Trigger type (only for trigger orders). Allowed values: "index_price", "mark_price", "last_price".
› web boolean true if created via Deribit frontend (optional)
› creation_timestamp integer The timestamp (milliseconds since the Unix epoch)
› is_rebalance boolean Optional (only for spot). true if order was automatically created during cross-collateral balance restoration
› average_price number Average fill price of the order
› advanced string advanced type: "usd" or "implv" (Only for options; field is omitted if not applicable).
/private/get_order_state_by_label
var msg =
{
"jsonrpc" : "2.0",
"id" : 4316,
"method" : "private/get_order_state_by_label",
"params" : {
"currency" : "ETH",
"label" : "fooBar"
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 4316,
"result": [
{
"time_in_force": "good_til_cancelled",
"reduce_only": false,
"price": 118.94,
"post_only": false,
"order_type": "limit",
"order_state": "filled",
"order_id": "ETH-331562",
"max_show": 37,
"last_update_timestamp": 1550219810944,
"label": "fooBar",
"is_rebalance": false,
"is_liquidation": false,
"instrument_name": "ETH-PERPETUAL",
"filled_amount": 37,
"direction": "sell",
"creation_timestamp": 1550219749176,
"average_price": 118.94,
"api": false,
"amount": 37
}
]
}

Retrieve the state of recent orders with a given label.

Scope: trade:read

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
currency true string BTC
ETH
USDC
USDT
EURR The currency symbol
label false string user defined label for the order (maximum 64 characters)
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result array of object
› reject_post_only boolean true if order has reject_post_only flag (field is present only when post_only is true)
› label string User defined label (up to 64 characters)
› quote_id string The same QuoteID as supplied in the private/mass_quote request.
› order_state string Order state: "open", "filled", "rejected", "cancelled", "untriggered"
› is_secondary_oto boolean true if the order is an order that can be triggered by another order, otherwise not present.
› usd number Option price in USD (Only if advanced="usd")
› implv number Implied volatility in percent. (Only if advanced="implv")
› trigger_reference_price number The price of the given trigger at the time when the order was placed (Only for trailing trigger orders)
› original_order_type string Original order type. Optional field
› oco_ref string Unique reference that identifies a one_cancels_others (OCO) pair.
› block_trade boolean true if order made from block_trade trade, added only in that case.
› trigger_price number Trigger price (Only for future trigger orders)
› api boolean true if created with API
› mmp boolean true if the order is a MMP order, otherwise false.
› oto_order_ids array of string The Ids of the orders that will be triggered if the order is filled
› trigger_order_id string Id of the trigger order that created the order (Only for orders that were created by triggered orders).
› cancel_reason string Enumerated reason behind cancel "user_request", "autoliquidation", "cancel_on_disconnect", "risk_mitigation", "pme_risk_reduction" (portfolio margining risk reduction), "pme_account_locked" (portfolio margining account locked per currency), "position_locked", "mmp_trigger" (market maker protection), "mmp_config_curtailment" (market maker configured quantity decreased), "edit_post_only_reject" (cancelled on edit because of reject_post_only setting), "oco_other_closed" (the oco order linked to this order was closed), "oto_primary_closed" (the oto primary order that was going to trigger this order was cancelled), "settlement" (closed because of a settlement)
› primary_order_id string Unique order identifier
› quote boolean If order is a quote. Present only if true.
› risk_reducing boolean true if the order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users), otherwise false.
› filled_amount number Filled amount of the order. For perpetual and futures the filled_amount is in USD units, for options - in units or corresponding cryptocurrency contracts, e.g., BTC or ETH.
› instrument_name string Unique instrument identifier
› max_show number Maximum amount within an order to be shown to other traders, 0 for invisible order.
› app_name string The name of the application that placed the order on behalf of the user (optional).
› mmp_cancelled boolean true if order was cancelled by mmp trigger (optional)
› direction string Direction: buy, or sell
› last_update_timestamp integer The timestamp (milliseconds since the Unix epoch)
› trigger_offset number The maximum deviation from the price peak beyond which the order will be triggered (Only for trailing trigger orders)
› mmp_group string Name of the MMP group supplied in the private/mass_quote request.
› price number or string Price in base currency or "market_price" in case of open trigger market orders
› is_liquidation boolean Optional (not added for spot). true if order was automatically created during liquidation
› reduce_only boolean Optional (not added for spot). 'true for reduce-only orders only'
› amount number It represents the requested order size. For perpetual and futures the amount is in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› is_primary_otoco boolean true if the order is an order that can trigger an OCO pair, otherwise not present.
› post_only boolean true for post-only orders only
› mobile boolean optional field with value true added only when created with Mobile Application
› trigger_fill_condition string
The fill condition of the linked order (Only for linked order types), default: first_hit.

"first_hit" - any execution of the primary order will fully cancel/place all secondary orders.
"complete_fill" - a complete execution (meaning the primary order no longer exists) will cancel/place the secondary orders.
"incremental" - any fill of the primary order will cause proportional partial cancellation/placement of the secondary order. The amount that will be subtracted/added to the secondary order will be rounded down to the contract size.
› triggered boolean Whether the trigger order has been triggered
› order_id string Unique order identifier
› replaced boolean true if the order was edited (by user or - in case of advanced options orders - by pricing engine), otherwise false.
› order_type string Order type: "limit", "market", "stop_limit", "stop_market"
› time_in_force string Order time in force: "good_til_cancelled", "good_til_day", "fill_or_kill" or "immediate_or_cancel"
› auto_replaced boolean Options, advanced orders only - true if last modification of the order was performed by the pricing engine, otherwise false.
› quote_set_id string Identifier of the QuoteSet supplied in the private/mass_quote request.
› contracts number It represents the order size in contract units. (Optional, may be absent in historical data).
› trigger string Trigger type (only for trigger orders). Allowed values: "index_price", "mark_price", "last_price".
› web boolean true if created via Deribit frontend (optional)
› creation_timestamp integer The timestamp (milliseconds since the Unix epoch)
› is_rebalance boolean Optional (only for spot). true if order was automatically created during cross-collateral balance restoration
› average_price number Average fill price of the order
› advanced string advanced type: "usd" or "implv" (Only for options; field is omitted if not applicable).
/private/get_trigger_order_history
var msg =
{
"jsonrpc" : "2.0",
"id" : 2552,
"method" : "private/get_trigger_order_history",
"params" : {
"currency" : "ETH",
"count" : 10
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 2192,
"result": {
"entries": [
{
"trigger": "index",
"timestamp": 1555918941451,
"trigger_price": 5285,
"trigger_order_id": "SLIS-103",
"order_state": "new",
"request": "trigger:order",
"price": 5179.28,
"order_id": "671473",
"offset": 277,
"instrument_name": "BTC-PERPETUAL",
"amount": 10,
"direction": "buy"
}
],
"continuation": "1555918941451.SLIS-103"
}
}

Retrieves detailed log of the user's trigger orders.

Scope: trade:read

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
currency true string BTC
ETH
USDC
USDT
EURR The currency symbol
instrument_name false string Instrument name
count false integer Number of requested items, default - 20
continuation false string Continuation token for pagination
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› continuation string Continuation token for pagination.
› entries array of object
› › amount number It represents the requested order size. For perpetual and futures the amount is in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› › direction string Direction: buy, or sell
› › instrument_name string Unique instrument identifier
› › is_secondary_oto boolean true if the order is an order that can be triggered by another order, otherwise not present.
› › label string User defined label (presented only when previously set for order by user)
› › last_update_timestamp integer The timestamp (milliseconds since the Unix epoch)
› › oco_ref string Unique reference that identifies a one_cancels_others (OCO) pair.
› › order_id string Unique order identifier
› › order_state string Order state: "triggered", "cancelled", or "rejected" with rejection reason (e.g. "rejected:reduce_direction").
› › order_type string Requested order type: "limit or "market"
› › post_only boolean true for post-only orders only
› › price number Price in base currency
› › reduce_only boolean Optional (not added for spot). 'true for reduce-only orders only'
› › request string Type of last request performed on the trigger order by user or system. "cancel" - when order was cancelled, "trigger:order" - when trigger order spawned market or limit order after being triggered
› › source string Source of the order that is linked to the trigger order.
› › timestamp integer The timestamp (milliseconds since the Unix epoch)
› › trigger string Trigger type (only for trigger orders). Allowed values: "index_price", "mark_price", "last_price".
› › trigger_offset number The maximum deviation from the price peak beyond which the order will be triggered (Only for trailing trigger orders)
› › trigger_order_id string Id of the user order used for the trigger-order reference before triggering
› › trigger_price number Trigger price (Only for future trigger orders)
/private/get_user_trades_by_currency
var msg =
{
"jsonrpc" : "2.0",
"id" : 9367,
"method" : "private/get_user_trades_by_currency",
"params" : {
"currency" : "ETH",
"start_id" : "ETH-34066",
"count" : 2
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 9367,
"result": {
"trades": [
{
"underlying_price": 204.5,
"trade_seq": 3,
"trade_id": "ETH-2696060",
"timestamp": 1590480363130,
"tick_direction": 2,
"state": "filled",
"reduce_only": false,
"price": 0.361,
"post_only": false,
"order_type": "limit",
"order_id": "ETH-584827850",
"matching_id": null,
"mark_price": 0.364585,
"liquidity": "T",
"iv": 0,
"instrument_name": "ETH-29MAY20-130-C",
"index_price": 203.72,
"fee_currency": "ETH",
"fee": 0.002,
"direction": "sell",
"amount": 5
},
{
"underlying_price": 204.82,
"trade_seq": 3,
"trade_id": "ETH-2696062",
"timestamp": 1590480416119,
"tick_direction": 0,
"state": "filled",
"reduce_only": false,
"price": 0.015,
"post_only": false,
"order_type": "limit",
"order_id": "ETH-584828229",
"matching_id": null,
"mark_price": 0.000596,
"liquidity": "T",
"iv": 352.91,
"instrument_name": "ETH-29MAY20-140-P",
"index_price": 204.06,
"fee_currency": "ETH",
"fee": 0.002,
"direction": "buy",
"amount": 5
}
],
"has_more": true
}
}

Retrieve the latest user trades that have occurred for instruments in a specific currency symbol. To read subaccount trades, use subaccount_id parameter.

Scope: trade:read

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
currency true string BTC
ETH
USDC
USDT
EURR The currency symbol
kind false string future
option
spot
future_combo
option_combo
combo
any Instrument kind, "combo" for any combo or "any" for all. If not provided instruments of all kinds are considered
start_id false string The ID of the first trade to be returned. Number for BTC trades, or hyphen name in ex. "ETH-15" # "ETH_USDC-16"
end_id false string The ID of the last trade to be returned. Number for BTC trades, or hyphen name in ex. "ETH-15" # "ETH_USDC-16"
count false integer Number of requested items, default - 10
start_timestamp false integer The earliest timestamp to return result from (milliseconds since the UNIX epoch). When param is provided trades are returned from the earliest
end_timestamp false integer The most recent timestamp to return result from (milliseconds since the UNIX epoch). Only one of params: start_timestamp, end_timestamp is truly required
sorting false string asc
desc
default Direction of results sorting (default value means no sorting, results will be returned in order in which they left the database)
subaccount_id false integer The user id for the subaccount
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› has_more boolean
› trades array of object
› › timestamp integer The timestamp of the trade (milliseconds since the UNIX epoch)
› › label string User defined label (presented only when previously set for order by user)
› › fee number User's fee in units of the specified fee_currency
› › quote_id string QuoteID of the user order (optional, present only for orders placed with private/mass_quote)
› › liquidity string Describes what was role of users order: "M" when it was maker order, "T" when it was taker order
› › index_price number Index Price at the moment of trade
› › api boolean true if user order was created with API
› › mmp boolean true if user order is MMP
› › legs array Optional field containing leg trades if trade is a combo trade (present when querying for only combo trades and in combo_trades events)
› › trade_seq integer The sequence number of the trade within instrument
› › risk_reducing boolean true if user order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users)
› › instrument_name string Unique instrument identifier
› › fee_currency string Currency, i.e "BTC", "ETH", "USDC"
› › direction string Direction: buy, or sell
› › trade_id string Unique (per currency) trade identifier
› › tick_direction integer Direction of the "tick" (0 = Plus Tick, 1 = Zero-Plus Tick, 2 = Minus Tick, 3 = Zero-Minus Tick).
› › profit_loss number Profit and loss in base currency.
› › matching_id string Always null
› › price number Price in base currency
› › reduce_only string true if user order is reduce-only
› › amount number Trade amount. For perpetual and futures - in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› › post_only string true if user order is post-only
› › liquidation string Optional field (only for trades caused by liquidation): "M" when maker side of trade was under liquidation, "T" when taker side was under liquidation, "MT" when both sides of trade were under liquidation
› › combo_trade_id number Optional field containing combo trade identifier if the trade is a combo trade
› › order_id string Id of the user order (maker or taker), i.e. subscriber's order id that took part in the trade
› › block_trade_id string Block trade id - when trade was part of a block trade
› › order_type string Order type: "limit, "market", or "liquidation"
› › quote_set_id string QuoteSet of the user order (optional, present only for orders placed with private/mass_quote)
› › combo_id string Optional field containing combo instrument name if the trade is a combo trade
› › underlying_price number Underlying price for implied volatility calculations (Options only)
› › contracts number Trade size in contract units (optional, may be absent in historical trades)
› › mark_price number Mark Price at the moment of trade
› › iv number Option implied volatility for the price (Option only)
› › state string Order state: "open", "filled", "rejected", "cancelled", "untriggered" or "archive" (if order was archived)
› › advanced string Advanced type of user order: "usd" or "implv" (only for options; omitted if not applicable)
/private/get_user_trades_by_currency_and_time
var msg =
{
"jsonrpc" : "2.0",
"id" : 9292,
"method" : "private/get_user_trades_by_currency_and_time",
"params" : {
"currency" : "BTC",
"start_timestamp" : 1590480630731,
"end_timestamp" : 1510480630731,
"count" : 2
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 9292,
"result": {
"trades": [
{
"underlying_price": 8994.95,
"trade_seq": 1,
"trade_id": "48078936",
"timestamp": 1590480620145,
"tick_direction": 1,
"state": "filled",
"reduce_only": false,
"price": 0.028,
"post_only": false,
"order_type": "limit",
"order_id": "4008699030",
"matching_id": null,
"mark_price": 0.03135383,
"liquidity": "M",
"iv": 38.51,
"instrument_name": "BTC-27MAY20-8750-C",
"index_price": 8993.47,
"fee_currency": "BTC",
"fee": 0.0004,
"direction": "sell",
"amount": 1
},
{
"trade_seq": 299513,
"trade_id": "47958936",
"timestamp": 1589923311862,
"tick_direction": 2,
"state": "filled",
"reduce_only": false,
"price": 9681.5,
"post_only": false,
"order_type": "limit",
"order_id": "3993343822",
"matching_id": null,
"mark_price": 9684,
"liquidity": "M",
"instrument_name": "BTC-26JUN20",
"index_price": 9679.48,
"fee_currency": "BTC",
"fee": -2.1e-7,
"direction": "buy",
"amount": 10
}
],
"has_more": false
}
}

Retrieve the latest user trades that have occurred for instruments in a specific currency symbol and within a given time range.

Scope: trade:read

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
currency true string BTC
ETH
USDC
USDT
EURR The currency symbol
kind false string future
option
spot
future_combo
option_combo
combo
any Instrument kind, "combo" for any combo or "any" for all. If not provided instruments of all kinds are considered
start_timestamp true integer The earliest timestamp to return result from (milliseconds since the UNIX epoch). When param is provided trades are returned from the earliest
end_timestamp true integer The most recent timestamp to return result from (milliseconds since the UNIX epoch). Only one of params: start_timestamp, end_timestamp is truly required
count false integer Number of requested items, default - 10
sorting false string asc
desc
default Direction of results sorting (default value means no sorting, results will be returned in order in which they left the database)
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› has_more boolean
› trades array of object
› › timestamp integer The timestamp of the trade (milliseconds since the UNIX epoch)
› › label string User defined label (presented only when previously set for order by user)
› › fee number User's fee in units of the specified fee_currency
› › quote_id string QuoteID of the user order (optional, present only for orders placed with private/mass_quote)
› › liquidity string Describes what was role of users order: "M" when it was maker order, "T" when it was taker order
› › index_price number Index Price at the moment of trade
› › api boolean true if user order was created with API
› › mmp boolean true if user order is MMP
› › legs array Optional field containing leg trades if trade is a combo trade (present when querying for only combo trades and in combo_trades events)
› › trade_seq integer The sequence number of the trade within instrument
› › risk_reducing boolean true if user order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users)
› › instrument_name string Unique instrument identifier
› › fee_currency string Currency, i.e "BTC", "ETH", "USDC"
› › direction string Direction: buy, or sell
› › trade_id string Unique (per currency) trade identifier
› › tick_direction integer Direction of the "tick" (0 = Plus Tick, 1 = Zero-Plus Tick, 2 = Minus Tick, 3 = Zero-Minus Tick).
› › profit_loss number Profit and loss in base currency.
› › matching_id string Always null
› › price number Price in base currency
› › reduce_only string true if user order is reduce-only
› › amount number Trade amount. For perpetual and futures - in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› › post_only string true if user order is post-only
› › liquidation string Optional field (only for trades caused by liquidation): "M" when maker side of trade was under liquidation, "T" when taker side was under liquidation, "MT" when both sides of trade were under liquidation
› › combo_trade_id number Optional field containing combo trade identifier if the trade is a combo trade
› › order_id string Id of the user order (maker or taker), i.e. subscriber's order id that took part in the trade
› › block_trade_id string Block trade id - when trade was part of a block trade
› › order_type string Order type: "limit, "market", or "liquidation"
› › quote_set_id string QuoteSet of the user order (optional, present only for orders placed with private/mass_quote)
› › combo_id string Optional field containing combo instrument name if the trade is a combo trade
› › underlying_price number Underlying price for implied volatility calculations (Options only)
› › contracts number Trade size in contract units (optional, may be absent in historical trades)
› › mark_price number Mark Price at the moment of trade
› › iv number Option implied volatility for the price (Option only)
› › state string Order state: "open", "filled", "rejected", "cancelled", "untriggered" or "archive" (if order was archived)
› › advanced string Advanced type of user order: "usd" or "implv" (only for options; omitted if not applicable)
/private/get_user_trades_by_instrument
var msg =
{
"jsonrpc" : "2.0",
"id" : 5728,
"method" : "private/get_user_trades_by_instrument",
"params" : {
"instrument_name" : "ETH-PERPETUAL",
"start_seq" : 1966042,
"count" : 2
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 5728,
"result": {
"trades": [
{
"trade_seq": 1966042,
"trade_id": "ETH-2696068",
"timestamp": 1590480712800,
"tick_direction": 3,
"state": "filled",
"reduce_only": false,
"price": 203.8,
"post_only": false,
"order_type": "market",
"order_id": "ETH-584830574",
"matching_id": null,
"mark_price": 203.78,
"liquidity": "T",
"instrument_name": "ETH-PERPETUAL",
"index_price": 203.89,
"fee_currency": "ETH",
"fee": 0.00036801,
"direction": "buy",
"amount": 100
},
{
"trade_seq": 1966043,
"trade_id": "ETH-2696069",
"timestamp": 1590480724473,
"tick_direction": 3,
"state": "filled",
"reduce_only": false,
"price": 203.8,
"post_only": false,
"order_type": "market",
"order_id": "ETH-584830695",
"matching_id": null,
"mark_price": 203.81,
"liquidity": "T",
"instrument_name": "ETH-PERPETUAL",
"index_price": 203.92,
"fee_currency": "ETH",
"fee": 0.00036801,
"direction": "sell",
"amount": 100
}
],
"has_more": true
}
}

Retrieve the latest user trades that have occurred for a specific instrument.

Scope: trade:read

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
instrument_name true string Instrument name
start_seq false integer The sequence number of the first trade to be returned
end_seq false integer The sequence number of the last trade to be returned
count false integer Number of requested items, default - 10
start_timestamp false integer The earliest timestamp to return result from (milliseconds since the UNIX epoch). When param is provided trades are returned from the earliest
end_timestamp false integer The most recent timestamp to return result from (milliseconds since the UNIX epoch). Only one of params: start_timestamp, end_timestamp is truly required
sorting false string asc
desc
default Direction of results sorting (default value means no sorting, results will be returned in order in which they left the database)
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› has_more boolean
› trades array of object
› › timestamp integer The timestamp of the trade (milliseconds since the UNIX epoch)
› › label string User defined label (presented only when previously set for order by user)
› › fee number User's fee in units of the specified fee_currency
› › quote_id string QuoteID of the user order (optional, present only for orders placed with private/mass_quote)
› › liquidity string Describes what was role of users order: "M" when it was maker order, "T" when it was taker order
› › index_price number Index Price at the moment of trade
› › api boolean true if user order was created with API
› › mmp boolean true if user order is MMP
› › legs array Optional field containing leg trades if trade is a combo trade (present when querying for only combo trades and in combo_trades events)
› › trade_seq integer The sequence number of the trade within instrument
› › risk_reducing boolean true if user order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users)
› › instrument_name string Unique instrument identifier
› › fee_currency string Currency, i.e "BTC", "ETH", "USDC"
› › direction string Direction: buy, or sell
› › trade_id string Unique (per currency) trade identifier
› › tick_direction integer Direction of the "tick" (0 = Plus Tick, 1 = Zero-Plus Tick, 2 = Minus Tick, 3 = Zero-Minus Tick).
› › profit_loss number Profit and loss in base currency.
› › matching_id string Always null
› › price number Price in base currency
› › reduce_only string true if user order is reduce-only
› › amount number Trade amount. For perpetual and futures - in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› › post_only string true if user order is post-only
› › liquidation string Optional field (only for trades caused by liquidation): "M" when maker side of trade was under liquidation, "T" when taker side was under liquidation, "MT" when both sides of trade were under liquidation
› › combo_trade_id number Optional field containing combo trade identifier if the trade is a combo trade
› › order_id string Id of the user order (maker or taker), i.e. subscriber's order id that took part in the trade
› › block_trade_id string Block trade id - when trade was part of a block trade
› › order_type string Order type: "limit, "market", or "liquidation"
› › quote_set_id string QuoteSet of the user order (optional, present only for orders placed with private/mass_quote)
› › combo_id string Optional field containing combo instrument name if the trade is a combo trade
› › underlying_price number Underlying price for implied volatility calculations (Options only)
› › contracts number Trade size in contract units (optional, may be absent in historical trades)
› › mark_price number Mark Price at the moment of trade
› › iv number Option implied volatility for the price (Option only)
› › state string Order state: "open", "filled", "rejected", "cancelled", "untriggered" or "archive" (if order was archived)
› › advanced string Advanced type of user order: "usd" or "implv" (only for options; omitted if not applicable)
/private/get_user_trades_by_instrument_and_time
var msg =
{
"jsonrpc" : "2.0",
"id" : 276,
"method" : "private/get_user_trades_by_instrument_and_time",
"params" : {
"instrument_name" : "BTC-PERPETUAL",
"start_timestamp" : 1590470872894,
"end_timestamp" : 1590480872894,
"count" : 2
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 276,
"result": {
"trades": [
{
"trade_seq": 30289127,
"trade_id": "48078944",
"timestamp": 1590480866924,
"tick_direction": 2,
"state": "filled",
"reduce_only": false,
"price": 8988.5,
"post_only": false,
"order_type": "limit",
"order_id": "4008716877",
"matching_id": null,
"mark_price": 8990.52,
"liquidity": "T",
"instrument_name": "BTC-PERPETUAL",
"index_price": 8995.15,
"fee_currency": "BTC",
"fee": 0.00037465,
"direction": "sell",
"amount": 4490
},
{
"trade_seq": 30289128,
"trade_id": "48078945",
"timestamp": 1590480866924,
"tick_direction": 2,
"state": "filled",
"reduce_only": false,
"price": 8983.5,
"post_only": false,
"order_type": "limit",
"order_id": "4008716877",
"matching_id": null,
"mark_price": 8990.52,
"liquidity": "T",
"instrument_name": "BTC-PERPETUAL",
"index_price": 8995.15,
"fee_currency": "BTC",
"fee": 0.00001503,
"direction": "sell",
"amount": 180
}
],
"has_more": true
}
}

Retrieve the latest user trades that have occurred for a specific instrument and within a given time range.

Scope: trade:read

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
instrument_name true string Instrument name
start_timestamp true integer The earliest timestamp to return result from (milliseconds since the UNIX epoch). When param is provided trades are returned from the earliest
end_timestamp true integer The most recent timestamp to return result from (milliseconds since the UNIX epoch). Only one of params: start_timestamp, end_timestamp is truly required
count false integer Number of requested items, default - 10
sorting false string asc
desc
default Direction of results sorting (default value means no sorting, results will be returned in order in which they left the database)
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› has_more boolean
› trades array of object
› › timestamp integer The timestamp of the trade (milliseconds since the UNIX epoch)
› › label string User defined label (presented only when previously set for order by user)
› › fee number User's fee in units of the specified fee_currency
› › quote_id string QuoteID of the user order (optional, present only for orders placed with private/mass_quote)
› › liquidity string Describes what was role of users order: "M" when it was maker order, "T" when it was taker order
› › index_price number Index Price at the moment of trade
› › api boolean true if user order was created with API
› › mmp boolean true if user order is MMP
› › legs array Optional field containing leg trades if trade is a combo trade (present when querying for only combo trades and in combo_trades events)
› › trade_seq integer The sequence number of the trade within instrument
› › risk_reducing boolean true if user order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users)
› › instrument_name string Unique instrument identifier
› › fee_currency string Currency, i.e "BTC", "ETH", "USDC"
› › direction string Direction: buy, or sell
› › trade_id string Unique (per currency) trade identifier
› › tick_direction integer Direction of the "tick" (0 = Plus Tick, 1 = Zero-Plus Tick, 2 = Minus Tick, 3 = Zero-Minus Tick).
› › profit_loss number Profit and loss in base currency.
› › matching_id string Always null
› › price number Price in base currency
› › reduce_only string true if user order is reduce-only
› › amount number Trade amount. For perpetual and futures - in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› › post_only string true if user order is post-only
› › liquidation string Optional field (only for trades caused by liquidation): "M" when maker side of trade was under liquidation, "T" when taker side was under liquidation, "MT" when both sides of trade were under liquidation
› › combo_trade_id number Optional field containing combo trade identifier if the trade is a combo trade
› › order_id string Id of the user order (maker or taker), i.e. subscriber's order id that took part in the trade
› › block_trade_id string Block trade id - when trade was part of a block trade
› › order_type string Order type: "limit, "market", or "liquidation"
› › quote_set_id string QuoteSet of the user order (optional, present only for orders placed with private/mass_quote)
› › combo_id string Optional field containing combo instrument name if the trade is a combo trade
› › underlying_price number Underlying price for implied volatility calculations (Options only)
› › contracts number Trade size in contract units (optional, may be absent in historical trades)
› › mark_price number Mark Price at the moment of trade
› › iv number Option implied volatility for the price (Option only)
› › state string Order state: "open", "filled", "rejected", "cancelled", "untriggered" or "archive" (if order was archived)
› › advanced string Advanced type of user order: "usd" or "implv" (only for options; omitted if not applicable)
/private/get_user_trades_by_order
var msg =
{
"jsonrpc" : "2.0",
"id" : 3466,
"method" : "private/get_user_trades_by_order",
"params" : {
"order_id" : "ETH-584830574"
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 3466,
"result": [
{
"trade_seq": 1966042,
"trade_id": "ETH-2696068",
"timestamp": 1590480712800,
"tick_direction": 3,
"state": "filled",
"reduce_only": false,
"price": 203.8,
"post_only": false,
"order_type": "market",
"order_id": "ETH-584830574",
"matching_id": null,
"mark_price": 203.78,
"liquidity": "T",
"instrument_name": "ETH-PERPETUAL",
"index_price": 203.89,
"fee_currency": "ETH",
"fee": 0.00036801,
"direction": "buy",
"amount": 100
}
]
}

Retrieve the list of user trades that was created for given order

Scope: trade:read

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
order_id true string The order id
sorting false string asc
desc
default Direction of results sorting (default value means no sorting, results will be returned in order in which they left the database)
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
array of timestamp integer
label string User defined label (presented only when previously set for order by user)
fee number User's fee in units of the specified fee_currency
quote_id string QuoteID of the user order (optional, present only for orders placed with private/mass_quote)
liquidity string Describes what was role of users order: "M" when it was maker order, "T" when it was taker order
index_price number Index Price at the moment of trade
api boolean true if user order was created with API
mmp boolean true if user order is MMP
legs array Optional field containing leg trades if trade is a combo trade (present when querying for only combo trades and in combo_trades events)
trade_seq integer The sequence number of the trade within instrument
risk_reducing boolean true if user order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users)
instrument_name string Unique instrument identifier
fee_currency string Currency, i.e "BTC", "ETH", "USDC"
direction string Direction: buy, or sell
trade_id string Unique (per currency) trade identifier
tick_direction integer Direction of the "tick" (0 = Plus Tick, 1 = Zero-Plus Tick, 2 = Minus Tick, 3 = Zero-Minus Tick).
profit_loss number Profit and loss in base currency.
matching_id string Always null
price number Price in base currency
reduce_only string true if user order is reduce-only
amount number Trade amount. For perpetual and futures - in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
post_only string true if user order is post-only
liquidation string Optional field (only for trades caused by liquidation): "M" when maker side of trade was under liquidation, "T" when taker side was under liquidation, "MT" when both sides of trade were under liquidation
combo_trade_id number Optional field containing combo trade identifier if the trade is a combo trade
order_id string Id of the user order (maker or taker), i.e. subscriber's order id that took part in the trade
block_trade_id string Block trade id - when trade was part of a block trade
order_type string Order type: "limit, "market", or "liquidation"
quote_set_id string QuoteSet of the user order (optional, present only for orders placed with private/mass_quote)
combo_id string Optional field containing combo instrument name if the trade is a combo trade
underlying_price number Underlying price for implied volatility calculations (Options only)
contracts number Trade size in contract units (optional, may be absent in historical trades)
mark_price number Mark Price at the moment of trade
iv number Option implied volatility for the price (Option only)
state string Order state: "open", "filled", "rejected", "cancelled", "untriggered" or "archive" (if order was archived)
advanced string Advanced type of user order: "usd" or "implv" (only for options; omitted if not applicable)
/private/mass_quote
var msg =
{
"jsonrpc" : "2.0",
"id" : 7859,
"method" : "private/mass_quote",
"params" : {
"detailed" : true,
"quote_id" : "1",
"mmp_group" : "default",
"quotes" : [
{
"instrument_name" : "BTC-PERPETUAL",
"quote_set_id" : "futures",
"ask" : {
"price" : 43800,
"amount" : 10
},
"bid" : {
"price" : 43700,
"amount" : 10
}
},
{
"instrument_name" : "BTC-22DEC23-41600-C",
"quote_set_id" : "options",
"ask" : {
"price" : 0.05,
"amount" : 1
},
"bid" : {
"price" : 0.04,
"amount" : 1
}
}
]
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 7859,
"result": {
"errors": [
{
"instrument_name": "BTC-PERPETUAL",
"side": "bid",
"error": {
"message": "price_too_high 43666.4288",
"code": 10007
}
}
],
"orders": [
{
"is_liquidation": false,
"reduce_only": false,
"risk_reducing": false,
"last_update_timestamp": 1703162550180,
"creation_timestamp": 1703162478689,
"filled_amount": 0,
"average_price": 0,
"order_type": "limit",
"order_state": "open",
"quote": true,
"quote_set_id": "options",
"quote_id": "1",
"post_only": false,
"replaced": false,
"mmp_group": "default",
"web": false,
"mmp": true,
"api": false,
"instrument_name": "BTC-22DEC23-41600-C",
"order_id": "6653852",
"max_show": 1,
"time_in_force": "good_til_cancelled",
"price": 0.04,
"direction": "buy",
"amount": 1,
"label": ""
},
{
"is_liquidation": false,
"reduce_only": false,
"risk_reducing": false,
"last_update_timestamp": 1703162550180,
"creation_timestamp": 1703162478689,
"filled_amount": 0,
"average_price": 0,
"order_type": "limit",
"order_state": "open",
"quote": true,
"quote_set_id": "options",
"quote_id": "1",
"post_only": false,
"replaced": false,
"mmp_group": "default",
"web": false,
"mmp": true,
"api": false,
"instrument_name": "BTC-22DEC23-41600-C",
"order_id": "6653853",
"max_show": 1,
"time_in_force": "good_til_cancelled",
"price": 0.05,
"direction": "sell",
"amount": 1,
"label": ""
},
{
"is_liquidation": false,
"reduce_only": false,
"risk_reducing": false,
"last_update_timestamp": 1703162550180,
"creation_timestamp": 1703162478689,
"filled_amount": 0,
"average_price": 0,
"order_type": "limit",
"order_state": "open",
"quote": true,
"quote_set_id": "futures",
"quote_id": "1",
"post_only": false,
"replaced": false,
"mmp_group": "default",
"web": false,
"mmp": true,
"api": false,
"instrument_name": "BTC-PERPETUAL",
"order_id": "6653855",
"max_show": 10,
"time_in_force": "good_til_cancelled",
"price": 43800,
"direction": "sell",
"amount": 10,
"label": ""
}
],
"trades": []
}
}

Place buy and/or sell orders on one or more instruments. This endpoint can only be used after approval from the administrators.

Scope: trade:read_write

Try in API console

This is a private method; it can only be used after authentication.
This is a matching engine method.
Parameters
Parameter Required Type Enum Description
wait_for_response false boolean If false, the response is sent immediately after the risk check. If true, the response is sent after the orders all go through the matching engine. Default - true.
detailed false boolean Flag to receive a list of all order changes and a list of errors, or to only receive a list of errors. Default - false.
quote_id true string Identifier of a mass quote message. Can be used to match trades to requests. We recommend using an incrementing counter.
mmp_group true string Name of the MMP group. An MMP group has to be used and only one quote can exist per instrument per side per MMP group.
valid_until false integer Timestamp, when provided server will start processing request in Matching Engine only before given timestamp, in other cases timed_out error will be responded. Remember that the given timestamp should be consistent with the server's time, use /public/time method to obtain current server time.
quotes true array of objects List of quotes.
› instrument_name true string The name of the instrument.
› quote_set_id true string User-defined label that can be used for targeted cancels using private/cancel_quotes.
› ask false object Order details for the ask. If not provided, bid must be present.
› › price false number The price of this side of the quote. If no price is supplied, only the amount is amended.
› › amount false number The amount of this side of the quote. If no quantity is supplied, only the price is amended.
› › post_only false boolean If true, the order is considered post-only. If the new price would cause the order to be filled immediately (as taker), the price will be changed to be just below the spread. Default - false
› › reject_post_only false boolean If an order is considered post-only and this field is set to true then the order is put to the order book unmodified or the request is rejected. Only valid in combination with "post_only" set to true. Default value - false
› bid false object Order details for the bid. If not provided, ask must be present.
› › price false number The price of this side of the quote. If no price is supplied, only the amount is amended.
› › amount false number The amount of this side of the quote. If no quantity is supplied, only the price is amended.
› › post_only false boolean If true, the order is considered post-only. If the new price would cause the order to be filled immediately (as taker), the price will be changed to be just below the spread. Default - false
› › reject_post_only false boolean If an order is considered post-only and this field is set to true then the order is put to the order book unmodified or the request is rejected. Only valid in combination with "post_only" set to true. Default value - false
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› errors array of object List of errors (present when detailed : true).
› › code int Error code
› › error object Error data.
› › instrument_name string Instrument name.
› › message string Error message.
› › side string Quote side - bid or ask.
› errors_count int Number of errors (present when detailed : false).
› orders array of object
› › reject_post_only boolean true if order has reject_post_only flag (field is present only when post_only is true)
› › label string User defined label (up to 64 characters)
› › quote_id string The same QuoteID as supplied in the private/mass_quote request.
› › order_state string Order state: "open", "filled", "rejected", "cancelled", "untriggered"
› › is_secondary_oto boolean true if the order is an order that can be triggered by another order, otherwise not present.
› › usd number Option price in USD (Only if advanced="usd")
› › implv number Implied volatility in percent. (Only if advanced="implv")
› › trigger_reference_price number The price of the given trigger at the time when the order was placed (Only for trailing trigger orders)
› › original_order_type string Original order type. Optional field
› › oco_ref string Unique reference that identifies a one_cancels_others (OCO) pair.
› › block_trade boolean true if order made from block_trade trade, added only in that case.
› › trigger_price number Trigger price (Only for future trigger orders)
› › api boolean true if created with API
› › mmp boolean true if the order is a MMP order, otherwise false.
› › oto_order_ids array of string The Ids of the orders that will be triggered if the order is filled
› › trigger_order_id string Id of the trigger order that created the order (Only for orders that were created by triggered orders).
› › cancel_reason string Enumerated reason behind cancel "user_request", "autoliquidation", "cancel_on_disconnect", "risk_mitigation", "pme_risk_reduction" (portfolio margining risk reduction), "pme_account_locked" (portfolio margining account locked per currency), "position_locked", "mmp_trigger" (market maker protection), "mmp_config_curtailment" (market maker configured quantity decreased), "edit_post_only_reject" (cancelled on edit because of reject_post_only setting), "oco_other_closed" (the oco order linked to this order was closed), "oto_primary_closed" (the oto primary order that was going to trigger this order was cancelled), "settlement" (closed because of a settlement)
› › primary_order_id string Unique order identifier
› › quote boolean If order is a quote. Present only if true.
› › risk_reducing boolean true if the order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users), otherwise false.
› › filled_amount number Filled amount of the order. For perpetual and futures the filled_amount is in USD units, for options - in units or corresponding cryptocurrency contracts, e.g., BTC or ETH.
› › instrument_name string Unique instrument identifier
› › max_show number Maximum amount within an order to be shown to other traders, 0 for invisible order.
› › app_name string The name of the application that placed the order on behalf of the user (optional).
› › mmp_cancelled boolean true if order was cancelled by mmp trigger (optional)
› › direction string Direction: buy, or sell
› › last_update_timestamp integer The timestamp (milliseconds since the Unix epoch)
› › trigger_offset number The maximum deviation from the price peak beyond which the order will be triggered (Only for trailing trigger orders)
› › mmp_group string Name of the MMP group supplied in the private/mass_quote request.
› › price number or string Price in base currency or "market_price" in case of open trigger market orders
› › is_liquidation boolean Optional (not added for spot). true if order was automatically created during liquidation
› › reduce_only boolean Optional (not added for spot). 'true for reduce-only orders only'
› › amount number It represents the requested order size. For perpetual and futures the amount is in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› › is_primary_otoco boolean true if the order is an order that can trigger an OCO pair, otherwise not present.
› › post_only boolean true for post-only orders only
› › mobile boolean optional field with value true added only when created with Mobile Application
› › trigger_fill_condition string
The fill condition of the linked order (Only for linked order types), default: first_hit.

"first_hit" - any execution of the primary order will fully cancel/place all secondary orders.
"complete_fill" - a complete execution (meaning the primary order no longer exists) will cancel/place the secondary orders.
"incremental" - any fill of the primary order will cause proportional partial cancellation/placement of the secondary order. The amount that will be subtracted/added to the secondary order will be rounded down to the contract size.
› › triggered boolean Whether the trigger order has been triggered
› › order_id string Unique order identifier
› › replaced boolean true if the order was edited (by user or - in case of advanced options orders - by pricing engine), otherwise false.
› › order_type string Order type: "limit", "market", "stop_limit", "stop_market"
› › time_in_force string Order time in force: "good_til_cancelled", "good_til_day", "fill_or_kill" or "immediate_or_cancel"
› › auto_replaced boolean Options, advanced orders only - true if last modification of the order was performed by the pricing engine, otherwise false.
› › quote_set_id string Identifier of the QuoteSet supplied in the private/mass_quote request.
› › contracts number It represents the order size in contract units. (Optional, may be absent in historical data).
› › trigger string Trigger type (only for trigger orders). Allowed values: "index_price", "mark_price", "last_price".
› › web boolean true if created via Deribit frontend (optional)
› › creation_timestamp integer The timestamp (milliseconds since the Unix epoch)
› › is_rebalance boolean Optional (only for spot). true if order was automatically created during cross-collateral balance restoration
› › average_price number Average fill price of the order
› › advanced string advanced type: "usd" or "implv" (Only for options; field is omitted if not applicable).
› pending_requests array of object List of pending quotes (present when wait_for_response: false and detailed : true).
› › instrument_name string Instrument name.
› › side string Quote side - bid or ask.
› pending_requests_count int Number of pending quotes (present when wait_for_response: false and detailed : false).
› trades array of object
› › timestamp integer The timestamp of the trade (milliseconds since the UNIX epoch)
› › label string User defined label (presented only when previously set for order by user)
› › fee number User's fee in units of the specified fee_currency
› › quote_id string QuoteID of the user order (optional, present only for orders placed with private/mass_quote)
› › liquidity string Describes what was role of users order: "M" when it was maker order, "T" when it was taker order
› › index_price number Index Price at the moment of trade
› › api boolean true if user order was created with API
› › mmp boolean true if user order is MMP
› › legs array Optional field containing leg trades if trade is a combo trade (present when querying for only combo trades and in combo_trades events)
› › trade_seq integer The sequence number of the trade within instrument
› › risk_reducing boolean true if user order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users)
› › instrument_name string Unique instrument identifier
› › fee_currency string Currency, i.e "BTC", "ETH", "USDC"
› › direction string Direction: buy, or sell
› › trade_id string Unique (per currency) trade identifier
› › tick_direction integer Direction of the "tick" (0 = Plus Tick, 1 = Zero-Plus Tick, 2 = Minus Tick, 3 = Zero-Minus Tick).
› › profit_loss number Profit and loss in base currency.
› › matching_id string Always null
› › price number Price in base currency
› › reduce_only string true if user order is reduce-only
› › amount number Trade amount. For perpetual and futures - in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› › post_only string true if user order is post-only
› › liquidation string Optional field (only for trades caused by liquidation): "M" when maker side of trade was under liquidation, "T" when taker side was under liquidation, "MT" when both sides of trade were under liquidation
› › combo_trade_id number Optional field containing combo trade identifier if the trade is a combo trade
› › order_id string Id of the user order (maker or taker), i.e. subscriber's order id that took part in the trade
› › block_trade_id string Block trade id - when trade was part of a block trade
› › order_type string Order type: "limit, "market", or "liquidation"
› › quote_set_id string QuoteSet of the user order (optional, present only for orders placed with private/mass_quote)
› › combo_id string Optional field containing combo instrument name if the trade is a combo trade
› › underlying_price number Underlying price for implied volatility calculations (Options only)
› › contracts number Trade size in contract units (optional, may be absent in historical trades)
› › mark_price number Mark Price at the moment of trade
› › iv number Option implied volatility for the price (Option only)
› › state string Order state: "open", "filled", "rejected", "cancelled", "untriggered" or "archive" (if order was archived)
› › advanced string Advanced type of user order: "usd" or "implv" (only for options; omitted if not applicable)
/private/reset_mmp
var msg =
{
"jsonrpc" : "2.0",
"id" : 7859,
"method" : "private/reset_mmp",
"params" : {
"index_name" : "btc_usd",
"mmp_group" : "MassQuoteBot7"
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"result": "ok"
}

Reset MMP

Scope: trade:read_write

Try in API console

This is a private method; it can only be used after authentication.
This is a matching engine method.
Parameters
Parameter Required Type Enum Description
index_name true string btc_usd
eth_usd
btc_usdc
eth_usdc
ada_usdc
algo_usdc
avax_usdc
bch_usdc
doge_usdc
dot_usdc
link_usdc
ltc_usdc
matic_usdc
near_usdc
shib_usdc
sol_usdc
trx_usdc
uni_usdc
xrp_usdc
ada_usdt
algo_usdt
avax_usdt
bch_usdt
bnb_usdt
bnb_usdt
btc_usdt
btc_usdt
doge_usdt
dot_usdt
eth_usdt
eth_usdt
link_usdt
ltc_usdt
luna_usdt
matic_usdt
near_usdt
shib_usdt
sol_usdt
trx_usdt
uni_usdt
xrp_usdt
btcdvol_usdc
ethdvol_usdc Index identifier of derivative instrument on the platform
mmp_group false string Specifies the MMP group for which limits are being reset. If this parameter is omitted, the endpoint resets the traditional (no group) MMP limits
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result string Result of method execution. ok in case of success
/private/send_rfq
var msg =
{
"jsonrpc" : "2.0",
"id" : 8352,
"method" : "private/send_rfq",
"params" : {
"instrument_name" : "BTC-PERPETUAL",
"amount" : 10000,
"side" : "sell"
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"result": "ok"
}

Sends RFQ on a given instrument.

Scope: trade:read_write

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
instrument_name true string Instrument name
amount false number Amount
side false string buy
sell Side - buy or sell
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result string Result of method execution. ok in case of success
/private/set_mmp_config
var msg =
{
"jsonrpc" : "2.0",
"id" : 7859,
"method" : "private/set_mmp_config",
"params" : {
"index_name" : "btc_usd",
"mmp_group" : "MassQuoteBot7",
"interval" : 60,
"frozen_time" : 0,
"quantity_limit" : 3.0
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 7859,
"method": "private/set_mmp_config",
"result": {
"index_name": "btc_usd",
"mmp_group": "MassQuoteBot7",
"interval" : 60,
"frozen_time": 0,
"quantity_limit": 3.0
}
}

Set config for MMP - triggers MMP reset

Scope: trade:read_write

Try in API console

This is a private method; it can only be used after authentication.
This is a matching engine method.
Parameters
Parameter Required Type Enum Description
index_name true string btc_usd
eth_usd
btc_usdc
eth_usdc
ada_usdc
algo_usdc
avax_usdc
bch_usdc
doge_usdc
dot_usdc
link_usdc
ltc_usdc
matic_usdc
near_usdc
shib_usdc
sol_usdc
trx_usdc
uni_usdc
xrp_usdc
ada_usdt
algo_usdt
avax_usdt
bch_usdt
bnb_usdt
bnb_usdt
btc_usdt
btc_usdt
doge_usdt
dot_usdt
eth_usdt
eth_usdt
link_usdt
ltc_usdt
luna_usdt
matic_usdt
near_usdt
shib_usdt
sol_usdt
trx_usdt
uni_usdt
xrp_usdt
btcdvol_usdc
ethdvol_usdc Index identifier of derivative instrument on the platform
interval true integer MMP Interval in seconds, if set to 0 MMP is removed
frozen_time true integer MMP frozen time in seconds, if set to 0 manual reset is required
mmp_group false string Designates the MMP group for which the configuration is being set. If the specified group is already associated with a different index_name, an error is returned. This parameter enables distinct configurations for each MMP group, linked to particular index_name
quantity_limit false number Quantity limit, positive value
delta_limit false number Delta limit, positive value
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result array of object
› delta_limit number Delta limit
› frozen_time integer MMP frozen time in seconds, if set to 0 manual reset is required
› index_name string Index identifier, matches (base) cryptocurrency with quote currency
› interval integer MMP Interval in seconds, if set to 0 MMP is disabled
› mmp_group string Specified MMP Group
› quantity_limit number Quantity limit
/private/get_settlement_history_by_instrument
var msg =
{
"jsonrpc" : "2.0",
"id" : 2192,
"method" : "private/get_settlement_history_by_instrument",
"params" : {
"instrument_name" : "ETH-22FEB19",
"type" : "settlement",
"count" : 1
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 2192,
"result": {
"settlements": [
{
"type": "settlement",
"timestamp": 1550475692526,
"session_profit_loss": 0.038358299,
"profit_loss": -0.001783937,
"position": -66,
"mark_price": 121.67,
"instrument_name": "ETH-22FEB19",
"index_price": 119.8
}
],
"continuation": "xY7T6cusbMBNpH9SNmKb94jXSBxUPojJEdCPL4YociHBUgAhWQvEP"
}
}
Retrieves public settlement, delivery and bankruptcy events filtered by instrument name

Scope: trade:read

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
instrument_name true string Instrument name
type false string settlement
delivery
bankruptcy Settlement type
count false integer Number of requested items, default - 20
continuation false string Continuation token for pagination
search_start_timestamp false integer The latest timestamp to return result from (milliseconds since the UNIX epoch)
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› continuation string Continuation token for pagination.
› settlements array of object
› › funded number funded amount (bankruptcy only)
› › funding number funding (in base currency ; settlement for perpetual product only)
› › index_price number underlying index price at time of event (in quote currency; settlement and delivery only)
› › instrument_name string instrument name (settlement and delivery only)
› › mark_price number mark price for at the settlement time (in quote currency; settlement and delivery only)
› › position number position size (in quote currency; settlement and delivery only)
› › profit_loss number profit and loss (in base currency; settlement and delivery only)
› › session_bankruptcy number value of session bankruptcy (in base currency; bankruptcy only)
› › session_profit_loss number total value of session profit and losses (in base currency)
› › session_tax number total amount of paid taxes/fees (in base currency; bankruptcy only)
› › session_tax_rate number rate of paid taxes/fees (in base currency; bankruptcy only)
› › socialized number the amount of the socialized losses (in base currency; bankruptcy only)
› › timestamp integer The timestamp (milliseconds since the Unix epoch)
› › type string The type of settlement. settlement, delivery or bankruptcy.
/private/get_settlement_history_by_currency
var msg =
{
"jsonrpc" : "2.0",
"id" : 8304,
"method" : "private/get_settlement_history_by_currency",
"params" : {
"currency" : "BTC",
"type" : "delivery",
"count" : 1
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 6074,
"result": {
"settlements": [
{
"type": "delivery",
"timestamp": 1550242800013,
"session_profit_loss": 1.567969302,
"profit_loss": -0.251617338,
"position": 13,
"mark_price": 0.121679828,
"instrument_name": "BTC-15FEB19-4000-P",
"index_price": 3566.08
}
],
"continuation": "AHmpC39UH5EeGVjryrf731YEhjL16oqCQorSvBFZFAbbwvCN7GCbMFgno7U5JKW"
}
}
Retrieves settlement, delivery and bankruptcy events that have affected your account.

Scope: trade:read

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
currency true string BTC
ETH
USDC
USDT
EURR The currency symbol
type false string settlement
delivery
bankruptcy Settlement type
count false integer Number of requested items, default - 20
continuation false string Continuation token for pagination
search_start_timestamp false integer The latest timestamp to return result from (milliseconds since the UNIX epoch)
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› continuation string Continuation token for pagination.
› settlements array of object
› › funded number funded amount (bankruptcy only)
› › funding number funding (in base currency ; settlement for perpetual product only)
› › index_price number underlying index price at time of event (in quote currency; settlement and delivery only)
› › instrument_name string instrument name (settlement and delivery only)
› › mark_price number mark price for at the settlement time (in quote currency; settlement and delivery only)
› › position number position size (in quote currency; settlement and delivery only)
› › profit_loss number profit and loss (in base currency; settlement and delivery only)
› › session_bankruptcy number value of session bankruptcy (in base currency; bankruptcy only)
› › session_profit_loss number total value of session profit and losses (in base currency)
› › session_tax number total amount of paid taxes/fees (in base currency; bankruptcy only)
› › session_tax_rate number rate of paid taxes/fees (in base currency; bankruptcy only)
› › socialized number the amount of the socialized losses (in base currency; bankruptcy only)
› › timestamp integer The timestamp (milliseconds since the Unix epoch)
› › type string The type of settlement. settlement, delivery or bankruptcy.
Combo Books
/public/get_combo_details
var msg =
{
"method" : "public/get_combo_details",
"params" : {
"combo_id" : "BTC-FS-29APR22_PERP"
},
"jsonrpc" : "2.0",
"id" : 3
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 3,
"result": {
"state_timestamp": 1650620605150,
"state": "active",
"legs": [
{
"instrument_name": "BTC-PERPETUAL",
"amount": -1
},
{
"instrument_name": "BTC-29APR22",
"amount": 1
}
],
"id": "BTC-FS-29APR22_PERP",
"instrument_id": 27,
"creation_timestamp": 1650620575000
}
}

Retrieves information about a combo

Try in API console

Parameters
Parameter Required Type Enum Description
combo_id true string Combo ID
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› creation_timestamp integer The timestamp (milliseconds since the Unix epoch)
› id string Unique combo identifier
› instrument_id integer Instrument ID
› legs array of object
› › amount integer Size multiplier of a leg. A negative value indicates that the trades on given leg are in opposite direction to the combo trades they originate from
› › instrument_name string Unique instrument identifier
› state string Combo state: "rfq", "active", "inactive"
› state_timestamp integer The timestamp (milliseconds since the Unix epoch)
/public/get_combo_ids
var msg =
{
"method" : "public/get_combo_ids",
"params" : {
"currency" : "BTC",
"state" : "active"
},
"jsonrpc" : "2.0",
"id" : 1
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 1,
"result": [
"BTC-CS-29APR22-39300_39600",
"BTC-FS-29APR22_PERP"
]
}

Retrieves available combos. This method can be used to get the list of all combos, or only the list of combos in the given state.

Try in API console

Parameters
Parameter Required Type Enum Description
currency true string BTC
ETH
USDC
USDT
EURR The currency symbol
state false string rfq
active
inactive Combo state, if not provided combos of all states are considered
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result array of string Unique combo identifier
/public/get_combos
var msg =
{
"method" : "public/get_combos",
"params" : {
"currency" : "BTC"
},
"jsonrpc" : "2.0",
"id" : 2
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 2,
"result": [
{
"state_timestamp": 1650636265101,
"state": "active",
"legs": [
{
"instrument_name": "BTC-29APR22-39300-C",
"amount": 1
},
{
"instrument_name": "BTC-29APR22-39600-C",
"amount": -1
}
],
"id": "BTC-CS-29APR22-39300_39600",
"instrument_id": 28,
"creation_timestamp": 1650636235000
},
{
"state_timestamp": 1650620605150,
"state": "active",
"legs": [
{
"instrument_name": "BTC-PERPETUAL",
"amount": -1
},
{
"instrument_name": "BTC-29APR22",
"amount": 1
}
],
"id": "BTC-FS-29APR22_PERP",
"instrument_id": 27,
"creation_timestamp": 1650620575000
}
]
}

Retrieves information about active combos

Try in API console

Parameters
Parameter Required Type Enum Description
currency true string BTC
ETH
USDC
USDT
EURR
any The currency symbol or "any" for all
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result array of object
› creation_timestamp integer The timestamp (milliseconds since the Unix epoch)
› id string Unique combo identifier
› instrument_id integer Instrument ID
› legs array of object
› › amount integer Size multiplier of a leg. A negative value indicates that the trades on given leg are in opposite direction to the combo trades they originate from
› › instrument_name string Unique instrument identifier
› state string Combo state: "rfq", "active", "inactive"
› state_timestamp integer The timestamp (milliseconds since the Unix epoch)
/private/create_combo
var msg =
{
"method" : "private/create_combo",
"params" : {
"trades" : [
{
"instrument_name" : "BTC-29APR22-37500-C",
"amount" : "1",
"direction" : "buy"
},
{
"instrument_name" : "BTC-29APR22-37500-P",
"amount" : "1",
"direction" : "sell"
}
]
},
"jsonrpc" : "2.0",
"id" : 6
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 6,
"result": {
"state_timestamp": 1650960943922,
"state": "rfq",
"legs": [
{
"instrument_name": "BTC-29APR22-37500-C",
"amount": 1
},
{
"instrument_name": "BTC-29APR22-37500-P",
"amount": -1
}
],
"id": "BTC-REV-29APR22-37500",
"instrument_id": 52,
"creation_timestamp": 1650960943000
}
}

Verifies and creates a combo book or returns an existing combo matching given trades

Scope: trade:read_write

Try in API console

This is a private method; it can only be used after authentication.
This is a matching engine method.
Parameters
Parameter Required Type Enum Description
trades true array of objects List of trades used to create a combo
› instrument_name true string Instrument name
› amount false number It represents the requested trade size. For perpetual and futures the amount is in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH
› direction true string buy
sell Direction of trade from the maker perspective
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› creation_timestamp integer The timestamp (milliseconds since the Unix epoch)
› id string Unique combo identifier
› instrument_id integer Instrument ID
› legs array of object
› › amount integer Size multiplier of a leg. A negative value indicates that the trades on given leg are in opposite direction to the combo trades they originate from
› › instrument_name string Unique instrument identifier
› state string Combo state: "rfq", "active", "inactive"
› state_timestamp integer The timestamp (milliseconds since the Unix epoch)
Block Trade
/private/approve_block_trade
var msg =
{
"method" : "private/approve_block_trade",
"params" : {
"timestamp" : 1711468813551,
"nonce" : "bt-468nha",
"role" : "maker"
},
"jsonrpc" : "2.0",
"id" : 1
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"result": "ok"
}

Used to approve a pending block trade. nonce and timestamp are used to identify the block trade while role should be opposite to the trading counterparty.

To use a block trade approval feature the additional API key setting feature called: enabled_features: block_trade_approval is required. This key has to be given to broker/registered partner who performs the trades on behalf of the user for the feature to be active. If the user wants to approve the trade, he has to approve it from different API key with doesn't have this feature enabled.

Scope: block_trade:read_write

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
timestamp true integer Timestamp, shared with other party (milliseconds since the UNIX epoch)
nonce true string Nonce, shared with other party
role true string maker
taker Describes if user wants to be maker or taker of trades
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result string Result of method execution. ok in case of success
/private/execute_block_trade
var msg =
{
"jsonrpc" : "2.0",
"method" : "private/execute_block_trade",
"params" : {
"nonce" : "bszyprbq",
"timestamp" : 1590485535899,
"role" : "maker",
"trades" : [
{
"instrument_name" : "BTC-PERPETUAL",
"direction" : "sell",
"price" : 8900.0,
"amount" : 200000
},
{
"instrument_name" : "BTC-28MAY20-9000-C",
"direction" : "sell",
"amount" : 5.0,
"price" : 0.0133
}
],
"counterparty_signature" : "1590485595899.1Mn52L_Q.lNyNBzXXo-\_QBT_wDuMgnhA7uS9tBqdQ5TLN6rxbuoAiQhyaJYGJrm5IV_9enp9niY_x8D60AJLm3yEKPUY1Dv3T0TW0n5-ADPpJF7Fpj0eVDZpZ6QCdX8snBWrSJ0TtqevnO64RCBlN1dIm2T70PP9dlhiqPDAUYI4fpB1vLYI"
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc":"2.0",
"result":{
"trades":[
{
"trade_seq":30289730,
"trade_id":"48079573",
"timestamp":1590485535978,
"tick_direction":0,
"state":"filled",
"reduce_only":false,
"price":8900.0,
"post_only":false,
"order_type":"limit",
"order_id":"4009043192",
"matching_id":"None",
"mark_price":8895.19,
"liquidity":"M",
"instrument_name":"BTC-PERPETUAL",
"index_price":8900.45,
"fee_currency":"BTC",
"fee":-0.00561798,
"direction":"sell",
"block_trade_id":"6165",
"amount":200000.0
},
{
"underlying_price":8902.86,
"trade_seq":1,
"trade_id":"48079574",
"timestamp":1590485535979,
"tick_direction":1,
"state":"filled",
"reduce_only":false,
"price":0.0133,
"post_only":false,
"order_type":"limit",
"order_id":"4009043194",
"matching_id":"None",
"mark_price":0.01831619,
"liquidity":"M",
"iv":62.44,
"instrument_name":"BTC-28MAY20-9000-C",
"index_price":8900.45,
"fee_currency":"BTC",
"fee":0.002,
"direction":"sell",
"block_trade_id":"6165",
"amount":5.0
}
],
"timestamp":1590485535980,
"id":"6165"
}
}

Creates block trade

The whole request have to be exact the same as in private/verify_block_trade, only role field should be set appropriately - it basically means that both sides have to agree on the same timestamp, nonce, trades fields and server will assure that role field is different between sides (each party accepted own role).

Using the same timestamp and nonce by both sides in private/verify_block_trade assures that even if unintentionally both sides execute given block trade with valid counterparty_signature, the given block trade will be executed only once.

Scope: block_trade:read_write

Try in API console

This is a private method; it can only be used after authentication.
This is a matching engine method.
Parameters
Parameter Required Type Enum Description
timestamp true integer Timestamp, shared with other party (milliseconds since the UNIX epoch)
nonce true string Nonce, shared with other party
role true string maker
taker Describes if user wants to be maker or taker of trades
trades true array of objects List of trades for block trade
› instrument_name true string Instrument name
› price true number Price for trade
› amount false number It represents the requested trade size. For perpetual and futures the amount is in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH
› direction true string buy
sell Direction of trade from the maker perspective
counterparty_signature true string Signature of block trade generated by private/verify_block_trade_method
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› app_name string The name of the application that executed the block trade on behalf of the user (optional).
› id string Block trade id
› timestamp integer The timestamp (milliseconds since the Unix epoch)
› trades array of object
› › timestamp integer The timestamp of the trade (milliseconds since the UNIX epoch)
› › label string User defined label (presented only when previously set for order by user)
› › fee number User's fee in units of the specified fee_currency
› › quote_id string QuoteID of the user order (optional, present only for orders placed with private/mass_quote)
› › liquidity string Describes what was role of users order: "M" when it was maker order, "T" when it was taker order
› › index_price number Index Price at the moment of trade
› › api boolean true if user order was created with API
› › mmp boolean true if user order is MMP
› › legs array Optional field containing leg trades if trade is a combo trade (present when querying for only combo trades and in combo_trades events)
› › trade_seq integer The sequence number of the trade within instrument
› › risk_reducing boolean true if user order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users)
› › instrument_name string Unique instrument identifier
› › fee_currency string Currency, i.e "BTC", "ETH", "USDC"
› › direction string Direction: buy, or sell
› › trade_id string Unique (per currency) trade identifier
› › tick_direction integer Direction of the "tick" (0 = Plus Tick, 1 = Zero-Plus Tick, 2 = Minus Tick, 3 = Zero-Minus Tick).
› › profit_loss number Profit and loss in base currency.
› › matching_id string Always null
› › price number Price in base currency
› › reduce_only string true if user order is reduce-only
› › amount number Trade amount. For perpetual and futures - in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› › post_only string true if user order is post-only
› › liquidation string Optional field (only for trades caused by liquidation): "M" when maker side of trade was under liquidation, "T" when taker side was under liquidation, "MT" when both sides of trade were under liquidation
› › combo_trade_id number Optional field containing combo trade identifier if the trade is a combo trade
› › order_id string Id of the user order (maker or taker), i.e. subscriber's order id that took part in the trade
› › block_trade_id string Block trade id - when trade was part of a block trade
› › order_type string Order type: "limit, "market", or "liquidation"
› › quote_set_id string QuoteSet of the user order (optional, present only for orders placed with private/mass_quote)
› › combo_id string Optional field containing combo instrument name if the trade is a combo trade
› › underlying_price number Underlying price for implied volatility calculations (Options only)
› › contracts number Trade size in contract units (optional, may be absent in historical trades)
› › mark_price number Mark Price at the moment of trade
› › iv number Option implied volatility for the price (Option only)
› › state string Order state: "open", "filled", "rejected", "cancelled", "untriggered" or "archive" (if order was archived)
› › advanced string Advanced type of user order: "usd" or "implv" (only for options; omitted if not applicable)
/private/get_block_trade
var msg =
{
"method" : "private/get_block_trade",
"params" : {
"id" : "61"
},
"jsonrpc" : "2.0"
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"result": {
"trades": [
{
"trade_seq": 37,
"trade_id": "92437",
"timestamp": 1565089523719,
"tick_direction": 3,
"state": "filled",
"price": 0.0001,
"order_type": "limit",
"order_id": "343062",
"matching_id": null,
"liquidity": "T",
"iv": 0,
"instrument_name": "BTC-9AUG19-10250-C",
"index_price": 11738,
"fee_currency": "BTC",
"fee": 0.00025,
"direction": "sell",
"block_trade_id": "61",
"amount": 10
},
{
"trade_seq": 25350,
"trade_id": "92435",
"timestamp": 1565089523719,
"tick_direction": 3,
"state": "filled",
"price": 11590,
"order_type": "limit",
"order_id": "343058",
"matching_id": null,
"liquidity": "T",
"instrument_name": "BTC-PERPETUAL",
"index_price": 11737.98,
"fee_currency": "BTC",
"fee": 0.00000164,
"direction": "buy",
"block_trade_id": "61",
"amount": 190
}
],
"timestamp": 1565089523720,
"id": "61"
}
}

Returns information about the users block trade

Scope: block_trade:read

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
id true string Block trade id
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› app_name string The name of the application that executed the block trade on behalf of the user (optional).
› id string Block trade id
› timestamp integer The timestamp (milliseconds since the Unix epoch)
› trades array of object
› › timestamp integer The timestamp of the trade (milliseconds since the UNIX epoch)
› › label string User defined label (presented only when previously set for order by user)
› › fee number User's fee in units of the specified fee_currency
› › quote_id string QuoteID of the user order (optional, present only for orders placed with private/mass_quote)
› › liquidity string Describes what was role of users order: "M" when it was maker order, "T" when it was taker order
› › index_price number Index Price at the moment of trade
› › api boolean true if user order was created with API
› › mmp boolean true if user order is MMP
› › legs array Optional field containing leg trades if trade is a combo trade (present when querying for only combo trades and in combo_trades events)
› › trade_seq integer The sequence number of the trade within instrument
› › risk_reducing boolean true if user order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users)
› › instrument_name string Unique instrument identifier
› › fee_currency string Currency, i.e "BTC", "ETH", "USDC"
› › direction string Direction: buy, or sell
› › trade_id string Unique (per currency) trade identifier
› › tick_direction integer Direction of the "tick" (0 = Plus Tick, 1 = Zero-Plus Tick, 2 = Minus Tick, 3 = Zero-Minus Tick).
› › profit_loss number Profit and loss in base currency.
› › matching_id string Always null
› › price number Price in base currency
› › reduce_only string true if user order is reduce-only
› › amount number Trade amount. For perpetual and futures - in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› › post_only string true if user order is post-only
› › liquidation string Optional field (only for trades caused by liquidation): "M" when maker side of trade was under liquidation, "T" when taker side was under liquidation, "MT" when both sides of trade were under liquidation
› › combo_trade_id number Optional field containing combo trade identifier if the trade is a combo trade
› › order_id string Id of the user order (maker or taker), i.e. subscriber's order id that took part in the trade
› › block_trade_id string Block trade id - when trade was part of a block trade
› › order_type string Order type: "limit, "market", or "liquidation"
› › quote_set_id string QuoteSet of the user order (optional, present only for orders placed with private/mass_quote)
› › combo_id string Optional field containing combo instrument name if the trade is a combo trade
› › underlying_price number Underlying price for implied volatility calculations (Options only)
› › contracts number Trade size in contract units (optional, may be absent in historical trades)
› › mark_price number Mark Price at the moment of trade
› › iv number Option implied volatility for the price (Option only)
› › state string Order state: "open", "filled", "rejected", "cancelled", "untriggered" or "archive" (if order was archived)
› › advanced string Advanced type of user order: "usd" or "implv" (only for options; omitted if not applicable)
/private/get_last_block_trades_by_currency
var msg =
{
"method" : "private/get_last_block_trades_by_currency",
"params" : {
"currency" : "BTC",
"count" : 1
},
"jsonrpc" : "2.0"
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"result": [
{
"trades": [
{
"trade_seq": 4,
"trade_id": "92462",
"timestamp": 1565093070164,
"tick_direction": 2,
"state": "filled",
"price": 0.0151,
"order_type": "limit",
"order_id": "343121",
"matching_id": null,
"liquidity": "M",
"iv": 72.38,
"instrument_name": "BTC-9AUG19-11500-P",
"index_price": 11758.65,
"fee_currency": "BTC",
"fee": 0,
"direction": "sell",
"block_trade_id": "66",
"amount": 2.3
},
{
"trade_seq": 41,
"trade_id": "92460",
"timestamp": 1565093070164,
"tick_direction": 2,
"state": "filled",
"price": 11753,
"order_type": "limit",
"order_id": "343117",
"matching_id": null,
"liquidity": "M",
"instrument_name": "BTC-9AUG19",
"index_price": 11758.65,
"fee_currency": "BTC",
"fee": 0,
"direction": "sell",
"block_trade_id": "66",
"amount": 50
}
],
"timestamp": 1565093070165,
"id": "66"
}
]
}

Returns list of last users block trades

Scope: block_trade:read

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
currency true string BTC
ETH
USDC
USDT
EURR The currency symbol
count false integer Number of requested items, default - 20
start_id false string Response will contain block trades older than the one provided in this field
end_id false string The id of the oldest block trade to be returned, start_id is required with end_id
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result array of object
› app_name string The name of the application that executed the block trade on behalf of the user (optional).
› id string Block trade id
› timestamp integer The timestamp (milliseconds since the Unix epoch)
› trades array of object
› › timestamp integer The timestamp of the trade (milliseconds since the UNIX epoch)
› › label string User defined label (presented only when previously set for order by user)
› › fee number User's fee in units of the specified fee_currency
› › quote_id string QuoteID of the user order (optional, present only for orders placed with private/mass_quote)
› › liquidity string Describes what was role of users order: "M" when it was maker order, "T" when it was taker order
› › index_price number Index Price at the moment of trade
› › api boolean true if user order was created with API
› › mmp boolean true if user order is MMP
› › legs array Optional field containing leg trades if trade is a combo trade (present when querying for only combo trades and in combo_trades events)
› › trade_seq integer The sequence number of the trade within instrument
› › risk_reducing boolean true if user order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users)
› › instrument_name string Unique instrument identifier
› › fee_currency string Currency, i.e "BTC", "ETH", "USDC"
› › direction string Direction: buy, or sell
› › trade_id string Unique (per currency) trade identifier
› › tick_direction integer Direction of the "tick" (0 = Plus Tick, 1 = Zero-Plus Tick, 2 = Minus Tick, 3 = Zero-Minus Tick).
› › profit_loss number Profit and loss in base currency.
› › matching_id string Always null
› › price number Price in base currency
› › reduce_only string true if user order is reduce-only
› › amount number Trade amount. For perpetual and futures - in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› › post_only string true if user order is post-only
› › liquidation string Optional field (only for trades caused by liquidation): "M" when maker side of trade was under liquidation, "T" when taker side was under liquidation, "MT" when both sides of trade were under liquidation
› › combo_trade_id number Optional field containing combo trade identifier if the trade is a combo trade
› › order_id string Id of the user order (maker or taker), i.e. subscriber's order id that took part in the trade
› › block_trade_id string Block trade id - when trade was part of a block trade
› › order_type string Order type: "limit, "market", or "liquidation"
› › quote_set_id string QuoteSet of the user order (optional, present only for orders placed with private/mass_quote)
› › combo_id string Optional field containing combo instrument name if the trade is a combo trade
› › underlying_price number Underlying price for implied volatility calculations (Options only)
› › contracts number Trade size in contract units (optional, may be absent in historical trades)
› › mark_price number Mark Price at the moment of trade
› › iv number Option implied volatility for the price (Option only)
› › state string Order state: "open", "filled", "rejected", "cancelled", "untriggered" or "archive" (if order was archived)
› › advanced string Advanced type of user order: "usd" or "implv" (only for options; omitted if not applicable)
/private/get_pending_block_trades
var msg =
{
"method" : "private/get_pending_block_trades",
"params" : {

},
"jsonrpc" : "2.0",
"id" : 6
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 6,
"result": [
{
"nonce": "bt-468nha",
"app_name": "test",
"trades": [
{
"instrument_name": "BTC-PERPETUAL",
"price": 70246.66,
"direction": "buy",
"amount": 10
}
],
"role": "maker",
"user_id": 7,
"state": {
"value": "initial",
"timestamp": 1711468813552
},
"timestamp": 1711468813551
}
]
}

Provides a list of pending block trade approvals. timestamp and nonce received in response can be used to approve or reject the pending block trade.

To use a block trade approval feature the additional API key setting feature called: enabled_features: block_trade_approval is required. This key has to be given to broker/registered partner who performs the trades on behalf of the user for the feature to be active. If the user wants to approve the trade, he has to approve it from different API key with doesn't have this feature enabled.

Scope: block_trade:read

Try in API console

This is a private method; it can only be used after authentication.
Parameters
This method takes no parameters

Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result array of object
› app_name string The name of the application that executed the block trade on behalf of the user (optional).
› counterparty_state object State of the pending block trade for the other party (optional).
› › timestamp integer State timestamp.
› › value string State value.
› nonce string Nonce that can be used to approve or reject pending block trade.
› role string Trade role of the user: maker or taker
› state object State of the pending block trade for current user.
› › timestamp integer State timestamp.
› › value string State value.
› timestamp integer Timestamp that can be used to approve or reject pending block trade.
› trades array of object
› › amount number Trade amount. For perpetual and futures - in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› › direction string Direction: buy, or sell
› › instrument_name string Unique instrument identifier
› › price number Price in base currency
› user_id integer Unique user identifier
/private/invalidate_block_trade_signature
var msg =
{
"jsonrpc" : "2.0",
"method" : "private/invalidate_block_trade_signature",
"params" : {
"signature" : "1565173369982.1M9tO0Q-.z9n9WyZUU5op9pEz6Jtd2CI71QxQMMsCZAexnIfK9HQRT1pKH3clxeIbY7Bqm-yMcWIoE3IfCDPW5VEdiN-6oS0YkKUyXPD500MUf3ULKhfkmH81EZs"
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc":"2.0",
"result":"ok"
}
User at any time (before the private/execute_block_trade is called) can invalidate its own signature effectively cancelling block trade

Scope: block_trade:read_write

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
signature true string Signature of block trade that will be invalidated
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result string Result of method execution. ok in case of success
/private/move_positions
var msg =
{
"method" : "private/move_positions",
"params" : {
"currency" : "BTC",
"source_uid" : 3,
"target_uid" : 23,
"trades" : [
{
"instrument_name" : "BTC-PERPETUAL",
"price" : "35800",
"amount" : "110"
},
{
"instrument_name" : "BTC-28JAN22-32500-C",
"amount" : "0.1"
}
]
},
"jsonrpc" : "2.0",
"id" : 3
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 3,
"result": [
{
"target_uid": 23,
"source_uid": 3,
"price": 0.1223,
"instrument_name": "BTC-28JAN22-32500-C",
"direction": "sell",
"amount": 0.1
},
{
"target_uid": 23,
"source_uid": 3,
"price": 35800,
"instrument_name": "BTC-PERPETUAL",
"direction": "buy",
"amount": 110
}
]
}

Moves positions from source subaccount to target subaccount

Scope: block_trade:read_write

Try in API console

This is a private method; it can only be used after authentication.
This is a matching engine method.
Parameters
Parameter Required Type Enum Description
currency false string BTC
ETH
USDC
USDT
EURR The currency symbol
source_uid true integer Id of source subaccount. Can be found in My Account >> Subaccounts tab
target_uid true integer Id of target subaccount. Can be found in My Account >> Subaccounts tab
trades true array of objects List of trades for position move
› instrument_name true string Instrument name
› price false number Price for trade - if not provided average price of the position is used
› amount true number It represents the requested trade size. For perpetual and futures the amount is in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH. Amount can't exceed position size.
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› trades array of object
› › amount number Trade amount. For perpetual and futures - in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› › direction string Direction: buy, or sell
› › instrument_name string Unique instrument identifier
› › price number Price in base currency
› › source_uid integer Trade source uid
› › target_uid integer Trade target uid
/private/reject_block_trade
var msg =
{
"method" : "private/reject_block_trade",
"params" : {
"timestamp" : 1711468813551,
"nonce" : "bt-468nha",
"role" : "maker"
},
"jsonrpc" : "2.0",
"id" : 1
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"result": "ok"
}

Used to reject a pending block trade. nonce and timestamp are used to identify the block trade while role should be opposite to the trading counterparty.

To use a block trade approval feature the additional API key setting feature called: enabled_features: block_trade_approval is required. This key has to be given to broker/registered partner who performs the trades on behalf of the user for the feature to be active. If the user wants to approve the trade, he has to approve it from different API key with doesn't have this feature enabled.

Scope: block_trade:read_write

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
timestamp true integer Timestamp, shared with other party (milliseconds since the UNIX epoch)
nonce true string Nonce, shared with other party
role true string maker
taker Describes if user wants to be maker or taker of trades
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result string Result of method execution. ok in case of success
/private/simulate_block_trade
var msg =
{
"jsonrpc" : "2.0",
"method" : "private/simulate_block_trade",
"params" : {
"role" : "maker",
"trades" : [
{
"instrument_name" : "BTC-PERPETUAL",
"direction" : "buy",
"price" : 11624,
"amount" : 40
},
{
"instrument_name" : "BTC-9AUG19-10250-P",
"direction" : "buy",
"amount" : 1.2,
"price" : 0.0707
}
]
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc":"2.0",
"result":true
}

Checks if a block trade can be executed

Scope: block_trade:read

Try in API console

This is a private method; it can only be used after authentication.
This is a matching engine method.
Parameters
Parameter Required Type Enum Description
role false string maker
taker Describes if user wants to be maker or taker of trades
trades true array of objects List of trades for block trade
› instrument_name true string Instrument name
› price true number Price for trade
› amount false number It represents the requested trade size. For perpetual and futures the amount is in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH
› direction true string buy
sell Direction of trade from the maker perspective
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result boolean true if block trade can be executed, false otherwise
/private/verify_block_trade
var msg =
{
"jsonrpc" : "2.0",
"method" : "private/verify_block_trade",
"params" : {
"nonce" : "okpdjkdo",
"timestamp" : 1565172650935,
"role" : "maker",
"trades" : [
{
"instrument_name" : "BTC-PERPETUAL",
"direction" : "buy",
"price" : 11624,
"amount" : 40
},
{
"instrument_name" : "BTC-9AUG19-10250-P",
"direction" : "buy",
"amount" : 1.2,
"price" : 0.0707
}
]
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc":"2.0",
"result":{
"signature":"1565172710935.1ESE83qh.g6fbgRd4VWagaJz7xdi2WaV-q-d3J0njoz1jZavuRudZJZif9uH8XdUAx1LHsu0E3e0ZG_xe1UPYlwo41xRVrkWU6OMgygDRafUkEmBuk9iLqjc9rh4"
}
}
Verifies and creates block trade signature

Scope: block_trade:read

Try in API console

This is a private method; it can only be used after authentication.
This is a matching engine method.
Parameters
Parameter Required Type Enum Description
timestamp true integer Timestamp, shared with other party (milliseconds since the UNIX epoch)
nonce true string Nonce, shared with other party
role true string maker
taker Describes if user wants to be maker or taker of trades
trades true array of objects List of trades for block trade
› instrument_name true string Instrument name
› price true number Price for trade
› amount false number It represents the requested trade size. For perpetual and futures the amount is in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH
› direction true string buy
sell Direction of trade from the maker perspective
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› signature string Signature of block trade
It is valid only for 5 minutes “around” given timestamp
Wallet
/private/cancel_transfer_by_id
var msg =
{
"jsonrpc" : "2.0",
"id" : 9187,
"method" : "private/cancel_transfer_by_id",
"params" : {
"currency" : "BTC",
"id" : 2
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 9187,
"result": {
"amount": 0.2,
"created_timestamp": 1550579457727,
"currency": "BTC",
"direction": "payment",
"id": 2,
"other_side": "2MzyQc5Tkik61kJbEpJV5D5H9VfWHZK9Sgy",
"state": "cancelled",
"type": "user",
"updated_timestamp": 1550579457727
}
}

Cancel transfer

Scope: wallet:read_write

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
currency true string BTC
ETH
USDC
USDT
EURR The currency symbol
id true integer Id of transfer
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› amount number Amount of funds in given currency
› created_timestamp integer The timestamp (milliseconds since the Unix epoch)
› currency string Currency, i.e "BTC", "ETH", "USDC"
› direction string Transfer direction
› id integer Id of transfer
› other_side string For transfer from/to subaccount returns this subaccount name, for transfer to other account returns address, for transfer from other account returns that accounts username.
› state string Transfer state, allowed values : prepared, confirmed, cancelled, waiting_for_admin, insufficient_funds, withdrawal_limit otherwise rejection reason
› type string Type of transfer: user - sent to user, subaccount - sent to subaccount
› updated_timestamp integer The timestamp (milliseconds since the Unix epoch)
/private/cancel_withdrawal
var msg =
{
"jsonrpc" : "2.0",
"id" : 7420,
"method" : "private/cancel_withdrawal",
"params" : {
"currency" : "BTC",
"id" : 1
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 7420,
"result": {
"address": "2NBqqD5GRJ8wHy1PYyCXTe9ke5226FhavBz",
"amount": 0.5,
"confirmed_timestamp": null,
"created_timestamp": 1550571443070,
"currency": "BTC",
"fee": 0.0001,
"id": 1,
"priority": 0.15,
"state": "cancelled",
"transaction_id": null,
"updated_timestamp": 1550571443070
}
}

Cancels withdrawal request

Scope: wallet:read_write

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
currency true string BTC
ETH
USDC
USDT
EURR The currency symbol
id true number The withdrawal id
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› address string Address in proper format for currency
› amount number Amount of funds in given currency
› confirmed_timestamp integer The timestamp (milliseconds since the Unix epoch) of withdrawal confirmation, null when not confirmed
› created_timestamp integer The timestamp (milliseconds since the Unix epoch)
› currency string Currency, i.e "BTC", "ETH", "USDC"
› fee number Fee in currency
› id integer Withdrawal id in Deribit system
› priority number Id of priority level
› state string Withdrawal state, allowed values : unconfirmed, confirmed, cancelled, completed, interrupted, rejected
› transaction_id string Transaction id in proper format for currency, null if id is not available
› updated_timestamp integer The timestamp (milliseconds since the Unix epoch)
/private/create_deposit_address
var msg =
{
"jsonrpc" : "2.0",
"id" : 7538,
"method" : "private/create_deposit_address",
"params" : {
"currency" : "BTC"
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 7538,
"result": {
"address": "2N8udZGBc1hLRCFsU9kGwMPpmYUwMFTuCwB",
"creation_timestamp": 1550575165170,
"currency": "BTC",
"type": "deposit"
}
}

Creates deposit address in currency

Scope: wallet:read_write

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
currency true string BTC
ETH
USDC
USDT
EURR The currency symbol
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object Object if address is created, null otherwise
› address string Address in proper format for currency
› creation_timestamp integer The timestamp (milliseconds since the Unix epoch)
› currency string Currency, i.e "BTC", "ETH", "USDC"
› type string Address type/purpose, allowed values : deposit, withdrawal, transfer
/private/get_current_deposit_address
var msg =
{
"jsonrpc" : "2.0",
"id" : 3461,
"method" : "private/get_current_deposit_address",
"params" : {
"currency" : "BTC"
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 3461,
"result": {
"address": "2N8udZGBc1hLRCFsU9kGwMPpmYUwMFTuCwB",
"creation_timestamp": 1550575165170,
"currency": "BTC",
"type": "deposit"
}
}

Retrieve deposit address for currency

Scope: wallet:read

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
currency true string BTC
ETH
USDC
USDT
EURR The currency symbol
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object Object if address is created, null otherwise
› address string Address in proper format for currency
› creation_timestamp integer The timestamp (milliseconds since the Unix epoch)
› currency string Currency, i.e "BTC", "ETH", "USDC"
› type string Address type/purpose, allowed values : deposit, withdrawal, transfer
/private/get_deposits
var msg =
{
"jsonrpc" : "2.0",
"id" : 5611,
"method" : "private/get_deposits",
"params" : {
"currency" : "BTC",
"count" : 10,
"offset" : 0
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 5611,
"result": {
"count": 1,
"data": [
{
"address": "2N35qDKDY22zmJq9eSyiAerMD4enJ1xx6ax",
"amount": 5,
"currency": "BTC",
"received_timestamp": 1549295017670,
"state": "completed",
"transaction_id": "230669110fdaf0a0dbcdc079b6b8b43d5af29cc73683835b9bc6b3406c065fda",
"updated_timestamp": 1549295130159
}
]
}
}

Retrieve the latest users deposits

Scope: wallet:read

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
currency true string BTC
ETH
USDC
USDT
EURR The currency symbol
count false integer Number of requested items, default - 10
offset false integer The offset for pagination, default - 0
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› count integer Total number of results available
› data array of object
› › address string Address in proper format for currency
› › amount number Amount of funds in given currency
› › currency string Currency, i.e "BTC", "ETH", "USDC"
› › received_timestamp integer The timestamp (milliseconds since the Unix epoch)
› › state string Deposit state, allowed values : pending, completed, rejected, replaced
› › transaction_id string Transaction id in proper format for currency, null if id is not available
› › updated_timestamp integer The timestamp (milliseconds since the Unix epoch)
/private/get_transfers
var msg =
{
"jsonrpc" : "2.0",
"id" : 7606,
"method" : "private/get_transfers",
"params" : {
"currency" : "BTC",
"count" : 10
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 7606,
"result": {
"count": 2,
"data": [
{
"amount": 0.2,
"created_timestamp": 1550579457727,
"currency": "BTC",
"direction": "payment",
"id": 2,
"other_side": "2MzyQc5Tkik61kJbEpJV5D5H9VfWHZK9Sgy",
"state": "prepared",
"type": "user",
"updated_timestamp": 1550579457727
},
{
"amount": 0.3,
"created_timestamp": 1550579255800,
"currency": "BTC",
"direction": "payment",
"id": 1,
"other_side": "new_user_1_1",
"state": "confirmed",
"type": "subaccount",
"updated_timestamp": 1550579255800
}
]
}
}

Retrieve the user's transfers list

Scope: wallet:read

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
currency true string BTC
ETH
USDC
USDT
EURR The currency symbol
count false integer Number of requested items, default - 10
offset false integer The offset for pagination, default - 0
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› count integer Total number of results available
› data array of object
› › amount number Amount of funds in given currency
› › created_timestamp integer The timestamp (milliseconds since the Unix epoch)
› › currency string Currency, i.e "BTC", "ETH", "USDC"
› › direction string Transfer direction
› › id integer Id of transfer
› › other_side string For transfer from/to subaccount returns this subaccount name, for transfer to other account returns address, for transfer from other account returns that accounts username.
› › state string Transfer state, allowed values : prepared, confirmed, cancelled, waiting_for_admin, insufficient_funds, withdrawal_limit otherwise rejection reason
› › type string Type of transfer: user - sent to user, subaccount - sent to subaccount
› › updated_timestamp integer The timestamp (milliseconds since the Unix epoch)
/private/get_withdrawals
var msg =
{
"jsonrpc" : "2.0",
"id" : 2745,
"method" : "private/get_withdrawals",
"params" : {
"currency" : "BTC",
"count" : 10,
"offset" : 0
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 2745,
"result": {
"count": 1,
"data": [
{
"address": "2NBqqD5GRJ8wHy1PYyCXTe9ke5226FhavBz",
"amount": 0.5,
"confirmed_timestamp": null,
"created_timestamp": 1550571443070,
"currency": "BTC",
"fee": 0.0001,
"id": 1,
"priority": 0.15,
"state": "unconfirmed",
"transaction_id": null,
"updated_timestamp": 1550571443070
}
]
}
}

Retrieve the latest users withdrawals

Scope: wallet:read

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
currency true string BTC
ETH
USDC
USDT
EURR The currency symbol
count false integer Number of requested items, default - 10
offset false integer The offset for pagination, default - 0
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› count integer Total number of results available
› data array of object
› › address string Address in proper format for currency
› › amount number Amount of funds in given currency
› › confirmed_timestamp integer The timestamp (milliseconds since the Unix epoch) of withdrawal confirmation, null when not confirmed
› › created_timestamp integer The timestamp (milliseconds since the Unix epoch)
› › currency string Currency, i.e "BTC", "ETH", "USDC"
› › fee number Fee in currency
› › id integer Withdrawal id in Deribit system
› › priority number Id of priority level
› › state string Withdrawal state, allowed values : unconfirmed, confirmed, cancelled, completed, interrupted, rejected
› › transaction_id string Transaction id in proper format for currency, null if id is not available
› › updated_timestamp integer The timestamp (milliseconds since the Unix epoch)
/private/submit_transfer_between_subaccounts
var msg =
{
"jsonrpc" : "2.0",
"id" : 210,
"method" : "private/submit_transfer_between_subaccounts",
"params" : {
"currency" : "ETH",
"amount" : 12.1234,
"destination" : 20,
"source" : 10
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 210,
"result": {
"updated_timestamp": 1550226218504,
"type": "subaccount",
"state": "confirmed",
"other_side": "MySubAccount",
"id": 1,
"direction": "payment",
"currency": "ETH",
"created_timestamp": 1550226218504,
"amount": 12.1234
}
}
Transfer funds between two (sub)accounts.

Scope: wallets:read_write

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
currency true string BTC
ETH
USDC
USDT
EURR The currency symbol
amount true number Amount of funds to be transferred
destination true integer Id of destination subaccount. Can be found in My Account >> Subaccounts tab
source false integer Id of the source (sub)account. Can be found in My Account >> Subaccounts tab. By default, it is the Id of the account which made the request. However, if a different "source" is specified, the user must possess the mainaccount scope, and only other subaccounts can be designated as the source.
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› amount number Amount of funds in given currency
› created_timestamp integer The timestamp (milliseconds since the Unix epoch)
› currency string Currency, i.e "BTC", "ETH", "USDC"
› direction string Transfer direction
› id integer Id of transfer
› other_side string For transfer from/to subaccount returns this subaccount name, for transfer to other account returns address, for transfer from other account returns that accounts username.
› state string Transfer state, allowed values : prepared, confirmed, cancelled, waiting_for_admin, insufficient_funds, withdrawal_limit otherwise rejection reason
› type string Type of transfer: user - sent to user, subaccount - sent to subaccount
› updated_timestamp integer The timestamp (milliseconds since the Unix epoch)
/private/submit_transfer_to_subaccount
var msg =
{
"jsonrpc" : "2.0",
"id" : 210,
"method" : "private/submit_transfer_to_subaccount",
"params" : {
"currency" : "ETH",
"amount" : 12.1234,
"destination" : 20
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 210,
"result": {
"updated_timestamp": 1550226218504,
"type": "subaccount",
"state": "confirmed",
"other_side": "MySubAccount",
"id": 1,
"direction": "payment",
"currency": "ETH",
"created_timestamp": 1550226218504,
"amount": 12.1234
}
}
Transfer funds to subaccount.

Scope: wallets:read_write

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
currency true string BTC
ETH
USDC
USDT
EURR The currency symbol
amount true number Amount of funds to be transferred
destination true integer Id of destination subaccount. Can be found in My Account >> Subaccounts tab
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› amount number Amount of funds in given currency
› created_timestamp integer The timestamp (milliseconds since the Unix epoch)
› currency string Currency, i.e "BTC", "ETH", "USDC"
› direction string Transfer direction
› id integer Id of transfer
› other_side string For transfer from/to subaccount returns this subaccount name, for transfer to other account returns address, for transfer from other account returns that accounts username.
› state string Transfer state, allowed values : prepared, confirmed, cancelled, waiting_for_admin, insufficient_funds, withdrawal_limit otherwise rejection reason
› type string Type of transfer: user - sent to user, subaccount - sent to subaccount
› updated_timestamp integer The timestamp (milliseconds since the Unix epoch)
/private/submit_transfer_to_user
var msg =
{
"jsonrpc" : "2.0",
"id" : 9421,
"method" : "private/submit_transfer_to_user",
"params" : {
"currency" : "ETH",
"amount" : 13.456,
"destination" : "0x4aa0753d798d668056920094d65321a8e8913e26"
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 9421,
"result": {
"updated_timestamp": 1550232862350,
"type": "user",
"state": "prepared",
"other_side": "0x4aa0753d798d668056920094d65321a8e8913e26",
"id": 3,
"direction": "payment",
"currency": "ETH",
"created_timestamp": 1550232862350,
"amount": 13.456
}
}
Transfer funds to another user.

Scope: wallet:read_write and mainaccount

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
currency true string BTC
ETH
USDC
USDT
EURR The currency symbol
amount true number Amount of funds to be transferred
destination true string Destination wallet's address taken from address book
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› amount number Amount of funds in given currency
› created_timestamp integer The timestamp (milliseconds since the Unix epoch)
› currency string Currency, i.e "BTC", "ETH", "USDC"
› direction string Transfer direction
› id integer Id of transfer
› other_side string For transfer from/to subaccount returns this subaccount name, for transfer to other account returns address, for transfer from other account returns that accounts username.
› state string Transfer state, allowed values : prepared, confirmed, cancelled, waiting_for_admin, insufficient_funds, withdrawal_limit otherwise rejection reason
› type string Type of transfer: user - sent to user, subaccount - sent to subaccount
› updated_timestamp integer The timestamp (milliseconds since the Unix epoch)
/private/withdraw
var msg =
{
"jsonrpc" : "2.0",
"id" : 6931,
"method" : "private/withdraw",
"params" : {
"currency" : "BTC",
"address" : "2NBqqD5GRJ8wHy1PYyCXTe9ke5226FhavBz",
"amount" : 0.4,
"priority" : "mid"
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 6931,
"result": {
"address": "2NBqqD5GRJ8wHy1PYyCXTe9ke5226FhavBz",
"amount": 0.4,
"confirmed_timestamp": null,
"created_timestamp": 1550574558607,
"currency": "BTC",
"fee": 0.0001,
"id": 4,
"priority": 1,
"state": "unconfirmed",
"transaction_id": null,
"updated_timestamp": 1550574558607
}
}

Creates a new withdrawal request

Scope: wallet:read_write and mainaccount

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
currency true string BTC
ETH
USDC
USDT
EURR The currency symbol
address true string Address in currency format, it must be in address book
amount true number Amount of funds to be withdrawn
priority false string insane
extreme_high
very_high
high
mid
low
very_low Withdrawal priority, optional for BTC, default: high
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› address string Address in proper format for currency
› amount number Amount of funds in given currency
› confirmed_timestamp integer The timestamp (milliseconds since the Unix epoch) of withdrawal confirmation, null when not confirmed
› created_timestamp integer The timestamp (milliseconds since the Unix epoch)
› currency string Currency, i.e "BTC", "ETH", "USDC"
› fee number Fee in currency
› id integer Withdrawal id in Deribit system
› priority number Id of priority level
› state string Withdrawal state, allowed values : unconfirmed, confirmed, cancelled, completed, interrupted, rejected
› transaction_id string Transaction id in proper format for currency, null if id is not available
› updated_timestamp integer The timestamp (milliseconds since the Unix epoch)
Account management
/public/get_announcements
var msg =
{
"jsonrpc" : "2.0",
"id" : 7661,
"method" : "public/get_announcements",
"params" : {

}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 7661,
"result": [
{
"title": "Example announcement",
"publication_timestamp": 1550058362418,
"important": false,
"id": 1550058362418,
"body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
}
]
}

Retrieves announcements. Default "start_timestamp" parameter value is current timestamp, "count" parameter value must be between 1 and 50, default is 5.

Try in API console

Parameters
Parameter Required Type Enum Description
start_timestamp false integer The most recent timestamp to return the results for (milliseconds since the UNIX epoch)
count false integer Maximum count of returned announcements
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result array of object
› body string The HTML body of the announcement
› confirmation boolean Whether the user confirmation is required for this announcement
› id number A unique identifier for the announcement
› important boolean Whether the announcement is marked as important
› publication_timestamp integer The timestamp (milliseconds since the Unix epoch) of announcement publication
› title string The title of the announcement
/public/get_portfolio_margins
var msg =
{
"jsonrpc" : "2.0",
"id" : 22222,
"method" : "public/get_portfolio_margins",
"params" : {
"currency" : "BTC",
"simulated_positions" : {
"BTC-PERPETUAL" : 1000.0,
"BTC-5JUL21-40000-C" : 10.0
}
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 1,
"result": {
"vol_range":[
0.38,
0.27
],
"vega_pow2":0.13,
"vega_pow1":0.3,
"skew":0,
"price_range":0.15,
"opt_sum_continguency":0.01,
"opt_continguency":0,
"kurtosis":3,
"int_rate":0,
"initial_margin_factor":1.2,
"ftu_continguency":0.006,
"atm_range":0.1,
"projected_margin_pos":-5,
"projected_margin":-0.10189442464239318,
"position_sizes":{
"BTC-PERPETUAL":0.558417065
},
"pls":[
-0.09854418796795264,
-0.07614778161159977,
-0.055228061388632795,
-0.03564364245649349,
-0.017270630880981342,
0,
0.016264574713157266,
0.03160851312179612,
0.046107831067574254,
0.059830399837685615,
0.07283700849805201
],
"pco_opt":0,
"pco_ftu":0.0033502366744405437,
"opt_summary":[

      ],
      "opt_pls":[
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      "opt_entries":[

      ],
      "margin_pos":-5,
      "margin":-0.10189442464239318,
      "ftu_summary":[
        {
          "short_total_cost":0,
          "pl_vec":[
            -0.09854418796795264,
            -0.07614778161159977,
            -0.055228061388632795,
            -0.03564364245649349,
            -0.017270630880981342,
            0,
            0.016264574713157266,
            0.03160851312179612,
            0.046107831067574254,
            0.059830399837685615,
            0.07283700849805201
          ],
          "long_total_cost":0.558372779073424,
          "exp_tstamp":32503708800000
        }
      ],
      "ftu_pls":[
        -0.09854418796795264,
        -0.07614778161159977,
        -0.055228061388632795,
        -0.03564364245649349,
        -0.017270630880981342,
        0,
        0.016264574713157266,
        0.03160851312179612,
        0.046107831067574254,
        0.059830399837685615,
        0.07283700849805201
      ],
      "ftu_entries":[
        {
          "total_cost":0.558372779073424,
          "size":0,
          "pl_vec":[
            -0.09854418796795264,
            -0.07614778161159977,
            -0.055228061388632795,
            -0.03564364245649349,
            -0.017270630880981342,
            0,
            0.016264574713157266,
            0.03160851312179612,
            0.046107831067574254,
            0.059830399837685615,
            0.07283700849805201
          ],
          "mark_price":43372.6,
          "instrument_name":"BTC-PERPETUAL",
          "exp_tstamp":32503708800000
        }
      ],
      "co_opt":0,
      "co_ftu":0.0033502366744405437,
      "calculation_timestamp":1632142954444
    },
    "usIn": 1575898767751007,
    "usOut": 1575898767751544,
    "usDiff": 537,
    "testnet": false

}

Public version of the method calculates portfolio margin info for simulated position. For concrete user position, the private version of the method must be used. The public version of the request has a special restricted rate limit (not more than once per a second for the IP). Note - This endpoint is depracated and works only for legacy portfolio margin. Please head to private/simulate_portfolio to perform simulation on current margin models.

Try in API console

Parameters
Parameter Required Type Enum Description
currency true string BTC
ETH
USDC
USDT
EURR The currency symbol
simulated_positions false object Object with positions in following form: {InstrumentName1: Position1, InstrumentName2: Position2...}, for example {"BTC-PERPETUAL": -1000.0} (or corresponding URI-encoding for GET). For futures in USD, for options in base currency.
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object PM details
/private/change_api_key_name
var msg =
{
"jsonrpc" : "2.0",
"id" : 2453,
"method" : "private/change_api_key_name",
"params" : {
"name" : "KeyName3",
"id" : 3
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 2453,
"result": {
"timestamp": 1560242482758,
"max_scope": "account:read_write block_trade:read trade:read_write wallet:read_write",
"id": 3,
"enabled": true,
"default": false,
"client_secret": "B6RsF9rrLY5ezEGBQkyLlV-UC7whyPJ34BMA-kKYpes",
"client_id": "1sXMQBhM",
"name": "KeyName3"
}
}
Changes name for key with given id. Important notes.

Scope: account:read_write

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
id true integer Id of key
name true string Name of key (only letters, numbers and underscores allowed; maximum length - 16 characters)
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› client_id string Client identifier used for authentication
› client_secret string Client secret or MD5 fingerprint of public key used for authentication
› default boolean Informs whether this api key is default (field is deprecated and will be removed in the future)
› enabled boolean Informs whether api key is enabled and can be used for authentication
› enabled_features array of string List of enabled advanced on-key features. Available options:

-   restricted_block_trades: Limit the block_trade read the scope of the API key to block trades that have been made using this specific API key
-   block_trade_approval: Block trades created using this API key require additional user approval
    › id integer key identifier
    › ip_whitelist array List of IP addresses whitelisted for a selected key
    › max_scope string Describes maximal access for tokens generated with given key, possible values: trade:[read, read_write, none], wallet:[read, read_write, none], account:[read, read_write, none], block_trade:[read, read_write, none]. If scope is not provided, its value is set as none.

Please check details described in Access scope
› name string Api key name that can be displayed in transaction log
› public_key string PEM encoded public key (Ed25519/RSA) used for asymmetric signatures (optional)
› timestamp integer The timestamp (milliseconds since the Unix epoch)
/private/change_margin_model
var msg =
{
"method" : "private/change_margin_model",
"params" : {
"user_id" : 3,
"margin_model" : "cross_pm"
},
"jsonrpc" : "2.0",
"id" : 1
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 1,
"result": [
{
"old_state": {
"maintenance_margin_rate": 0,
"initial_margin_rate": 0,
"available_balance": 0
},
"new_state": {
"maintenance_margin_rate": 0,
"initial_margin_rate": 0,
"available_balance": 0
},
"currency": "eth"
},
{
"old_state": {
"maintenance_margin_rate": 0.02862727,
"initial_margin_rate": 0.45407615,
"available_balance": 0.553590509
},
"new_state": {
"maintenance_margin_rate": 0.02710204,
"initial_margin_rate": 0.03252245,
"available_balance": 0.98106428
},
"currency": "btc"
}
]
}

Change margin model

Scope: account:read_write

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
user_id false integer Id of a (sub)account - by default current user id is used
margin_model true string cross_pm
cross_sm
segregated_pm
segregated_sm Margin model
dry_run false boolean If true request returns the result without switching the margining model. Default: false
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result array of object
› currency string Currency, i.e "BTC", "ETH", "USDC"
› new_state object Represents portfolio state after change
› › available_balance number Available balance after change
› › initial_margin_rate number Initial margin rate after change
› › maintenance_margin_rate number Maintenance margin rate after change
› old_state object Represents portfolio state before change
› › available_balance number Available balance before change
› › initial_margin_rate number Initial margin rate before change
› › maintenance_margin_rate number Maintenance margin rate before change
/private/change_scope_in_api_key
var msg =
{
"jsonrpc" : "2.0",
"id" : 2453,
"method" : "private/change_scope_in_api_key",
"params" : {
"max_scope" : "account:read_write wallet:read_write block_trade:read trade:read_write",
"id" : 3
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 2453,
"result": {
"timestamp": 1560242482758,
"max_scope": "account:read_write block_trade:read trade:read_write wallet:read_write",
"id": 3,
"enabled": true,
"default": false,
"client_secret": "B6RsF9rrLY5ezEGBQkyLlV-UC7whyPJ34BMA-kKYpes",
"client_id": "1sXMQBhM",
"name": ""
}
}
Changes scope for key with given id. Important notes.

Scope: account:read_write

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
max_scope true string Describes maximal access for tokens generated with given key, possible values: trade:[read, read_write, none], wallet:[read, read_write, none], account:[read, read_write, none], block_trade:[read, read_write, none]. If scope is not provided, its value is set as none.

Please check details described in Access scope
id true integer Id of key
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› client_id string Client identifier used for authentication
› client_secret string Client secret or MD5 fingerprint of public key used for authentication
› default boolean Informs whether this api key is default (field is deprecated and will be removed in the future)
› enabled boolean Informs whether api key is enabled and can be used for authentication
› enabled_features array of string List of enabled advanced on-key features. Available options:

-   restricted_block_trades: Limit the block_trade read the scope of the API key to block trades that have been made using this specific API key
-   block_trade_approval: Block trades created using this API key require additional user approval
    › id integer key identifier
    › ip_whitelist array List of IP addresses whitelisted for a selected key
    › max_scope string Describes maximal access for tokens generated with given key, possible values: trade:[read, read_write, none], wallet:[read, read_write, none], account:[read, read_write, none], block_trade:[read, read_write, none]. If scope is not provided, its value is set as none.

Please check details described in Access scope
› name string Api key name that can be displayed in transaction log
› public_key string PEM encoded public key (Ed25519/RSA) used for asymmetric signatures (optional)
› timestamp integer The timestamp (milliseconds since the Unix epoch)
/private/change_subaccount_name
var msg =
{
"jsonrpc" : "2.0",
"id" : 3964,
"method" : "private/change_subaccount_name",
"params" : {
"sid" : 7,
"name" : "new_user_1_1"
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 3964,
"result": "ok"
}

Change the user name for a subaccount

Scope: account:read_write and mainaccount

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
sid true integer The user id for the subaccount
name true string The new user name
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result string Result of method execution. ok in case of success
/private/create_api_key
var msg =
{
"jsonrpc" : "2.0",
"id" : 8974,
"method" : "private/create_api_key",
"params" : {
"name" : "Public key 1",
"max_scope" : "account:read trade:read block_trade:read_write wallet:none",
"public_key" : "-----BEGIN PUBLIC KEY-----\nMCowBQYDK2VwAyEAM7FWhKquNqLmTOV4hfYT5r3AjrYiORTT6Tn5HIfFNV8=\n-----END PUBLIC KEY-----"
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 8974,
"result": {
"timestamp": 1560238048714,
"max_scope": "account:read block_trade:read_write trade:read wallet:none",
"id": 5,
"enabled": true,
"enabled_features": [],
"default": false,
"public_key": "-----BEGIN PUBLIC KEY-----\nMCowBQYDK2VwAyEAM7FWhKquNqLmTOV4hfYT5r3AjrYiORTT6Tn5HIfFNV8=\n-----END PUBLIC KEY-----",
"client_secret": "9c:6d:c9:02:fd:9f:75:6e:14:bb:71:c5:74:95:86:c8",
"client_id": "wcVoQGam",
"name": ""
}
}

Creates a new api key with a given scope. Important notes

Scope: account:read_write

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
max_scope true string Describes maximal access for tokens generated with given key, possible values: trade:[read, read_write, none], wallet:[read, read_write, none], account:[read, read_write, none], block_trade:[read, read_write, none]. If scope is not provided, its value is set as none.

Please check details described in Access scope
name false string Name of key (only letters, numbers and underscores allowed; maximum length - 16 characters)
public_key false string ED25519 or RSA PEM Encoded public key that should be used to create asymmetric API Key for signing requests/authentication requests with user's private key.
enabled_features false array List of enabled advanced on-key features. Available options:

-   restricted_block_trades: Limit the block_trade read the scope of the API key to block trades that have been made using this specific API key
-   block_trade_approval: Block trades created using this API key require additional user approval
    Response
    Name Type Description
    id integer The id that was sent in the request
    jsonrpc string The JSON-RPC version (2.0)
    result object
    › client_id string Client identifier used for authentication
    › client_secret string Client secret or MD5 fingerprint of public key used for authentication
    › default boolean Informs whether this api key is default (field is deprecated and will be removed in the future)
    › enabled boolean Informs whether api key is enabled and can be used for authentication
    › enabled_features array of string List of enabled advanced on-key features. Available options:
-   restricted_block_trades: Limit the block_trade read the scope of the API key to block trades that have been made using this specific API key
-   block_trade_approval: Block trades created using this API key require additional user approval
    › id integer key identifier
    › ip_whitelist array List of IP addresses whitelisted for a selected key
    › max_scope string Describes maximal access for tokens generated with given key, possible values: trade:[read, read_write, none], wallet:[read, read_write, none], account:[read, read_write, none], block_trade:[read, read_write, none]. If scope is not provided, its value is set as none.

Please check details described in Access scope
› name string Api key name that can be displayed in transaction log
› public_key string PEM encoded public key (Ed25519/RSA) used for asymmetric signatures (optional)
› timestamp integer The timestamp (milliseconds since the Unix epoch)
/private/create_subaccount
var msg =
{
"jsonrpc" : "2.0",
"id" : 5414,
"method" : "private/create_subaccount",
"params" : {

}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 5414,
"result": {
"email": "user_AAA@email.com",
"id": 13,
"is_password": false,
"login_enabled": false,
"portfolio": {
"eth": {
"available_funds": 0,
"available_withdrawal_funds": 0,
"balance": 0,
"currency": "eth",
"equity": 0,
"initial_margin": 0,
"maintenance_margin": 0,
"margin_balance": 0
},
"btc": {
"available_funds": 0,
"available_withdrawal_funds": 0,
"balance": 0,
"currency": "btc",
"equity": 0,
"initial_margin": 0,
"maintenance_margin": 0,
"margin_balance": 0
}
},
"receive_notifications": false,
"system_name": "user_1_4",
"security_keys_enabled": false,
"type": "subaccount",
"username": "user_1_4"
}
}

Create a new subaccount

Scope: account:read_write and mainaccount

Try in API console

This is a private method; it can only be used after authentication.
Parameters
This method takes no parameters

Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› email string User email
› id integer Subaccount identifier
› is_password boolean true when password for the subaccount has been configured
› login_enabled boolean Informs whether login to the subaccount is enabled
› portfolio object
› › btc object
› › › additional_reserve number The account's balance reserved in other orders
› › › available_funds number
› › › available_withdrawal_funds number
› › › balance number
› › › currency string
› › › equity number
› › › initial_margin number
› › › maintenance_margin number
› › › margin_balance number
› › › spot_reserve number
› › eth object
› › › additional_reserve number The account's balance reserved in other orders
› › › available_funds number
› › › available_withdrawal_funds number
› › › balance number
› › › currency string
› › › equity number
› › › initial_margin number
› › › maintenance_margin number
› › › margin_balance number
› › › spot_reserve number
› receive_notifications boolean When true - receive all notification emails on the main email
› security_keys_enabled boolean Whether the Security Keys authentication is enabled
› system_name string System generated user nickname
› type string Account type
› username string Account name (given by user)
/private/disable_api_key
var msg =
{
"jsonrpc" : "2.0",
"id" : 2861,
"method" : "private/disable_api_key",
"params" : {
"id" : 3
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 2861,
"result": {
"timestamp": 1560242676023,
"max_scope": "account:read_write block_trade:read trade:read_write wallet:read_write",
"id": 3,
"enabled": false,
"default": false,
"client_secret": "B6RsF9rrLY5ezEGBQkyLlV-UC7whyPJ34BMA-kKYpes",
"client_id": "1sXMQBhM",
"name": ""
}
}
Disables api key with given id. Important notes.

Scope: account:read_write

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
id true integer Id of key
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› client_id string Client identifier used for authentication
› client_secret string Client secret or MD5 fingerprint of public key used for authentication
› default boolean Informs whether this api key is default (field is deprecated and will be removed in the future)
› enabled boolean Informs whether api key is enabled and can be used for authentication
› enabled_features array of string List of enabled advanced on-key features. Available options:

-   restricted_block_trades: Limit the block_trade read the scope of the API key to block trades that have been made using this specific API key
-   block_trade_approval: Block trades created using this API key require additional user approval
    › id integer key identifier
    › ip_whitelist array List of IP addresses whitelisted for a selected key
    › max_scope string Describes maximal access for tokens generated with given key, possible values: trade:[read, read_write, none], wallet:[read, read_write, none], account:[read, read_write, none], block_trade:[read, read_write, none]. If scope is not provided, its value is set as none.

Please check details described in Access scope
› name string Api key name that can be displayed in transaction log
› public_key string PEM encoded public key (Ed25519/RSA) used for asymmetric signatures (optional)
› timestamp integer The timestamp (milliseconds since the Unix epoch)
/private/edit_api_key
var msg =
{
"jsonrpc" : "2.0",
"id" : 2453,
"method" : "private/edit_api_key",
"params" : {
"name" : "NewKeyName",
"max_scope" : "account:read_write wallet:read_write block_trade:read trade:read_write",
"id" : 3
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 2453,
"result": {
"timestamp": 1560242482758,
"max_scope": "account:read_write block_trade:read trade:read_write wallet:read_write",
"id": 3,
"enabled": true,
"default": false,
"client_secret": "B6RsF9rrLY5ezEGBQkyLlV-UC7whyPJ34BMA-kKYpes",
"client_id": "1sXMQBhM",
"name": "NewKeyName"
}
}
Edits existing API key. At least one parameter is required. Important notes

Scope: account:read_write

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
id true integer Id of key
max_scope true string Describes maximal access for tokens generated with given key, possible values: trade:[read, read_write, none], wallet:[read, read_write, none], account:[read, read_write, none], block_trade:[read, read_write, none]. If scope is not provided, its value is set as none.

Please check details described in Access scope
name false string Name of key (only letters, numbers and underscores allowed; maximum length - 16 characters)
enabled false boolean Enables/disables the API key. true to enable, false to disable
enabled_features false array List of enabled advanced on-key features. Available options:

-   restricted_block_trades: Limit the block_trade read the scope of the API key to block trades that have been made using this specific API key
-   block_trade_approval: Block trades created using this API key require additional user approval
    ip_whitelist false array Whitelist provided IP address on a selected key
    Response
    Name Type Description
    id integer The id that was sent in the request
    jsonrpc string The JSON-RPC version (2.0)
    result object
    › client_id string Client identifier used for authentication
    › client_secret string Client secret or MD5 fingerprint of public key used for authentication
    › default boolean Informs whether this api key is default (field is deprecated and will be removed in the future)
    › enabled boolean Informs whether api key is enabled and can be used for authentication
    › enabled_features array of string List of enabled advanced on-key features. Available options:
-   restricted_block_trades: Limit the block_trade read the scope of the API key to block trades that have been made using this specific API key
-   block_trade_approval: Block trades created using this API key require additional user approval
    › id integer key identifier
    › ip_whitelist array List of IP addresses whitelisted for a selected key
    › max_scope string Describes maximal access for tokens generated with given key, possible values: trade:[read, read_write, none], wallet:[read, read_write, none], account:[read, read_write, none], block_trade:[read, read_write, none]. If scope is not provided, its value is set as none.

Please check details described in Access scope
› name string Api key name that can be displayed in transaction log
› public_key string PEM encoded public key (Ed25519/RSA) used for asymmetric signatures (optional)
› timestamp integer The timestamp (milliseconds since the Unix epoch)
/private/enable_affiliate_program
var msg =
{
"jsonrpc" : "2.0",
"id" : 24,
"method" : "private/enable_affiliate_program",
"params" : {

}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc":"2.0",
"id":24,
"result":"ok"
}
Enables affiliate program for user

Scope: account:read_write

Try in API console

This is a private method; it can only be used after authentication.
Parameters
This method takes no parameters

Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result string Result of method execution. ok in case of success
/private/enable_api_key
var msg =
{
"jsonrpc" : "2.0",
"id" : 8580,
"method" : "private/enable_api_key",
"params" : {
"id" : 3
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 8580,
"result": {
"timestamp": 1560242634599,
"max_scope": "account:read_write block_trade:read trade:read_write wallet:read_write",
"id": 3,
"enabled": true,
"default": false,
"client_secret": "B6RsF9rrLY5ezEGBQkyLlV-UC7whyPJ34BMA-kKYpes",
"client_id": "1sXMQBhM",
"name": ""
}
}
Enables api key with given id. Important notes.

Scope: account:read_write

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
id true integer Id of key
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› client_id string Client identifier used for authentication
› client_secret string Client secret or MD5 fingerprint of public key used for authentication
› default boolean Informs whether this api key is default (field is deprecated and will be removed in the future)
› enabled boolean Informs whether api key is enabled and can be used for authentication
› enabled_features array of string List of enabled advanced on-key features. Available options:

-   restricted_block_trades: Limit the block_trade read the scope of the API key to block trades that have been made using this specific API key
-   block_trade_approval: Block trades created using this API key require additional user approval
    › id integer key identifier
    › ip_whitelist array List of IP addresses whitelisted for a selected key
    › max_scope string Describes maximal access for tokens generated with given key, possible values: trade:[read, read_write, none], wallet:[read, read_write, none], account:[read, read_write, none], block_trade:[read, read_write, none]. If scope is not provided, its value is set as none.

Please check details described in Access scope
› name string Api key name that can be displayed in transaction log
› public_key string PEM encoded public key (Ed25519/RSA) used for asymmetric signatures (optional)
› timestamp integer The timestamp (milliseconds since the Unix epoch)
/private/get_access_log
var msg =
{
"id" : 1,
"method" : "private/get_access_log",
"params" : {
"offset" : 0,
"count" : 3
},
"jsonrpc" : "2.0"
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 1,
"result": {
"records_total": 34,
"data": [
{
"timestamp": 1575876682576,
"result": "success",
"ip": "127.0.0.1",
"id": 45,
"country": "Local Country",
"city": "Local Town"
},
{
"timestamp": 1575876459309,
"result": "success",
"ip": "127.0.0.1",
"id": 44,
"country": "Local Country",
"city": "Local Town"
},
{
"timestamp": 1575546252774,
"result": "disabled_tfa",
"ip": "127.0.0.1",
"id": 43,
"country": "Local Country",
"city": "Local Town"
}
]
},
"usIn": 1575903572350348,
"usOut": 1575903572351765,
"usDiff": 1417,
"testnet": false
}
Lists access logs for the user

Scope: account:read

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
offset false integer The offset for pagination, default - 0
count false integer Number of requested items, default - 10
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result array of object
› city string City where the IP address is registered (estimated)
› country string Country where the IP address is registered (estimated)
› data object or string Optional, additional information about action, type depends on log value
› id integer Unique identifier
› ip string IP address of source that generated action
› log string Action description, values: changed_email - email was changed; changed_password - password was changed; disabled_tfa - TFA was disabled; enabled_tfa - TFA was enabled, success - successful login; failure - login failure; enabled_subaccount_login - login was enabled for subaccount (in data - subaccount uid); disabled_subaccount_login - login was disabled for subbaccount (in data - subbacount uid);new_api_key - API key was created (in data key client id); removed_api_key - API key was removed (in data key client id); changed_scope - scope of API key was changed (in data key client id); changed_whitelist - whitelist of API key was edited (in data key client id); disabled_api_key - API key was disabled (in data key client id); enabled_api_key - API key was enabled (in data key client id); reset_api_key - API key was reset (in data key client id)
› timestamp integer The timestamp (milliseconds since the Unix epoch)
/private/get_account_summaries
var msg =
{
"jsonrpc" : "2.0",
"id" : 2515,
"method" : "private/get_account_summaries",
"params" : {
"extended" : true
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 2515,
"result": {
"id": 10,
"email": "user@example.com",
"system_name": "user",
"username": "user",
"creation_timestamp": 1687352432143,
"type": "main",
"referrer_id": null,
"login_enabled": false,
"security_keys_enabled": false,
"mmp_enabled": false,
"interuser_transfers_enabled": false,
"self_trading_reject_mode": "cancel_maker",
"self_trading_extended_to_subaccounts": false,
"summaries": [{
"currency": "BTC",
"delta_total_map": {
"btc_usd": 31.594357699
},
"margin_balance": 302.62729214,
"futures_session_rpl": -0.03258105,
"options_session_rpl": 0,
"estimated_liquidation_ratio_map": {
"btc_usd": 0.1009872222854525
},
"session_upl": 0.05271555,
"estimated_liquidation_ratio": 0.10098722,
"options_gamma_map": {
"btc_usd": 0.00001
},
"options_vega": 0.0858,
"options_value": -0.0086,
"available_withdrawal_funds": 301.35396172,
"projected_delta_total": 32.613978,
"maintenance_margin": 0.8857841,
"total_pl": -0.33084225,
"limits": {
"limits_per_currency": false,
"non_matching_engine": {
"burst": 1500,
"rate": 1000
},
"matching_engine": {
"trading": { "total": { "burst": 250, "rate": 200 } },
"spot": { "burst": 250, "rate": 200 },
"quotes": { "burst": 500, "rate": 500 },
"max_quotes": { "burst": 10, "rate": 10 },
"guaranteed_quotes": { "burst": 2, "rate": 2 },
"cancel_all": { "burst": 250, "rate": 200 }
}
},
"projected_maintenance_margin": 0.7543841,
"available_funds": 301.38059622,
"options_delta": -1.01962,
"balance": 302.60065765,
"equity": 302.61869214,
"futures_session_upl": 0.05921555,
"fee_balance": 0,
"options_session_upl": -0.0065,
"projected_initial_margin": 1.01529592,
"options_theta": 15.97071,
"portfolio_margining_enabled": false,
"cross_collateral_enabled": false,
"margin_model": "segregated_sm",
"options_vega_map": {
"btc_usd": 0.0858
},
"futures_pl": -0.32434225,
"options_pl": -0.0065,
"initial_margin": 1.24669592,
"spot_reserve": 0,
"delta_total": 31.602958,
"options_gamma": 0.00001,
"session_rpl": -0.03258105
},

      {
        "currency": "ETH",
        "futures_session_upl": 0,
        "portfolio_margining_enabled": false,
        "available_funds": 99.999598,
        "initial_margin": 0.000402,
        "futures_session_rpl": 0,
        "options_gamma": 0,
        "balance": 100,
        "options_vega_map": {},
        "session_upl": 0,
        "fee_balance": 0,
        "delta_total_map": {
          "eth_usd": 0
        },
        "projected_maintenance_margin": 0,
        "options_gamma_map": {},
        "projected_delta_total": 0,
        "margin_model": "segregated_sm",
        "futures_pl": 0,
        "options_theta": 0,
        "limits": {
          "limits_per_currency": false,
          "non_matching_engine": {
            "burst": 1500,
            "rate": 1000
          },
          "matching_engine": {
            "trading": { "total": { "burst": 250, "rate": 200 } },
            "spot": { "burst": 250, "rate": 200 },
            "quotes": { "burst": 500, "rate": 500 },
            "max_quotes": { "burst": 10, "rate": 10 },
            "guaranteed_quotes": { "burst": 2, "rate": 2 },
            "cancel_all": { "burst": 250, "rate": 200 }
          }
        },
        "options_delta": 0,
        "equity": 100,
        "projected_initial_margin": 0.0002,
        "estimated_liquidation_ratio_map": {
          "eth_usd": 0
        },
        "spot_reserve": 0.0002,
        "cross_collateral_enabled": false,
        "available_withdrawal_funds": 99.999597,
        "delta_total": 0,
        "options_session_upl": 0,
        "maintenance_margin": 0,
        "options_theta_map": {},
        "additional_reserve": 0,
        "estimated_liquidation_ratio": 0,
        "options_pl": 0,
        "options_session_rpl": 0,
        "options_vega": 0,
        "total_pl": 0,
        "session_rpl": 0,
        "options_value": 0,
        "margin_balance": 100
      }
    ]

}
}

Retrieves a per-currency list of user account summaries. To read subaccount summary use subaccount_id parameter.

Scope: account:read

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
subaccount_id false integer The user id for the subaccount
extended false boolean Include additional fields
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› creation_timestamp integer Time at which the account was created (milliseconds since the Unix epoch; available when parameter extended = true)
› email string User email (available when parameter extended = true)
› id integer Account id (available when parameter extended = true)
› interuser_transfers_enabled boolean true when the inter-user transfers are enabled for user (available when parameter extended = true)
› login_enabled boolean Whether account is loginable using email and password (available when parameter extended = true and account is a subaccount)
› mmp_enabled boolean Whether MMP is enabled (available when parameter extended = true)
› referrer_id string Optional identifier of the referrer (of the affiliation program, and available when parameter extended = true), which link was used by this account at registration. It coincides with suffix of the affiliation link path after /reg-
› security_keys_enabled boolean Whether Security Key authentication is enabled (available when parameter extended = true)
› self_trading_extended_to_subaccounts string true if self trading rejection behavior is applied to trades between subaccounts (available when parameter extended = true)
› self_trading_reject_mode string Self trading rejection behavior - reject_taker or cancel_maker (available when parameter extended = true)
› summaries array of object Aggregated list of per-currency account summaries
› › maintenance_margin number The maintenance margin.
› › delta_total number The sum of position deltas
› › options_session_rpl number Options session realized profit and Loss
› › futures_session_rpl number Futures session realized profit and Loss
› › session_upl number Session unrealized profit and loss
› › fee_balance number The account's fee balance (it can be used to pay for fees)
› › fees array of object User fees in case of any discounts (available when parameter extended = true and user has any discounts)
› › › currency string The currency the fee applies to
› › › fee_type string Fee type - relative if fee is calculated as a fraction of base instrument fee, fixed if fee is calculated solely using user fee
› › › instrument_type string Type of the instruments the fee applies to - future for future instruments (excluding perpetual), perpetual for future perpetual instruments, option for options
› › › maker_fee number User fee as a maker
› › › taker_fee number User fee as a taker
› › limits object Returned object is described in separate document.
› › initial_margin number The account's initial margin
› › options_gamma_map object Map of options' gammas per index
› › futures_pl number Futures profit and Loss
› › currency string Currency of the summary
› › options_value number Options value
› › projected_maintenance_margin number Projected maintenance margin
› › options_vega number Options summary vega
› › session_rpl number Session realized profit and loss
› › has_non_block_chain_equity boolean Optional field returned with value true when user has non block chain equity that is excluded from proof of reserve calculations
› › deposit_address string The deposit address for the account (if available)
› › total_initial_margin_usd number Optional (only for users using cross margin). The account's total initial margin in all cross collateral currencies, expressed in USD
› › futures_session_upl number Futures session unrealized profit and Loss
› › options_session_upl number Options session unrealized profit and Loss
› › cross_collateral_enabled boolean When true cross collateral is enabled for user
› › options_theta number Options summary theta
› › margin_model string Name of user's currently enabled margin model
› › options_delta number Options summary delta
› › options_pl number Options profit and Loss
› › options_vega_map object Map of options' vegas per index
› › balance number The account's balance
› › total_equity_usd number Optional (only for users using cross margin). The account's total equity in all cross collateral currencies, expressed in USD
› › additional_reserve number The account's balance reserved in other orders
› › projected_initial_margin number Projected initial margin
› › available_funds number The account's available funds
› › spot_reserve number The account's balance reserved in active spot orders
› › projected_delta_total number The sum of position deltas without positions that will expire during closest expiration
› › portfolio_margining_enabled boolean true when portfolio margining is enabled for user
› › total_maintenance_margin_usd number Optional (only for users using cross margin). The account's total maintenance margin in all cross collateral currencies, expressed in USD
› › total_margin_balance_usd number Optional (only for users using cross margin). The account's total margin balance in all cross collateral currencies, expressed in USD
› › total_pl number Profit and loss
› › margin_balance number The account's margin balance
› › options_theta_map object Map of options' thetas per index
› › total_delta_total_usd number Optional (only for users using cross margin). The account's total delta total in all cross collateral currencies, expressed in USD
› › available_withdrawal_funds number The account's available to withdrawal funds
› › equity number The account's current equity
› › options_gamma number Options summary gamma
› system_name string System generated user nickname (available when parameter extended = true)
› type string Account type (available when parameter extended = true)
› username string Account name (given by user) (available when parameter extended = true)
/private/get_account_summary
var msg =
{
"jsonrpc" : "2.0",
"id" : 2515,
"method" : "private/get_account_summary",
"params" : {
"currency" : "BTC",
"extended" : true
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 2515,
"result": {
"delta_total_map": {
"btc_usd": 31.594357699
},
"margin_balance": 302.62729214,
"futures_session_rpl": -0.03258105,
"options_session_rpl": 0,
"estimated_liquidation_ratio_map": {
"btc_usd": 0.1009872222854525
},
"session_upl": 0.05271555,
"email": "user@example.com",
"system_name": "user",
"username": "user",
"interuser_transfers_enabled": false,
"id": 10,
"estimated_liquidation_ratio": 0.10098722,
"options_gamma_map": {
"btc_usd": 0.00001
},
"options_vega": 0.0858,
"options_value": -0.0086,
"available_withdrawal_funds": 301.35396172,
"projected_delta_total": 32.613978,
"maintenance_margin": 0.8857841,
"total_pl": -0.33084225,
"limits": {
"limits_per_currency": false,
"non_matching_engine": {
"burst": 1500,
"rate": 1000
},
"matching_engine": {
"trading": { "total": { "burst": 250, "rate": 200 } },
"spot": { "burst": 250, "rate": 200 },
"quotes": { "burst": 500, "rate": 500 },
"max_quotes": { "burst": 10, "rate": 10 },
"guaranteed_quotes": { "burst": 2, "rate": 2 },
"cancel_all": { "burst": 250, "rate": 200 }
}
},
"options_theta_map": {
"btc_usd": 15.97071
},
"projected_maintenance_margin": 0.7543841,
"available_funds": 301.38059622,
"login_enabled": false,
"options_delta": -1.01962,
"balance": 302.60065765,
"security_keys_enabled": false,
"referrer_id": null,
"mmp_enabled": false,
"equity": 302.61869214,
"futures_session_upl": 0.05921555,
"fee_balance": 0,
"currency": "BTC",
"options_session_upl": -0.0065,
"projected_initial_margin": 1.01529592,
"options_theta": 15.97071,
"creation_timestamp": 1687352432143,
"self_trading_extended_to_subaccounts": false,
"portfolio_margining_enabled": false,
"cross_collateral_enabled": false,
"margin_model": "segregated_sm",
"options_vega_map": {
"btc_usd": 0.0858
},
"futures_pl": -0.32434225,
"options_pl": -0.0065,
"type": "main",
"self_trading_reject_mode": "cancel_maker",
"initial_margin": 1.24669592,
"spot_reserve": 0,
"delta_total": 31.602958,
"options_gamma": 0.00001,
"session_rpl": -0.03258105
}
}

Retrieves user account summary. To read subaccount summary use subaccount_id parameter.

Scope: account:read

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
currency true string BTC
ETH
USDC
USDT
EURR The currency symbol
subaccount_id false integer The user id for the subaccount
extended false boolean Include additional fields
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› maintenance_margin number The maintenance margin.
› delta_total number The sum of position deltas
› id integer Account id (available when parameter extended = true)
› options_session_rpl number Options session realized profit and Loss
› self_trading_reject_mode string Self trading rejection behavior - reject_taker or cancel_maker (available when parameter extended = true)
› futures_session_rpl number Futures session realized profit and Loss
› session_upl number Session unrealized profit and loss
› fee_balance number The account's fee balance (it can be used to pay for fees)
› fees array of object User fees in case of any discounts (available when parameter extended = true and user has any discounts)
› › currency string The currency the fee applies to
› › fee_type string Fee type - relative if fee is calculated as a fraction of base instrument fee, fixed if fee is calculated solely using user fee
› › instrument_type string Type of the instruments the fee applies to - future for future instruments (excluding perpetual), perpetual for future perpetual instruments, option for options
› › maker_fee number User fee as a maker
› › taker_fee number User fee as a taker
› limits object Returned object is described in separate document.
› type string Account type (available when parameter extended = true)
› initial_margin number The account's initial margin
› options_gamma_map object Map of options' gammas per index
› futures_pl number Futures profit and Loss
› currency string The selected currency
› options_value number Options value
› security_keys_enabled boolean Whether Security Key authentication is enabled (available when parameter extended = true)
› self_trading_extended_to_subaccounts string true if self trading rejection behavior is applied to trades between subaccounts (available when parameter extended = true)
› projected_maintenance_margin number Projected maintenance margin
› options_vega number Options summary vega
› session_rpl number Session realized profit and loss
› has_non_block_chain_equity boolean Optional field returned with value true when user has non block chain equity that is excluded from proof of reserve calculations
› system_name string System generated user nickname (available when parameter extended = true)
› deposit_address string The deposit address for the account (if available)
› total_initial_margin_usd number Optional (only for users using cross margin). The account's total initial margin in all cross collateral currencies, expressed in USD
› futures_session_upl number Futures session unrealized profit and Loss
› options_session_upl number Options session unrealized profit and Loss
› referrer_id string Optional identifier of the referrer (of the affiliation program, and available when parameter extended = true), which link was used by this account at registration. It coincides with suffix of the affiliation link path after /reg-
› cross_collateral_enabled boolean When true cross collateral is enabled for user
› options_theta number Options summary theta
› login_enabled boolean Whether account is loginable using email and password (available when parameter extended = true and account is a subaccount)
› margin_model string Name of user's currently enabled margin model
› username string Account name (given by user) (available when parameter extended = true)
› interuser_transfers_enabled boolean true when the inter-user transfers are enabled for user (available when parameter extended = true)
› options_delta number Options summary delta
› options_pl number Options profit and Loss
› options_vega_map object Map of options' vegas per index
› balance number The account's balance
› total_equity_usd number Optional (only for users using cross margin). The account's total equity in all cross collateral currencies, expressed in USD
› additional_reserve number The account's balance reserved in other orders
› mmp_enabled boolean Whether MMP is enabled (available when parameter extended = true)
› projected_initial_margin number Projected initial margin
› email string User email (available when parameter extended = true)
› available_funds number The account's available funds
› spot_reserve number The account's balance reserved in active spot orders
› projected_delta_total number The sum of position deltas without positions that will expire during closest expiration
› portfolio_margining_enabled boolean true when portfolio margining is enabled for user
› total_maintenance_margin_usd number Optional (only for users using cross margin). The account's total maintenance margin in all cross collateral currencies, expressed in USD
› total_margin_balance_usd number Optional (only for users using cross margin). The account's total margin balance in all cross collateral currencies, expressed in USD
› total_pl number Profit and loss
› margin_balance number The account's margin balance
› options_theta_map object Map of options' thetas per index
› total_delta_total_usd number Optional (only for users using cross margin). The account's total delta total in all cross collateral currencies, expressed in USD
› creation_timestamp integer Time at which the account was created (milliseconds since the Unix epoch; available when parameter extended = true)
› available_withdrawal_funds number The account's available to withdrawal funds
› equity number The account's current equity
› options_gamma number Options summary gamma
/private/get_affiliate_program_info
var msg =
{
"method" : "private/get_affiliate_program_info",
"params" : {

},
"jsonrpc" : "2.0",
"id" : 2
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 2,
"result": {
"received": {
"eth": 0.00004,
"btc": 0.000001
},
"number_of_affiliates": 1,
"link": "https://www.deribit.com/reg-xxx.zxyq",
"is_enabled": true
}
}
Retrieves user`s affiliates count, payouts and link.

Scope: account:read

Try in API console

This is a private method; it can only be used after authentication.
Parameters
This method takes no parameters

Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› is_enabled boolean Status of affiliate program
› link string Affiliate link
› number_of_affiliates number Number of affiliates
› received object
› › btc number Total payout received in BTC
› › eth number Total payout received in ETH
/private/get_email_language
var msg =
{
"jsonrpc" : "2.0",
"id" : 9265,
"method" : "private/get_email_language",
"params" : {

}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 9265,
"result": "en"
}

Retrieves the language to be used for emails.

Scope: account:read

Try in API console

This is a private method; it can only be used after authentication.
Parameters
This method takes no parameters

Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result string The abbreviation of the language
/private/get_new_announcements
var msg =
{
"jsonrpc" : "2.0",
"id" : 3022,
"method" : "private/get_new_announcements",
"params" : {

}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 3022,
"result": [
{
"title": "Example announcement",
"publication_timestamp": 1550058362418,
"important": false,
"id": 1550058362418,
"body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
}
]
}

Retrieves announcements that have not been marked read by the user.

Scope: account:read

Try in API console

This is a private method; it can only be used after authentication.
Parameters
This method takes no parameters

Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result array of object
› body string The HTML body of the announcement
› confirmation boolean Whether the user confirmation is required for this announcement
› id number A unique identifier for the announcement
› important boolean Whether the announcement is marked as important
› publication_timestamp integer The timestamp (milliseconds since the Unix epoch) of announcement publication
› title string The title of the announcement
/private/get_portfolio_margins
var msg =
{
"jsonrpc" : "2.0",
"id" : 22222,
"method" : "private/get_portfolio_margins",
"params" : {
"currency" : "BTC",
"add_positions" : true,
"simulated_positions" : {
"BTC-PERPETUAL" : 1000.0,
"BTC-5JUL21-40000-C" : 10.0
}
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 1,
"result": {
"vol_range":[
0.38,
0.27
],
"vega_pow2":0.13,
"vega_pow1":0.3,
"skew":0,
"price_range":0.15,
"opt_sum_continguency":0.01,
"opt_continguency":0,
"kurtosis":3,
"int_rate":0,
"initial_margin_factor":1.2,
"ftu_continguency":0.006,
"atm_range":0.1,
"projected_margin_pos":-5,
"projected_margin":-0.10189442464239318,
"position_sizes":{
"BTC-PERPETUAL":0.558417065
},
"pls":[
-0.09854418796795264,
-0.07614778161159977,
-0.055228061388632795,
-0.03564364245649349,
-0.017270630880981342,
0,
0.016264574713157266,
0.03160851312179612,
0.046107831067574254,
0.059830399837685615,
0.07283700849805201
],
"pco_opt":0,
"pco_ftu":0.0033502366744405437,
"opt_summary":[

      ],
      "opt_pls":[
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      "opt_entries":[

      ],
      "margin_pos":-5,
      "margin":-0.10189442464239318,
      "ftu_summary":[
        {
          "short_total_cost":0,
          "pl_vec":[
            -0.09854418796795264,
            -0.07614778161159977,
            -0.055228061388632795,
            -0.03564364245649349,
            -0.017270630880981342,
            0,
            0.016264574713157266,
            0.03160851312179612,
            0.046107831067574254,
            0.059830399837685615,
            0.07283700849805201
          ],
          "long_total_cost":0.558372779073424,
          "exp_tstamp":32503708800000
        }
      ],
      "ftu_pls":[
        -0.09854418796795264,
        -0.07614778161159977,
        -0.055228061388632795,
        -0.03564364245649349,
        -0.017270630880981342,
        0,
        0.016264574713157266,
        0.03160851312179612,
        0.046107831067574254,
        0.059830399837685615,
        0.07283700849805201
      ],
      "ftu_entries":[
        {
          "total_cost":0.558372779073424,
          "size":0,
          "pl_vec":[
            -0.09854418796795264,
            -0.07614778161159977,
            -0.055228061388632795,
            -0.03564364245649349,
            -0.017270630880981342,
            0,
            0.016264574713157266,
            0.03160851312179612,
            0.046107831067574254,
            0.059830399837685615,
            0.07283700849805201
          ],
          "mark_price":43372.6,
          "instrument_name":"BTC-PERPETUAL",
          "exp_tstamp":32503708800000
        }
      ],
      "co_opt":0,
      "co_ftu":0.0033502366744405437,
      "calculation_timestamp":1632142954444
    },
    "usIn": 1575898767751007,
    "usOut": 1575898767751544,
    "usDiff": 537,
    "testnet": false

}

Calculates portfolio margin info for simulated position or current position of the user. This request has a special restricted rate limit (not more than once per a second). Note - This endpoint is depracated and works only for legacy portfolio margin. Please head to private/simulate_portfolio to perform simulation on current margin models.

Scope: account:read

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
currency true string BTC
ETH
USDC
USDT
EURR The currency symbol
add_positions false boolean If true, adds simulated positions to current positions, otherwise uses only simulated positions. By default true
simulated_positions false object Object with positions in following form: {InstrumentName1: Position1, InstrumentName2: Position2...}, for example {"BTC-PERPETUAL": -1000.0} (or corresponding URI-encoding for GET). For futures in USD, for options in base currency.
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object PM details
/private/get_position
var msg =
{
"jsonrpc" : "2.0",
"id" : 404,
"method" : "private/get_position",
"params" : {
"instrument_name" : "BTC-PERPETUAL"
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 404,
"result": {
"average_price": 0,
"delta": 0,
"direction": "buy",
"estimated_liquidation_price": 0,
"floating_profit_loss": 0,
"index_price": 3555.86,
"initial_margin": 0,
"instrument_name": "BTC-PERPETUAL",
"interest_value" : 1.7362511643080387,
"leverage": 100,
"kind": "future",
"maintenance_margin": 0,
"mark_price": 3556.62,
"open_orders_margin": 0.000165889,
"realized_profit_loss": 0,
"settlement_price": 3555.44,
"size": 0,
"size_currency": 0,
"total_profit_loss": 0
}
}

Retrieve user position.

Scope: trade:read

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
instrument_name true string Instrument name
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› average_price number Average price of trades that built this position
› average_price_usd number Only for options, average price in USD
› delta number Delta parameter
› direction string Direction: buy, sell or zero
› estimated_liquidation_price number Estimated liquidation price, added only for futures, for non portfolio margining users
› floating_profit_loss number Floating profit or loss
› floating_profit_loss_usd number Only for options, floating profit or loss in USD
› gamma number Only for options, Gamma parameter
› index_price number Current index price
› initial_margin number Initial margin
› instrument_name string Unique instrument identifier
› interest_value number Value used to calculate realized_funding (perpetual only)
› kind string Instrument kind: "future", "option", "spot", "future_combo", "option_combo"
› leverage integer Current available leverage for future position
› maintenance_margin number Maintenance margin
› mark_price number Current mark price for position's instrument
› open_orders_margin number Open orders margin
› realized_funding number Realized Funding in current session included in session realized profit or loss, only for positions of perpetual instruments
› realized_profit_loss number Realized profit or loss
› settlement_price number Optional (not added for spot). Last settlement price for position's instrument 0 if instrument wasn't settled yet
› size number Position size for futures size in quote currency (e.g. USD), for options size is in base currency (e.g. BTC)
› size_currency number Only for futures, position size in base currency
› theta number Only for options, Theta parameter
› total_profit_loss number Profit or loss from position
› vega number Only for options, Vega parameter
/private/get_positions
var msg =
{
"jsonrpc" : "2.0",
"id" : 2236,
"method" : "private/get_positions",
"params" : {
"currency" : "BTC",
"kind" : "future"
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 2236,
"result": [
{
"average_price": 7440.18,
"delta": 0.006687487,
"direction": "buy",
"estimated_liquidation_price": 1.74,
"floating_profit_loss": 0,
"index_price": 7466.79,
"initial_margin": 0.000197283,
"instrument_name": "BTC-PERPETUAL",
"interest_value" : 1.7362511643080387,
"kind": "future",
"leverage": 34,
"maintenance_margin": 0.000143783,
"mark_price": 7476.65,
"open_orders_margin": 0.000197288,
"realized_funding": -1e-8,
"realized_profit_loss": -9e-9,
"settlement_price": 7476.65,
"size": 50,
"size_currency": 0.006687487,
"total_profit_loss": 0.000032781
}
]
}

Retrieve user positions. To retrieve subaccount positions, use subaccount_id parameter.

Scope: trade:read

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
currency false string BTC
ETH
USDC
USDT
EURR
any
kind false string future
option
spot
future_combo
option_combo Kind filter on positions
subaccount_id false integer The user id for the subaccount
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result array of object
› average_price number Average price of trades that built this position
› average_price_usd number Only for options, average price in USD
› delta number Delta parameter
› direction string Direction: buy, sell or zero
› estimated_liquidation_price number Estimated liquidation price, added only for futures, for non portfolio margining users
› floating_profit_loss number Floating profit or loss
› floating_profit_loss_usd number Only for options, floating profit or loss in USD
› gamma number Only for options, Gamma parameter
› index_price number Current index price
› initial_margin number Initial margin
› instrument_name string Unique instrument identifier
› interest_value number Value used to calculate realized_funding (perpetual only)
› kind string Instrument kind: "future", "option", "spot", "future_combo", "option_combo"
› leverage integer Current available leverage for future position
› maintenance_margin number Maintenance margin
› mark_price number Current mark price for position's instrument
› open_orders_margin number Open orders margin
› realized_funding number Realized Funding in current session included in session realized profit or loss, only for positions of perpetual instruments
› realized_profit_loss number Realized profit or loss
› settlement_price number Optional (not added for spot). Last settlement price for position's instrument 0 if instrument wasn't settled yet
› size number Position size for futures size in quote currency (e.g. USD), for options size is in base currency (e.g. BTC)
› size_currency number Only for futures, position size in base currency
› theta number Only for options, Theta parameter
› total_profit_loss number Profit or loss from position
› vega number Only for options, Vega parameter
/private/get_subaccounts
var msg =
{
"jsonrpc" : "2.0",
"id" : 4947,
"method" : "private/get_subaccounts",
"params" : {
"with_portfolio" : true
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 4947,
"result": [
{
"email": "user_AAA@email.com",
"id": 2,
"is_password": true,
"margin_model": "segregated_sm",
"login_enabled": true,
"portfolio": {
"eth": {
"additional_reserve": 0,
"spot_reserve": 0,
"available_funds": 5,
"available_withdrawal_funds": 5,
"balance": 5,
"currency": "eth",
"equity": 5,
"initial_margin": 0,
"maintenance_margin": 0,
"margin_balance": 5
},
"btc": {
"additional_reserve": 0,
"spot_reserve": 0,
"available_funds": 5.000413075,
"available_withdrawal_funds": 5.000413075,
"balance": 5.000593987,
"currency": "btc",
"equity": 5.000571846,
"initial_margin": 0.000158771,
"maintenance_margin": 0.000115715,
"margin_balance": 5.000571846
}
},
"receive_notifications": false,
"system_name": "user_1",
"security_keys_enabled": false,
"security_keys_assignments": [],
"type": "main",
"username": "user_1"
},
{
"email": "user_AAA@gmail.com",
"id": 7,
"is_password": true,
"margin_model": "cross_pm",
"login_enabled": false,
"portfolio": {
"eth": {
"additional_reserve": 0,
"spot_reserve": 0,
"available_funds": 0,
"available_withdrawal_funds": 0,
"balance": 0,
"currency": "eth",
"equity": 0,
"initial_margin": 0,
"maintenance_margin": 0,
"margin_balance": 0
},
"btc": {
"additional_reserve": 0,
"spot_reserve": 0,
"available_funds": 0,
"available_withdrawal_funds": 0,
"balance": 0,
"currency": "btc",
"equity": 0,
"initial_margin": 0,
"maintenance_margin": 0,
"margin_balance": 0
}
},
"receive_notifications": false,
"system_name": "user_1_1",
"security_keys_enabled": false,
"security_keys_assignments": [],
"type": "subaccount",
"username": "user_1_1"
}
]
}

Get information about subaccounts. When called from subaccount, the response will include limited details for the main account and details for the subaccount initiating the request. The portfolio information will be included in the response only if the with_portfolio parameter is set to true.

Scope: account:read

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
with_portfolio false boolean Portfolio flag: true for portfolio information, false for subaccount information only. false by default
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result array of object
› email string User email
› id integer Account/Subaccount identifier
› is_password boolean true when password for the subaccount has been configured
› login_enabled boolean Informs whether login to the subaccount is enabled
› margin_model string Margin model
› not_confirmed_email string New email address that has not yet been confirmed. This field is only included if with_portfolio == true.
› portfolio object
› › btc object
› › › additional_reserve number The account's balance reserved in other orders
› › › available_funds number
› › › available_withdrawal_funds number
› › › balance number
› › › currency string
› › › equity number
› › › initial_margin number
› › › maintenance_margin number
› › › margin_balance number
› › › spot_reserve number
› › eth object
› › › additional_reserve number The account's balance reserved in other orders
› › › available_funds number
› › › available_withdrawal_funds number
› › › balance number
› › › currency string
› › › equity number
› › › initial_margin number
› › › maintenance_margin number
› › › margin_balance number
› › › spot_reserve number
› proof_id string hashed identifier used in the Proof Of Liability for the subaccount. This identifier allows you to find your entries in the Deribit Proof-Of-Reserves files. IMPORTANT: Keep it secret to not disclose your entries in the Proof-Of-Reserves.
› proof_id_signature string signature used as a base string for proof_id hash. IMPORTANT: Keep it secret to not disclose your entries in the Proof-Of-Reserves.
› receive_notifications boolean When true - receive all notification emails on the main email
› security_keys_assignments array Names of assignments with Security Keys assigned
› security_keys_enabled boolean Whether the Security Keys authentication is enabled
› system_name string System generated user nickname
› type string
› username string
/private/get_subaccounts_details
var msg =
{
"method" : "private/get_subaccounts_details",
"params" : {
"currency" : "BTC"
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc":"2.0",
"result":[
{
"uid": 3,
"positions": [
{
"total_profit_loss": -0.000118183,
"size_currency": 0.004152776,
"size": 200.0,
"settlement_price": 48150.36,
"realized_profit_loss": -8.79e-7,
"realized_funding": -8.8e-7,
"open_orders_margin": 0.0,
"mark_price": 48160.55,
"maintenance_margin": 0.000089286,
"leverage": 34,
"kind": "future",
"instrument_name": "BTC-PERPETUAL",
"initial_margin": 0.000122508,
"index_price": 47897.12,
"floating_profit_loss": -0.00003451,
"estimated_liquidation_price": 2.33,
"direction": "buy",
"delta": 0.004152776,
"average_price": 49571.3
}
]
}, {
"uid":10,
"positions": [
{
"total_profit_loss":0.000037333,
"size_currency":-0.001308984,
"size":-60.0,
"settlement_price":47886.98,
"realized_profit_loss":0.0,
"open_orders_margin":0.0,
"mark_price":45837.07,
"maintenance_margin":0.000028143,
"leverage":34,
"kind":"future",
"instrument_name":"BTC-3SEP21",
"initial_margin":0.000038615,
"index_price":47897.12,
"floating_profit_loss":0.000037333,
"estimated_liquidation_price":null,
"direction":"sell",
"delta":-0.001308984,
"average_price":47182.76
}
]
}
]
}

Get subaccounts positions

Scope: account:read

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
currency true string BTC
ETH
USDC
USDT
EURR The currency symbol
with_open_orders false boolean Optional parameter to ask for open orders list, default: false
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result array of object
› open_orders array of object
› › reject_post_only boolean true if order has reject_post_only flag (field is present only when post_only is true)
› › label string User defined label (up to 64 characters)
› › quote_id string The same QuoteID as supplied in the private/mass_quote request.
› › order_state string Order state: "open", "filled", "rejected", "cancelled", "untriggered"
› › is_secondary_oto boolean true if the order is an order that can be triggered by another order, otherwise not present.
› › usd number Option price in USD (Only if advanced="usd")
› › implv number Implied volatility in percent. (Only if advanced="implv")
› › trigger_reference_price number The price of the given trigger at the time when the order was placed (Only for trailing trigger orders)
› › original_order_type string Original order type. Optional field
› › oco_ref string Unique reference that identifies a one_cancels_others (OCO) pair.
› › block_trade boolean true if order made from block_trade trade, added only in that case.
› › trigger_price number Trigger price (Only for future trigger orders)
› › api boolean true if created with API
› › mmp boolean true if the order is a MMP order, otherwise false.
› › oto_order_ids array of string The Ids of the orders that will be triggered if the order is filled
› › trigger_order_id string Id of the trigger order that created the order (Only for orders that were created by triggered orders).
› › cancel_reason string Enumerated reason behind cancel "user_request", "autoliquidation", "cancel_on_disconnect", "risk_mitigation", "pme_risk_reduction" (portfolio margining risk reduction), "pme_account_locked" (portfolio margining account locked per currency), "position_locked", "mmp_trigger" (market maker protection), "mmp_config_curtailment" (market maker configured quantity decreased), "edit_post_only_reject" (cancelled on edit because of reject_post_only setting), "oco_other_closed" (the oco order linked to this order was closed), "oto_primary_closed" (the oto primary order that was going to trigger this order was cancelled), "settlement" (closed because of a settlement)
› › primary_order_id string Unique order identifier
› › quote boolean If order is a quote. Present only if true.
› › risk_reducing boolean true if the order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users), otherwise false.
› › filled_amount number Filled amount of the order. For perpetual and futures the filled_amount is in USD units, for options - in units or corresponding cryptocurrency contracts, e.g., BTC or ETH.
› › instrument_name string Unique instrument identifier
› › max_show number Maximum amount within an order to be shown to other traders, 0 for invisible order.
› › app_name string The name of the application that placed the order on behalf of the user (optional).
› › mmp_cancelled boolean true if order was cancelled by mmp trigger (optional)
› › direction string Direction: buy, or sell
› › last_update_timestamp integer The timestamp (milliseconds since the Unix epoch)
› › trigger_offset number The maximum deviation from the price peak beyond which the order will be triggered (Only for trailing trigger orders)
› › mmp_group string Name of the MMP group supplied in the private/mass_quote request.
› › price number or string Price in base currency or "market_price" in case of open trigger market orders
› › is_liquidation boolean Optional (not added for spot). true if order was automatically created during liquidation
› › reduce_only boolean Optional (not added for spot). 'true for reduce-only orders only'
› › amount number It represents the requested order size. For perpetual and futures the amount is in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› › is_primary_otoco boolean true if the order is an order that can trigger an OCO pair, otherwise not present.
› › post_only boolean true for post-only orders only
› › mobile boolean optional field with value true added only when created with Mobile Application
› › trigger_fill_condition string
The fill condition of the linked order (Only for linked order types), default: first_hit.

"first_hit" - any execution of the primary order will fully cancel/place all secondary orders.
"complete_fill" - a complete execution (meaning the primary order no longer exists) will cancel/place the secondary orders.
"incremental" - any fill of the primary order will cause proportional partial cancellation/placement of the secondary order. The amount that will be subtracted/added to the secondary order will be rounded down to the contract size.
› › triggered boolean Whether the trigger order has been triggered
› › order_id string Unique order identifier
› › replaced boolean true if the order was edited (by user or - in case of advanced options orders - by pricing engine), otherwise false.
› › order_type string Order type: "limit", "market", "stop_limit", "stop_market"
› › time_in_force string Order time in force: "good_til_cancelled", "good_til_day", "fill_or_kill" or "immediate_or_cancel"
› › auto_replaced boolean Options, advanced orders only - true if last modification of the order was performed by the pricing engine, otherwise false.
› › quote_set_id string Identifier of the QuoteSet supplied in the private/mass_quote request.
› › contracts number It represents the order size in contract units. (Optional, may be absent in historical data).
› › trigger string Trigger type (only for trigger orders). Allowed values: "index_price", "mark_price", "last_price".
› › web boolean true if created via Deribit frontend (optional)
› › creation_timestamp integer The timestamp (milliseconds since the Unix epoch)
› › is_rebalance boolean Optional (only for spot). true if order was automatically created during cross-collateral balance restoration
› › average_price number Average fill price of the order
› › advanced string advanced type: "usd" or "implv" (Only for options; field is omitted if not applicable).
› positions array of object
› › average_price number Average price of trades that built this position
› › average_price_usd number Only for options, average price in USD
› › delta number Delta parameter
› › direction string Direction: buy, sell or zero
› › floating_profit_loss number Floating profit or loss
› › floating_profit_loss_usd number Only for options, floating profit or loss in USD
› › gamma number Only for options, Gamma parameter
› › index_price number Current index price
› › initial_margin number Initial margin
› › instrument_name string Unique instrument identifier
› › interest_value number Value used to calculate realized_funding (perpetual only)
› › kind string Instrument kind: "future", "option", "spot", "future_combo", "option_combo"
› › leverage integer Current available leverage for future position
› › maintenance_margin number Maintenance margin
› › mark_price number Current mark price for position's instrument
› › realized_funding number Realized Funding in current session included in session realized profit or loss, only for positions of perpetual instruments
› › realized_profit_loss number Realized profit or loss
› › settlement_price number Optional (not added for spot). Last settlement price for position's instrument 0 if instrument wasn't settled yet
› › size number Position size for futures size in quote currency (e.g. USD), for options size is in base currency (e.g. BTC)
› › size_currency number Only for futures, position size in base currency
› › theta number Only for options, Theta parameter
› › total_profit_loss number Profit or loss from position
› › vega number Only for options, Vega parameter
› uid integer Account/Subaccount identifier
/private/get_transaction_log
var msg =
{
"method" : "private/get_transaction_log",
"params" : {
"currency" : "BTC",
"start_timestamp" : "1613657734000",
"end_timestamp" : "1613660407000",
"count" : 5
},
"jsonrpc" : "2.0",
"id" : 4
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 4,
"result": {
"logs": [
{
"username": "TestUser",
"user_seq": 6009,
"user_id": 7,
"type": "transfer",
"trade_id": null,
"timestamp": 1613659830333,
"side": "-",
"price": null,
"position": null,
"order_id": null,
"interest_pl": null,
"instrument_name": null,
"info": {
"transfer_type": "subaccount",
"other_user_id": 27,
"other_user": "Subaccount"
},
"id": 61312,
"equity": 3000.9275869,
"currency": "BTC",
"commission": 0,
"change": -2.5,
"cashflow": -2.5,
"balance": 3001.22270418
},
{
"username": "TestUser",
"user_seq": 6008,
"user_id": 7,
"type": "settlement",
"trade_id": null,
"total_interest_pl": 0.00001243,
"timestamp": 1613659544153,
"side": "long",
"session_upl": 0.00220172,
"session_rpl": -0.00004467,
"price_currency": "USD",
"price": 51807.07,
"position": 1520,
"order_id": null,
"interest_pl": 0.00000993,
"instrument_name": "BTC-PERPETUAL",
"info": {
"settlement_price": 51807,
"floating_pl": 0.00220172
},
"id": 61311,
"equity": 3003.42821428,
"currency": "BTC",
"commission": null,
"change": 0.00215706,
"cashflow": 0.00215706,
"balance": 3003.72270418,
"amount": 1520
},
{
"username": "TestUser",
"user_seq": 6007,
"user_id": 7,
"type": "deposit",
"trade_id": null,
"timestamp": 1613657828414,
"side": "-",
"price": null,
"position": null,
"order_id": null,
"interest_pl": null,
"instrument_name": null,
"info": {
"transaction": "de6eba075855f32c9510f338d3ca0900376cedcb9f7b142caccfbdc292d3237e",
"deposit_type": "wallet",
"addr": "2N8prMvpZHr8aYqodX3S4yhz5wMxjY8La3p"
},
"id": 61291,
"equity": 3003.4876111,
"currency": "BTC",
"commission": 0,
"change": 0.65,
"cashflow": 0.65,
"balance": 3003.72054712
},
{
"username": "TestUser",
"user_seq": 6006,
"user_role": "maker",
"user_id": 7,
"type": "trade",
"trade_id": "28349",
"timestamp": 1613657734620,
"side": "open buy",
"profit_as_cashflow": false,
"price_currency": "BTC",
"price": 0.1537,
"position": 0.7,
"order_id": "67546",
"mark_price": 0.04884653215049635,
"interest_pl": 0,
"instrument_name": "BTC-19FEB21-49200-C",
"info": "Source: api",
"id": 61289,
"equity": 3002.83270455,
"currency": "BTC",
"commission": 0,
"change": -0.10759,
"cashflow": -0.10759,
"balance": 3003.07054712,
"amount": 0.7
},
{
"username": "TestUser",
"user_seq": 6005,
"user_role": "maker",
"user_id": 7,
"type": "trade",
"trade_id": "28349",
"timestamp": 1613657734620,
"side": "close buy",
"profit_as_cashflow": false,
"price_currency": "BTC",
"price": 0.1537,
"position": 0,
"order_id": "67546",
"mark_price": 0.04884653215049635,
"interest_pl": 0,
"instrument_name": "BTC-19FEB21-49200-C",
"info": "Source: api",
"id": 61288,
"equity": 3002.83270455,
"currency": "BTC",
"commission": 0,
"change": -0.04611,
"cashflow": -0.04611,
"balance": 3003.17813712,
"amount": 0.3
}
],
"continuation": 61282
}
}
Retrieve the latest user trades that have occurred for a specific instrument and within a given time range.

Scope: account:read

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
currency true string BTC
ETH
USDC
USDT
EURR The currency symbol
start_timestamp true integer The earliest timestamp to return result from (milliseconds since the UNIX epoch)
end_timestamp true integer The most recent timestamp to return result from (milliseconds since the UNIX epoch)
query false string The following keywords can be used to filter the results: trade, maker, taker, open, close, liquidation, buy, sell, withdrawal, delivery, settlement, deposit, transfer, option, future, correction, block_trade, swap. Plus withdrawal or transfer addresses
count false integer Number of requested items, default - 100
continuation false integer Continuation token for pagination
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› continuation integer Continuation token for pagination. NULL when no continuation.
› logs array of object
› › amount number It represents the requested order size. For perpetual and inverse futures the amount is in USD units. For linear futures it is the underlying base currency coin. For options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH
› › balance number Cash balance after the transaction
› › cashflow number For futures and perpetual contracts: Realized session PNL (since last settlement). For options: the amount paid or received for the options traded.
› › change number Change in cash balance. For trades: fees and options premium paid/received. For settlement: Futures session PNL and perpetual session funding.
› › commission number Commission paid so far (in base currency)
› › contracts number It represents the order size in contract units. (Optional, may be absent in historical data).
› › currency string Currency, i.e "BTC", "ETH", "USDC"
› › equity number Updated equity value after the transaction
› › id integer Unique identifier
› › info object Additional information regarding transaction. Strongly dependent on the log entry type
› › instrument_name string Unique instrument identifier
› › interest_pl number Actual funding rate of trades and settlements on perpetual instruments
› › mark_price number Market price during the trade
› › order_id string Unique order identifier
› › position number Updated position size after the transaction
› › price number Settlement/delivery price or the price level of the traded contracts
› › price_currency string Currency symbol associated with the price field value
› › profit_as_cashflow boolean Indicator informing whether the cashflow is waiting for settlement or not
› › session_rpl number Session realized profit and loss
› › session_upl number Session unrealized profit and loss
› › side string One of: short or long in case of settlements, close sell or close buy in case of deliveries, open sell, open buy, close sell, close buy in case of trades
› › timestamp integer The timestamp (milliseconds since the Unix epoch)
› › total_interest_pl number Total session funding rate
› › trade_id string Unique (per currency) trade identifier
› › type string Transaction category/type. The most common are: trade, deposit, withdrawal, settlement, delivery, transfer, swap, correction. New types can be added any time in the future
› › user_id integer Unique user identifier
› › user_role string Trade role of the user: maker or taker
› › user_seq integer Sequential identifier of user transaction
› › username string System name or user defined subaccount alias
/private/get_user_locks
var msg =
{
"id" : 74,
"method" : "private/get_user_locks",
"params" : {

}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"id":74,
"result":[
{
"message":"locked in one currency",
"locked":true,
"currency":"BTC"
},
{
"locked":false,
"currency":"ETH"
},
{
"locked":false,
"currency":"USDC"
},
{
"locked":false,
"currency":"SOL"
}
]
}

Retrieves information about locks on user account

Scope: account:read

Try in API console

This is a private method; it can only be used after authentication.
Parameters
This method takes no parameters

Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result array of object
› currency string Currency, i.e "BTC", "ETH", "USDC"
› enabled boolean Value is set to 'true' when user account is locked in currency
› message text Optional information for user why his account is locked
/private/list_api_keys
var msg =
{
"jsonrpc" : "2.0",
"id" : 2553,
"method" : "private/list_api_keys"
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 2553,
"result": [
{
"timestamp": 1560236001108,
"max_scope": "account:read block_trade:read trade:read_write wallet:read",
"id": 1,
"enabled": false,
"default": false,
"client_secret": "SjM57m1T2CfXZ4vZ76X1APjqRlJdtzHI8IwVXoQnfoM",
"client_id": "TiA4AyLPq3",
"name": "",
"enabled_features": []
},
{
"timestamp": 1560236287708,
"max_scope": "account:read_write block_trade:read_write trade:read_write wallet:read_write",
"id": 2,
"enabled": true,
"default": true,
"client_secret": "mwNOvbUVyQczytQ5IVM8CbzmgqNJ81WvLKfu6MXcJPs",
"client_id": "aD-KFx-H",
"name": "",
"enabled_features": []
}
]
}

Retrieves list of api keys. Important notes.

Scope: account:read

Try in API console

This is a private method; it can only be used after authentication.
Parameters
This method takes no parameters

Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result array of object
› client_id string Client identifier used for authentication
› client_secret string Client secret or MD5 fingerprint of public key used for authentication
› default boolean Informs whether this api key is default (field is deprecated and will be removed in the future)
› enabled boolean Informs whether api key is enabled and can be used for authentication
› enabled_features array of string List of enabled advanced on-key features. Available options:

-   restricted_block_trades: Limit the block_trade read the scope of the API key to block trades that have been made using this specific API key
-   block_trade_approval: Block trades created using this API key require additional user approval
    › id integer key identifier
    › ip_whitelist array List of IP addresses whitelisted for a selected key
    › max_scope string Describes maximal access for tokens generated with given key, possible values: trade:[read, read_write, none], wallet:[read, read_write, none], account:[read, read_write, none], block_trade:[read, read_write, none]. If scope is not provided, its value is set as none.

Please check details described in Access scope
› name string Api key name that can be displayed in transaction log
› public_key string PEM encoded public key (Ed25519/RSA) used for asymmetric signatures (optional)
› timestamp integer The timestamp (milliseconds since the Unix epoch)
/private/list_custody_accounts
var msg =
{
"jsonrpc" : "2.0",
"id" : 2515,
"method" : "private/list_custody_accounts",
"params" : {
"currency" : "BTC"
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 2515,
"result": [{
"name": "copper",
"currency": "BTC",
"client_id": "4KVcFrrzmXBR",
"external_id": "24f97d44-1d72-4641-8527-811268a0bdd3",
"balance": 0.5,
"withdrawals_require_security_key": false,
"pending_withdrawal_balance": 0.1,
"auto_deposit":false
}]
}

Retrieves user custody accounts list.

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
currency true string BTC
ETH
USDC
USDT
EURR The currency symbol
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result array of object Custody account
› auto_deposit boolean When set to 'true' all new funds added to custody balance will be automatically transferred to trading balance
› balance number Amount of funds in given currency
› client_id string API key 'client id' used to reserve/release funds in custody platform, requires scope 'custody:read_write'
› currency string Currency, i.e "BTC", "ETH", "USDC"
› deposit_address string Address that can be used for deposits
› external_id string User ID in external systems
› name string Custody name
› pending_withdrawal_addres string New withdrawal address that will be used after 'withdrawal_address_change'
› pending_withdrawal_balance number Amount of funds in given currency
› withdrawal_address string Address that is used for withdrawals
› withdrawal_address_change number UNIX timestamp after when new withdrawal address will be used for withdrawals
/private/pme/simulate
var msg =
{
"jsonrpc" : "2.0",
"id" : 2255,
"method" : "private/pme/simulate",
"params" : {
"currency" : "BTC"
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 2255,
"result": {
"model_params": {
"currency_pair": {
"btc_usd": {
"extended_table_factor": 1,
"m_inc": 0.00005,
"min_volatility_for_shock_up": 0.5,
"max_delta_shock": 0.1,
"delta_total_liq_shock_threshold": 20000000,
"volatility_range_down": 0.25,
"volatility_range_up": 0.5,
"long_term_vega_power": 0.13,
"short_term_vega_power": 0.3,
"price_range": 0.16
}
},
"currency": {
"usd": {
"max_offsetable_pnl": 0,
"annualised_move_risk": 0.1,
"extended_dampener": 25000,
"min_annualised_move": 0.01,
"haircut": 0,
"equity_side_impact": "none",
"pnl_offset": 0,
"correlation_set": false
},
"btc": {
"max_offsetable_pnl": 0,
"annualised_move_risk": 0.075,
"extended_dampener": 100000,
"min_annualised_move": 0.01,
"haircut": 0,
"equity_side_impact": "both",
"pnl_offset": 0,
"correlation_set": false
}
},
"general": {
"mm_factor": 0.8,
"buckets_count": 4,
"vol_scenarios_count": 3,
"timestamp": 1718619740501
}
},
"aggregated_risk_vectors": {
"btc_btc": {
"standard": [
-0.05968587238095239,
-0.05968587238095239,
-0.05968587238095239,
-0.04272965863636364,
-0.04272965863636364,
-0.04272965863636364,
-0.02724789826086957,
-0.02724789826086957,
-0.02724789826086957,
-0.013056284583333334,
-0.013056284583333334,
-0.013056284583333334,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0
],
"extended": [
0,
0,
0,
0,
0,
0,
0,
0
]
}
},
"initial_risk_vectors": {
"BTC-PERPETUAL": {
"standard": [
-0.05991206933333334,
-0.05991206933333334,
-0.05991206933333334,
-0.04289159509090909,
-0.04289159509090909,
-0.04289159509090909,
-0.027351162086956524,
-0.027351162086956524,
-0.027351162086956524,
-0.013105765166666668,
-0.013105765166666668,
-0.013105765166666668,
0,
0,
0,
0.012097629384615385,
0.012097629384615385,
0.012097629384615385,
0.023299138074074074,
0.023299138074074074,
0.023299138074074074,
0.033700538999999995,
0.033700538999999995,
0.033700538999999995,
0.043384601931034494,
0.043384601931034494,
0.043384601931034494
],
"extended": [
-0.05991206933333334,
-0.05991206933333334,
0.04338460193103449,
0.04338460193103449,
0.04338460193103449,
0.04338460193103449,
0.04338460193103449,
0.04338460193103449
]
},
"BTC-28JUN24": {
"standard": [
0.0002261969523809524,
0.0002261969523809524,
0.0002261969523809524,
0.00016193645454545456,
0.00016193645454545456,
0.00016193645454545456,
0.00010326382608695652,
0.00010326382608695652,
0.00010326382608695652,
0.00004948058333333334,
0.00004948058333333334,
0.00004948058333333334,
0,
0,
0,
-0.00004567438461538462,
-0.00004567438461538462,
-0.00004567438461538462,
-0.00008796548148148148,
-0.00008796548148148148,
-0.00008796548148148148,
-0.0001272357857142857,
-0.0001272357857142857,
-0.0001272357857142857,
-0.00016379779310344832,
-0.00016379779310344832,
-0.00016379779310344832
],
"extended": [
0.0002261969523809524,
0.0002261969523809524,
-0.0001637977931034483,
-0.0001637977931034483,
-0.0001637977931034483,
-0.0001637977931034483,
-0.0001637977931034483,
-0.0001637977931034483
]
}
},
"margins": {
"btc": {
"initial_margin_details": {
"risk_matrix_margin_details": {
"delta_shock": 0,
"roll_shock": 0.00315725898,
"worst_case_bucket": {
"bucket": 1,
"side": "left",
"source": "standard",
"index": 1
},
"worst_case": 0.05968587238095239,
"correlation_contingency": 0
},
"risk_matrix_margin": 0.06284313098,
"spot_margin": 0,
"mmp_margin": 0.06,
"open_orders_margin": 0.000018212
},
"initial_margin": 0.122861343,
"maintenance_margin": 0.050274504784
}
},
"portfolio": {
"currency": {},
"position": {
"BTC-PERPETUAL": 0.314538364,
"BTC-28JUN24": -0.001187534
}
},
"index_price": {
"btc_usd": 65666.19
},
"ticker": {
"BTC-PERPETUAL": {
"mark_price": 65910.57,
"index_price": 65666.19
},
"BTC-28JUN24": {
"mark_price": 67371.75,
"index_price": 65666.19
}
}
}
}
Calculates the Extended Risk Matrix and margin information for the selected currency or against the entire Cross-Collateral portfolio.

Scope: account:read

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
currency true string BTC
ETH
USDC
USDT
EURR
MATIC
SOL
XRP
CROSS The currency for which the Extended Risk Matrix will be calculated. Use CROSS for Cross Collateral simulation.
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object PM details
/private/remove_api_key
var msg =
{
"jsonrpc" : "2.0",
"id" : 8190,
"method" : "private/remove_api_key",
"params" : {
"id" : 2
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 8190,
"result": "ok"
}
Removes api key. Important notes.

Scope: account:read_write

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
id true integer Id of key
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result string Result of method execution. ok in case of success
/private/remove_subaccount
var msg =
{
"method" : "private/remove_subaccount",
"params" : {
"subaccount_id" : 120
},
"jsonrpc" : "2.0",
"id" : 6
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 6,
"result": "ok"
}
Remove empty subaccount.

Scope: account:read_write

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
subaccount_id true integer The user id for the subaccount
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result string Result of method execution. ok in case of success
/private/reset_api_key
var msg =
{
"jsonrpc" : "2.0",
"id" : 6524,
"method" : "private/reset_api_key",
"params" : {
"id" : 3
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 6524,
"result": {
"timestamp": 1560238942222,
"max_scope": "account:read block_trade:read trade:read wallet:read",
"id": 3,
"enabled": true,
"default": false,
"client_secret": "P9Z_c73KaBPwpoTVfsXzehAhjhdJn5kM7Zlz_hhDhE8",
"client_id": "IY2D68DS",
"name": ""
}
}
Resets secret in api key. Important notes.

Scope: account:read_write

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
id true integer Id of key
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object
› client_id string Client identifier used for authentication
› client_secret string Client secret or MD5 fingerprint of public key used for authentication
› default boolean Informs whether this api key is default (field is deprecated and will be removed in the future)
› enabled boolean Informs whether api key is enabled and can be used for authentication
› enabled_features array of string List of enabled advanced on-key features. Available options:

-   restricted_block_trades: Limit the block_trade read the scope of the API key to block trades that have been made using this specific API key
-   block_trade_approval: Block trades created using this API key require additional user approval
    › id integer key identifier
    › ip_whitelist array List of IP addresses whitelisted for a selected key
    › max_scope string Describes maximal access for tokens generated with given key, possible values: trade:[read, read_write, none], wallet:[read, read_write, none], account:[read, read_write, none], block_trade:[read, read_write, none]. If scope is not provided, its value is set as none.

Please check details described in Access scope
› name string Api key name that can be displayed in transaction log
› public_key string PEM encoded public key (Ed25519/RSA) used for asymmetric signatures (optional)
› timestamp integer The timestamp (milliseconds since the Unix epoch)
/private/set_announcement_as_read
var msg =
{
"jsonrpc" : "2.0",
"id" : 5147,
"method" : "private/set_announcement_as_read",
"params" : {
"announcement_id" : 1550058362418
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 5147,
"result": "ok"
}

Marks an announcement as read, so it will not be shown in get_new_announcements.

Scope: account:read_write

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
announcement_id true number the ID of the announcement
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result string Result of method execution. ok in case of success
/private/set_disabled_trading_products
var msg =
{
"method" : "private/set_disabled_trading_products",
"params" : {
"trading_products" : [
"future_combos",
"option_combos",
"spots"
],
"user_id" : 1
},
"jsonrpc" : "2.0"
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"result": "ok"
}

Configure disabled trading products for subaccounts. Only main accounts can modify this for subaccounts.

Scope: account:read_write

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
user_id true integer Id of a (sub)account
trading_products true array List of available trading products. Available products: perpetual, futures, options, future_combos, option_combos, spots
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result string Result of method execution. ok in case of success
/private/set_email_for_subaccount
var msg =
{
"jsonrpc" : "2.0",
"id" : 1667,
"method" : "private/set_email_for_subaccount",
"params" : {
"sid" : 7,
"email" : "user_1_1@email.com"
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 1667,
"result": "ok"
}

Assign an email address to a subaccount. User will receive an email with a confirmation link.

Scope: account:read_write

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
sid true integer The user id for the subaccount
email true string The email address for the subaccount
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result string Result of method execution. ok in case of success
/private/set_email_language
var msg =
{
"jsonrpc" : "2.0",
"id" : 3269,
"method" : "private/set_email_language",
"params" : {
"language" : "en"
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 3269,
"result": "ok"
}

Changes the language to be used for emails.

Scope: account:read_write

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
language true string The abbreviated language name. Valid values include "en", "ko", "zh", "ja", "ru"
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result string Result of method execution. ok in case of success
/private/set_self_trading_config
var msg =
{
"method" : "private/set_self_trading_config",
"params" : {
"mode" : "cancel_maker",
"extended_to_subaccounts" : true
},
"jsonrpc" : "2.0"
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"result": "ok"
}

Configure self trading behavior

Scope: account:read_write

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
mode true string reject_taker
cancel_maker Self trading prevention behavior: reject_taker (reject the incoming order), cancel_maker (cancel the matched order in the book)
extended_to_subaccounts true boolean If value is true trading is prevented between subaccounts of given account, otherwise they are treated separately
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result string Result of method execution. ok in case of success
/private/simulate_portfolio
var msg =
{
"jsonrpc" : "2.0",
"id" : 22222,
"method" : "private/simulate_portfolio",
"params" : {
"currency" : "BTC",
"add_positions" : true,
"simulated_positions" : {
"BTC-PERPETUAL" : 1000.0,
"BTC-5JUL21-40000-C" : 10.0
}
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 1,
"result": {
"vol_range":[
0.38,
0.27
],
"vega_pow2":0.13,
"vega_pow1":0.3,
"skew":0,
"price_range":0.15,
"opt_sum_continguency":0.01,
"opt_continguency":0,
"kurtosis":3,
"int_rate":0,
"initial_margin_factor":1.2,
"ftu_continguency":0.006,
"atm_range":0.1,
"projected_margin_pos":-5,
"projected_margin":-0.10189442464239318,
"position_sizes":{
"BTC-PERPETUAL":0.558417065
},
"pls":[
-0.09854418796795264,
-0.07614778161159977,
-0.055228061388632795,
-0.03564364245649349,
-0.017270630880981342,
0,
0.016264574713157266,
0.03160851312179612,
0.046107831067574254,
0.059830399837685615,
0.07283700849805201
],
"pco_opt":0,
"pco_ftu":0.0033502366744405437,
"opt_summary":[

      ],
      "opt_pls":[
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      "opt_entries":[

      ],
      "margin_pos":-5,
      "margin":-0.10189442464239318,
      "ftu_summary":[
        {
          "short_total_cost":0,
          "pl_vec":[
            -0.09854418796795264,
            -0.07614778161159977,
            -0.055228061388632795,
            -0.03564364245649349,
            -0.017270630880981342,
            0,
            0.016264574713157266,
            0.03160851312179612,
            0.046107831067574254,
            0.059830399837685615,
            0.07283700849805201
          ],
          "long_total_cost":0.558372779073424,
          "exp_tstamp":32503708800000
        }
      ],
      "ftu_pls":[
        -0.09854418796795264,
        -0.07614778161159977,
        -0.055228061388632795,
        -0.03564364245649349,
        -0.017270630880981342,
        0,
        0.016264574713157266,
        0.03160851312179612,
        0.046107831067574254,
        0.059830399837685615,
        0.07283700849805201
      ],
      "ftu_entries":[
        {
          "total_cost":0.558372779073424,
          "size":0,
          "pl_vec":[
            -0.09854418796795264,
            -0.07614778161159977,
            -0.055228061388632795,
            -0.03564364245649349,
            -0.017270630880981342,
            0,
            0.016264574713157266,
            0.03160851312179612,
            0.046107831067574254,
            0.059830399837685615,
            0.07283700849805201
          ],
          "mark_price":43372.6,
          "instrument_name":"BTC-PERPETUAL",
          "exp_tstamp":32503708800000
        }
      ],
      "co_opt":0,
      "co_ftu":0.0033502366744405437,
      "calculation_timestamp":1632142954444
    },
    "usIn": 1575898767751007,
    "usOut": 1575898767751544,
    "usDiff": 537,
    "testnet": false

}

Calculates portfolio margin info for simulated position or current position of the user. This request has a special restricted rate limit (not more than once per a second).

Scope: account:read

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
currency true string BTC
ETH
USDC
USDT
EURR The currency symbol
add_positions false boolean If true, adds simulated positions to current positions, otherwise uses only simulated positions. By default true
simulated_positions false object Object with positions in following form: {InstrumentName1: Position1, InstrumentName2: Position2...}, for example {"BTC-PERPETUAL": -1000.0} (or corresponding URI-encoding for GET). For futures in USD, for options in base currency.
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result object PM details
/private/toggle_notifications_from_subaccount
var msg =
{
"jsonrpc" : "2.0",
"id" : 9995,
"method" : "private/toggle_notifications_from_subaccount",
"params" : {
"sid" : 7,
"state" : true
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 9995,
"result": "ok"
}
Enable or disable sending of notifications for the subaccount.

Scope: account:read_write

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
sid true integer The user id for the subaccount
state true boolean enable (true) or disable (false) notifications
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result string Result of method execution. ok in case of success
/private/toggle_portfolio_margining
var msg =
{
"method" : "private/toggle_portfolio_margining",
"params" : {
"user_id" : 3,
"enabled" : true
},
"jsonrpc" : "2.0",
"id" : 1
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 1,
"result": [
{
"old_state": {
"maintenance_margin_rate": 0,
"initial_margin_rate": 0,
"available_balance": 0
},
"new_state": {
"maintenance_margin_rate": 0,
"initial_margin_rate": 0,
"available_balance": 0
},
"currency": "eth"
},
{
"old_state": {
"maintenance_margin_rate": 0.02862727,
"initial_margin_rate": 0.45407615,
"available_balance": 0.553590509
},
"new_state": {
"maintenance_margin_rate": 0.02710204,
"initial_margin_rate": 0.03252245,
"available_balance": 0.98106428
},
"currency": "btc"
}
]
}

Toggle between SM and PM models

Scope: account:read_write

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
user_id false integer Id of a (sub)account - by default current user id is used
enabled true boolean Whether PM or SM should be enabled - PM while true, SM otherwise
dry_run false boolean If true request returns the result without switching the margining model. Default: false
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result array of object
› currency string Currency, i.e "BTC", "ETH", "USDC"
› new_state object Represents portfolio state after change
› › available_balance number Available balance after change
› › initial_margin_rate number Initial margin rate after change
› › maintenance_margin_rate number Maintenance margin rate after change
› old_state object Represents portfolio state before change
› › available_balance number Available balance before change
› › initial_margin_rate number Initial margin rate before change
› › maintenance_margin_rate number Maintenance margin rate before change
/private/toggle_subaccount_login
var msg =
{
"jsonrpc" : "2.0",
"id" : 938,
"method" : "private/toggle_subaccount_login",
"params" : {
"sid" : 7,
"state" : "enable"
}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the response...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
// -------------------
// Before sending message, make sure that your connection
// is authenticated (use public/auth call before)
// -------------------
ws.send(JSON.stringify(msg));
};
The above command returns JSON structured like this (real example):

{
"jsonrpc": "2.0",
"id": 938,
"result": "ok"
}

Enable or disable login for a subaccount. If login is disabled and a session for the subaccount exists, this session will be terminated.

Scope: account:read_write

Try in API console

This is a private method; it can only be used after authentication.
Parameters
Parameter Required Type Enum Description
sid true integer The user id for the subaccount
state true string enable
disable enable or disable login.
Response
Name Type Description
id integer The id that was sent in the request
jsonrpc string The JSON-RPC version (2.0)
result string Result of method execution. ok in case of success
Subscriptions
The subscribe method can be used to subscribe to one or more channels. This section provides an overview of the channels and the notifications that the subscriber will receive for each of those channels.

In most cases the channel name is constructed from a couple of elements. This makes it possible to specify exactly which information is required, and/or the frequency or aggregation level. These elements are considered parameters for the subscription.

For example, when subscribing to the channel book.BTC-27JUL18.10.20.100ms, the element BTC-27JUL18 specifies that the name of the instrument (see naming), 10 means that the results should be grouped to that precision, etc.

As described in notifications, response data includes fields required by JSON-RPC and part dedicated for subscription data.

Name Type Description
jsonrpc string The JSON-RPC version (2.0)
method string Here it's always subscription
params object
› channel string The same channel as given when subscribing to notifications
› label string The same label as given when subscribing to notifications (present only when provided in private/subscribe; only for private channels)
› data object Data specific for the channel
For all the following channel types only specific data part will be described.

user.access_log
Subscriptions are only available via websockets.

// To subscribe to this channel:
var msg =
{"jsonrpc": "2.0",
"method": "private/subscribe",
"id": 42,
"params": {
"channels": ["user.access_log"]}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the notifications...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
This subscription will send next notifications like this:

{
"params" : {
"data" : {
"timestamp" : 1632488963633,
"log" : "success",
"ip" : "8.9.10.11",
"id" : 243343,
"country" : "China",
"city" : "Pekin"
},
"channel" : "user.access_log"
},
"method" : "subscription",
"jsonrpc" : "2.0"
}
Get notifications about security events related to the account

Try in API console

This is a private subscription; subscribing is only possible when authenticated.
Channel Parameters
This method takes no parameters

Response
Name Type Description
data object
› city string City where the IP address is registered (estimated)
› country string Country where the IP address is registered (estimated)
› data object or string Optional, additional information about action, type depends on log value
› id integer Unique identifier
› ip string IP address of source that generated action
› log string Action description, values: changed_email - email was changed; changed_password - password was changed; disabled_tfa - TFA was disabled; enabled_tfa - TFA was enabled, success - successful login; failure - login failure; enabled_subaccount_login - login was enabled for subaccount (in data - subaccount uid); disabled_subaccount_login - login was disabled for subbaccount (in data - subbacount uid);new_api_key - API key was created (in data key client id); removed_api_key - API key was removed (in data key client id); changed_scope - scope of API key was changed (in data key client id); changed_whitelist - whitelist of API key was edited (in data key client id); disabled_api_key - API key was disabled (in data key client id); enabled_api_key - API key was enabled (in data key client id); reset_api_key - API key was reset (in data key client id)
› timestamp integer The timestamp (milliseconds since the Unix epoch)
user.mmp_trigger.{index_name}
Subscriptions are only available via websockets.

// To subscribe to this channel:
var msg =
{"jsonrpc": "2.0",
"method": "private/subscribe",
"id": 42,
"params": {
"channels": ["user.mmp_trigger.any"]}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the notifications...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
This subscription will send next notifications like this:

{
"params" : {
"data" : {
"mmp_group" : "MassQuoteBot7",
"index_name" : "btc_usdc",
"frozen_until" : 0
},
"channel" : "user.mmp_trigger.any"
},
"method" : "subscription",
"jsonrpc" : "2.0"
}
Triggered when one of mmp limits is crossed

Try in API console

This is a private subscription; subscribing is only possible when authenticated.
Channel Parameters
Parameter Required Type Enum Description
index_name true string btc_usd
eth_usd
btc_usdc
eth_usdc
ada_usdc
algo_usdc
avax_usdc
bch_usdc
doge_usdc
dot_usdc
link_usdc
ltc_usdc
matic_usdc
near_usdc
shib_usdc
sol_usdc
trx_usdc
uni_usdc
xrp_usdc
ada_usdt
algo_usdt
avax_usdt
bch_usdt
bnb_usdt
bnb_usdt
btc_usdt
btc_usdt
doge_usdt
dot_usdt
eth_usdt
eth_usdt
link_usdt
ltc_usdt
luna_usdt
matic_usdt
near_usdt
shib_usdt
sol_usdt
trx_usdt
uni_usdt
xrp_usdt
btcdvol_usdc
ethdvol_usdc Index identifier of derivative instrument on the platform
Response
Name Type Description
data object
› frozen_until integer Timestamp (milliseconds since the UNIX epoch) until the user will be frozen - 0 means that the user is frozen until manual reset.
› index_name string Triggered mmp group, this parameter is optional (appears only for Mass Quote orders trigger)
book.{instrument_name}.{group}.{depth}.{interval}
Subscriptions are only available via websockets.

// To subscribe to this channel:
var msg =
{"jsonrpc": "2.0",
"method": "public/subscribe",
"id": 42,
"params": {
"channels": ["book.ETH-PERPETUAL.100.1.100ms"]}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the notifications...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
This subscription will send next notifications like this:

{
"params" : {
"data" : {
"timestamp" : 1554375447971,
"instrument_name" : "ETH-PERPETUAL",
"change_id" : 109615,
"bids" : [
[
160,
40
]
],
"asks" : [
[
161,
20
]
]
},
"channel" : "book.ETH-PERPETUAL.100.1.100ms"
},
"method" : "subscription",
"jsonrpc" : "2.0"
}
Notifies about changes to the order book for a certain instrument.

Notifications are sent once per specified interval, with prices grouped by (rounded to) the specified group, showing the complete order book to the specified depth (number of price levels).

The 'asks' and the 'bids' elements in the response are both a 'list of lists'. Each element in the outer list is a list of exactly two elements: price and amount.

price is a price level (USD per BTC, rounded as specified by the 'group' parameter for the subscription).

amount indicates the amount of all orders at price level. For perpetual and futures the amount is in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.

Try in API console

Channel Parameters
Parameter Required Type Enum Description
instrument_name true string Instrument name
group true string none
1
2
5
10
25
100
250 Group prices (by rounding). Use none for no grouping.
For ETH cryptocurrency, real group is divided by 100.0, e.g. given value 5 means using 0.05

Allowed values for BTC - none, 1, 2, 5, 10
Allowed values for ETH - none, 5, 10, 25, 100, 250
depth true integer 1
10
20 Number of price levels to be included.
interval true string 100ms
agg2 Frequency of notifications. Events will be aggregated over this interval.
Response
Name Type Description
data object
› asks array of [price, amount] List of asks
› bids array of [price, amount] List of bids
› change_id integer id of the notification
› instrument_name string Unique instrument identifier
› timestamp integer The timestamp of last change (milliseconds since the Unix epoch)
user.changes.{instrument_name}.{interval}
Subscriptions are only available via websockets.

// To subscribe to this channel:
var msg =
{"jsonrpc": "2.0",
"method": "private/subscribe",
"id": 42,
"params": {
"channels": ["user.changes.BTC-PERPETUAL.raw"]}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the notifications...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
This subscription will send next notifications like this:

{
"params" : {
"data" : {
"trades" : [
{
"trade_seq" : 866638,
"trade_id" : "1430914",
"timestamp" : 1605780344032,
"tick_direction" : 1,
"state" : "filled",
"reduce_only" : false,
"profit_loss" : 0.00004898,
"price" : 17391,
"post_only" : false,
"order_type" : "market",
"order_id" : "3398016",
"matching_id" : null,
"mark_price" : 17391,
"liquidity" : "T",
"instrument_name" : "BTC-PERPETUAL",
"index_price" : 17501.88,
"fee_currency" : "BTC",
"fee" : 1.6e-7,
"direction" : "sell",
"amount" : 10
}
],
"positions" : [
{
"total_profit_loss" : 1.69711368,
"size_currency" : 10.646886321,
"size" : 185160,
"settlement_price" : 16025.83,
"realized_profit_loss" : 0.012454598,
"realized_funding" : 0.01235663,
"mark_price" : 17391,
"maintenance_margin" : 0.234575865,
"leverage" : 33,
"kind" : "future",
"interest_value" : 1.7362511643080387,
"instrument_name" : "BTC-PERPETUAL",
"initial_margin" : 0.319750953,
"index_price" : 17501.88,
"floating_profit_loss" : 0.906961435,
"direction" : "buy",
"delta" : 10.646886321,
"average_price" : 15000
}
],
"orders" : [
{
"web" : true,
"time_in_force" : "good_til_cancelled",
"replaced" : false,
"reduce_only" : false,
"price" : 15665.5,
"post_only" : false,
"order_type" : "market",
"order_state" : "filled",
"order_id" : "3398016",
"max_show" : 10,
"last_update_timestamp" : 1605780344032,
"label" : "",
"is_rebalance" : false,
"is_liquidation" : false,
"instrument_name" : "BTC-PERPETUAL",
"filled_amount" : 10,
"direction" : "sell",
"creation_timestamp" : 1605780344032,
"average_price" : 17391,
"api" : false,
"amount" : 10
}
],
"instrument_name" : "BTC-PERPETUAL"
},
"channel" : "user.changes.BTC-PERPETUAL.raw"
},
"method" : "subscription",
"jsonrpc" : "2.0"
}
Get notifications about the user's updates related to order, trades, etc. in an instrument.

Try in API console

This is a private subscription; subscribing is only possible when authenticated.
Channel Parameters
Parameter Required Type Enum Description
instrument_name true string Instrument name
interval true string agg2
100ms
raw Frequency of notifications. Events will be aggregated over this interval. The value raw means no aggregation will be applied (Please note that raw interval is only available to authorized users)
Response
Name Type Description
data array of object
› instrument_name string Unique instrument identifier
› orders array of object
› › reject_post_only boolean true if order has reject_post_only flag (field is present only when post_only is true)
› › label string User defined label (up to 64 characters)
› › quote_id string The same QuoteID as supplied in the private/mass_quote request.
› › order_state string Order state: "open", "filled", "rejected", "cancelled", "untriggered"
› › is_secondary_oto boolean true if the order is an order that can be triggered by another order, otherwise not present.
› › usd number Option price in USD (Only if advanced="usd")
› › implv number Implied volatility in percent. (Only if advanced="implv")
› › trigger_reference_price number The price of the given trigger at the time when the order was placed (Only for trailing trigger orders)
› › original_order_type string Original order type. Optional field
› › oco_ref string Unique reference that identifies a one_cancels_others (OCO) pair.
› › block_trade boolean true if order made from block_trade trade, added only in that case.
› › trigger_price number Trigger price (Only for future trigger orders)
› › api boolean true if created with API
› › mmp boolean true if the order is a MMP order, otherwise false.
› › oto_order_ids array of string The Ids of the orders that will be triggered if the order is filled
› › trigger_order_id string Id of the trigger order that created the order (Only for orders that were created by triggered orders).
› › cancel_reason string Enumerated reason behind cancel "user_request", "autoliquidation", "cancel_on_disconnect", "risk_mitigation", "pme_risk_reduction" (portfolio margining risk reduction), "pme_account_locked" (portfolio margining account locked per currency), "position_locked", "mmp_trigger" (market maker protection), "mmp_config_curtailment" (market maker configured quantity decreased), "edit_post_only_reject" (cancelled on edit because of reject_post_only setting), "oco_other_closed" (the oco order linked to this order was closed), "oto_primary_closed" (the oto primary order that was going to trigger this order was cancelled), "settlement" (closed because of a settlement)
› › primary_order_id string Unique order identifier
› › quote boolean If order is a quote. Present only if true.
› › risk_reducing boolean true if the order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users), otherwise false.
› › filled_amount number Filled amount of the order. For perpetual and futures the filled_amount is in USD units, for options - in units or corresponding cryptocurrency contracts, e.g., BTC or ETH.
› › instrument_name string Unique instrument identifier
› › max_show number Maximum amount within an order to be shown to other traders, 0 for invisible order.
› › app_name string The name of the application that placed the order on behalf of the user (optional).
› › mmp_cancelled boolean true if order was cancelled by mmp trigger (optional)
› › direction string Direction: buy, or sell
› › last_update_timestamp integer The timestamp (milliseconds since the Unix epoch)
› › trigger_offset number The maximum deviation from the price peak beyond which the order will be triggered (Only for trailing trigger orders)
› › mmp_group string Name of the MMP group supplied in the private/mass_quote request.
› › price number or string Price in base currency or "market_price" in case of open trigger market orders
› › is_liquidation boolean Optional (not added for spot). true if order was automatically created during liquidation
› › reduce_only boolean Optional (not added for spot). 'true for reduce-only orders only'
› › amount number It represents the requested order size. For perpetual and futures the amount is in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› › is_primary_otoco boolean true if the order is an order that can trigger an OCO pair, otherwise not present.
› › post_only boolean true for post-only orders only
› › mobile boolean optional field with value true added only when created with Mobile Application
› › trigger_fill_condition string
The fill condition of the linked order (Only for linked order types), default: first_hit.

"first_hit" - any execution of the primary order will fully cancel/place all secondary orders.
"complete_fill" - a complete execution (meaning the primary order no longer exists) will cancel/place the secondary orders.
"incremental" - any fill of the primary order will cause proportional partial cancellation/placement of the secondary order. The amount that will be subtracted/added to the secondary order will be rounded down to the contract size.
› › triggered boolean Whether the trigger order has been triggered
› › order_id string Unique order identifier
› › replaced boolean true if the order was edited (by user or - in case of advanced options orders - by pricing engine), otherwise false.
› › order_type string Order type: "limit", "market", "stop_limit", "stop_market"
› › time_in_force string Order time in force: "good_til_cancelled", "good_til_day", "fill_or_kill" or "immediate_or_cancel"
› › auto_replaced boolean Options, advanced orders only - true if last modification of the order was performed by the pricing engine, otherwise false.
› › quote_set_id string Identifier of the QuoteSet supplied in the private/mass_quote request.
› › contracts number It represents the order size in contract units. (Optional, may be absent in historical data).
› › trigger string Trigger type (only for trigger orders). Allowed values: "index_price", "mark_price", "last_price".
› › web boolean true if created via Deribit frontend (optional)
› › creation_timestamp integer The timestamp (milliseconds since the Unix epoch)
› › is_rebalance boolean Optional (only for spot). true if order was automatically created during cross-collateral balance restoration
› › average_price number Average fill price of the order
› › advanced string advanced type: "usd" or "implv" (Only for options; field is omitted if not applicable).
› position array of object
› › average_price number Average price of trades that built this position
› › average_price_usd number Only for options, average price in USD
› › delta number Delta parameter
› › direction string Direction: buy, sell or zero
› › floating_profit_loss number Floating profit or loss
› › floating_profit_loss_usd number Only for options, floating profit or loss in USD
› › gamma number Only for options, Gamma parameter
› › index_price number Current index price
› › initial_margin number Initial margin
› › instrument_name string Unique instrument identifier
› › interest_value number Value used to calculate realized_funding (perpetual only)
› › kind string Instrument kind: "future", "option", "spot", "future_combo", "option_combo"
› › leverage integer Current available leverage for future position
› › maintenance_margin number Maintenance margin
› › mark_price number Current mark price for position's instrument
› › realized_funding number Realized Funding in current session included in session realized profit or loss, only for positions of perpetual instruments
› › realized_profit_loss number Realized profit or loss
› › settlement_price number Optional (not added for spot). Last settlement price for position's instrument 0 if instrument wasn't settled yet
› › size number Position size for futures size in quote currency (e.g. USD), for options size is in base currency (e.g. BTC)
› › size_currency number Only for futures, position size in base currency
› › theta number Only for options, Theta parameter
› › total_profit_loss number Profit or loss from position
› › vega number Only for options, Vega parameter
› trades array of object
› › timestamp integer The timestamp of the trade (milliseconds since the UNIX epoch)
› › label string User defined label (presented only when previously set for order by user)
› › fee number User's fee in units of the specified fee_currency
› › quote_id string QuoteID of the user order (optional, present only for orders placed with private/mass_quote)
› › liquidity string Describes what was role of users order: "M" when it was maker order, "T" when it was taker order
› › index_price number Index Price at the moment of trade
› › api boolean true if user order was created with API
› › mmp boolean true if user order is MMP
› › legs array Optional field containing leg trades if trade is a combo trade (present when querying for only combo trades and in combo_trades events)
› › trade_seq integer The sequence number of the trade within instrument
› › risk_reducing boolean true if user order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users)
› › instrument_name string Unique instrument identifier
› › fee_currency string Currency, i.e "BTC", "ETH", "USDC"
› › direction string Direction: buy, or sell
› › trade_id string Unique (per currency) trade identifier
› › tick_direction integer Direction of the "tick" (0 = Plus Tick, 1 = Zero-Plus Tick, 2 = Minus Tick, 3 = Zero-Minus Tick).
› › profit_loss number Profit and loss in base currency.
› › matching_id string Always null
› › price number Price in base currency
› › reduce_only string true if user order is reduce-only
› › amount number Trade amount. For perpetual and futures - in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› › post_only string true if user order is post-only
› › liquidation string Optional field (only for trades caused by liquidation): "M" when maker side of trade was under liquidation, "T" when taker side was under liquidation, "MT" when both sides of trade were under liquidation
› › combo_trade_id number Optional field containing combo trade identifier if the trade is a combo trade
› › order_id string Id of the user order (maker or taker), i.e. subscriber's order id that took part in the trade
› › block_trade_id string Block trade id - when trade was part of a block trade
› › order_type string Order type: "limit, "market", or "liquidation"
› › quote_set_id string QuoteSet of the user order (optional, present only for orders placed with private/mass_quote)
› › combo_id string Optional field containing combo instrument name if the trade is a combo trade
› › underlying_price number Underlying price for implied volatility calculations (Options only)
› › contracts number Trade size in contract units (optional, may be absent in historical trades)
› › mark_price number Mark Price at the moment of trade
› › iv number Option implied volatility for the price (Option only)
› › state string Order state: "open", "filled", "rejected", "cancelled", "untriggered" or "archive" (if order was archived)
› › advanced string Advanced type of user order: "usd" or "implv" (only for options; omitted if not applicable)
rfq.{currency}
Subscriptions are only available via websockets.

// To subscribe to this channel:
var msg =
{"jsonrpc": "2.0",
"method": "public/subscribe",
"id": 42,
"params": {
"channels": ["rfq.btc"]}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the notifications...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
This subscription will send next notifications like this:

{
"params" : {
"data" : {
"state" : true,
"side" : null,
"last_rfq_tstamp" : 1634816143836,
"instrument_name" : "BTC-PERPETUAL",
"amount" : null
},
"channel" : "rfq.btc"
},
"method" : "subscription",
"jsonrpc" : "2.0"
}
Get notifications about RFQs for instruments in given currency.

Try in API console

Channel Parameters
Parameter Required Type Enum Description
currency true string BTC
ETH
USDC
USDT
EURR
any The currency symbol or "any" for all
Response
Name Type Description
data object
› amount number It represents the requested order size. For perpetual and futures the amount is in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› instrument_name string Unique instrument identifier
› is_new_instrument boolean true for newly created instruments (optional)
› last_rfq_timestamp integer The timestamp of last RFQ (milliseconds since the Unix epoch)
› side string Side - buy or sell
› state boolean true when RFQ is active, false when inactive
user.combo_trades.{kind}.{currency}.{interval}
Subscriptions are only available via websockets.

// To subscribe to this channel:
var msg =
{"jsonrpc": "2.0",
"method": "private/subscribe",
"id": 42,
"params": {
"channels": ["user.combo_trades.future_combo.BTC.raw"]}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the notifications...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
This subscription will send next notifications like this:

{
"params" : {
"data" : [
{
"trade_seq" : 39,
"trade_id" : "1154",
"timestamp" : 1661867454334,
"tick_direction" : 2,
"state" : "filled",
"risk_reducing" : false,
"reduce_only" : false,
"profit_loss" : null,
"price" : 1191.82,
"post_only" : false,
"order_type" : "limit",
"order_id" : "720074",
"mmp" : false,
"matching_id" : null,
"mark_price" : 767.6,
"liquidity" : "T",
"legs" : [
{
"trade_seq" : 179,
"trade_id" : "1156",
"timestamp" : 1661867454335,
"tick_direction" : 2,
"state" : "filled",
"risk_reducing" : false,
"reduce_only" : false,
"profit_loss" : 0,
"price" : 20008.5,
"post_only" : false,
"order_type" : "limit",
"order_id" : "720078",
"mmp" : false,
"matching_id" : null,
"mark_price" : 20220.61,
"liquidity" : "T",
"instrument_name" : "BTC-PERPETUAL",
"index_price" : 20332.44,
"fee_currency" : "BTC",
"fee" : 5e-8,
"direction" : "buy",
"combo_trade_id" : "1154",
"combo_id" : "BTC-FS-2SEP22_PERP",
"api" : false,
"amount" : 10
},
{
"trade_seq" : 159,
"trade_id" : "1155",
"timestamp" : 1661867454335,
"tick_direction" : 0,
"state" : "filled",
"risk_reducing" : false,
"reduce_only" : false,
"profit_loss" : 0,
"price" : 21200.32,
"post_only" : false,
"order_type" : "limit",
"order_id" : "720077",
"mmp" : false,
"matching_id" : null,
"mark_price" : 20988.21,
"liquidity" : "T",
"instrument_name" : "BTC-2SEP22",
"index_price" : 20332.44,
"fee_currency" : "BTC",
"fee" : 5e-8,
"direction" : "sell",
"combo_trade_id" : "1154",
"combo_id" : "BTC-FS-2SEP22_PERP",
"api" : false,
"amount" : 10
}
],
"instrument_name" : "BTC-FS-2SEP22_PERP",
"index_price" : 20332.44,
"fee_currency" : "BTC",
"fee" : 0,
"direction" : "sell",
"api" : false,
"amount" : 10
}
],
"channel" : "user.combo_trades.future_combo.BTC.raw"
},
"method" : "subscription",
"jsonrpc" : "2.0"
}
Get notifications about the user's trades in any instrument of a given kind and given currency (trades contain legs field).

Try in API console

This is a private subscription; subscribing is only possible when authenticated.
Channel Parameters
Parameter Required Type Enum Description
kind true string future_combo
option_combo
combo Combo instrument kind, "combo" for any combo
currency true string BTC
ETH
USDC
USDT
EURR
any The currency symbol or "any" for all
interval true string agg2
100ms
raw Frequency of notifications. Events will be aggregated over this interval. The value raw means no aggregation will be applied (Please note that raw interval is only available to authorized users)
Response
Name Type Description
data array of object
› timestamp integer The timestamp of the trade (milliseconds since the UNIX epoch)
› label string User defined label (presented only when previously set for order by user)
› fee number User's fee in units of the specified fee_currency
› quote_id string QuoteID of the user order (optional, present only for orders placed with private/mass_quote)
› liquidity string Describes what was role of users order: "M" when it was maker order, "T" when it was taker order
› index_price number Index Price at the moment of trade
› api boolean true if user order was created with API
› mmp boolean true if user order is MMP
› legs array Optional field containing leg trades if trade is a combo trade (present when querying for only combo trades and in combo_trades events)
› trade_seq integer The sequence number of the trade within instrument
› risk_reducing boolean true if user order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users)
› instrument_name string Unique instrument identifier
› fee_currency string Currency, i.e "BTC", "ETH", "USDC"
› direction string Direction: buy, or sell
› trade_id string Unique (per currency) trade identifier
› tick_direction integer Direction of the "tick" (0 = Plus Tick, 1 = Zero-Plus Tick, 2 = Minus Tick, 3 = Zero-Minus Tick).
› profit_loss number Profit and loss in base currency.
› matching_id string Always null
› price number Price in base currency
› reduce_only string true if user order is reduce-only
› amount number Trade amount. For perpetual and futures - in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› post_only string true if user order is post-only
› liquidation string Optional field (only for trades caused by liquidation): "M" when maker side of trade was under liquidation, "T" when taker side was under liquidation, "MT" when both sides of trade were under liquidation
› combo_trade_id number Optional field containing combo trade identifier if the trade is a combo trade
› order_id string Id of the user order (maker or taker), i.e. subscriber's order id that took part in the trade
› block_trade_id string Block trade id - when trade was part of a block trade
› order_type string Order type: "limit, "market", or "liquidation"
› quote_set_id string QuoteSet of the user order (optional, present only for orders placed with private/mass_quote)
› combo_id string Optional field containing combo instrument name if the trade is a combo trade
› underlying_price number Underlying price for implied volatility calculations (Options only)
› contracts number Trade size in contract units (optional, may be absent in historical trades)
› mark_price number Mark Price at the moment of trade
› iv number Option implied volatility for the price (Option only)
› state string Order state: "open", "filled", "rejected", "cancelled", "untriggered" or "archive" (if order was archived)
› advanced string Advanced type of user order: "usd" or "implv" (only for options; omitted if not applicable)
announcements
Subscriptions are only available via websockets.

// To subscribe to this channel:
var msg =
{"jsonrpc": "2.0",
"method": "public/subscribe",
"id": 42,
"params": {
"channels": ["announcements"]}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the notifications...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
This subscription will send next notifications like this:

{
"jsonrpc": "2.0",
"method": "subscription",
"params": {
"channel": "announcements",
"data": {
"action": "new",
"body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
"id": 1532593832021,
"important": true,
"publication_timestamp": 1532593832021,
"title": "Example announcement"
}
}
}
General announcements concerning the Deribit platform.

Try in API console

Channel Parameters
This channel takes no parameters

Response
Name Type Description
data object
› action string Action taken by the platform administrators. Published a new announcement, or deleted the old one
› body string HTML-formatted announcement body
› confirmation boolean Whether the user confirmation is required for this announcement
› id integer Announcement's identifier
› important boolean Whether the announcement is marked as important
› publication_timestamp integer The timestamp (milliseconds since the Unix epoch) of announcement publication
› title string Announcement's title
› unread integer The number of previous unread announcements (optional, only for authorized users).
user.orders.{kind}.{currency}.raw
Subscriptions are only available via websockets.

// To subscribe to this channel:
var msg =
{"jsonrpc": "2.0",
"method": "private/subscribe",
"id": 42,
"params": {
"channels": ["user.orders.any.any.raw"]}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the notifications...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
This subscription will send next notifications like this:

{
"params" : {
"data" : {
"time_in_force" : "good_til_cancelled",
"replaced" : false,
"reduce_only" : false,
"price" : 10542.68,
"post_only" : false,
"original_order_type" : "market",
"order_type" : "limit",
"order_state" : "open",
"order_id" : "6",
"max_show" : 200,
"last_update_timestamp" : 1581507583024,
"label" : "",
"is_rebalance" : false,
"is_liquidation" : false,
"instrument_name" : "BTC-PERPETUAL",
"filled_amount" : 0,
"direction" : "buy",
"creation_timestamp" : 1581507583024,
"average_price" : 0,
"api" : false,
"amount" : 200
},
"channel" : "user.orders.any.any.raw"
},
"method" : "subscription",
"jsonrpc" : "2.0"
}
Get notifications about changes in user's orders in instruments of a given kind and currency.

Try in API console

This is a private subscription; subscribing is only possible when authenticated.
Channel Parameters
Parameter Required Type Enum Description
kind true string future
option
spot
future_combo
option_combo
combo
any Instrument kind, "combo" for any combo or "any" for all
currency true string BTC
ETH
USDC
USDT
EURR
any The currency symbol or "any" for all
Response
Name Type Description
data object
› reject_post_only boolean true if order has reject_post_only flag (field is present only when post_only is true)
› label string User defined label (up to 64 characters)
› quote_id string The same QuoteID as supplied in the private/mass_quote request.
› order_state string Order state: "open", "filled", "rejected", "cancelled", "untriggered"
› is_secondary_oto boolean true if the order is an order that can be triggered by another order, otherwise not present.
› usd number Option price in USD (Only if advanced="usd")
› implv number Implied volatility in percent. (Only if advanced="implv")
› trigger_reference_price number The price of the given trigger at the time when the order was placed (Only for trailing trigger orders)
› original_order_type string Original order type. Optional field
› oco_ref string Unique reference that identifies a one_cancels_others (OCO) pair.
› block_trade boolean true if order made from block_trade trade, added only in that case.
› trigger_price number Trigger price (Only for future trigger orders)
› api boolean true if created with API
› mmp boolean true if the order is a MMP order, otherwise false.
› oto_order_ids array of string The Ids of the orders that will be triggered if the order is filled
› trigger_order_id string Id of the trigger order that created the order (Only for orders that were created by triggered orders).
› cancel_reason string Enumerated reason behind cancel "user_request", "autoliquidation", "cancel_on_disconnect", "risk_mitigation", "pme_risk_reduction" (portfolio margining risk reduction), "pme_account_locked" (portfolio margining account locked per currency), "position_locked", "mmp_trigger" (market maker protection), "mmp_config_curtailment" (market maker configured quantity decreased), "edit_post_only_reject" (cancelled on edit because of reject_post_only setting), "oco_other_closed" (the oco order linked to this order was closed), "oto_primary_closed" (the oto primary order that was going to trigger this order was cancelled), "settlement" (closed because of a settlement)
› primary_order_id string Unique order identifier
› quote boolean If order is a quote. Present only if true.
› risk_reducing boolean true if the order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users), otherwise false.
› filled_amount number Filled amount of the order. For perpetual and futures the filled_amount is in USD units, for options - in units or corresponding cryptocurrency contracts, e.g., BTC or ETH.
› instrument_name string Unique instrument identifier
› max_show number Maximum amount within an order to be shown to other traders, 0 for invisible order.
› app_name string The name of the application that placed the order on behalf of the user (optional).
› mmp_cancelled boolean true if order was cancelled by mmp trigger (optional)
› direction string Direction: buy, or sell
› last_update_timestamp integer The timestamp (milliseconds since the Unix epoch)
› trigger_offset number The maximum deviation from the price peak beyond which the order will be triggered (Only for trailing trigger orders)
› mmp_group string Name of the MMP group supplied in the private/mass_quote request.
› price number or string Price in base currency or "market_price" in case of open trigger market orders
› is_liquidation boolean Optional (not added for spot). true if order was automatically created during liquidation
› reduce_only boolean Optional (not added for spot). 'true for reduce-only orders only'
› amount number It represents the requested order size. For perpetual and futures the amount is in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› is_primary_otoco boolean true if the order is an order that can trigger an OCO pair, otherwise not present.
› post_only boolean true for post-only orders only
› mobile boolean optional field with value true added only when created with Mobile Application
› trigger_fill_condition string
The fill condition of the linked order (Only for linked order types), default: first_hit.

"first_hit" - any execution of the primary order will fully cancel/place all secondary orders.
"complete_fill" - a complete execution (meaning the primary order no longer exists) will cancel/place the secondary orders.
"incremental" - any fill of the primary order will cause proportional partial cancellation/placement of the secondary order. The amount that will be subtracted/added to the secondary order will be rounded down to the contract size.
› triggered boolean Whether the trigger order has been triggered
› order_id string Unique order identifier
› replaced boolean true if the order was edited (by user or - in case of advanced options orders - by pricing engine), otherwise false.
› order_type string Order type: "limit", "market", "stop_limit", "stop_market"
› time_in_force string Order time in force: "good_til_cancelled", "good_til_day", "fill_or_kill" or "immediate_or_cancel"
› auto_replaced boolean Options, advanced orders only - true if last modification of the order was performed by the pricing engine, otherwise false.
› quote_set_id string Identifier of the QuoteSet supplied in the private/mass_quote request.
› contracts number It represents the order size in contract units. (Optional, may be absent in historical data).
› trigger string Trigger type (only for trigger orders). Allowed values: "index_price", "mark_price", "last_price".
› web boolean true if created via Deribit frontend (optional)
› creation_timestamp integer The timestamp (milliseconds since the Unix epoch)
› is_rebalance boolean Optional (only for spot). true if order was automatically created during cross-collateral balance restoration
› average_price number Average fill price of the order
› advanced string advanced type: "usd" or "implv" (Only for options; field is omitted if not applicable).
deribit_price_index.{index_name}
Subscriptions are only available via websockets.

// To subscribe to this channel:
var msg =
{"jsonrpc": "2.0",
"method": "public/subscribe",
"id": 42,
"params": {
"channels": ["deribit_price_index.btc_usd"]}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the notifications...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
This subscription will send next notifications like this:

{
"params" : {
"data" : {
"timestamp" : 1550588002899,
"price" : 3937.89,
"index_name" : "btc_usd"
},
"channel" : "deribit_price_index.btc_usd"
},
"method" : "subscription",
"jsonrpc" : "2.0"
}
Provides information about current value (price) for Deribit Index

Try in API console

Channel Parameters
Parameter Required Type Enum Description
index_name true string ada_usd
algo_usd
avax_usd
bch_usd
btc_usd
doge_usd
dot_usd
eth_usd
link_usd
ltc_usd
matic_usd
near_usd
shib_usd
sol_usd
trx_usd
uni_usd
usdc_usd
xrp_usd
ada_usdc
bch_usdc
algo_usdc
avax_usdc
btc_usdc
doge_usdc
dot_usdc
bch_usdc
eth_usdc
link_usdc
ltc_usdc
matic_usdc
near_usdc
shib_usdc
sol_usdc
trx_usdc
uni_usdc
xrp_usdc
ada_usdt
algo_usdt
avax_usdt
bch_usdt
bnb_usdt
bnb_usdt
btc_usdt
btc_usdt
doge_usdt
dot_usdt
eth_usdt
eth_usdt
link_usdt
ltc_usdt
luna_usdt
matic_usdt
near_usdt
shib_usdt
sol_usdt
trx_usdt
uni_usdt
xrp_usdt
btcdvol_usdc
ethdvol_usdc Index identifier, matches (base) cryptocurrency with quote currency
Response
Name Type Description
data object
› index_name string Index identifier, matches (base) cryptocurrency with quote currency
› price number Current index price
› timestamp integer The timestamp (milliseconds since the Unix epoch)
user.combo_trades.{instrument_name}.{interval}
Subscriptions are only available via websockets.

// To subscribe to this channel:
var msg =
{"jsonrpc": "2.0",
"method": "private/subscribe",
"id": 42,
"params": {
"channels": ["user.combo_trades.BTC-FS-2SEP22_PERP.raw"]}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the notifications...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
This subscription will send next notifications like this:

{
"params" : {
"data" : [
{
"trade_seq" : 39,
"trade_id" : "1154",
"timestamp" : 1661867454334,
"tick_direction" : 2,
"state" : "filled",
"risk_reducing" : false,
"reduce_only" : false,
"profit_loss" : null,
"price" : 1191.82,
"post_only" : false,
"order_type" : "limit",
"order_id" : "720074",
"mmp" : false,
"matching_id" : null,
"mark_price" : 767.6,
"liquidity" : "T",
"legs" : [
{
"trade_seq" : 179,
"trade_id" : "1156",
"timestamp" : 1661867454335,
"tick_direction" : 2,
"state" : "filled",
"risk_reducing" : false,
"reduce_only" : false,
"profit_loss" : 0,
"price" : 20008.5,
"post_only" : false,
"order_type" : "limit",
"order_id" : "720078",
"mmp" : false,
"matching_id" : null,
"mark_price" : 20220.61,
"liquidity" : "T",
"instrument_name" : "BTC-PERPETUAL",
"index_price" : 20332.44,
"fee_currency" : "BTC",
"fee" : 5e-8,
"direction" : "buy",
"combo_trade_id" : "1154",
"combo_id" : "BTC-FS-2SEP22_PERP",
"api" : false,
"amount" : 10
},
{
"trade_seq" : 159,
"trade_id" : "1155",
"timestamp" : 1661867454335,
"tick_direction" : 0,
"state" : "filled",
"risk_reducing" : false,
"reduce_only" : false,
"profit_loss" : 0,
"price" : 21200.32,
"post_only" : false,
"order_type" : "limit",
"order_id" : "720077",
"mmp" : false,
"matching_id" : null,
"mark_price" : 20988.21,
"liquidity" : "T",
"instrument_name" : "BTC-2SEP22",
"index_price" : 20332.44,
"fee_currency" : "BTC",
"fee" : 5e-8,
"direction" : "sell",
"combo_trade_id" : "1154",
"combo_id" : "BTC-FS-2SEP22_PERP",
"api" : false,
"amount" : 10
}
],
"instrument_name" : "BTC-FS-2SEP22_PERP",
"index_price" : 20332.44,
"fee_currency" : "BTC",
"fee" : 0,
"direction" : "sell",
"api" : false,
"amount" : 10
}
],
"channel" : "user.combo_trades.BTC-FS-2SEP22_PERP.raw"
},
"method" : "subscription",
"jsonrpc" : "2.0"
}
Get notifications about the user's trades in an instrument (trades contain legs field).

Try in API console

This is a private subscription; subscribing is only possible when authenticated.
Channel Parameters
Parameter Required Type Enum Description
instrument_name true string Instrument name
interval true string agg2
100ms
raw Frequency of notifications. Events will be aggregated over this interval. The value raw means no aggregation will be applied (Please note that raw interval is only available to authorized users)
Response
Name Type Description
data array of object
› timestamp integer The timestamp of the trade (milliseconds since the UNIX epoch)
› label string User defined label (presented only when previously set for order by user)
› fee number User's fee in units of the specified fee_currency
› quote_id string QuoteID of the user order (optional, present only for orders placed with private/mass_quote)
› liquidity string Describes what was role of users order: "M" when it was maker order, "T" when it was taker order
› index_price number Index Price at the moment of trade
› api boolean true if user order was created with API
› mmp boolean true if user order is MMP
› legs array Optional field containing leg trades if trade is a combo trade (present when querying for only combo trades and in combo_trades events)
› trade_seq integer The sequence number of the trade within instrument
› risk_reducing boolean true if user order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users)
› instrument_name string Unique instrument identifier
› fee_currency string Currency, i.e "BTC", "ETH", "USDC"
› direction string Direction: buy, or sell
› trade_id string Unique (per currency) trade identifier
› tick_direction integer Direction of the "tick" (0 = Plus Tick, 1 = Zero-Plus Tick, 2 = Minus Tick, 3 = Zero-Minus Tick).
› profit_loss number Profit and loss in base currency.
› matching_id string Always null
› price number Price in base currency
› reduce_only string true if user order is reduce-only
› amount number Trade amount. For perpetual and futures - in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› post_only string true if user order is post-only
› liquidation string Optional field (only for trades caused by liquidation): "M" when maker side of trade was under liquidation, "T" when taker side was under liquidation, "MT" when both sides of trade were under liquidation
› combo_trade_id number Optional field containing combo trade identifier if the trade is a combo trade
› order_id string Id of the user order (maker or taker), i.e. subscriber's order id that took part in the trade
› block_trade_id string Block trade id - when trade was part of a block trade
› order_type string Order type: "limit, "market", or "liquidation"
› quote_set_id string QuoteSet of the user order (optional, present only for orders placed with private/mass_quote)
› combo_id string Optional field containing combo instrument name if the trade is a combo trade
› underlying_price number Underlying price for implied volatility calculations (Options only)
› contracts number Trade size in contract units (optional, may be absent in historical trades)
› mark_price number Mark Price at the moment of trade
› iv number Option implied volatility for the price (Option only)
› state string Order state: "open", "filled", "rejected", "cancelled", "untriggered" or "archive" (if order was archived)
› advanced string Advanced type of user order: "usd" or "implv" (only for options; omitted if not applicable)
deribit_price_ranking.{index_name}
Subscriptions are only available via websockets.

// To subscribe to this channel:
var msg =
{"jsonrpc": "2.0",
"method": "public/subscribe",
"id": 42,
"params": {
"channels": ["deribit_price_ranking.btc_usd"]}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the notifications...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
This subscription will send next notifications like this:

{
"params" : {
"data" : [
{
"weight" : 14.285714,
"timestamp" : 1702465142997,
"price" : 41160.5,
"original_price" : 41160.5,
"identifier" : "bitfinex",
"enabled" : true
},
{
"weight" : 14.285714,
"timestamp" : 1702465143045,
"price" : 41119,
"original_price" : 41119,
"identifier" : "bitstamp",
"enabled" : true
},
{
"weight" : 14.285714,
"timestamp" : 1702465139000,
"price" : 41115.53,
"original_price" : 41115.53,
"identifier" : "coinbase",
"enabled" : true
},
{
"weight" : 14.285714,
"timestamp" : 1702465142921,
"price" : 41116.42,
"original_price" : 41116.42,
"identifier" : "gemini",
"enabled" : true
},
{
"weight" : 14.285714,
"timestamp" : 1702465141954,
"price" : 41108.88,
"original_price" : 41108.88,
"identifier" : "itbit",
"enabled" : true
},
{
"weight" : 14.285714,
"timestamp" : 1702465142906,
"price" : 41108.35,
"original_price" : 41108.35,
"identifier" : "kraken",
"enabled" : true
},
{
"weight" : 14.285714,
"timestamp" : 1702465138000,
"price" : 41139.82,
"original_price" : 41139.82,
"identifier" : "okcoin",
"enabled" : true
}
],
"channel" : "deribit_price_ranking.btc_usd"
},
"method" : "subscription",
"jsonrpc" : "2.0"
}
Provides information about current value (price) for stock exchanges used to calculate Deribit Index

Try in API console

Channel Parameters
Parameter Required Type Enum Description
index_name true string ada_usd
algo_usd
avax_usd
bch_usd
btc_usd
doge_usd
dot_usd
eth_usd
link_usd
ltc_usd
matic_usd
near_usd
shib_usd
sol_usd
trx_usd
uni_usd
usdc_usd
xrp_usd
ada_usdc
bch_usdc
algo_usdc
avax_usdc
btc_usdc
doge_usdc
dot_usdc
bch_usdc
eth_usdc
link_usdc
ltc_usdc
matic_usdc
near_usdc
shib_usdc
sol_usdc
trx_usdc
uni_usdc
xrp_usdc
ada_usdt
algo_usdt
avax_usdt
bch_usdt
bnb_usdt
bnb_usdt
btc_usdt
btc_usdt
doge_usdt
dot_usdt
eth_usdt
eth_usdt
link_usdt
ltc_usdt
luna_usdt
matic_usdt
near_usdt
shib_usdt
sol_usdt
trx_usdt
uni_usdt
xrp_usdt
btcdvol_usdc
ethdvol_usdc Index identifier, matches (base) cryptocurrency with quote currency
Response
Name Type Description
data array of object
› enabled boolean Stock exchange status
› identifier string Stock exchange identifier
› original_price number Index price retrieved from stock's data
› price number Adjusted stock exchange index price, used for Deribit price index calculations
› timestamp integer The timestamp of the last update from stock exchange (milliseconds since the UNIX epoch)
› weight number The weight of the ranking given in percent
block_trade_confirmations
Subscriptions are only available via websockets.

// To subscribe to this channel:
var msg =
{"jsonrpc": "2.0",
"method": "public/subscribe",
"id": 42,
"params": {
"channels": ["block_trade_confirmations"]}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the notifications...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
This subscription will send next notifications like this:

{
"params" : {
"data" : {
"user_id" : 7,
"trades" : [
{
"price" : 70246.66,
"instrument_name" : "BTC-PERPETUAL",
"direction" : "buy",
"amount" : 10
}
],
"timestamp" : 1711468468131,
"state" : {
"value" : "rejected",
"timestamp" : 1711468632693
},
"role" : "maker",
"nonce" : "bt-jdqv98"
},
"channel" : "block_trade_confirmations"
},
"method" : "subscription",
"jsonrpc" : "2.0"
}
Provides notifications regarding block trade approval

Try in API console

Channel Parameters
This channel takes no parameters

Response
Name Type Description
data object
› app_name string The name of the application that executed the block trade on behalf of the user (optional).
› counterparty_state object State of the pending block trade for the other party (optional).
› › timestamp integer State timestamp.
› › value string State value.
› nonce string Nonce that can be used to approve or reject pending block trade.
› role string Trade role of the user: maker or taker
› state object State of the pending block trade for current user.
› › timestamp integer State timestamp.
› › value string State value.
› timestamp integer Timestamp that can be used to approve or reject pending block trade.
› trades array of object
› › amount number Trade amount. For perpetual and futures - in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› › direction string Direction: buy, or sell
› › instrument_name string Unique instrument identifier
› › price number Price in base currency
› user_id integer Unique user identifier
ticker.{instrument_name}.{interval}
Subscriptions are only available via websockets.

// To subscribe to this channel:
var msg =
{"jsonrpc": "2.0",
"method": "public/subscribe",
"id": 42,
"params": {
"channels": ["ticker.BTC-PERPETUAL.raw"]}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the notifications...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
This subscription will send next notifications like this:

{
"params" : {
"data" : {
"timestamp" : 1623060194301,
"stats" : {
"volume_usd" : 284061480,
"volume" : 7871.02139035,
"price_change" : 0.7229,
"low" : 35213.5,
"high" : 36824.5
},
"state" : "open",
"settlement_price" : 36169.49,
"open_interest" : 502097590,
"min_price" : 35898.37,
"max_price" : 36991.72,
"mark_price" : 36446.51,
"last_price" : 36457.5,
"interest_value" : 1.7362511643080387,
"instrument_name" : "BTC-PERPETUAL",
"index_price" : 36441.64,
"funding_8h" : 0.0000211,
"estimated_delivery_price" : 36441.64,
"current_funding" : 0,
"best_bid_price" : 36442.5,
"best_bid_amount" : 5000,
"best_ask_price" : 36443,
"best_ask_amount" : 100
},
"channel" : "ticker.BTC-PERPETUAL.raw"
},
"method" : "subscription",
"jsonrpc" : "2.0"
}
Key information about the instrument

Try in API console

Channel Parameters
Parameter Required Type Enum Description
instrument_name true string Instrument name
interval true string agg2
100ms
raw Frequency of notifications. Events will be aggregated over this interval. The value raw means no aggregation will be applied (Please note that raw interval is only available to authorized users)
Response
Name Type Description
data object
› ask_iv number (Only for option) implied volatility for best ask
› best_ask_amount number It represents the requested order size of all best asks
› best_ask_price number The current best ask price, null if there aren't any asks
› best_bid_amount number It represents the requested order size of all best bids
› best_bid_price number The current best bid price, null if there aren't any bids
› bid_iv number (Only for option) implied volatility for best bid
› current_funding number Current funding (perpetual only)
› delivery_price number The settlement price for the instrument. Only when state = closed
› estimated_delivery_price number Estimated delivery price for the market. For more details, see Contract Specification > General Documentation > Expiration Price
› funding_8h number Funding 8h (perpetual only)
› greeks object Only for options
› › delta number (Only for option) The delta value for the option
› › gamma number (Only for option) The gamma value for the option
› › rho number (Only for option) The rho value for the option
› › theta number (Only for option) The theta value for the option
› › vega number (Only for option) The vega value for the option
› index_price number Current index price
› instrument_name string Unique instrument identifier
› interest_rate number Interest rate used in implied volatility calculations (options only)
› interest_value number Value used to calculate realized_funding in positions (perpetual only)
› last_price number The price for the last trade
› mark_iv number (Only for option) implied volatility for mark price
› mark_price number The mark price for the instrument
› max_price number The maximum price for the future. Any buy orders you submit higher than this price, will be clamped to this maximum.
› min_price number The minimum price for the future. Any sell orders you submit lower than this price will be clamped to this minimum.
› open_interest number The total amount of outstanding contracts in the corresponding amount units. For perpetual and futures the amount is in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› settlement_price number Optional (not added for spot). The settlement price for the instrument. Only when state = open
› state string The state of the order book. Possible values are open and closed.
› stats object
› › high number Highest price during 24h
› › low number Lowest price during 24h
› › price_change number 24-hour price change expressed as a percentage, null if there weren't any trades
› › volume number Volume during last 24h in base currency
› › volume_usd number Volume in usd (futures only)
› timestamp integer The timestamp (milliseconds since the Unix epoch)
› underlying_index number Name of the underlying future, or index_price (options only)
› underlying_price number Underlying price for implied volatility calculations (options only)
quote.{instrument_name}
Subscriptions are only available via websockets.

// To subscribe to this channel:
var msg =
{"jsonrpc": "2.0",
"method": "public/subscribe",
"id": 42,
"params": {
"channels": ["quote.BTC-PERPETUAL"]}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the notifications...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
This subscription will send next notifications like this:

{
"params" : {
"data" : {
"timestamp" : 1550658624149,
"instrument_name" : "BTC-PERPETUAL",
"best_bid_price" : 3914.97,
"best_bid_amount" : 40,
"best_ask_price" : 3996.61,
"best_ask_amount" : 50
},
"channel" : "quote.BTC-PERPETUAL"
},
"method" : "subscription",
"jsonrpc" : "2.0"
}
Best bid/ask price and size.

Try in API console

Channel Parameters
Parameter Required Type Enum Description
instrument_name true string Instrument name
Response
Name Type Description
data object
› best_ask_amount number It represents the requested order size of all best asks
› best_ask_price number The current best ask price, null if there aren't any asks
› best_bid_amount number It represents the requested order size of all best bids
› best_bid_price number The current best bid price, null if there aren't any bids
› instrument_name string Unique instrument identifier
› timestamp integer The timestamp (milliseconds since the Unix epoch)
perpetual.{instrument_name}.{interval}
Subscriptions are only available via websockets.

// To subscribe to this channel:
var msg =
{"jsonrpc": "2.0",
"method": "public/subscribe",
"id": 42,
"params": {
"channels": ["perpetual.BTC-PERPETUAL.raw"]}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the notifications...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
This subscription will send next notifications like this:

{
"params" : {
"data" : {
"timestamp" : 1571386349530,
"interest" : 0.004999511380756577,
"index_price" : 7872.88
},
"channel" : "perpetual.BTC-PERPETUAL.raw"
},
"method" : "subscription",
"jsonrpc" : "2.0"
}
Provide current interest rate - but only for perpetual instruments. Other types won't generate any notification.

Try in API console

Channel Parameters
Parameter Required Type Enum Description
instrument_name true string Instrument name
interval true string agg2
100ms
raw Frequency of notifications. Events will be aggregated over this interval. The value raw means no aggregation will be applied (Please note that raw interval is only available to authorized users)
Response
Name Type Description
data object
› index_price number Current index price
› interest number Current interest
› timestamp integer The timestamp (milliseconds since the Unix epoch)
trades.{instrument_name}.{interval}
Subscriptions are only available via websockets.

// To subscribe to this channel:
var msg =
{"jsonrpc": "2.0",
"method": "public/subscribe",
"id": 42,
"params": {
"channels": ["trades.BTC-PERPETUAL.raw"]}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the notifications...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
This subscription will send next notifications like this:

{
"params" : {
"data" : [
{
"trade_seq" : 30289442,
"trade_id" : "48079269",
"timestamp" : 1590484512188,
"tick_direction" : 2,
"price" : 8950,
"mark_price" : 8948.9,
"instrument_name" : "BTC-PERPETUAL",
"index_price" : 8955.88,
"direction" : "sell",
"amount" : 10
}
],
"channel" : "trades.BTC-PERPETUAL.raw"
},
"method" : "subscription",
"jsonrpc" : "2.0"
}
Get notifications about trades for an instrument.

Try in API console

Channel Parameters
Parameter Required Type Enum Description
instrument_name true string Instrument name
interval true string agg2
100ms
raw Frequency of notifications. Events will be aggregated over this interval. The value raw means no aggregation will be applied (Please note that raw interval is only available to authorized users)
Response
Name Type Description
data object
› amount number Trade amount. For perpetual and futures - in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› block_trade_id string Block trade id - when trade was part of a block trade
› block_trade_leg_count integer Block trade leg count - when trade was part of a block trade
› contracts number Trade size in contract units (optional, may be absent in historical trades)
› direction string Direction: buy, or sell
› index_price number Index Price at the moment of trade
› instrument_name string Unique instrument identifier
› iv number Option implied volatility for the price (Option only)
› liquidation string Optional field (only for trades caused by liquidation): "M" when maker side of trade was under liquidation, "T" when taker side was under liquidation, "MT" when both sides of trade were under liquidation
› mark_price number Mark Price at the moment of trade
› price number Price in base currency
› tick_direction integer Direction of the "tick" (0 = Plus Tick, 1 = Zero-Plus Tick, 2 = Minus Tick, 3 = Zero-Minus Tick).
› timestamp integer The timestamp of the trade (milliseconds since the UNIX epoch)
› trade_id string Unique (per currency) trade identifier
› trade_seq integer The sequence number of the trade within instrument
platform_state.public_methods_state
Subscriptions are only available via websockets.

// To subscribe to this channel:
var msg =
{"jsonrpc": "2.0",
"method": "public/subscribe",
"id": 42,
"params": {
"channels": ["platform_state.public_methods_state"]}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the notifications...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
This subscription will send next notifications like this:

{
"params" : {
"data" : {
"allow_unauthenticated_public_requests" : true
},
"channel" : "platform_state.public_methods_state"
},
"method" : "subscription",
"jsonrpc" : "2.0"
}
Information whether unauthorized public requests are allowed

Try in API console

Channel Parameters
This channel takes no parameters

Response
Name Type Description
data object
› allow_unauthenticated_public_requests boolean Value is set to 'true' when unauthorized public requests are allowed
trades.{kind}.{currency}.{interval}
Subscriptions are only available via websockets.

// To subscribe to this channel:
var msg =
{"jsonrpc": "2.0",
"method": "public/subscribe",
"id": 42,
"params": {
"channels": ["trades.option.BTC.raw"]}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the notifications...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
This subscription will send next notifications like this:

{
"params" : {
"data" : [
{
"trade_seq" : 2,
"trade_id" : "48079289",
"timestamp" : 1590484589306,
"tick_direction" : 2,
"price" : 0.0075,
"mark_price" : 0.01062686,
"iv" : 47.58,
"instrument_name" : "BTC-27MAY20-9000-C",
"index_price" : 8956.17,
"direction" : "sell",
"amount" : 3
}
],
"channel" : "trades.option.BTC.raw"
},
"method" : "subscription",
"jsonrpc" : "2.0"
}
Get notifications about trades in any instrument of a given kind and given currency.

Try in API console

Channel Parameters
Parameter Required Type Enum Description
kind true string future
option
spot
future_combo
option_combo Instrument kind, "future" or "option"
currency true string BTC
ETH
USDC
USDT
EURR
any The currency symbol or "any" for all
interval true string agg2
100ms
raw Frequency of notifications. Events will be aggregated over this interval. The value raw means no aggregation will be applied (Please note that raw interval is only available to authorized users)
Response
Name Type Description
data array of object
› amount number Trade amount. For perpetual and futures - in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› block_trade_id string Block trade id - when trade was part of a block trade
› block_trade_leg_count integer Block trade leg count - when trade was part of a block trade
› contracts number Trade size in contract units (optional, may be absent in historical trades)
› direction string Direction: buy, or sell
› index_price number Index Price at the moment of trade
› instrument_name string Unique instrument identifier
› iv number Option implied volatility for the price (Option only)
› liquidation string Optional field (only for trades caused by liquidation): "M" when maker side of trade was under liquidation, "T" when taker side was under liquidation, "MT" when both sides of trade were under liquidation
› mark_price number Mark Price at the moment of trade
› price number Price in base currency
› tick_direction integer Direction of the "tick" (0 = Plus Tick, 1 = Zero-Plus Tick, 2 = Minus Tick, 3 = Zero-Minus Tick).
› timestamp integer The timestamp of the trade (milliseconds since the UNIX epoch)
› trade_id string Unique (per currency) trade identifier
› trade_seq integer The sequence number of the trade within instrument
markprice.options.{index_name}
Subscriptions are only available via websockets.

// To subscribe to this channel:
var msg =
{"jsonrpc": "2.0",
"method": "public/subscribe",
"id": 42,
"params": {
"channels": ["markprice.options.btc_usd"]}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the notifications...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
This subscription will send next notifications like this:

{
"params" : {
"data" : [
{
"timestamp" : 1622470378005,
"mark_price" : 0.0333,
"iv" : 0.9,
"instrument_name" : "BTC-2JUN21-37000-P"
},
{
"timestamp" : 1622470378005,
"mark_price" : 0.117,
"iv" : 0.9,
"instrument_name" : "BTC-4JUN21-40500-P"
},
{
"timestamp" : 1622470378005,
"mark_price" : 0.0177,
"iv" : 0.9,
"instrument_name" : "BTC-4JUN21-38250-C"
},
{
"timestamp" : 1622470378005,
"mark_price" : 0.0098,
"iv" : 0.9,
"instrument_name" : "BTC-1JUN21-37000-C"
},
{
"timestamp" : 1622470378005,
"mark_price" : 0.0371,
"iv" : 0.9,
"instrument_name" : "BTC-4JUN21-36500-P"
}
],
"channel" : "markprice.options.btc_usd"
},
"method" : "subscription",
"jsonrpc" : "2.0"
}
Provides information about options markprices.

Try in API console

Channel Parameters
Parameter Required Type Enum Description
index_name true string ada_usd
algo_usd
avax_usd
bch_usd
btc_usd
doge_usd
dot_usd
eth_usd
link_usd
ltc_usd
matic_usd
near_usd
shib_usd
sol_usd
trx_usd
uni_usd
usdc_usd
xrp_usd
ada_usdc
bch_usdc
algo_usdc
avax_usdc
btc_usdc
doge_usdc
dot_usdc
bch_usdc
eth_usdc
link_usdc
ltc_usdc
matic_usdc
near_usdc
shib_usdc
sol_usdc
trx_usdc
uni_usdc
xrp_usdc
ada_usdt
algo_usdt
avax_usdt
bch_usdt
bnb_usdt
bnb_usdt
btc_usdt
btc_usdt
doge_usdt
dot_usdt
eth_usdt
eth_usdt
link_usdt
ltc_usdt
luna_usdt
matic_usdt
near_usdt
shib_usdt
sol_usdt
trx_usdt
uni_usdt
xrp_usdt
btcdvol_usdc
ethdvol_usdc Index identifier, matches (base) cryptocurrency with quote currency
Response
Name Type Description
data array of object
› instrument_name string Unique instrument identifier
› iv number Value of the volatility of the underlying instrument
› mark_price number The mark price for the instrument
› timestamp integer The timestamp (milliseconds since the Unix epoch)
user.lock
Subscriptions are only available via websockets.

// To subscribe to this channel:
var msg =
{"jsonrpc": "2.0",
"method": "private/subscribe",
"id": 42,
"params": {
"channels": ["user.lock"]}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the notifications...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
This subscription will send next notifications like this:

{
"params" : {
"data" : {
"locked" : true,
"currency" : "ALL"
},
"channel" : "user.lock"
},
"method" : "subscription",
"jsonrpc" : "2.0"
}
Get notification when account is locked/unlocked

Try in API console

This is a private subscription; subscribing is only possible when authenticated.
Channel Parameters
This method takes no parameters

Response
Name Type Description
data object
› currency string Currency on which account lock has changed, ALL if changed for all currencies
› locked boolean Value is set to 'true' when user account is locked in currency
deribit_volatility_index.{index_name}
Subscriptions are only available via websockets.

// To subscribe to this channel:
var msg =
{"jsonrpc": "2.0",
"method": "public/subscribe",
"id": 42,
"params": {
"channels": ["deribit_volatility_index.btc_usd"]}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the notifications...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
This subscription will send next notifications like this:

{
"params" : {
"data" : {
"volatility" : 129.36,
"timestamp" : 1619777946007,
"index_name" : "btc_usd"
},
"channel" : "deribit_volatility_index.btc_usd"
},
"method" : "subscription",
"jsonrpc" : "2.0"
}
Provides volatility index subscription

Try in API console

Channel Parameters
Parameter Required Type Enum Description
index_name true string btc_usd
eth_usd Index identifier supported for DVOL
Response
Name Type Description
data object
› index_name string Index identifier supported for DVOL
› timestamp integer The timestamp (milliseconds since the Unix epoch)
› volatility number Value of the corresponding volatility
deribit_price_statistics.{index_name}
Subscriptions are only available via websockets.

// To subscribe to this channel:
var msg =
{"jsonrpc": "2.0",
"method": "public/subscribe",
"id": 42,
"params": {
"channels": ["deribit_price_statistics.btc_usd"]}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the notifications...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
This subscription will send next notifications like this:

{
"params" : {
"data" : {
"low24h" : 58012.08,
"index_name" : "btc_usd",
"high_volatility" : false,
"high24h" : 59311.42,
"change24h" : 1009.61
},
"channel" : "deribit_price_statistics.btc_usd"
},
"method" : "subscription",
"jsonrpc" : "2.0"
}
This subscription provides basic statistics about Deribit Index

Try in API console

Channel Parameters
Parameter Required Type Enum Description
index_name true string ada_usd
algo_usd
avax_usd
bch_usd
btc_usd
doge_usd
dot_usd
eth_usd
link_usd
ltc_usd
matic_usd
near_usd
shib_usd
sol_usd
trx_usd
uni_usd
usdc_usd
xrp_usd
ada_usdc
bch_usdc
algo_usdc
avax_usdc
btc_usdc
doge_usdc
dot_usdc
bch_usdc
eth_usdc
link_usdc
ltc_usdc
matic_usdc
near_usdc
shib_usdc
sol_usdc
trx_usdc
uni_usdc
xrp_usdc
ada_usdt
algo_usdt
avax_usdt
bch_usdt
bnb_usdt
bnb_usdt
btc_usdt
btc_usdt
doge_usdt
dot_usdt
eth_usdt
eth_usdt
link_usdt
ltc_usdt
luna_usdt
matic_usdt
near_usdt
shib_usdt
sol_usdt
trx_usdt
uni_usdt
xrp_usdt
btcdvol_usdc
ethdvol_usdc Index identifier, matches (base) cryptocurrency with quote currency
Response
Name Type Description
data object
› change24h number The price index change calculated between the first and last point within most recent 24 hours window
› high24h number The highest recorded price within the last 24 hours
› high_volatility boolean Indicates the high volatility periods on the market. The value true is set when the price index value drastically changed within the last 5 minutes
› index_name string Index identifier, matches (base) cryptocurrency with quote currency
› low24h number The lowest recorded price within the last 24 hours
user.portfolio.{currency}
Subscriptions are only available via websockets.

// To subscribe to this channel:
var msg =
{"jsonrpc": "2.0",
"method": "private/subscribe",
"id": 42,
"params": {
"channels": ["user.portfolio.btc"]}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the notifications...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
This subscription will send next notifications like this:

{
"params" : {
"data" : {
"maintenance_margin" : 0.8854841,
"delta_total" : 31.602298,
"options_session_rpl" : 0,
"futures_session_rpl" : -0.03311399,
"delta_total_map" : {
"btc_usd" : 31.594397699
},
"session_upl" : 0.05341555,
"fee_balance" : 0,
"estimated_liquidation_ratio" : 0.10098729,
"initial_margin" : 1.24639592,
"options_gamma_map" : {
"btc_usd" : 0.00001
},
"futures_pl" : -0.32434225,
"currency" : "BTC",
"options_value" : -0.0079,
"projected_maintenance_margin" : 0.7543841,
"options_vega" : 0.07976,
"session_rpl" : -0.03311399,
"futures_session_upl" : 0.05921555,
"options_session_upl" : -0.0058,
"cross_collateral_enabled" : false,
"options_theta" : 16.13825,
"margin_model" : "segregated_sm",
"options_delta" : -1.01958,
"options_pl" : -0.0058,
"options_vega_map" : {
"btc_usd" : 0.07976
},
"balance" : 302.60065765,
"additional_reserve" : 0,
"estimated_liquidation_ratio_map" : {
"btc_usd" : 0.10098729140701267
},
"projected_initial_margin" : 1.01529592,
"available_funds" : 301.38036328,
"spot_reserve" : 0,
"projected_delta_total" : 32.613978,
"portfolio_margining_enabled" : false,
"total_pl" : -0.33014225,
"margin_balance" : 302.62675921,
"options_theta_map" : {
"btc_usd" : 16.13825
},
"available_withdrawal_funds" : 301.35426172,
"equity" : 302.6188592,
"options_gamma" : 0.00001
},
"channel" : "user.portfolio.btc"
},
"method" : "subscription",
"jsonrpc" : "2.0"
}
Provides information about current user portfolio

Try in API console

This is a private subscription; subscribing is only possible when authenticated.
Channel Parameters
Parameter Required Type Enum Description
currency true string BTC
ETH
USDC
USDT
EURR
any The currency symbol or "any" for all
Response
Name Type Description
data object
› maintenance_margin number The maintenance margin.
› delta_total number The sum of position deltas
› options_session_rpl number Options session realized profit and Loss
› futures_session_rpl number Futures session realized profit and Loss
› delta_total_map object Map of position sum's per index
› session_upl number Session unrealized profit and loss
› fee_balance number The account's fee balance (it can be used to pay for fees)
› estimated_liquidation_ratio number [DEPRECATED] Estimated Liquidation Ratio is returned only for users without portfolio margining enabled. Multiplying it by future position's market price returns its estimated liquidation price. Use estimated_liquidation_ratio_map instead.
› initial_margin number The account's initial margin
› options_gamma_map object Map of options' gammas per index
› futures_pl number Futures profit and Loss
› currency string The selected currency
› options_value number Options value
› projected_maintenance_margin number Projected maintenance margin
› options_vega number Options summary vega
› session_rpl number Session realized profit and loss
› total_initial_margin_usd number Optional (only for users using cross margin). The account's total initial margin in all cross collateral currencies, expressed in USD
› futures_session_upl number Futures session unrealized profit and Loss
› options_session_upl number Options session unrealized profit and Loss
› cross_collateral_enabled boolean When true cross collateral is enabled for user
› options_theta number Options summary theta
› margin_model string Name of user's currently enabled margin model
› options_delta number Options summary delta
› options_pl number Options profit and Loss
› options_vega_map object Map of options' vegas per index
› balance number The account's balance
› total_equity_usd number Optional (only for users using cross margin). The account's total equity in all cross collateral currencies, expressed in USD
› additional_reserve number The account's balance reserved in other orders
› estimated_liquidation_ratio_map object Map of Estimated Liquidation Ratio per index, it is returned only for users without portfolio margining enabled. Multiplying it by future position's market price returns its estimated liquidation price.
› projected_initial_margin number Projected initial margin
› available_funds number The account's available funds
› projected_delta_total number The sum of position deltas without positions that will expire during closest expiration
› portfolio_margining_enabled boolean When true portfolio margining is enabled for user
› total_maintenance_margin_usd number Optional (only for users using cross margin). The account's total maintenance margin in all cross collateral currencies, expressed in USD
› total_margin_balance_usd number Optional (only for users using cross margin). The account's total margin balance in all cross collateral currencies, expressed in USD
› total_pl number Profit and loss
› margin_balance number The account's margin balance
› options_theta_map object Map of options' thetas per index
› total_delta_total_usd number Optional (only for users using cross margin). The account's total delta total in all cross collateral currencies, expressed in USD
› available_withdrawal_funds number The account's available to withdrawal funds
› equity number The account's current equity
› options_gamma number Options summary gamma
user.changes.{kind}.{currency}.{interval}
Subscriptions are only available via websockets.

// To subscribe to this channel:
var msg =
{"jsonrpc": "2.0",
"method": "private/subscribe",
"id": 42,
"params": {
"channels": ["user.changes.future.BTC.raw"]}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the notifications...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
This subscription will send next notifications like this:

{
"params" : {
"data" : {
"trades" : [
{
"trade_seq" : 866638,
"trade_id" : "1430914",
"timestamp" : 1605780344032,
"tick_direction" : 1,
"state" : "filled",
"reduce_only" : false,
"profit_loss" : 0.00004898,
"price" : 17391,
"post_only" : false,
"order_type" : "market",
"order_id" : "3398016",
"matching_id" : null,
"mark_price" : 17391,
"liquidity" : "T",
"instrument_name" : "BTC-PERPETUAL",
"index_price" : 17501.88,
"fee_currency" : "BTC",
"fee" : 1.6e-7,
"direction" : "sell",
"amount" : 10
}
],
"positions" : [
{
"total_profit_loss" : 1.69711368,
"size_currency" : 10.646886321,
"size" : 185160,
"settlement_price" : 16025.83,
"realized_profit_loss" : 0.012454598,
"realized_funding" : 0.01235663,
"mark_price" : 17391,
"maintenance_margin" : 0.234575865,
"leverage" : 33,
"kind" : "future",
"interest_value" : 1.7362511643080387,
"instrument_name" : "BTC-PERPETUAL",
"initial_margin" : 0.319750953,
"index_price" : 17501.88,
"floating_profit_loss" : 0.906961435,
"direction" : "buy",
"delta" : 10.646886321,
"average_price" : 15000
}
],
"orders" : [
{
"web" : true,
"time_in_force" : "good_til_cancelled",
"replaced" : false,
"reduce_only" : false,
"price" : 15665.5,
"post_only" : false,
"order_type" : "market",
"order_state" : "filled",
"order_id" : "3398016",
"max_show" : 10,
"last_update_timestamp" : 1605780344032,
"label" : "",
"is_rebalance" : false,
"is_liquidation" : false,
"instrument_name" : "BTC-PERPETUAL",
"filled_amount" : 10,
"direction" : "sell",
"creation_timestamp" : 1605780344032,
"average_price" : 17391,
"api" : false,
"amount" : 10
}
],
"instrument_name" : "BTC-PERPETUAL"
},
"channel" : "user.changes.future.BTC.raw"
},
"method" : "subscription",
"jsonrpc" : "2.0"
}
Get notifications about changes in user's updates related to order, trades, etc. in instruments of a given kind and currency.

Try in API console

This is a private subscription; subscribing is only possible when authenticated.
Channel Parameters
Parameter Required Type Enum Description
kind true string future
option
spot
future_combo
option_combo
combo
any Instrument kind, "combo" for any combo or "any" for all
currency true string BTC
ETH
USDC
USDT
EURR
any The currency symbol or "any" for all
interval true string agg2
100ms
raw Frequency of notifications. Events will be aggregated over this interval. The value raw means no aggregation will be applied (Please note that raw interval is only available to authorized users)
Response
Name Type Description
data array of object
› instrument_name string Unique instrument identifier
› orders array of object
› › reject_post_only boolean true if order has reject_post_only flag (field is present only when post_only is true)
› › label string User defined label (up to 64 characters)
› › quote_id string The same QuoteID as supplied in the private/mass_quote request.
› › order_state string Order state: "open", "filled", "rejected", "cancelled", "untriggered"
› › is_secondary_oto boolean true if the order is an order that can be triggered by another order, otherwise not present.
› › usd number Option price in USD (Only if advanced="usd")
› › implv number Implied volatility in percent. (Only if advanced="implv")
› › trigger_reference_price number The price of the given trigger at the time when the order was placed (Only for trailing trigger orders)
› › original_order_type string Original order type. Optional field
› › oco_ref string Unique reference that identifies a one_cancels_others (OCO) pair.
› › block_trade boolean true if order made from block_trade trade, added only in that case.
› › trigger_price number Trigger price (Only for future trigger orders)
› › api boolean true if created with API
› › mmp boolean true if the order is a MMP order, otherwise false.
› › oto_order_ids array of string The Ids of the orders that will be triggered if the order is filled
› › trigger_order_id string Id of the trigger order that created the order (Only for orders that were created by triggered orders).
› › cancel_reason string Enumerated reason behind cancel "user_request", "autoliquidation", "cancel_on_disconnect", "risk_mitigation", "pme_risk_reduction" (portfolio margining risk reduction), "pme_account_locked" (portfolio margining account locked per currency), "position_locked", "mmp_trigger" (market maker protection), "mmp_config_curtailment" (market maker configured quantity decreased), "edit_post_only_reject" (cancelled on edit because of reject_post_only setting), "oco_other_closed" (the oco order linked to this order was closed), "oto_primary_closed" (the oto primary order that was going to trigger this order was cancelled), "settlement" (closed because of a settlement)
› › primary_order_id string Unique order identifier
› › quote boolean If order is a quote. Present only if true.
› › risk_reducing boolean true if the order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users), otherwise false.
› › filled_amount number Filled amount of the order. For perpetual and futures the filled_amount is in USD units, for options - in units or corresponding cryptocurrency contracts, e.g., BTC or ETH.
› › instrument_name string Unique instrument identifier
› › max_show number Maximum amount within an order to be shown to other traders, 0 for invisible order.
› › app_name string The name of the application that placed the order on behalf of the user (optional).
› › mmp_cancelled boolean true if order was cancelled by mmp trigger (optional)
› › direction string Direction: buy, or sell
› › last_update_timestamp integer The timestamp (milliseconds since the Unix epoch)
› › trigger_offset number The maximum deviation from the price peak beyond which the order will be triggered (Only for trailing trigger orders)
› › mmp_group string Name of the MMP group supplied in the private/mass_quote request.
› › price number or string Price in base currency or "market_price" in case of open trigger market orders
› › is_liquidation boolean Optional (not added for spot). true if order was automatically created during liquidation
› › reduce_only boolean Optional (not added for spot). 'true for reduce-only orders only'
› › amount number It represents the requested order size. For perpetual and futures the amount is in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› › is_primary_otoco boolean true if the order is an order that can trigger an OCO pair, otherwise not present.
› › post_only boolean true for post-only orders only
› › mobile boolean optional field with value true added only when created with Mobile Application
› › trigger_fill_condition string
The fill condition of the linked order (Only for linked order types), default: first_hit.

"first_hit" - any execution of the primary order will fully cancel/place all secondary orders.
"complete_fill" - a complete execution (meaning the primary order no longer exists) will cancel/place the secondary orders.
"incremental" - any fill of the primary order will cause proportional partial cancellation/placement of the secondary order. The amount that will be subtracted/added to the secondary order will be rounded down to the contract size.
› › triggered boolean Whether the trigger order has been triggered
› › order_id string Unique order identifier
› › replaced boolean true if the order was edited (by user or - in case of advanced options orders - by pricing engine), otherwise false.
› › order_type string Order type: "limit", "market", "stop_limit", "stop_market"
› › time_in_force string Order time in force: "good_til_cancelled", "good_til_day", "fill_or_kill" or "immediate_or_cancel"
› › auto_replaced boolean Options, advanced orders only - true if last modification of the order was performed by the pricing engine, otherwise false.
› › quote_set_id string Identifier of the QuoteSet supplied in the private/mass_quote request.
› › contracts number It represents the order size in contract units. (Optional, may be absent in historical data).
› › trigger string Trigger type (only for trigger orders). Allowed values: "index_price", "mark_price", "last_price".
› › web boolean true if created via Deribit frontend (optional)
› › creation_timestamp integer The timestamp (milliseconds since the Unix epoch)
› › is_rebalance boolean Optional (only for spot). true if order was automatically created during cross-collateral balance restoration
› › average_price number Average fill price of the order
› › advanced string advanced type: "usd" or "implv" (Only for options; field is omitted if not applicable).
› position array of object
› › average_price number Average price of trades that built this position
› › average_price_usd number Only for options, average price in USD
› › delta number Delta parameter
› › direction string Direction: buy, sell or zero
› › floating_profit_loss number Floating profit or loss
› › floating_profit_loss_usd number Only for options, floating profit or loss in USD
› › gamma number Only for options, Gamma parameter
› › index_price number Current index price
› › initial_margin number Initial margin
› › instrument_name string Unique instrument identifier
› › interest_value number Value used to calculate realized_funding (perpetual only)
› › kind string Instrument kind: "future", "option", "spot", "future_combo", "option_combo"
› › leverage integer Current available leverage for future position
› › maintenance_margin number Maintenance margin
› › mark_price number Current mark price for position's instrument
› › realized_funding number Realized Funding in current session included in session realized profit or loss, only for positions of perpetual instruments
› › realized_profit_loss number Realized profit or loss
› › settlement_price number Optional (not added for spot). Last settlement price for position's instrument 0 if instrument wasn't settled yet
› › size number Position size for futures size in quote currency (e.g. USD), for options size is in base currency (e.g. BTC)
› › size_currency number Only for futures, position size in base currency
› › theta number Only for options, Theta parameter
› › total_profit_loss number Profit or loss from position
› › vega number Only for options, Vega parameter
› trades array of object
› › timestamp integer The timestamp of the trade (milliseconds since the UNIX epoch)
› › label string User defined label (presented only when previously set for order by user)
› › fee number User's fee in units of the specified fee_currency
› › quote_id string QuoteID of the user order (optional, present only for orders placed with private/mass_quote)
› › liquidity string Describes what was role of users order: "M" when it was maker order, "T" when it was taker order
› › index_price number Index Price at the moment of trade
› › api boolean true if user order was created with API
› › mmp boolean true if user order is MMP
› › legs array Optional field containing leg trades if trade is a combo trade (present when querying for only combo trades and in combo_trades events)
› › trade_seq integer The sequence number of the trade within instrument
› › risk_reducing boolean true if user order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users)
› › instrument_name string Unique instrument identifier
› › fee_currency string Currency, i.e "BTC", "ETH", "USDC"
› › direction string Direction: buy, or sell
› › trade_id string Unique (per currency) trade identifier
› › tick_direction integer Direction of the "tick" (0 = Plus Tick, 1 = Zero-Plus Tick, 2 = Minus Tick, 3 = Zero-Minus Tick).
› › profit_loss number Profit and loss in base currency.
› › matching_id string Always null
› › price number Price in base currency
› › reduce_only string true if user order is reduce-only
› › amount number Trade amount. For perpetual and futures - in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› › post_only string true if user order is post-only
› › liquidation string Optional field (only for trades caused by liquidation): "M" when maker side of trade was under liquidation, "T" when taker side was under liquidation, "MT" when both sides of trade were under liquidation
› › combo_trade_id number Optional field containing combo trade identifier if the trade is a combo trade
› › order_id string Id of the user order (maker or taker), i.e. subscriber's order id that took part in the trade
› › block_trade_id string Block trade id - when trade was part of a block trade
› › order_type string Order type: "limit, "market", or "liquidation"
› › quote_set_id string QuoteSet of the user order (optional, present only for orders placed with private/mass_quote)
› › combo_id string Optional field containing combo instrument name if the trade is a combo trade
› › underlying_price number Underlying price for implied volatility calculations (Options only)
› › contracts number Trade size in contract units (optional, may be absent in historical trades)
› › mark_price number Mark Price at the moment of trade
› › iv number Option implied volatility for the price (Option only)
› › state string Order state: "open", "filled", "rejected", "cancelled", "untriggered" or "archive" (if order was archived)
› › advanced string Advanced type of user order: "usd" or "implv" (only for options; omitted if not applicable)
platform_state
Subscriptions are only available via websockets.

// To subscribe to this channel:
var msg =
{"jsonrpc": "2.0",
"method": "public/subscribe",
"id": 42,
"params": {
"channels": ["platform_state"]}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the notifications...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
This subscription will send next notifications like this:

{
"params" : {
"data" : {
"price_index" : "sol_usdc",
"locked" : true
},
"channel" : "platform_state"
},
"method" : "subscription",
"jsonrpc" : "2.0"
}
Information about platform state.

Try in API console

Channel Parameters
This channel takes no parameters

Response
Name Type Description
data object
› locked boolean Value is set to 'true' when index is locked on platform, sent only with price_index field
› maintenance boolean Value is set to true when the maintenance break begins
› price_index string Name of index that is locked or unlocked, sent only with locked field
user.orders.{instrument_name}.raw
Subscriptions are only available via websockets.

// To subscribe to this channel:
var msg =
{"jsonrpc": "2.0",
"method": "private/subscribe",
"id": 42,
"params": {
"channels": ["user.orders.BTC-PERPETUAL.raw"]}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the notifications...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
This subscription will send next notifications like this:

{
"params" : {
"data" : {
"time_in_force" : "good_til_cancelled",
"replaced" : false,
"reduce_only" : false,
"price" : 10502.52,
"post_only" : false,
"original_order_type" : "market",
"order_type" : "limit",
"order_state" : "open",
"order_id" : "5",
"max_show" : 200,
"last_update_timestamp" : 1581507423789,
"label" : "",
"is_rebalance" : false,
"is_liquidation" : false,
"instrument_name" : "BTC-PERPETUAL",
"filled_amount" : 0,
"direction" : "buy",
"creation_timestamp" : 1581507423789,
"average_price" : 0,
"api" : false,
"amount" : 200
},
"channel" : "user.orders.BTC-PERPETUAL.raw"
},
"method" : "subscription",
"jsonrpc" : "2.0"
}
Get notifications about changes in user's orders for given instrument.

Try in API console

This is a private subscription; subscribing is only possible when authenticated.
Channel Parameters
Parameter Required Type Enum Description
instrument_name true string Instrument name
Response
Name Type Description
data object
› reject_post_only boolean true if order has reject_post_only flag (field is present only when post_only is true)
› label string User defined label (up to 64 characters)
› quote_id string The same QuoteID as supplied in the private/mass_quote request.
› order_state string Order state: "open", "filled", "rejected", "cancelled", "untriggered"
› is_secondary_oto boolean true if the order is an order that can be triggered by another order, otherwise not present.
› usd number Option price in USD (Only if advanced="usd")
› implv number Implied volatility in percent. (Only if advanced="implv")
› trigger_reference_price number The price of the given trigger at the time when the order was placed (Only for trailing trigger orders)
› original_order_type string Original order type. Optional field
› oco_ref string Unique reference that identifies a one_cancels_others (OCO) pair.
› block_trade boolean true if order made from block_trade trade, added only in that case.
› trigger_price number Trigger price (Only for future trigger orders)
› api boolean true if created with API
› mmp boolean true if the order is a MMP order, otherwise false.
› oto_order_ids array of string The Ids of the orders that will be triggered if the order is filled
› trigger_order_id string Id of the trigger order that created the order (Only for orders that were created by triggered orders).
› cancel_reason string Enumerated reason behind cancel "user_request", "autoliquidation", "cancel_on_disconnect", "risk_mitigation", "pme_risk_reduction" (portfolio margining risk reduction), "pme_account_locked" (portfolio margining account locked per currency), "position_locked", "mmp_trigger" (market maker protection), "mmp_config_curtailment" (market maker configured quantity decreased), "edit_post_only_reject" (cancelled on edit because of reject_post_only setting), "oco_other_closed" (the oco order linked to this order was closed), "oto_primary_closed" (the oto primary order that was going to trigger this order was cancelled), "settlement" (closed because of a settlement)
› primary_order_id string Unique order identifier
› quote boolean If order is a quote. Present only if true.
› risk_reducing boolean true if the order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users), otherwise false.
› filled_amount number Filled amount of the order. For perpetual and futures the filled_amount is in USD units, for options - in units or corresponding cryptocurrency contracts, e.g., BTC or ETH.
› instrument_name string Unique instrument identifier
› max_show number Maximum amount within an order to be shown to other traders, 0 for invisible order.
› app_name string The name of the application that placed the order on behalf of the user (optional).
› mmp_cancelled boolean true if order was cancelled by mmp trigger (optional)
› direction string Direction: buy, or sell
› last_update_timestamp integer The timestamp (milliseconds since the Unix epoch)
› trigger_offset number The maximum deviation from the price peak beyond which the order will be triggered (Only for trailing trigger orders)
› mmp_group string Name of the MMP group supplied in the private/mass_quote request.
› price number or string Price in base currency or "market_price" in case of open trigger market orders
› is_liquidation boolean Optional (not added for spot). true if order was automatically created during liquidation
› reduce_only boolean Optional (not added for spot). 'true for reduce-only orders only'
› amount number It represents the requested order size. For perpetual and futures the amount is in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› is_primary_otoco boolean true if the order is an order that can trigger an OCO pair, otherwise not present.
› post_only boolean true for post-only orders only
› mobile boolean optional field with value true added only when created with Mobile Application
› trigger_fill_condition string
The fill condition of the linked order (Only for linked order types), default: first_hit.

"first_hit" - any execution of the primary order will fully cancel/place all secondary orders.
"complete_fill" - a complete execution (meaning the primary order no longer exists) will cancel/place the secondary orders.
"incremental" - any fill of the primary order will cause proportional partial cancellation/placement of the secondary order. The amount that will be subtracted/added to the secondary order will be rounded down to the contract size.
› triggered boolean Whether the trigger order has been triggered
› order_id string Unique order identifier
› replaced boolean true if the order was edited (by user or - in case of advanced options orders - by pricing engine), otherwise false.
› order_type string Order type: "limit", "market", "stop_limit", "stop_market"
› time_in_force string Order time in force: "good_til_cancelled", "good_til_day", "fill_or_kill" or "immediate_or_cancel"
› auto_replaced boolean Options, advanced orders only - true if last modification of the order was performed by the pricing engine, otherwise false.
› quote_set_id string Identifier of the QuoteSet supplied in the private/mass_quote request.
› contracts number It represents the order size in contract units. (Optional, may be absent in historical data).
› trigger string Trigger type (only for trigger orders). Allowed values: "index_price", "mark_price", "last_price".
› web boolean true if created via Deribit frontend (optional)
› creation_timestamp integer The timestamp (milliseconds since the Unix epoch)
› is_rebalance boolean Optional (only for spot). true if order was automatically created during cross-collateral balance restoration
› average_price number Average fill price of the order
› advanced string advanced type: "usd" or "implv" (Only for options; field is omitted if not applicable).
user.trades.{kind}.{currency}.{interval}
Subscriptions are only available via websockets.

// To subscribe to this channel:
var msg =
{"jsonrpc": "2.0",
"method": "private/subscribe",
"id": 42,
"params": {
"channels": ["user.trades.future.BTC.100ms"]}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the notifications...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
This subscription will send next notifications like this:

{
"params" : {
"data" : [
{
"trade_seq" : 74405,
"trade_id" : "48079262",
"timestamp" : 1590484255886,
"tick_direction" : 2,
"state" : "filled",
"reduce_only" : false,
"price" : 8947,
"post_only" : false,
"order_type" : "limit",
"order_id" : "4008978075",
"matching_id" : null,
"mark_price" : 8970.03,
"liquidity" : "T",
"instrument_name" : "BTC-25SEP20",
"index_price" : 8953.53,
"fee_currency" : "BTC",
"fee" : 0.00049961,
"direction" : "sell",
"amount" : 8940
}
],
"channel" : "user.trades.future.BTC.100ms"
},
"method" : "subscription",
"jsonrpc" : "2.0"
}
Get notifications about the user's trades in any instrument of a given kind and given currency.

Try in API console

This is a private subscription; subscribing is only possible when authenticated.
Channel Parameters
Parameter Required Type Enum Description
kind true string future
option
spot
future_combo
option_combo
combo
any Instrument kind, "combo" for any combo or "any" for all
currency true string BTC
ETH
USDC
USDT
EURR
any The currency symbol or "any" for all
interval true string agg2
100ms
raw Frequency of notifications. Events will be aggregated over this interval. The value raw means no aggregation will be applied (Please note that raw interval is only available to authorized users)
Response
Name Type Description
data array of object
› timestamp integer The timestamp of the trade (milliseconds since the UNIX epoch)
› label string User defined label (presented only when previously set for order by user)
› fee number User's fee in units of the specified fee_currency
› quote_id string QuoteID of the user order (optional, present only for orders placed with private/mass_quote)
› liquidity string Describes what was role of users order: "M" when it was maker order, "T" when it was taker order
› index_price number Index Price at the moment of trade
› api boolean true if user order was created with API
› mmp boolean true if user order is MMP
› legs array Optional field containing leg trades if trade is a combo trade (present when querying for only combo trades and in combo_trades events)
› trade_seq integer The sequence number of the trade within instrument
› risk_reducing boolean true if user order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users)
› instrument_name string Unique instrument identifier
› fee_currency string Currency, i.e "BTC", "ETH", "USDC"
› direction string Direction: buy, or sell
› trade_id string Unique (per currency) trade identifier
› tick_direction integer Direction of the "tick" (0 = Plus Tick, 1 = Zero-Plus Tick, 2 = Minus Tick, 3 = Zero-Minus Tick).
› profit_loss number Profit and loss in base currency.
› matching_id string Always null
› price number Price in base currency
› reduce_only string true if user order is reduce-only
› amount number Trade amount. For perpetual and futures - in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› post_only string true if user order is post-only
› liquidation string Optional field (only for trades caused by liquidation): "M" when maker side of trade was under liquidation, "T" when taker side was under liquidation, "MT" when both sides of trade were under liquidation
› combo_trade_id number Optional field containing combo trade identifier if the trade is a combo trade
› order_id string Id of the user order (maker or taker), i.e. subscriber's order id that took part in the trade
› block_trade_id string Block trade id - when trade was part of a block trade
› order_type string Order type: "limit, "market", or "liquidation"
› quote_set_id string QuoteSet of the user order (optional, present only for orders placed with private/mass_quote)
› combo_id string Optional field containing combo instrument name if the trade is a combo trade
› underlying_price number Underlying price for implied volatility calculations (Options only)
› contracts number Trade size in contract units (optional, may be absent in historical trades)
› mark_price number Mark Price at the moment of trade
› iv number Option implied volatility for the price (Option only)
› state string Order state: "open", "filled", "rejected", "cancelled", "untriggered" or "archive" (if order was archived)
› advanced string Advanced type of user order: "usd" or "implv" (only for options; omitted if not applicable)
instrument.state.{kind}.{currency}
Subscriptions are only available via websockets.

// To subscribe to this channel:
var msg =
{"jsonrpc": "2.0",
"method": "public/subscribe",
"id": 42,
"params": {
"channels": ["instrument.state.any.any"]}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the notifications...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
This subscription will send next notifications like this:

{
"params" : {
"data" : {
"timestamp" : 1553080940000,
"state" : "created",
"instrument_name" : "BTC-22MAR19"
},
"channel" : "instrument.state.any.any"
},
"method" : "subscription",
"jsonrpc" : "2.0"
}
Get notifications about new or terminated instruments of given kind in given currency. (Please note that our system does not send notifications when currencies are locked. Users are advised to subscribe to the platform_state channel to monitor the state of currencies actively.)

Try in API console

Channel Parameters
Parameter Required Type Enum Description
kind true string future
option
spot
future_combo
option_combo
any Instrument kind or "any" for all
currency true string BTC
ETH
USDC
USDT
EURR
any The currency symbol or "any" for all
Response
Name Type Description
data object
› instrument_name string Unique instrument identifier
› state string State of instrument - possible values: created, started, settled, closed, deactivated, terminated
› timestamp integer The timestamp (milliseconds since the Unix epoch)
user.orders.{kind}.{currency}.{interval}
Subscriptions are only available via websockets.

// To subscribe to this channel:
var msg =
{"jsonrpc": "2.0",
"method": "private/subscribe",
"id": 42,
"params": {
"channels": ["user.orders.future.BTC.100ms"]}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the notifications...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
This subscription will send next notifications like this:

{
"params" : {
"data" : [
{
"time_in_force" : "good_til_cancelled",
"reduce_only" : false,
"price" : 3928.5,
"post_only" : false,
"order_type" : "limit",
"order_state" : "open",
"order_id" : "476137",
"max_show" : 120,
"last_update_timestamp" : 1550826337209,
"label" : "",
"is_rebalance" : false,
"is_liquidation" : false,
"instrument_name" : "BTC-PERPETUAL",
"filled_amount" : 0,
"direction" : "buy",
"creation_timestamp" : 1550826337209,
"average_price" : 0,
"api" : false,
"amount" : 120
}
],
"channel" : "user.orders.future.BTC.100ms"
},
"method" : "subscription",
"jsonrpc" : "2.0"
}
Get notifications about changes in user's orders in instruments of a given kind and currency.

Try in API console

This is a private subscription; subscribing is only possible when authenticated.
Channel Parameters
Parameter Required Type Enum Description
kind true string future
option
spot
future_combo
option_combo
combo
any Instrument kind, "combo" for any combo or "any" for all
currency true string BTC
ETH
USDC
USDT
EURR
any The currency symbol or "any" for all
interval true string 100ms
agg2 Frequency of notifications. Events will be aggregated over this interval.
Response
Name Type Description
data array of object
› reject_post_only boolean true if order has reject_post_only flag (field is present only when post_only is true)
› label string User defined label (up to 64 characters)
› quote_id string The same QuoteID as supplied in the private/mass_quote request.
› order_state string Order state: "open", "filled", "rejected", "cancelled", "untriggered"
› is_secondary_oto boolean true if the order is an order that can be triggered by another order, otherwise not present.
› usd number Option price in USD (Only if advanced="usd")
› implv number Implied volatility in percent. (Only if advanced="implv")
› trigger_reference_price number The price of the given trigger at the time when the order was placed (Only for trailing trigger orders)
› original_order_type string Original order type. Optional field
› oco_ref string Unique reference that identifies a one_cancels_others (OCO) pair.
› block_trade boolean true if order made from block_trade trade, added only in that case.
› trigger_price number Trigger price (Only for future trigger orders)
› api boolean true if created with API
› mmp boolean true if the order is a MMP order, otherwise false.
› oto_order_ids array of string The Ids of the orders that will be triggered if the order is filled
› trigger_order_id string Id of the trigger order that created the order (Only for orders that were created by triggered orders).
› cancel_reason string Enumerated reason behind cancel "user_request", "autoliquidation", "cancel_on_disconnect", "risk_mitigation", "pme_risk_reduction" (portfolio margining risk reduction), "pme_account_locked" (portfolio margining account locked per currency), "position_locked", "mmp_trigger" (market maker protection), "mmp_config_curtailment" (market maker configured quantity decreased), "edit_post_only_reject" (cancelled on edit because of reject_post_only setting), "oco_other_closed" (the oco order linked to this order was closed), "oto_primary_closed" (the oto primary order that was going to trigger this order was cancelled), "settlement" (closed because of a settlement)
› primary_order_id string Unique order identifier
› quote boolean If order is a quote. Present only if true.
› risk_reducing boolean true if the order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users), otherwise false.
› filled_amount number Filled amount of the order. For perpetual and futures the filled_amount is in USD units, for options - in units or corresponding cryptocurrency contracts, e.g., BTC or ETH.
› instrument_name string Unique instrument identifier
› max_show number Maximum amount within an order to be shown to other traders, 0 for invisible order.
› app_name string The name of the application that placed the order on behalf of the user (optional).
› mmp_cancelled boolean true if order was cancelled by mmp trigger (optional)
› direction string Direction: buy, or sell
› last_update_timestamp integer The timestamp (milliseconds since the Unix epoch)
› trigger_offset number The maximum deviation from the price peak beyond which the order will be triggered (Only for trailing trigger orders)
› mmp_group string Name of the MMP group supplied in the private/mass_quote request.
› price number or string Price in base currency or "market_price" in case of open trigger market orders
› is_liquidation boolean Optional (not added for spot). true if order was automatically created during liquidation
› reduce_only boolean Optional (not added for spot). 'true for reduce-only orders only'
› amount number It represents the requested order size. For perpetual and futures the amount is in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› is_primary_otoco boolean true if the order is an order that can trigger an OCO pair, otherwise not present.
› post_only boolean true for post-only orders only
› mobile boolean optional field with value true added only when created with Mobile Application
› trigger_fill_condition string
The fill condition of the linked order (Only for linked order types), default: first_hit.

"first_hit" - any execution of the primary order will fully cancel/place all secondary orders.
"complete_fill" - a complete execution (meaning the primary order no longer exists) will cancel/place the secondary orders.
"incremental" - any fill of the primary order will cause proportional partial cancellation/placement of the secondary order. The amount that will be subtracted/added to the secondary order will be rounded down to the contract size.
› triggered boolean Whether the trigger order has been triggered
› order_id string Unique order identifier
› replaced boolean true if the order was edited (by user or - in case of advanced options orders - by pricing engine), otherwise false.
› order_type string Order type: "limit", "market", "stop_limit", "stop_market"
› time_in_force string Order time in force: "good_til_cancelled", "good_til_day", "fill_or_kill" or "immediate_or_cancel"
› auto_replaced boolean Options, advanced orders only - true if last modification of the order was performed by the pricing engine, otherwise false.
› quote_set_id string Identifier of the QuoteSet supplied in the private/mass_quote request.
› contracts number It represents the order size in contract units. (Optional, may be absent in historical data).
› trigger string Trigger type (only for trigger orders). Allowed values: "index_price", "mark_price", "last_price".
› web boolean true if created via Deribit frontend (optional)
› creation_timestamp integer The timestamp (milliseconds since the Unix epoch)
› is_rebalance boolean Optional (only for spot). true if order was automatically created during cross-collateral balance restoration
› average_price number Average fill price of the order
› advanced string advanced type: "usd" or "implv" (Only for options; field is omitted if not applicable).
chart.trades.{instrument_name}.{resolution}
Subscriptions are only available via websockets.

// To subscribe to this channel:
var msg =
{"jsonrpc": "2.0",
"method": "public/subscribe",
"id": 42,
"params": {
"channels": ["chart.trades.BTC-PERPETUAL.1"]}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the notifications...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
This subscription will send next notifications like this:

{
"params" : {
"data" : {
"volume" : 0.05219351,
"tick" : 1573645080000,
"open" : 8869.79,
"low" : 8788.25,
"high" : 8870.31,
"cost" : 460,
"close" : 8791.25
},
"channel" : "chart.trades.BTC-PERPETUAL.1"
},
"method" : "subscription",
"jsonrpc" : "2.0"
}
Publicly available market data used to generate a TradingView candle chart. During a single resolution period, many events can be sent, each with updated values for the recent period.

NOTICE When there is no trade during the requested resolution period (e.g. 1 minute), then a filling sample is generated which uses data from the last available trade candle (open and close values).

Try in API console

Channel Parameters
Parameter Required Type Enum Description
instrument_name true string Instrument name
resolution true string 1
3
5
10
15
30
60
120
180
360
720
1D Chart bars resolution given in full minutes or keyword 1D (only some specific resolutions are supported)
Response
Name Type Description
data object
› close number The close price for the candle
› cost number Cost data for the candle
› high number The highest price level for the candle
› low number The lowest price level for the candle
› open number The open price for the candle'
› tick integer The timestamp (milliseconds since the Unix epoch)
› volume number Volume data for the candle
user.orders.{instrument_name}.{interval}
Subscriptions are only available via websockets.

// To subscribe to this channel:
var msg =
{"jsonrpc": "2.0",
"method": "private/subscribe",
"id": 42,
"params": {
"channels": ["user.orders.BTC-PERPETUAL.100ms"]}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the notifications...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
This subscription will send next notifications like this:

{
"params" : {
"data" : [
{
"time_in_force" : "good_til_cancelled",
"replaced" : false,
"reduce_only" : false,
"price" : 10460.43,
"post_only" : false,
"original_order_type" : "market",
"order_type" : "limit",
"order_state" : "open",
"order_id" : "4",
"max_show" : 200,
"last_update_timestamp" : 1581507159533,
"label" : "",
"is_rebalance" : false,
"is_liquidation" : false,
"instrument_name" : "BTC-PERPETUAL",
"filled_amount" : 0,
"direction" : "buy",
"creation_timestamp" : 1581507159533,
"average_price" : 0,
"api" : false,
"amount" : 200
}
],
"channel" : "user.orders.BTC-PERPETUAL.100ms"
},
"method" : "subscription",
"jsonrpc" : "2.0"
}
Get notifications about changes in user's orders for given instrument.

Try in API console

This is a private subscription; subscribing is only possible when authenticated.
Channel Parameters
Parameter Required Type Enum Description
instrument_name true string Instrument name
interval true string 100ms
agg2 Frequency of notifications. Events will be aggregated over this interval.
Response
Name Type Description
data array of object
› reject_post_only boolean true if order has reject_post_only flag (field is present only when post_only is true)
› label string User defined label (up to 64 characters)
› quote_id string The same QuoteID as supplied in the private/mass_quote request.
› order_state string Order state: "open", "filled", "rejected", "cancelled", "untriggered"
› is_secondary_oto boolean true if the order is an order that can be triggered by another order, otherwise not present.
› usd number Option price in USD (Only if advanced="usd")
› implv number Implied volatility in percent. (Only if advanced="implv")
› trigger_reference_price number The price of the given trigger at the time when the order was placed (Only for trailing trigger orders)
› original_order_type string Original order type. Optional field
› oco_ref string Unique reference that identifies a one_cancels_others (OCO) pair.
› block_trade boolean true if order made from block_trade trade, added only in that case.
› trigger_price number Trigger price (Only for future trigger orders)
› api boolean true if created with API
› mmp boolean true if the order is a MMP order, otherwise false.
› oto_order_ids array of string The Ids of the orders that will be triggered if the order is filled
› trigger_order_id string Id of the trigger order that created the order (Only for orders that were created by triggered orders).
› cancel_reason string Enumerated reason behind cancel "user_request", "autoliquidation", "cancel_on_disconnect", "risk_mitigation", "pme_risk_reduction" (portfolio margining risk reduction), "pme_account_locked" (portfolio margining account locked per currency), "position_locked", "mmp_trigger" (market maker protection), "mmp_config_curtailment" (market maker configured quantity decreased), "edit_post_only_reject" (cancelled on edit because of reject_post_only setting), "oco_other_closed" (the oco order linked to this order was closed), "oto_primary_closed" (the oto primary order that was going to trigger this order was cancelled), "settlement" (closed because of a settlement)
› primary_order_id string Unique order identifier
› quote boolean If order is a quote. Present only if true.
› risk_reducing boolean true if the order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users), otherwise false.
› filled_amount number Filled amount of the order. For perpetual and futures the filled_amount is in USD units, for options - in units or corresponding cryptocurrency contracts, e.g., BTC or ETH.
› instrument_name string Unique instrument identifier
› max_show number Maximum amount within an order to be shown to other traders, 0 for invisible order.
› app_name string The name of the application that placed the order on behalf of the user (optional).
› mmp_cancelled boolean true if order was cancelled by mmp trigger (optional)
› direction string Direction: buy, or sell
› last_update_timestamp integer The timestamp (milliseconds since the Unix epoch)
› trigger_offset number The maximum deviation from the price peak beyond which the order will be triggered (Only for trailing trigger orders)
› mmp_group string Name of the MMP group supplied in the private/mass_quote request.
› price number or string Price in base currency or "market_price" in case of open trigger market orders
› is_liquidation boolean Optional (not added for spot). true if order was automatically created during liquidation
› reduce_only boolean Optional (not added for spot). 'true for reduce-only orders only'
› amount number It represents the requested order size. For perpetual and futures the amount is in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› is_primary_otoco boolean true if the order is an order that can trigger an OCO pair, otherwise not present.
› post_only boolean true for post-only orders only
› mobile boolean optional field with value true added only when created with Mobile Application
› trigger_fill_condition string
The fill condition of the linked order (Only for linked order types), default: first_hit.

"first_hit" - any execution of the primary order will fully cancel/place all secondary orders.
"complete_fill" - a complete execution (meaning the primary order no longer exists) will cancel/place the secondary orders.
"incremental" - any fill of the primary order will cause proportional partial cancellation/placement of the secondary order. The amount that will be subtracted/added to the secondary order will be rounded down to the contract size.
› triggered boolean Whether the trigger order has been triggered
› order_id string Unique order identifier
› replaced boolean true if the order was edited (by user or - in case of advanced options orders - by pricing engine), otherwise false.
› order_type string Order type: "limit", "market", "stop_limit", "stop_market"
› time_in_force string Order time in force: "good_til_cancelled", "good_til_day", "fill_or_kill" or "immediate_or_cancel"
› auto_replaced boolean Options, advanced orders only - true if last modification of the order was performed by the pricing engine, otherwise false.
› quote_set_id string Identifier of the QuoteSet supplied in the private/mass_quote request.
› contracts number It represents the order size in contract units. (Optional, may be absent in historical data).
› trigger string Trigger type (only for trigger orders). Allowed values: "index_price", "mark_price", "last_price".
› web boolean true if created via Deribit frontend (optional)
› creation_timestamp integer The timestamp (milliseconds since the Unix epoch)
› is_rebalance boolean Optional (only for spot). true if order was automatically created during cross-collateral balance restoration
› average_price number Average fill price of the order
› advanced string advanced type: "usd" or "implv" (Only for options; field is omitted if not applicable).
user.trades.{instrument_name}.{interval}
Subscriptions are only available via websockets.

// To subscribe to this channel:
var msg =
{"jsonrpc": "2.0",
"method": "private/subscribe",
"id": 42,
"params": {
"channels": ["user.trades.BTC-PERPETUAL.raw"]}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the notifications...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
This subscription will send next notifications like this:

{
"params" : {
"data" : [
{
"trade_seq" : 30289432,
"trade_id" : "48079254",
"timestamp" : 1590484156350,
"tick_direction" : 0,
"state" : "filled",
"reduce_only" : false,
"price" : 8954,
"post_only" : false,
"order_type" : "market",
"order_id" : "4008965646",
"matching_id" : null,
"mark_price" : 8952.86,
"liquidity" : "T",
"instrument_name" : "BTC-PERPETUAL",
"index_price" : 8956.73,
"fee_currency" : "BTC",
"fee" : 0.00000168,
"direction" : "sell",
"amount" : 20
},
{
"trade_seq" : 30289433,
"trade_id" : "48079255",
"timestamp" : 1590484156350,
"tick_direction" : 1,
"state" : "filled",
"reduce_only" : false,
"price" : 8954,
"post_only" : false,
"order_type" : "market",
"order_id" : "4008965646",
"matching_id" : null,
"mark_price" : 8952.86,
"liquidity" : "T",
"instrument_name" : "BTC-PERPETUAL",
"index_price" : 8956.73,
"fee_currency" : "BTC",
"fee" : 0.00000168,
"direction" : "sell",
"amount" : 20
}
],
"channel" : "user.trades.BTC-PERPETUAL.raw"
},
"method" : "subscription",
"jsonrpc" : "2.0"
}
Get notifications about the user's trades in an instrument.

Try in API console

This is a private subscription; subscribing is only possible when authenticated.
Channel Parameters
Parameter Required Type Enum Description
instrument_name true string Instrument name
interval true string agg2
100ms
raw Frequency of notifications. Events will be aggregated over this interval. The value raw means no aggregation will be applied (Please note that raw interval is only available to authorized users)
Response
Name Type Description
data array of object
› timestamp integer The timestamp of the trade (milliseconds since the UNIX epoch)
› label string User defined label (presented only when previously set for order by user)
› fee number User's fee in units of the specified fee_currency
› quote_id string QuoteID of the user order (optional, present only for orders placed with private/mass_quote)
› liquidity string Describes what was role of users order: "M" when it was maker order, "T" when it was taker order
› index_price number Index Price at the moment of trade
› api boolean true if user order was created with API
› mmp boolean true if user order is MMP
› legs array Optional field containing leg trades if trade is a combo trade (present when querying for only combo trades and in combo_trades events)
› trade_seq integer The sequence number of the trade within instrument
› risk_reducing boolean true if user order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users)
› instrument_name string Unique instrument identifier
› fee_currency string Currency, i.e "BTC", "ETH", "USDC"
› direction string Direction: buy, or sell
› trade_id string Unique (per currency) trade identifier
› tick_direction integer Direction of the "tick" (0 = Plus Tick, 1 = Zero-Plus Tick, 2 = Minus Tick, 3 = Zero-Minus Tick).
› profit_loss number Profit and loss in base currency.
› matching_id string Always null
› price number Price in base currency
› reduce_only string true if user order is reduce-only
› amount number Trade amount. For perpetual and futures - in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› post_only string true if user order is post-only
› liquidation string Optional field (only for trades caused by liquidation): "M" when maker side of trade was under liquidation, "T" when taker side was under liquidation, "MT" when both sides of trade were under liquidation
› combo_trade_id number Optional field containing combo trade identifier if the trade is a combo trade
› order_id string Id of the user order (maker or taker), i.e. subscriber's order id that took part in the trade
› block_trade_id string Block trade id - when trade was part of a block trade
› order_type string Order type: "limit, "market", or "liquidation"
› quote_set_id string QuoteSet of the user order (optional, present only for orders placed with private/mass_quote)
› combo_id string Optional field containing combo instrument name if the trade is a combo trade
› underlying_price number Underlying price for implied volatility calculations (Options only)
› contracts number Trade size in contract units (optional, may be absent in historical trades)
› mark_price number Mark Price at the moment of trade
› iv number Option implied volatility for the price (Option only)
› state string Order state: "open", "filled", "rejected", "cancelled", "untriggered" or "archive" (if order was archived)
› advanced string Advanced type of user order: "usd" or "implv" (only for options; omitted if not applicable)
estimated_expiration_price.{index_name}
Subscriptions are only available via websockets.

// To subscribe to this channel:
var msg =
{"jsonrpc": "2.0",
"method": "public/subscribe",
"id": 42,
"params": {
"channels": ["estimated_expiration_price.btc_usd"]}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the notifications...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
This subscription will send next notifications like this:

{
"params" : {
"data" : {
"seconds" : 180929,
"price" : 3939.73,
"is_estimated" : false
},
"channel" : "estimated_expiration_price.btc_usd"
},
"method" : "subscription",
"jsonrpc" : "2.0"
}
Returns calculated (estimated) ending price for given index.

Try in API console

Channel Parameters
Parameter Required Type Enum Description
index_name true string ada_usd
algo_usd
avax_usd
bch_usd
btc_usd
doge_usd
dot_usd
eth_usd
link_usd
ltc_usd
matic_usd
near_usd
shib_usd
sol_usd
trx_usd
uni_usd
usdc_usd
xrp_usd
ada_usdc
bch_usdc
algo_usdc
avax_usdc
btc_usdc
doge_usdc
dot_usdc
bch_usdc
eth_usdc
link_usdc
ltc_usdc
matic_usdc
near_usdc
shib_usdc
sol_usdc
trx_usdc
uni_usdc
xrp_usdc
ada_usdt
algo_usdt
avax_usdt
bch_usdt
bnb_usdt
bnb_usdt
btc_usdt
btc_usdt
doge_usdt
dot_usdt
eth_usdt
eth_usdt
link_usdt
ltc_usdt
luna_usdt
matic_usdt
near_usdt
shib_usdt
sol_usdt
trx_usdt
uni_usdt
xrp_usdt
btcdvol_usdc
ethdvol_usdc Index identifier, matches (base) cryptocurrency with quote currency
Response
Name Type Description
data object
› is_estimated boolean When true then price is given as an estimated value, otherwise it's current index price
› left_ticks number number of time ticks that are left until expiration (field added when price is estimated)
› price number Index current or estimated price
› seconds integer Number of seconds till finalizing the nearest instrument
› total_ticks number number of total time ticks (field added when price is estimated)
book.{instrument_name}.{interval}
Subscriptions are only available via websockets.

// To subscribe to this channel:
var msg =
{"jsonrpc": "2.0",
"method": "public/subscribe",
"id": 42,
"params": {
"channels": ["book.BTC-PERPETUAL.100ms"]}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the notifications...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
This subscription will send first notification like this:

{
"params" : {
"data" : {
"type" : "snapshot",
"timestamp" : 1554373962454,
"instrument_name" : "BTC-PERPETUAL",
"change_id" : 297217,
"bids" : [
[
"new",
5042.34,
30
],
[
"new",
5041.94,
20
]
],
"asks" : [
[
"new",
5042.64,
40
],
[
"new",
5043.3,
40
]
]
},
"channel" : "book.BTC-PERPETUAL.100ms"
},
"method" : "subscription",
"jsonrpc" : "2.0"
}
This subscription will send next notifications like this:

{
"params" : {
"data" : {
"type" : "change",
"timestamp" : 1554373911330,
"prev_change_id" : 297217,
"instrument_name" : "BTC-PERPETUAL",
"change_id" : 297218,
"bids" : [
[
"delete",
5041.94,
0
],
[
"delete",
5042.34,
0
]
],
"asks" : [

      ]
    },
    "channel" : "book.BTC-PERPETUAL.100ms"

},
"method" : "subscription",
"jsonrpc" : "2.0"
}
Notifies about changes to the order book for a certain instrument.

The first notification will contain the whole book (bid and ask amounts for all prices). After that there will only be information about changes to individual price levels.

The first notification will contain the amounts for all price levels (list of ['new', price, amount] tuples). All following notifications will contain a list of tuples with action, price level and new amount ([action, price, amount]). Action can be either new, change or delete.

Each notification will contain a change_id field, and each message except for the first one will contain a field prev_change_id. If prev_change_id is equal to the change_id of the previous message, this means that no messages have been missed.

The amount for perpetual and futures is in USD units, for options it is in corresponding cryptocurrency contracts, e.g., BTC or ETH.

Try in API console

Channel Parameters
Parameter Required Type Enum Description
instrument_name true string Instrument name
interval true string raw
100ms
agg2 Frequency of notifications. Events will be aggregated over this interval.
Response
Name Type Description
data object
› asks array of [action, price, amount] The first notification will contain the amounts for all price levels (a list of ["new", price, amount] tuples). All following notifications will contain a list of tuples with action, price level and new amount ([action, price, amount]). Action can be new, change or delete.
› bids array of [action, price, amount] (See 'asks' above.)
› change_id integer Identifier of the notification
› instrument_name string Unique instrument identifier
› prev_change_id integer Identifier of the previous notification (it's not included for the first notification)
› timestamp integer The timestamp of last change (milliseconds since the Unix epoch)
› type string Type of notification: snapshot for initial, change for others. The field is only included in aggregated response (when input parameter interval != raw)
incremental_ticker.{instrument_name}
Subscriptions are only available via websockets.

// To subscribe to this channel:
var msg =
{"jsonrpc": "2.0",
"method": "public/subscribe",
"id": 42,
"params": {
"channels": ["incremental_ticker.BTC-PERPETUAL"]}
};
var ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
ws.onmessage = function (e) {
// do something with the notifications...
console.log('received from server : ', e.data);
};
ws.onopen = function () {
ws.send(JSON.stringify(msg));
};
This subscription will send first notification like this:

{
"params" : {
"data" : {
"type" : "snapshot",
"timestamp" : 1623060194301,
"stats" : {
"volume_usd" : 284061480,
"volume" : 7871.02139035,
"price_change" : 0.7229,
"low" : 35213.5,
"high" : 36824.5
},
"state" : "open",
"settlement_price" : 36169.49,
"open_interest" : 502097590,
"min_price" : 35898.37,
"max_price" : 36991.72,
"mark_price" : 36446.51,
"last_price" : 36457.5,
"instrument_name" : "BTC-PERPETUAL",
"index_price" : 36441.64,
"funding_8h" : 0.0000211,
"estimated_delivery_price" : 36441.64,
"current_funding" : 0,
"best_bid_price" : 36442.5,
"best_bid_amount" : 5000,
"best_ask_price" : 36443,
"best_ask_amount" : 100
},
"channel" : "incremental_ticker.BTC-PERPETUAL"
},
"method" : "subscription",
"jsonrpc" : "2.0"
}
This subscription will send next notifications like this:

{
"params" : {
"data" : {
"type" : "change",
"timestamp" : 1623060199024,
"stats" : {
"volume_usd" : 284073480,
"volume" : 7872.02139035
},
"mark_price" : 36448.61,
"instrument_name" : "BTC-PERPETUAL",
"index_price" : 36442.64,
"funding_8h" : 0.0000311,
"best_bid_price" : 36452.5,
"best_bid_amount" : 300,
"best_ask_amount" : 120
},
"channel" : "incremental_ticker.BTC-PERPETUAL"
},
"method" : "subscription",
"jsonrpc" : "2.0"
}
Notifies about changes in instrument ticker (key information about the instrument).

The first notification will contain the whole ticker. After that there will only be information about changes in the ticker.

This event is sent at most once per second.

Try in API console

Channel Parameters
Parameter Required Type Enum Description
instrument_name true string Instrument name
Response
Name Type Description
data object
› ask_iv number (Only for option) implied volatility for best ask
› best_ask_amount number It represents the requested order size of all best asks
› best_ask_price number The current best ask price, null if there aren't any asks
› best_bid_amount number It represents the requested order size of all best bids
› best_bid_price number The current best bid price, null if there aren't any bids
› bid_iv number (Only for option) implied volatility for best bid
› current_funding number Current funding (perpetual only)
› delivery_price number The settlement price for the instrument. Only when state = closed
› estimated_delivery_price number Estimated delivery price for the market. For more details, see Contract Specification > General Documentation > Expiration Price
› funding_8h number Funding 8h (perpetual only)
› greeks object Only for options
› › delta number (Only for option) The delta value for the option
› › gamma number (Only for option) The gamma value for the option
› › rho number (Only for option) The rho value for the option
› › theta number (Only for option) The theta value for the option
› › vega number (Only for option) The vega value for the option
› index_price number Current index price
› instrument_name string Unique instrument identifier
› interest_rate number Interest rate used in implied volatility calculations (options only)
› last_price number The price for the last trade
› mark_iv number (Only for option) implied volatility for mark price
› mark_price number The mark price for the instrument
› max_price number The maximum price for the future. Any buy orders you submit higher than this price, will be clamped to this maximum.
› min_price number The minimum price for the future. Any sell orders you submit lower than this price will be clamped to this minimum.
› open_interest number The total amount of outstanding contracts in the corresponding amount units. For perpetual and futures the amount is in USD units, for options it is the amount of corresponding cryptocurrency contracts, e.g., BTC or ETH.
› settlement_price number Optional (not added for spot). The settlement price for the instrument. Only when state = open
› state string The state of the order book. Possible values are open and closed.
› stats object
› › high number Highest price during 24h
› › low number Lowest price during 24h
› › price_change number 24-hour price change expressed as a percentage, null if there weren't any trades
› › volume number Volume during last 24h in base currency
› › volume_usd number Volume in usd (futures only)
› timestamp integer The timestamp (milliseconds since the Unix epoch)
› type string Type of notification: snapshot for initial, change for others.
› underlying_index number Name of the underlying future, or index_price (options only)
› underlying_price number Underlying price for implied volatility calculations (options only)
RPC Error Codes
Error Code Short message Description
0 or absent Success, No error.
10000 "authorization_required" Authorization issue, invalid or absent signature etc.
10001 "error" Some general failure, no public information available.
10002 "qty_too_low" Order quantity is too low.
10003 "order_overlap" Rejection, order overlap is found and self-trading is not enabled.
10004 "order_not_found" Attempt to operate with order that can't be found by specified id or label.
10005 "price_too_low <Limit>" Price is too low, <Limit> defines current limit for the operation.
10006 "price_too_low4idx <Limit>" Price is too low for current index, <Limit> defines current bottom limit for the operation.
10007 "price_too_high <Limit>" Price is too high, <Limit> defines current up limit for the operation.
10009 "not_enough_funds" Account has not enough funds for the operation.
10010 "already_closed" Attempt of doing something with closed order.
10011 "price_not_allowed" This price is not allowed for some reason.
10012 "book_closed" Operation for an instrument which order book had been closed.
10013 "pme_max_total_open_orders <Limit>" Total limit of open orders has been exceeded, it is applicable for PME users.
10014 "pme_max_future_open_orders <Limit>" Limit of count of futures' open orders has been exceeded, it is applicable for PME users.
10015 "pme_max_option_open_orders <Limit>" Limit of count of options' open orders has been exceeded, it is applicable for PME users.
10016 "pme_max_future_open_orders_size <Limit>" Limit of size for futures has been exceeded, it is applicable for PME users.
10017 "pme_max_option_open_orders_size <Limit>" Limit of size for options has been exceeded, it is applicable for PME users.
10018 "non_pme_max_future_position_size <Limit>" Limit of size for futures has been exceeded, it is applicable for non-PME users.
10019 "locked_by_admin" Trading is temporary locked by the admin.
10020 "invalid_or_unsupported_instrument" Instrument name is not valid.
10021 "invalid_amount" Amount is not valid.
10022 "invalid_quantity" quantity was not recognized as a valid number (for API v1).
10023 "invalid_price" price was not recognized as a valid number.
10024 "invalid_max_show" max_show parameter was not recognized as a valid number.
10025 "invalid_order_id" Order id is missing or its format was not recognized as valid.
10026 "price_precision_exceeded" Extra precision of the price is not supported.
10027 "non_integer_contract_amount" Futures contract amount was not recognized as integer.
10028 "too_many_requests" Allowed request rate has been exceeded.
10029 "not_owner_of_order" Attempt to operate with not own order.
10030 "must_be_websocket_request" REST request where Websocket is expected.
10031 "invalid_args_for_instrument" Some of the arguments are not recognized as valid.
10032 "whole_cost_too_low" Total cost is too low.
10033 "not_implemented" Method is not implemented yet.
10034 "trigger_price_too_high" Trigger price is too high.
10035 "trigger_price_too_low" Trigger price is too low.
10036 "invalid_max_show_amount" Max Show Amount is not valid.
10037 "non_pme_total_short_options_positions_size <Limit>" Limit of total size for short options positions has been exceeded, it is applicable for non-PME users.
10038 "pme_max_risk_reducing_orders <Limit>" Limit of open risk reducing orders has been reached, it is applicable for PME users.
10040 "retry" Request can't be processed right now and should be retried.
10041 "settlement_in_progress" Settlement is in progress. Every day at settlement time for several seconds, the system calculates user profits and updates balances. That time trading is paused for several seconds till the calculation is completed.
10043 "price_wrong_tick" Price has to be rounded to an instrument tick size.
10044 "trigger_price_wrong_tick" Trigger Price has to be rounded to an instrument tick size.
10045 "can_not_cancel_liquidation_order" Liquidation order can't be canceled.
10046 "can_not_edit_liquidation_order" Liquidation order can't be edited.
10047 "matching_engine_queue_full" Reached limit of pending Matching Engine requests for user.
10048 "not_on_this_server" The requested operation is not available on this server.
10049 "cancel_on_disconnect_failed" Enabling Cancel On Disconnect for the connection failed.
10066 "too_many_concurrent_requests" The client has sent too many public requests that have not yet been executed.
10072 "disabled_while_position_lock" Spot trading is disabled for users in reduce only mode.
11008 "already_filled" This request is not allowed in regards to the filled order.
11013 "max_spot_open_orders" Total limit of open orders on spot instruments has been exceeded.
11021 "post_only_price_modification_not_possible" Price modification for post only order is not possible
11022 "max_spot_order_quantity" Limit of quantity per currency for spot instruments has been exceeded.
11029 "invalid_arguments" Some invalid input has been detected.
11030 "other_reject <Reason>" Some rejects which are not considered as very often, more info may be specified in <Reason>.
11031 "other_error <Error>" Some errors which are not considered as very often, more info may be specified in <Error>.
11035 "no_more_triggers <Limit>" Allowed amount of trigger orders has been exceeded.
11036 "invalid_trigger_price" Invalid trigger price (too high or too low) in relation to the last trade, index or market price.
11037 "outdated_instrument_for_IV_order" Instrument already not available for trading.
11038 "no_adv_for_futures" Advanced orders are not available for futures.
11039 "no_adv_postonly" Advanced post-only orders are not supported yet.
11041 "not_adv_order" Advanced order properties can't be set if the order is not advanced.
11042 "permission_denied" Permission for the operation has been denied.
11043 "bad_argument" Bad argument has been passed.
11044 "not_open_order" Attempt to do open order operations with the not open order.
11045 "invalid_event" Event name has not been recognized.
11046 "outdated_instrument" At several minutes to instrument expiration, corresponding advanced implied volatility orders are not allowed.
11047 "unsupported_arg_combination" The specified combination of arguments is not supported.
11048 "wrong_max_show_for_option" Wrong Max Show for options.
11049 "bad_arguments" Several bad arguments have been passed.
11050 "bad_request" Request has not been parsed properly.
11051 "system_maintenance" System is under maintenance.
11052 "subscribe_error_unsubscribed" Subscription error. However, subscription may fail without this error, please check the list of subscribed channels returned, as some channels can be not subscribed due to wrong input or lack of permissions.
11053 "transfer_not_found" Specified transfer is not found.
11054 "post_only_reject" Request rejected due to reject_post_only flag.
11055 "post_only_not_allowed" Post only flag not allowed for given order type
11056 "unauthenticated_public_requests_temporarily_disabled" Request rejected because of unauthenticated public requests were temporarily disabled
11090 "invalid_addr" Invalid address.
11091 "invalid_transfer_address" Invalid address for the transfer.
11092 "address_already_exist" The address already exists.
11093 "max_addr_count_exceeded" Limit of allowed addresses has been reached.
11094 "internal_server_error" Some unhandled error on server. Please report to admin. The details of the request will help to locate the problem.
11095 "disabled_deposit_address_creation" Deposit address creation has been disabled by admin.
11096 "address_belongs_to_user" Withdrawal instead of transfer.
11097 "no_deposit_address" Deposit address not specified.
11098 "account_locked" Account locked.
12001 "too_many_subaccounts" Limit of subbacounts is reached.
12002 "wrong_subaccount_name" The input is not allowed as the name of subaccount.
12003 "login_over_limit" The number of failed login attempts is limited.
12004 "registration_over_limit" The number of registration requests is limited.
12005 "country_is_banned" The country is banned (possibly via IP check).
12100 "transfer_not_allowed" Transfer is not allowed. Possible wrong direction or other mistake.
12998 "security_key_authorization_over_limit" Too many failed security key authorizations. The client should wait for wait seconds to try again.
13004 "invalid_credentials" Invalid credentials have been used.
13005 "pwd_match_error" Password confirmation error.
13006 "security_error" Invalid Security Code.
13007 "user_not_found" User's security code has been changed or wrong.
13008 "request_failed" Request failed because of invalid input or internal failure.
13009 "unauthorized" Wrong or expired authorization token or bad signature. For example, please check the scope of the token, "connection" scope can't be reused for other connections.
13010 "value_required" Invalid input, missing value.
13011 "value_too_short" Input is too short.
13012 "unavailable_in_subaccount" Subaccount restrictions.
13013 "invalid_phone_number" Unsupported or invalid phone number.
13014 "cannot_send_sms" SMS sending failed -- phone number is wrong.
13015 "invalid_sms_code" Invalid SMS code.
13016 "invalid_input" Invalid input.
13018 "invalid_content_type" Invalid content type of the request.
13019 "orderbook_closed" Closed, expired order book.
13020 "not_found" Instrument is not found, invalid instrument name.
13021 "forbidden" Not enough permissions to execute the request, forbidden.
13025 "method_switched_off_by_admin" API method temporarily switched off by the administrator.
13028 "temporarily_unavailable" The requested service is not responding or processing the response takes too long.
13031 "verification_required" API method allowed only for verified users.
13032 "non_unique_order_label" Request allowed only for orders uniquely identified by given label, more than one match was found
13034 "no_more_security_keys_allowed" Maximal number of tokens allowed reached
13035 "active_combo_limit_reached" Limit of active combo books was reached. The client should wait some time before retrying the request.
13036 "unavailable_for_combo_books" Action is temporarily unavailable for combo books.
13037 "incomplete_KYC_data" KYC verification data is insufficient for external service provider.
13040 "mmp_required" User is not a MMP user.
13042 "cod_not_enabled" Cancel-on-Disconnect is not enabled for the connection.
13043 "quotes_frozen" Quotes are still frozen after previous cancel.
13403 "scope_exceeded" Error returned after the user tried to edit / delete an API key using an authorized key connection with insufficient scope
13503 "unavailable" Method is currently not available.
13666 "request_cancelled_by_user" Request was cancelled by the user with other api request.
13777 "replaced" Edit request was replaced by other one.
13778 "raw_subscriptions_not_available_for_unauthorized" Raw subscriptions are not available for unauthorized requests.
13780 "move_positions_over_limit" The client cannot execute the request yet, and should wait for wait seconds to try again
13781 "coupon_already_used" The coupon has already been used by current account
13791 "KYC_transfer_already_initiated" Sharing of KYC data with a third party provider was already initiated.
13792 "incomplete_KYC_data" User's KYC data stored on the platform is insufficient for sharing according to third party provider.
13793 "KYC_data_inaccessible" User's KYC data is inaccessible at the moment. Client should try again later.
13888 "timed_out" Server did not manage to process request when it was valid (valid_until)
13901 "no_more_oto_orders" Total limit of open "one triggers other" orders has been exceeded.
13902 "mass_quotes_disabled" Mass Quotes feature disabled for this user and currency.
13903 "too_many_quotes" Number of qoutes (in Mass Quotes requests) per second exceeded.
-32602 "Invalid params" See JSON-RPC spec.
-32600 "request entity too large" Error thrown when body size in POST request or single frame in websocket connection frame exceeds the limit (32 kB)
-32601 "Method not found" See JSON-RPC spec.
-32700 "Parse error" See JSON-RPC spec.
-32000 "Missing params" See JSON-RPC spec.
FIX API
Deribit FIX API is a subset of FIX version 4.4, but also includes some tags from 5.0 version and several custom tags. Deribit uses the standard header and trailer structure for all messages. To enable the API, sign in and go to Account > Security > API Tab and use the checkbox. 'Client Secret' is the user's secret key provided by Deribit. Important Note: Do not reveal to anybody your 'Client Secret', as it can be used to gain full control over your account.

The FIX server can be reached at www.deribit.com:9881 (raw tcp) or www.deribit.com:9883 (ssl). The FIX server for the test network can be reached at test.deribit.com:9881 (raw tcp) or test.deribit.com:9883 (ssl).

Each request message can include:

Tag Name Type Required Comments
8 BeginString String Yes Identifies beginning of new message and protocol version. Must always be first in the message
9 BodyLength Length Yes Message length in bytes, not including fields BeginString(8), BodyLength(9) and CheckSum(10). The length must be calculated by counting the number of octets in the message up to and including the end of field delimiter (Start of Heading) of the field immediately preceding the CheckSum(10) field. Must always be the second in the message.
Please refer to FIX specification for more details

35 MsgType String Yes The type of the message. See below for available types
49 SenderCompID String Yes A user defined client name
56 TargetCompID String Yes Constant value: DERIBITSERVER
34 MsgSeqNum SeqNum Yes A sequence number for the message, starts with 1, and must be incremented by 1 for every message
52 SendingTime UTCTimestamp No The time the request is sent. This field is ignored by the server
10 CheckSum String Yes The checksum of all of all preceding messages. In order to calculate checksum, sum up the binary value of each octet up to and including the end of field delimiter (Start of Heading) of the field immediately preceding the CheckSum(10).
Afterwards calculate modulo 256 of that sum. The calculated modulo 256 checksum must then be encoded as an ISO 8859-1 three-octet representation of the decimal value.

For example, if the message length sum of character values has been calculated to be 274 then the modulo 256 value is 18 (256 + 18 = 274). This value would be encoded in the CheckSum(10) field as “10=018”.

CheckSum must always be the last field in the message.
Please refer to FIX specification Annex A for more details

Responses sent by the server will at least include:

Tag Name Type Comments
8 BeginString String Identifies beginning of new message and protocol version. Must always be first in the message
9 BodyLength Length Message length in bytes, not including fields BeginString(8), BodyLength(9) and CheckSum(10).
Please refer to FIX specification for more details

35 MsgType String The type of the message. See below for available types
49 SenderCompID String Constant value: DERIBITSERVER
56 TargetCompID String A user defined client name
34 MsgSeqNum SeqNum A server-chosen sequence number for the message
52 SendingTime UTCTimestamp The time the request is sent. This field is ignored by the server
10 CheckSum String The checksum of all of all preceding messages. Please refer to FIX specification Annex A for more details
Logon(A)
Logon(A) must be the first message sent by the client to initiate a session. If authentication succeeds, the exchange should echo the message back to the client. If authentication fails, the exchange will respond with a LogOut(5) message with an appropriate reason.

Arguments
Tag Name Type Required Comments
108 HeartBtInt int Yes Used to declare the timeout interval in seconds for generating heartbeats
95 RawDataLength Length No Number of bytes in raw data field. Not required, as the normal RawData is base64 text here
96 RawData data Yes The timestamp and a Base64 encoded nonce (see below)
553 Username String Yes API Client ID. This can be obtained from the API tab on your account settings
554 Password String Yes See below
9002 UseWordsafeTags Boolean No If present and set to Y, all of the tag numbers for our custom tags start at 5000 instead of 100000. For example, Volume24h(100087) would become 5078. This tag can be used due to the fact, that legacy software which implements FIX protocol, doesn't support the extended range for tags, which was defined in later protocol's revisions. This setting stays applied for the remainder of the connection
9001 CancelOnDisconnect Boolean No Boolean, to enable or disable session-level cancel on disconnect. Default - false(N)
9004 DeribitAppId String No Registered application Client ID. It is necessary for registered applications only
9005 DeribitAppSig String No Registered application Signature. It is necessary for registered applications only. It is calculated in a similar way to the Password(554) but with Application Secret instead of Client Secret: base64(sha256(RawData ++ application_secret)), see below
9007 DeribitSequential Boolean No Custom tag to adapt Deribit internal messaging to sequential FIX messaging. If the tag is present and set to 'Y', the messages are sent with sequential ordering, i.e., there is no priority for direct "call responses" over notifications. Please note this may lead to slower call-return information delivery in comparison with other user which do not use this flag
9009 UnsubscribeExecutionReports Boolean No Custom tag. Default - false (N). If the tag is present and set to 'Y' this connection is unsubscribed from notificational Execution Reports about order changes. Only responses to order operation requests in this connection will be sent as Execution Reports, but no notifications such as orders from other connection or trades initiated by counterparty
9010 ConnectionOnlyExecutionReports Boolean No Custom tag. Default - false (N). If the tag is present and set to 'Y' this connection will receive notificational Execution Reports only for order created in this connection, it won't receive notification for orders created in other connections even within the same subaccount. This tag can be used to split Execution Reports between several connections to the same subaccount
9018 DisplayIncrementSteps Boolean No Custom tag, default is false (N). If the tag is present and set to 'Y', then symbol entries will include the Price Increment steps of the Symbol (if applicable). See NoTickRules(1205) below
The RawData(96) tag contains a timestamp and a nonce, separated by an ASCII period (.). The timestamp needs to be a strictly increasing integer. We recommend using a timestamp in milliseconds. The nonce is composed of base64-encoded randomly chosen bytes. For safety reasons, it is important that the nonce is sufficiently long and sourced from a cryptographically secure random number generator. We recommend at least 32 bytes, but the nonce can be up to 512 bytes.

The Password(554) tag contains a base64 encoded SHA256 hash of the concatenation of the RawData(96) content and the cleint secret: base64(sha256(RawData ++ access_secret)), here ++ denotes operation of the concatenation.

Optional custom tag DeribitAppSig(9005) contains a base64 encoded SHA256 hash of the concatenation of the RawData(96) content and the Application secret: base64(sha256(RawData ++ application_secret)), here ++ denotes operation of the concatenation. This tag is used for registered applications only.

CancelOnDisconnect(9001) controls "Close on Disconnect". If this tag is not provided, the default setting from the account is used.

Response
When the login is successful, the server will echo back the request.

If the login was not successful, the server will respond with a Logout(5) message, and close the connection.

Logout(5)
Logout(5) can be sent by either party in order to terminate a session. The sending party should always wait for the echo of the logout request before they close the socket. Closing connections in any other way is considered abnormal behavior. Nonetheless, if CancelOnDisconnect(9001) was set at Logon, all orders will be cancelled at Logout.

Arguments
Tag Name Type Required Comments
58 text String No Free format text string specifying the logout reason. This is ignored by the server
9003 DontCancelOnDisconnect Boolean No If Y then it disables CancelOnDisconnect for this connection even if CancelOnDisconnect was enabled in Logon(A) or account settings. Default - false(N), no changes for CancelOnDisconnect flag
Heartbeat(0)
When either end of a FIX connection has not sent or received any data for HeartBtInt seconds (as specified in the Logon(A) message), it will transmit a Heartbeat(0) message. When either end of a FIX connection has not received any data for HeartBtInt seconds, it will transmit a TestRequest(1) message. If there is still no response, the session should be considered lost and corrective action should be initiated.

Arguments
Tag Name Type Required Comments
112 TestReqId String Varies The identifier when responding to the Test Request(1) message. When not responding to a Test Request(1) message, this tag can be left out
Response
When the heartbeat has been received successfully, the server will echo back the request as confirmation.

Test Request(1)
The Test Request(1) message forces a heartbeat from the opposing application. The opposing application responds with a Heartbeat(0) containing the TestReqID(112).

Arguments
Tag Name Type Required Comments
112 TestReqId String Yes Mirrors the original request ID
Resend Request(2)
The Resend Request(2) message is used by the server to initiate the retransmission of messages. This function is utilized if a sequence number gap is detected, if the receiving application lost a message, or as a function of the initialization process.

Arguments
Tag Name Type Required Comments
7 BeginSeqNo int Yes The first message to repeat
16 EndSeqNo int Yes The last message to repeat
Reject(3)
The Reject(3) message should be issued when a message is received but cannot be properly processed due to a session-level or data structure rule violation. An example of when a reject may be appropriate would be the receipt of a message with invalid basic data (e.g. missing tags) which successfully passes decryption.

Arguments
Tag Name Type Required Comments
45 RefSeqNum SeqNum Yes MsgSeqNum(34) of the rejected message
372 RefMsgType String No The MsgType(35) of the FIX message being referenced
373 SessionRejectReason int No Code to identity reason for rejection:
6 = Incorrect data format for value
11 = Invalid MsgType(35)
99 = Other
58 Text String No Text string explaining the reason for rejection
Sequence Reset(4)
The Sequence Reset(4) is to recover from an out-of-sequence condition, to reestablish a FIX session after a sequence loss. The MsgSeqNum(34) in the header is ignored.

Arguments
Tag Name Type Required Comments
36 NewSeqNo SeqNum Yes New Sequence Number
Response
In reply to Sequence Reset(4), the exchange replies with Resend Request(2) with BeginSeqNo(7) and EndSeqNo(16) equal to the passed NewSeqNo(36) in case of success. In case of wrong arguments, the server replies with Resend Request(2) with BeginSeqNo(7) and EndSeqNo(16) equal to the current incoming sequence on the server.

The Sequence Reset (4) can only increase the sequence number. If a Sequence Reset(4) is received attempting to decrease the next expected sequence number the reply is Resend Request(2) with BeginSeqNo(7) and EndSeqNo(16) equal to the current incoming sequence on the server.

After sending the correct Sequence Reset(4), the client should start sending messages starting from the sequence number equal to the NewSeqNo(36) passed.

Security List Request(x)
The SecurityListRequest(x) message is used to return a list of securities (instruments) from the Deribit.

Arguments
Tag Name Type Required Comments
320 SecurityReqId String Yes A user-generated ID for this request. This can be used to match the request to the response
559 SecurityListRequestType int Yes 0 or 4 – in any case list of instruments is returned
263 SubscriptionRequestType int No Subscription Request Type to get notifications about new or terminated instruments. Valid values:
0 = Snapshot,
1 = Snapshot + Updates (Subscribe),
2 = Disable previous Snapshot + Update Request (Unsubscribe)
9013 DisplayMulticastInstrumentID Boolean No Custom tag, default is false (N). If the tag is present and set to 'Y', then symbol entries will include the Multicast identifier of the Symbol (if applicable). See NoSecurityAltID(454) below
9018 DisplayIncrementSteps Boolean No Custom tag, default is false (N). If the tag is present and set to 'Y', then symbol entries will include the Price Increment steps of the Symbol (if applicable). See NoTickRules(1205) below
15 Currency String No First currency of the currency pair for limiting the resulted list. Required if SecondaryCurrency(5544) specified.
5544 SecondaryCurrency String No Second currency of the currency pair for limiting the resulted list. Default is USD if Currency(15) is specified. Current API doesn't support queries by SecondaryCurrency only, so Currency (15) is mandatory if SecondaryCurrency is present. In current implementation SecondaryCurrency is ignored in subscription when SubscriptionRequestType (263) = 1
167 SecurityType String No Optional parameter for limiting output by the SecurityType. Describes type of security.
Possible values:

FXSPOT for currency exchange spot
FUT for futures,
OPT for options,
FUTCO for future combo,
OPTCO for option combo
INDEX for indexes
Response
The server will respond with a Security List(y) message, where the SecurityReq(320) is equal to that of the request.

Security List(y)
The SecurityList(y) message is used to return a list of securities that matches the criteria specified in a Security List Request(x).

Arguments
Tag Name Type Required Comments
320 SecurityReqId String Yes The SecurityReqId(320) of the request that this is a response for
322 SecurityResponseID String Yes Identifier for the Security List(x) message
560 SecurityRequestResult int Yes 0 indicates a successful response. This is the only possible value in the Deribit FIX API
Group SecListGrp
146 NoRelatedSym NumInGroup No Specifies the number of repeating instruments specified
=>55 Symbol String No Common, "human understood" representation of the security, e.g., BTC-28JUL17, see instrument naming convention below for more details
=>107 SecurityDesc String No Free form security description: 'future', 'option', 'future_combo', 'option_combo' and various indexes
=>167 SecurityType String No Describes type of security.
Possible values:

FXSPOT for currency exchange spot
FUT for futures,
OPT for options,
FUTCO for future combo,
OPTCO for option combo
INDEX for indexes
=>201 PutOrCall int No Indicates whether an Option is for a put or call. Only for Options.
Possible values:

0 = put,
1 = call
=>202 StrikePrice Price No Strike price
=>947 StrikeCurrency String No Strike currency
=>15 Currency String No Currency
=>1524 PriceQuoteCurrency String No Quoting or counter currency
=>2576 InstrumentPricePrecision int No Number of decimal places for instrument prices (usually 4 for options, 2 for futures)
=>969 MinPriceIncrement float No Minimum price tick for a given Instrument
=>311 UnderlyingSymbol String No Underlying symbol for options
=>225 IssueDate UTCTimestamp No Date instrument was issued
=>541 MaturityDate UTCTimestamp No Expiration date, YYYYMMDD
=>1079 MaturityTime UTCTimestamp No Time of instruments expiration expressed in local time with offset to UTC specified
=>562 MinTradeVol Qty No The minimum trading volume for a security
=>63 SettlType String No Indicates order settlement period. E.g., M1 – month, W1 – week, W2 – 2 weeks etc
=>120 SettlCurrency Currency No Currency code of settlement denomination
=>479 CommCurrency Currency No Specifies currency to be used for Commission
=>231 ContractMultiplier float No Specifies the ratio or multiply factor to convert from contracts to total units
=>454 NoSecurityAltID NumInGroup No Number of alternate security identifier.
It is present only if Security List Request(x) has DisplayMulticastInstrumentID = Y

=>=>455 SecurityAltID String No The security identifier
=>=>456 SecurityAltIDSource String No Identifies the class or source of the SecurityAltID(455) value. Required if SecurityAltID is specified.
Possible values:

101 = Multicast identifier
102 = Combo instrument identifier
=>1205 NoTickRules NumInGroup No Number of price increment steps.
It is present only if Security List Request(x) has DisplayIncrementSteps = Y

=>=>1206 StartTickPriceRange Price No Above this price, the TickIncrement applies
=>=>1208 TickIncrement Price No Valid price increment for prices above the StartTickPriceRange
=>965 SecurityStatus String No (\*) It is present in notifications about new or terminated instruments.
Possible values:

1 = active/started,
10 = published/created,
4 = closed,
2 = terminated/inactive,
12 = settled
Instrument Naming convention
Based on the naming convention, instrument name consist of base currency, quote currency(called together a currency pair), contract expiration date (if the instrument isn't perpetual) and strike price(if the contract is an option).

For example:

ETH_USD-14SEP22-2000-P resembles an ETH-USD options contract that expires on 14 september 2022 with PUT strike price at 2000 USD. BTC_USD trading pair is treated as a default trading pair and doesn't have qoute currency provided in its name.

(\*) SecurityStatus is present only in notification messages for subscription by SecurityListRequest with SubscriptionRequestType=1. The notifications for closed, settled or terminated status contain only the status and symbol name.

Market Data Request(V)
Market Data Request(V) can be used to request market data in snapshot or the incremental form. Deribit uses his message for order book requests and its change notification.

Arguments
Tag Name Type Required Comments
262 MdReqId String Yes Unique ID assigned to this request
263 SubscriptionRequestType int Yes Subscription Request Type. Valid values:
0 = Snapshot,
1 = Snapshot + Updates (Subscribe),
2 = Disable previous Snapshot + Update Request (Unsubscribe)
264 MarketDepth int No See remark about MDUpdateType below
265 MDUpdateType int when SubscriptionRequestType=1 The type of update to subscribe to.
Valid values:

0= full refresh,
1= incremental refresh
9011 DeribitSkipBlockTrades Boolean No To skip block trades. If 9011=Y then block trades will not be reported. Default is N
9012 DeribitShowBlockTradeId Boolean No To show block trade id. If 9012=Y and 9012=N then block trades will include BlockTrade ID as TrdMatchID (880). Default is N
100007 DeribitTradeAmount int No Amount of trades returned in the snapshot response to request for snapshot of recent trades, default 20, maximum 1000
100008 DeribitSinceTimestamp int No UTC Timestamp in milliseconds (integer number of milliseconds), if specified, the response returns the trades happened since that timestamp, applicable to the request for recent trades snapshot
Group MDReqGrp
267 NoMdEntryTypes NumInGroup Yes Number of entry types in the request
=>269 MDEntryType int Yes
Valid values:

0 = Bid (Bid side of the order book),
1 = Offer (Ask side of the order book),
2 = Trade (Info about recent trades)
Group InstrmtMDReqGrp
146 NoRelatedSym NumInGroup No Number of symbols requested. Necessary if more than 1 Symbol requested
=>55 Symbol String Yes Instrument symbol. See instrument naming convention for more details
When requesting a subscription (SubscriptionRequestType=1), the only supported combinations are:

MDUpdateType=1, MarketDepth=0. This will result a Market Data - Snapshot(W) with the whole order book, followed by incremental updates (X messages) through the whole order book depth.
MDUpdateType=0, MarketDepth=(1,10,20). This results in Market Data - Full Refresh(W) messages, containing the entire specified order book depth. Valid values for MarketDepth are 1, 10, 20.
If multiple instrument symbols are specified then the system responds with multiple market data messages corresponding to those instruments.

Response
If the server is unable to supply the requested data, it will respond with a Market Data Request Reject(Y) message.

If the request called for a snapshot (SubscriptionRequestType(263)=0), the server will respond with a Market Data - Snapshot/Full Refresh(W) message.

If the request called for a snapshot and subscription (SubscriptionRequestType(263)=1), the server will start sending Market Data - Incremental Refresh(X) messages.

Market Data Request Reject(Y)
If a Market Data Request(V) message is not accepted, the exchange responds with a Market Data Request Reject(Y) message

Arguments
Tag Name Type Required Comments
58 Text String No Free format text string
262 MDReqID String Yes ID of the original request
281 MDReqRejReason char Yes Reason for the rejection of a Market Data Request(V).
Possible reasons:

0 = Unknown symbol
1 = Duplicate MDReqID(262)
2 = Insufficient Bandwidth
3 = Insufficient Permissions
4 = Unsupported SubscriptionRequestType(263)
5 = Unsupported MarketDepth(264)
6 = Unsupported MDUpdateType(265)
7 = Unsupported AggregatedBook (266)
8 = Unsupported MDEntryType(269)
9 = Unsupported TradingSessionID(336)
A = Unsupported Scope(546)
B = Unsupported OpenCloseSettlFlag(286)
C = Unsupported MDImplicitDelete(547)
D = Insufficient credit
Market Data Snapshot/Full Refresh(W)
Market Data Snapshot/Full Refresh(W) is used as the response to a Market Data Request(V) message.

Arguments
Tag Name Type Required Comments
55 Symbol String Yes Instrument symbol. See instrument naming convention for more details
262 MDReqID String No ID of the original request, if it is applicable
311 UnderlyingSymbol String For options Underlying symbol
810 UnderlyingPx Price For options Price of the underlying instrument. Underlying instrument underlies the primary instrument
231 ContractMultiplier float No Specifies a multiply factor to convert from contracts to total units
201 PutOrCall int No Indicates whether an Option is for a put or call. Only for Options.
Possible values:

0 = put,
1 = call
100087 TradeVolume24h Qty No Defines 24h trade volume for the Symbol in the corresponding contract units
100090 MarkPrice Price No Defines mark price for the Symbol
746 OpenInterest float No Defines open interest for the Symbol
100092 CurrentFunding Price No Current funding (perpetual only)
100093 Funding8h Price No Funding in last 8h (perpetual only)
Group MDFullGrp
268 NoMDEntries NumInGroup Yes Repeating group. Specifies the number of entries in the group
=>269 MDEntryType int Yes Possible values:
0 = Bid (Bid side of the order book),
1 = Offer (Ask side of the order book),
2 = Trade (in case of request for info about recent trades),
3 = Index Value (value of Index for INDEX instruments like BTC-DERIBIT-INDEX),
6 = Settlement Price(Estimated Delivery Price for INDEX instruments like BTC-DERIBIT-INDEX)
=>270 MDEntryPx Price No Price of an entry
=>271 MDEntrySize Qty No Size of an entry in Contract units corresponding to the ContractMultiplier in SecurityList
=>272 MDEntryDate UTCTimestamp No The timestamp for trade
=>100009 DeribitTradeId String No Id of the trade, in case of the request for trades
=>54 Side char No Side of trade.
Possible values:

1 = Buy,
2 = Sell
=>44 Price Price No For trades, this is the index price at the trade moment (Deribit index)
=>58 Text String No For trade - the trade sequence number
=>37 OrderId String No For trade – taker's matching order id
=>198 SecondaryOrderId String No For trade – maker's matching order id
=>39 OrdStatus char No For trade – order status.
Possible values:

0 = New,
1 = Partially filled,
2 = Filled,
4 = Cancelled
=>100010 DeribitLabel String No User defined max 64 grapheme clusters long, label of the order, in case of the request for trades. This tag operates on grapheme clusters. A grapheme cluster is a user-perceived character, which can be represented by several unicode codepoints. Please refer to Unicode specification for more details about the grapheme clusters
=>100091 DeribitLiquidation String No Optional field (only for trades caused by liquidation): "M" when maker side of trade was under liquidation, "T" when taker side was under liquidation, "MT" when both sides of trade were under liquidation. This field is hidden for public for the first hour after the trade in order to prevent traders from abusing this information.
=>880 TrdMatchID String No Only for trades. Block trade id - when trade was part of block trade. It can be included only if DeribitShowBlockTradeId(9012) is set to Y and DeribitSkipBlockTrades(9011) is set to N
CurrentFunding and Funding8h are present only in W message, not in X message below.

Market Data Incremental Refresh(X)
Market Data – Incremental Refresh(X) message is used for incremental updates in case of Market Data Request(V) for Snapshot + Subscribe

Arguments
Tag Name Type Required Comments
55 Symbol String Yes Instrument symbol. See instrument naming convention for more details
262 MDReqID String No ID of the original request, if it is applicable
231 ContractMultiplier float No Specifies a multiply factor to convert from contracts to total units
201 PutOrCall int No Indicates whether an Option is for a put or call. Only for Options.
Possible values:

0 = put,
1 = call
100087 TradeVolume24h Qty No Defines 24h trade volume for the Symbol in the corresponding contract units
100090 MarkPrice Price No Defines mark price for the Symbol
746 OpenInterest float No Defines open interest for the Symbol
Group MDIncGrp
268 NoMDEntries NumInGroup Yes Repeating group . Specifies the number of entries in the group
=>279 MDUpdateAction char Yes Type of Market Data update action. Valid values:
0 = New,
1 = Change,
2 = Delete
=>269 MDEntryType int No Possible values:
0 = Bid (Bid side of the order book),
1 = Offer (Ask side of the order book),
2 = Trade (In case of request for info about recent trades)
=>270 MDEntryPx Price No Price of an entry
=>271 MDEntrySize Qty No Size of an entry in Contract units corresponding to the ContractMultiplier in SecurityList
=>272 MDEntryDate UTCTimestamp No The timestamp for trade
=>100009 DeribitTradeId String No Id of the trade, in case of the request for trades
=>54 Side char No Side of trade.
Possible values:

1 = Buy,
2 = Sell
=>37 OrderId String No For trade – order id
=>198 SecondaryOrderId String No For trade – matching order id
=>39 OrdStatus char No For trade – order status.
Possible values:

0 = New,
1 = Partially filled,
2 = Filled,
4 = Cancelled
=>100010 DeribitLabel String No User defined max 64 grapheme clusters long, label of the order, in case of the request for trades. This tag operates on grapheme clusters. A grapheme cluster is a user-perceived character, which can be represented by several unicode codepoints. Please refer to Unicode specification for more details about the grapheme clusters
=>44 Price Price No For trades, this is the index price at the trade moment (Deribit index)
=>58 Text String No The trade sequence number
=>100091 DeribitLiquidation String No Optional field (only for trades caused by liquidation): "M" when maker side of trade was under liquidation, "T" when taker side was under liquidation, "MT" when both sides of trade were under liquidation. This field is hidden for public for the first hour after the trade in order to prevent traders from abusing this information.
=>880 TrdMatchID String No Only for trades. Block trade id - when trade was part of block trade. It can be included only if DeribitShowBlockTradeId(9012) is set to Y and DeribitSkipBlockTrades(9011) is set to N
New Order Single(D)
The NEW ORDER SINGLE(D) is used by the client to submit new orders to the exchange.

Arguments
Tag Name Type Required Comments
11 ClOrdID String Yes Unique identifier for the order, assigned by the client, max 64 grapheme clusters. This tag operates on grapheme clusters. A grapheme cluster is a user-perceived character, which can be represented by several unicode codepoints. Please refer to Unicode specification for more details about the grapheme clusters
54 Side char Yes Side of order.
Valid values:

1 = Buy,
2 = Sell
38 OrderQty Qty Yes Order quantity. Please, note that Quantity is defined in Contract units corresponding to the ContractMultiplier in SecurityList
44 Price Price Yes Price
55 Symbol String Yes Instrument symbol, e.g., BTC-1JAN16. See instrument naming convention for more details
62 ValidUntilTime UTCTimestamp No Indicates expiration time of indication message, in UTC
18 ExecInst MultipleCharValue No Currently is used to mark POST ONLY orders and REDUCE ONLY orders.
POST ONLY valid values:

6 = "Participate don't initiate",
A = "No cross" (only together with 6, "6A" -- REJECT POST ONLY when the order is put to order the book unmodified or the request is rejected and order is canceled),
REDUCE ONLY valid values:
E = "Do not increase - DNI"
40 OrdType Char No Order type.
Valid values:

1 = Market,
2 = Limit (by default),
K = Market With Left Over as Limit (market limit),
4 = Stop limit (trailing stop),
J = Market If Touched (stop limit, if StopPx(99) is set),
S = Stop Limit on Bid or Offer (stop market, if StopPx(99) is set)
59 TimeInForce char No Specifies how long the order remains in effect. Absence of this field is interpreted as "Good 'Til Cancelled".
Valid values:

0 = Good 'Til Day(GTD),
1 = Good 'Til Cancelled(GTC),
3 = Immediate or Cancel(IOC),
4 = Fill or Kill(FOK)
99 StopPx Price No Price per unit of quantity
210 MaxShow Qty No Maximum quantity within an order to be shown to other customers
854 QtyType Int No Type of quantity. Valid values:
0 = Units,
1 = Contracts
211 PegOffsetValue Float No Amount (signed) added to the peg for a pegged order in the context of the PegOffsetType(836)
1094 PegPriceType Int No Needs to be set for Trailing Stop order. Valid value:
8 = Trailing Stop Peg
100010 DeribitLabel String No A custom label for your order, max 64 grapheme clusters. Can be used by Order Cancel Request(F) to amend the order later on
100012 DeribitAdvOrderType char No Used to create advanced order for options. If it is present:
0 = Implied Volatility Order (price defines fixed implied volatility in %),
1 = USD Order (price defines fixed USD price of the option, advanced USD orders are not supported for linear options)
9008 DeribitMMProtection Boolean No Order Market Maker Protection (MMP) flag, default is N. Important: manual admin action is necessary to activate Market Maker Protection (MMP) for an account
5127 DeribitConditionTriggerMethod Int No Selects condition trigger method for algo orders. Valid values:
1 = mark price,
2 = trade,
3 = index
Response
Upon receiving a new order, the exchange responds with the Execution Report(8) message communicating whether the order was accepted or rejected.

Tag Name Type Required Comments
527 SecondaryExecID String No ID of the last order change
37 OrderId String No Unique identifier of the order, assigned by the Deribit
11 ClOrdID String No Deribit replaces this field with the own value assigned by the server (it is not the ClOrdID(11) from New Order Single(D))
41 OrigClOrdId String No The original value assigned by the client in the New Order Single(D) message
39 OrdStatus char Yes For trade – order status.
Possible values:

0 = New,
1 = Partially filled,
2 = Filled,
4 = Cancelled
8 = Rejected
54 Side char Yes Side of order.
Possible values:

1 = Buy,
2 = Sell
60 TransactTime UTCTimestamp Yes Timestamp when the transaction represented by this Execution Report(8) message occurred. Fix timestamp
12 Commission float No Deprecated. Always 0
151 LeavesQty Qty Yes Order quantity open for further execution (LeavesQty = OrderQty - CumQty) in Contract units corresponding to the ContractMultiplier in SecurityList
14 CumQty Qty Yes Total executed quantity or 0.0 in Contract units corresponding to the ContractMultiplier in SecurityList
38 OrderQty Qty Yes Order quantity in Contract units corresponding to the ContractMultiplier in SecurityList
40 OrdType Char No Order type.
Valid values:

1 = Market,
2 = Limit,
K = Market With Left Over as Limit (market limit),
4 = Stop limit (trailing stop),
J = Market If Touched (stop limit, if StopPx(99) is set),
S = Stop Limit on Bid or Offer (stop market, if StopPx(99) is set)
44 Price Price Yes Price
150 ExecType char No Describes the specific Execution Report.
Possible values:

I = equal to (Order Status),
7 = (Stopped) for triggered stop orders,
3 = (Done for day) for GTD orders,
C = (Expired) for the orders expired at delivery
18 ExecInst MultipleValueString No Currently is used to mark POST ONLY orders and REDUCE ONLY orders.
POST ONLY Possible values:

6 = "Participate don't initiate",
A = "No cross" (only together with 6, "6A" -- REJECT POST ONLY when the order is put to the order book unmodified or the request is rejected and order is canceled),
REDUCE ONLY possible values:
E = " Do not increase - DNI"
103 OrdRejReason int Yes Possible reasons:
0 = no reject (the request has been accepted)
1 = Unknown symbol
2 = Exchange closed
3 = Order exceeds limit
4 = Too late to enter
5 = Unknown order
6 = Duplicate Order (e.g. dupe ClOrdID(11))
7 = Duplicate of a verbally communicated order
8 = Stale order
9 = Trade along required
10 = Invalid Investor ID
11 = Unsupported order characteristic
12 = Surveillance Option
13 = Incorrect quantity
14 = Incorrect allocated quantity
15 = Unknown account(s)
16 = Price exceeds current price band
18 = Invalid price increment
99 = Other
Note: Values 3, 4, and 5 will be used when rejecting an order due to pre-allocation information errors.

58 Text String No Free format text string, usually exceptions
207 SecurityExchange String No "Deribit"
55 Symbol String Yes Instrument symbol
99 StopPx Price No Price per unit of quantity
854 QtyType int No Type of quantity specified in a quantity. Currently only 1 - Contracts
211 PegOffsetValue Float No Amount (signed) added to the peg for a pegged order in the context of the PegOffsetType(836)
1094 PegPriceType Int No Needs to be set for Trailing Stop order. Valid value:
8 = Trailing Stop Peg
231 ContractMultiplier float No Specifies a multiply factor to convert from contracts to total units
6 AvgPx float No Average execution price or 0.0 if not executed yet or rejected
210 MaxShow Qty No Maximum quantity (e.g. number of shares) within an order to be shown to other customers
9008 DeribitMMProtection Boolean No Order Market Maker Protection (MMP) flag. Important: manual admin action is necessary to activate Market Maker Protection (MMP) for an account
100012 DeribitAdvOrderType int No If it is present then it denotes advanced order for options.
Possible values:

0 = Implied Volatility Order (price defines fixed implied volatility in %),
1 = USD Order (price defines fixed USD price of the option, advanced USD orders are not supported for linear options)
1188 Volatility float No Volatility for Implied Volatility Orders (options orders with fixed volatility)
839 PeggedPrice Price No Value of fixed USD price for USD Orders (options orders with fixed USD price)
31 LastPx Price No Price of this last fill
32 LastQty Qty No Quantity bought/sold on this last fill
100010 DeribitLabel String No A custom label for your order, max 64 grapheme clusters. Can be used by Order Cancel Request(F) to amend the order later on
9019 MMPGroup String No A custom tag of MMP Group. This tag is present only for orders from Mass Quote.
9034 IsLiquidation Boolean No A custom tag, 9034=Y if the order was automatically created during liquidation.
9035 IsRebalance Boolean No A custom tag, 9035=Y if the order was automatically created during cross-collateral balance restoration.
9036 IsRiskReducing Boolean No A custom tag, 9036=Y if the order is marked by the platform as a risk reducing order (can apply only to orders placed by PM users).
302 QuoteSetID String No identifier for the Quote Set. This tag is present only for orders from Mass Quote.
117 QuoteID String No identifier for the Quote. This tag is present only for orders from Mass Quote.
299 QuoteEntryID String No identifier for the Quote Entry. This tag is present only for orders from Mass Quote.
Group FillsGrp
1362 NoFills NumInGroup No Number of fill entries for the order
=>1363 FillExecID String No Unique identifier of execution, concatenated via '#' symbol and trade sequence number, e.g., BTC-28SEP18#38
=>1364 FillPx Price No Price of this partial fill
=>1365 FillQty Qty No Quantity bought/sold on this partial fill
=>1443 FillLiquidityInd int No Indicator to identify whether this fill was a result of a liquidity provider providing or liquidity taker taking the liquidity.
Possible values:

1 = Added Liquidity,
2 = Removed Liquidity
Order Cancel Request(F)
This message requests the cancellation of a particular order. If an order has been partially filled, only the remaining quantity can be cancelled. The request should be accepted only if an order can successfully be cancelled without executing further. The server generated identifiers should be used as OrigClOrdId.

From Release 1.3.10, it is possible to cancel orders by ClOrdID or DeribitLabel, and OrigClOrdId is not required anymore, however canceling orders by OrigClOrdId is noticeably faster.

IMPORTANT:
to cancel an order by ClOrdID or DeribitLabel, this must be the only open order (with such ClOrdID or DeribitLabel respectively). To cancel many orders by DeribitLabel, use Order MassCancel Request(q).
when possible it is recommended to use faster OrigClOrdId
Arguments
Tag Name Type Required Comments
11 ClOrdID String Required if OrigClOrdId, DeribitLabel are absent Original order identifier assigned by the user. There must be the only open order with such ClOrdID
41 OrigClOrdId String Required if DeribitLabel, ClOrdID are absent Order identifier assigned by Deribit over the user one
100010 DeribitLabel String Required if OrigClOrdId, ClOrdID are absent A custom label for your order, max 64 grapheme clusters. There must be the only open order with this DeribitLabel otherwise use Order MassCancel Request(q). This tag operates on grapheme clusters. A grapheme cluster is a user-perceived character, which can be represented by several unicode codepoints. Please refer to Unicode specification for more details about the grapheme clusters
55 Symbol String Required if OrigClOrdId is absent Instrument symbol, e.g., BTC-1JAN16
15 Currency String No To speed up the search of the order by DeribitLabel or ClOrdID
Response on failure
Order Cancel Reject(9)
Order Cancel Reject(9) is issued by the exchange upon receipt of Order Cancel Request(F) message which cannot be executed.

Alongside tags listed below, Order Cancel Reject(9) also sends corresponding tag (ClOrdID, OrigClOrdId or DeribitLabel), used by the user to cancel the order in Order Cancel Request(F) or Order Cancel/Replace Request(G).

Tag Name Type Required Comments
52 SendingTime UTCTimestamp Yes Time of message transmission expressed in UTC
39 OrdStatus char No Order status. Present only if applicable.
Possible values:

0 = New,
1 = Partially filled,
4 = Cancelled,
6 = Pending cancel,
8 = Rejected
58 Text String No Text string explaining the reason for rejection
41 OrigClOrdId String No Original order identifier assigned by the user
11 ClOrdID String No Order identifier assigned by Deribit
100010 DeribitLabel String No A custom label for your order
Response on success
The following Execution Report(8) is sent by the exchange upon successfully processing a cancel request.

Tag Name Type Required Comments
52 SendingTime UTCTimestamp Yes Time of message transmission expressed in UTC
11 ClOrdID String No Deribit replaces this field with the own value assigned by the server (it is not the client id from New Order Single(D))
41 OrigClOrdId String No The original value assigned by the client in the New Order Single(D) message
150 ExecType char No Describes the specific Execution Report.
Possible values:

4 = Cancelled,
6 = Pending Cancel
39 OrdStatus char Yes For trade – order status.
Possible values:

0 = New,
1 = Partially filled,
4 = Cancelled,
6 = Pending cancel,
8 = Rejected
58 Text String Yes Text string describing the result
This brief Execution Report comes faster and just indicates that the order was canceled. Besides this brief report, the server always sends the last state of the canceled order as another Execution Report with Text="notification" and all details about the canceled order.

MMP orders: if the Market Maker Protection (MMP) order was canceled by user request the DeribitMMProtection (9008) flag is removed from the notification Execution Report. Presence of the DeribitMMProtection (9008) flag in the Execution Report with status "canceled" means that the order has been canceled by Market Maker Protection (MMP).

Order Mass Cancel Request(q)
Order Mass Cancel Request(q) message will trigger cancellation of a group of orders.

From Release 1.3.10, it is possible to cancel orders by DeribitLabel, and the option 10 of the MassCancelRequestType(530) has been added.

Arguments
Tag Name Type Required Comments
11 ClOrdID String Yes Unique ID of Order Mass Cancel Request(q) as assigned by the client, max 64 grapheme clusters. This tag operates on grapheme clusters. A grapheme cluster is a user-perceived character, which can be represented by several unicode codepoints. Please refer to Unicode specification for more details about the grapheme clusters
530 MassCancelRequestType int Yes Specifies the type of cancellation requested.
Valid values:

7 = all orders,
5 = orders by security type,
1 = orders by symbol,
10 = orders by DeribitLabel
100010 DeribitLabel String if MassCancelRequestType(530)=10 A custom label for your order, max 64 grapheme clusters. Can be used by Order Cancel Request(F) to amend the order later on. Equivalent of REST/WS cancel_by_label
167 SecurityType String If MassCancelRequestType(530)=5 Describes type of security.
Possible values:

FUT for futures,
OPT for options,
FUTCO for future combo,
OPTCO for option combo
55 Symbol String If MassCancelRequestType(530)=1 The symbols for which to cancel all orders
15 Currency String No To cancel only certain currency if it is applicable. See Security List Request(x)
Response
After the cancellation, the server responds with an Order Mass Cancel Report(r).

Order Mass Cancel Report(r)
Tag Name Type Required Comments
11 ClOrdID String No Unique Identifier assigned by the client in the Order Mass Cancel Request(q)
37 OrderID String No Unique ID assigned by Deribit for this order
530 MassCancelRequestType int Yes Specifies the type of cancellation request.
Possible values:

7 = all orders,
5 = orders by security type,
1 = orders by symbol,
10 = orders by DeribitLabel
11 = quote cancel -- response to Quote Cancel (Z) request used in mass quoting
531 MassCancelResponse int No If successful, echoes the MassCancelRequestType(530)
298 QuoteCancelType int No May be present in case of reply to Quote Cancel (Z) request. 1 = Cancel for Symbol(55), 2 = Cancel for SecurityType (167), 4 = Cancel All Quotes, 5 = for Currency (5), 6 = for QuoteSetID (302), 7 = for Delta range
58 Text String No 'success', if deletion was successful
532 MassCancelRejectReason String No Reason why deletion failed.
Possible values:

1 = Unknown security,
5 = Unknown security type
533 TotalAffectedOrders int No Total number of orders affected by Order Mass Cancel Request(q)
Group AffectedOrdGrp
534 NoAffectedOrders int No Optional field used to indicate the number of order identifiers for orders affected by the Order Mass Cancel Request(q)
=>41 OrigClOrdID String No Required if NoAffectedOrders(534) > 0. Indicates the client order id of an order affected by the Order Mass Cancel Request(q)
Order Mass Status Request(AF)
Order Mass Status Request(AF) message requests the status of currently open orders. The exchange should respond with a series of Execution Reports(8) messages detailing orders.

Arguments
Tag Name Type Required Comments
584 MassStatusReqID String Yes Client-assigned unique ID of this request
585 MassStatusReqType String Yes Specifies the scope of the mass status request. (see below)
9014 MassStatusReqIDType int No For MassStatusReqType=7, it defines which ID or label represents the MassStatusReqID: 0 = OrigClOrdID, 1 = ClOrdId, 2 = DeribitLabel. Default is 0
11 Currency String Required if MassStatusReqIDType is 1 or 2 and Symbol is missing To search the order by DeribitLabel or ClOrdID
55 Symbol String Required if MassStatusReqIDType is 1 or 2 and Currency is missing If Currency is not specified, to search the order by DeribitLabel or ClOrdID
This message can be used in two ways: to request status of all your open orders, or to request the status of a single order(This also applies to closed orders).

To request the status of all orders, choose a random MassStatusRequestId, and set MassStatusReqType=7. The server will respond with a series of Execution Reports(8) messages, where the first message contains MassStatusReqType=7 and TotNumReports will be set to the number of reports to be expected as a follow-up.

To request the status of a specific order: set MassStatusReqType=1, and set MassStatusReqId to the order ID. Please keep in mind this message also applies to closed orders.

It is allowed to request status for an order (or several orders) by ClOrdID or DeribitLabel for example when connection is broken and server-side generated ID-s are not received. In that case set MassStatusReqType=7 and set MassStatusReqIDType=1 for the search by ClOrdID or use MassStatusReqIDType=2 for the search by DeribitLabel. In both cases Currency or Symbol are required for such a search.

Response
When the client requests the status of current orders, the exchange should reply with a series of special Execution Reports(8), one for every order requested.

Tag Name Type Required Comments
37 OrderId String No Unique identifier for Order as assigned by the Deribit
11 ClOrdID String No Deribit replaces this field with the own value assigned by the server (it is not the client id from New Order Single(D))
41 OrigClOrdId String No The original value assigned by the client in the New Order Single(D) message
39 OrdStatus char Yes For trade – order status.
Possible values:

0 = New,
1 = Partially filled,
2 = Filled,
4 = Cancelled
8 = Rejected
54 Side char Yes Side of order.
Possible values:

1 = Buy,
2 = Sell
60 TransactTime UTCTimestamp Yes Timestamp when the transaction represented by this Execution Report occurred. Fix timestamp
12 Commission float No Deprecated. Always 0
151 LeavesQty Qty Yes Order quantity open for further execution (LeavesQty = OrderQty - CumQty) in Contract units corresponding to the ContractMultiplier in SecurityList
14 CumQty Qty Yes Total executed quantity or 0.0 in Contract units corresponding to the ContractMultiplier in SecurityList
38 OrderQty Qty Yes Order quantity in Contract units corresponding to the ContractMultiplier in SecurityList
40 OrdType char Yes Order type.
Possible values:

1 = Market,
2 = Limit (by default),
4 = Stop Limit,
S = Stop Market
44 Price Price Yes Price
150 ExecType char No Describes the specific Execution Report.
Possible values:

I = equal to (Order Status),
7 = (Stopped) for triggered stop orders,
3 = (Done for day) for GTD orders,
C = (Expired) for the orders expired at delivery
18 ExecInst MultipleCharValue No CCurrently is used to mark POST ONLY orders and REDUCE ONLY orders.
POST ONLY possible values:

6 = "Participate don't initiate",
A = "No cross" (only together with 6, "6A" -- REJECT POST ONLY when the order is put to the order book unmodified or the request is rejected and order is canceled),
REDUCE ONLY possible values:
E = " Do not increase - DNI"
103 OrdRejReason int Yes Possible reasons:
0 = no reject (the request has been accepted)
1 = Unknown symbol
2 = Exchange closed
3 = Order exceeds limit
4 = Too late to enter
5 = Unknown order
6 = Duplicate Order (e.g. dupe ClOrdID(11))
7 = Duplicate of a verbally communicated order
8 = Stale order
9 = Trade along required
10 = Invalid Investor ID
11 = Unsupported order characteristic
12 = Surveillance Option
13 = Incorrect quantity
14 = Incorrect allocated quantity
15 = Unknown account(s)
16 = Price exceeds current price band
18 = Invalid price increment
99 = Other
Note: Values 3, 4, and 5 will be used when rejecting an order due to pre-allocation information errors.

58 Text String No Free format text string, usually exceptions
207 SecurityExchange String No "Deribit"
55 Symbol String Yes Instrument symbol
854 QtyType String No Type of quantity specified in a quantity. Currently only 1 - Contracts
231 ContractMultiplier float No Specifies a multiply factor to convert from contracts to total units
6 AvgPx float No Average execution price or 0.0 if not executed yet or rejected
210 MaxShow Qty No Maximum quantity (e.g. number of shares) within an order to be shown to other customers in Contract units corresponding to the ContractMultiplier in SecurityList
9008 DeribitMMProtection Boolean No Order Market Maker Protection (MMP) flag. Important: manual admin action is necessary to activate Market Maker Protection MMP for an account
100012 DeribitAdvOrderType char No If it is present then it denotes advanced order for options.
Possible values:

0 = Implied Volatility Order (price defines fixed implied volatility in %),
1 = USD Order (price defines fixed USD price of the option, advanced USD orders are not supported for linear options)
1188 Volatility float No Volatility for Implied Volatility Orders (options orders with fixed volatility)
839 PeggedPrice Price No Value of fixed USD price for USD Orders (options orders with fixed USD price)
31 LastPx Price No Price of this last fill
32 LastQty Qty No Quantity bought/sold on this last fill.
100010 DeribitLabel String No A custom label for your order, max 64 grapheme clusters. Can be used by Order Cancel Request(F) to amend the order later on. This tag operates on grapheme clusters. A grapheme cluster is a user-perceived character, which can be represented by several unicode codepoints. Please refer to Unicode specification for more details about the grapheme clusters
9019 MMPGroup String No A custom tag of MMP Group. This tag is present only for orders from Mass Quote
302 QuoteSetID String No identifier for the Quote Set. This tag is present only for orders from Mass Quote.
117 QuoteID String No identifier for the Quote. This tag is present only for orders from Mass Quote.
299 QuoteEntryID String No identifier for the Quote Entry. This tag is present only for orders from Mass Quote.
Group FillsGrp
1362 NoFills NumInGroup No Number of fill entries for the order
=>1363 FillExecID String No Unique identifier of execution, concatenated via '#' symbol and trade sequence number, e.g., BTC-28SEP18#38
=>1364 FillPx Price No Price of this partial fill
=>1365 FillQty Qty No Quantity bought/sold on this partial fill
=>1443 FillLiquidityInd int No Indicator to identify whether this fill was a result of a liquidity provider providing or liquidity taker taking the liquidity.
Possible values:

1 = Added Liquidity,
2 = Removed Liquidity
When responding to a MassStatusReqType=7 request, the server precedes the Execution Reports(8) messages with a special Execution Reports(8) message:

Tag Name Type Required Comments
584 MassStatusReqID String Yes The MassStatusReqID from the request. (Only for the first message response to a MassStatusReqType=7 request.)
585 MassStatusReqType int Yes The MassStatusReqType from the request. (Only for the first message response to a MassStatusReqType=7 request.)
911 TotNumReports int Yes The total number of reports following this initial report
Request For Positions(AN)
Request For Positions(AN) is used by the owner of a position to request a Position Report.

Arguments
Tag Name Type Required Comments
710 PosReqID String Yes Unique identifier for the Request for Positions(AN) as assigned by the submitter
724 PosReqType int Yes 0 = Positions (currently)
263 SubscriptionRequestType int No Subscription Request Type to get notifications about new or terminated instruments. Valid values:
0 = Snapshot,
1 = Snapshot + Updates (Subscribe),
2 = Disable previous Snapshot + Update Request (Unsubscribe)
15 Currency String No To request for certain currency only. If it is missing, all currencies are reported
Response
The server will respond with a Position Report(AP) message.

Position Report(AP)
The Position Report(AP) message is returned by the holder of a position in response to a Request For Positions(AN) message.

Arguments
Tag Name Type Required Comments
721 PosMaintRptID String Yes Unique identifier for this position report
710 PosReqID String No Unique identifier for the Request for Positions associated with this report
724 PosReqType int No Used to specify the type of position request being made. 0 = Positions (currently)
728 PosReqResult int No Result of a Request for Position.
Possible values:

0 = success,
1 = unsupported request for positions,
99 = other
Group PositionQty
702 NoPositions NumInGroup No Number of position entries following
=>703 PosType String No Type of quantity.
Possible values:

TQ = Transaction Quantity
=>704 LongQty Qty No Qty for long position (0 for short position) in Contract units corresponding to the ContractMultiplier in SecurityList
=>705 ShortQty Qty No Qty for short position (0 for long position) in Contract units corresponding to the ContractMultiplier in SecurityList
=>55 Symbol String No Instrument symbol
=>854 QtyType int No Type of quantity specified in a quantity. Currently only 1 - Contracts
=>231 ContractMultiplier float No Specifies a multiply factor to convert from contracts to total units
=>883 UnderlyingEndPrice Price No Mark price (reference price)
=>54 Side char No Side of order.
Possible values:

1 = Buy,
2 = Sell
=>730 SettlPrice Price No Average price
=>96 RawData String No Additional info, semi-colon separated: maintenance margin;initial margin;floating P/L
=>100088 DeribitLiquidationPrice Price No Estimated liquidation price
=>100089 DeribitSizeInCurrency Qty No Size in the underlying currency, for example BTC or ETH
User Request(BE)
This message is used to request a report on a user's status and user account info.

Arguments
Tag Name Type Required Comments
923 UserRequestID String Yes The request ID
924 UserRequestType int Yes Should be equal to 4 (Request individual user status), only UserRequestType=4 supported for now
553 Username String Yes API authenticated 'Client ID', user can request only own info, should be the same as for LOGON(A)
15 Currency String No Currency of the report. See Security List Request(x). Default is BTC.
If CROSS is given as currency and user has cross collateral enabled, only the following fields are returned:

100001 DeribitUserEquity
100003 DeribitUserInitialMargin
100004 DeribitUserMaintenanceMargin
100013 DeribitMarginBalance
Response
The server will respond with a User Response(BF) message.

User Response(BF)
This message is used to respond to a USER REQUEST(BE) message, it reports the status of the user and user's account info.

Response
Tag Name Type Required Comments
923 UserRequestID String Yes The request ID
553 Username String Yes User's API 'Client ID'
926 UserStatus int No 1 = logged in, current implementation accepts USER REQUEST-s only from logged in users
15 Currency String No Currency of the report. See Security List Request(x). Default is BTC.
If CROSS is given as currency and user has cross collateral enabled, only the following fields are returned:

100001 DeribitUserEquity
100003 DeribitUserInitialMargin
100004 DeribitUserMaintenanceMargin
100013 DeribitMarginBalance
100001 DeribitUserEquity float No Equity of the user
100002 DeribitUserBalance float No Balance of the user
100003 DeribitUserInitialMargin float No Initial margin of the user
100004 DeribitUserMaintenanceMargin float No Maintenance margin of the user
100005 DeribitUnrealizedPl float No Unrealized P/L of the user
100006 DeribitRealizedPl float No Realized P/L of the user
100011 DeribitTotalPl float No Total P/L of the user
100013 DeribitMarginBalance float No Margin Balance
Order Cancel/Replace Request(G)
To change/edit the parameters of an existing order

From Release 1.3.10, it is possible to amend order by ClOrdID or DeribitLabel, and OrigClOrdId is not required anymore, however amending orders by OrigClOrdId is noticeably faster.

IMPORTANT:
to change the order using ClOrdID or DeribitLabel, this must be the only existing order with such ClOrdID or DeribitLabel. Multiple orders with the same ClOrdID or DeribitLabel won't be amended that way.
when possible it is recommended to use faster OrigClOrdId
Arguments
Tag Name Type Required Comments
11 ClOrdID String Required if DeribitLabel, OrigClOrdId are absent Original order identifier assigned by the user, max 64 grapheme clusters. This tag operates on grapheme clusters. A grapheme cluster is a user-perceived character, which can be represented by several unicode codepoints. Please refer to Unicode specification for more details about the grapheme clusters
41 OrigClOrdId String Required if DeribitLabel, ClOrdID are absent Order identifier assigned by Deribit over the user one
100010 DeribitLabel String Required if OrigClOrdId, ClOrdID are absent A custom label for your order, max 64 grapheme clusters. Can be used by Order Cancel Request(F) to amend the order later on
55 Symbol String Yes Instrument symbol, e.g., BTC-1JAN16
62 ValidUntilTime UTCTimestamp No Indicates expiration time of indication message, in UTC
15 Currency String No To speed up the search of the order by DeribitLabel or ClOrdID
54 Side char Yes Should match the original order's side.
Valid values:

1 = Buy,
2 = Sell
38 OrderQty Qty Yes Order quantity. Please, note that Quantity is defined in Contract units. See ContractMultiplier in SecurityList
40 OrdType char Yes Currently 2 - 'limit'
44 Price Price No Order price (for advanced options orders it could be volatility or USD value if applicable)
18 ExecInst MultipleCharValue No Currently is used to mark POST ONLY orders and REDUCE ONLY orders.
POST ONLY valid values:

6 = "Participate don't initiate",
A = "No cross" (only together with 6, "6A" -- REJECT POST ONLY when the order is put to order the book unmodified or the request is rejected and order is canceled),
REDUCE ONLY valid values:
E = " Do not increase - DNI"
9008 DeribitMMProtection Boolean No Order Market Maker Protection (MMP) flag, if it is absent then the current MMP flag of the order is not changed. N removes the flag if it is set. Important: manual admin action is necessary to activate Market Maker Protection (MMP) for an account
Response
See New Order Single(D) response

Execution Reports(8) about order changes
Notification
The report Execution Reports(8) is similar to New Order Single or Cancel/Replace responses

Tag Name Type Required Comments
527 SecondaryExecID String No ID of the order change, may be absent in case of status reports
37 OrderId String No Unique identifier for Order as assigned by the Deribit
11 ClOrdID String No Deribit replaces this field with the own value assigned by the server (it is not the client id from New Order Single(D))
41 OrigClOrdId String No The original value assigned by the client in the New Order Single(D) message
39 OrdStatus char Yes For trade – order status.
Possible values:

0 = New,
1 = Partially filled,
2 = Filled,
4 = Cancelled
8 = Rejected
54 Side char Yes Side of order.
Possible values:

1 = Buy,
2 = Sell
60 TransactTime UTCTimestamp Yes Time the transaction represented by this Execution Report occurred. Fix timestamp
12 Commission float No Deprecated. Always 0
151 LeavesQty Qty Yes Order quantity open for further execution (LeavesQty = OrderQty - CumQty) in Contract units corresponding to the ContractMultiplier in SecurityList
14 CumQty Qty Yes Total executed quantity or 0.0 in Contract units corresponding to the ContractMultiplier in SecurityList
38 OrderQty Qty Yes Order quantity in Contract units corresponding to the ContractMultiplier in SecurityList
5127 ConditionTriggerMethod int No Trigger for a stop order.
Possible values:

1 = Mark Price,
2 = Last Price,
3 = corresponding Index Price
40 OrdType char Yes Order type.
Possible values:

1 = Market,
2 = Limit,
4 = Stop Limit,
S = Stop Market (default: limit)
44 Price Price No Price, maybe be absent for Market and Stop Market orders
150 ExecType char No Describes the specific Execution Report.
Possible values:

I = equal to (Order Status),
7 = (Stopped) for triggered stop orders,
3 = (Done for day) for GTD orders,
C = (Expired) for the orders expired at delivery
18 ExecInst MultipleValueString No Currently is used to mark POST ONLY orders and REDUCE ONLY orders.
POST ONLY possible values:

6 = "Participate don't initiate",
A = "No cross" (only together with 6, "6A" -- REJECT POST ONLY when the order is put to the order book unmodified or the request is rejected and order is canceled),
REDUCE ONLY possible values:
E = " Do not increase - DNI"
99 StopPx Price No Stop price for stop limit orders
103 OrdRejReason int Yes Possible reasons:
0 = no reject (the request has been accepted)
1 = Unknown symbol
2 = Exchange closed
3 = Order exceeds limit
4 = Too late to enter
5 = Unknown order
6 = Duplicate Order (e.g. dupe ClOrdID(11))
7 = Duplicate of a verbally communicated order
8 = Stale order
9 = Trade along required
10 = Invalid Investor ID
11 = Unsupported order characteristic
12 = Surveillance Option
13 = Incorrect quantity
14 = Incorrect allocated quantity
15 = Unknown account(s)
16 = Price exceeds current price band
18 = Invalid price increment
99 = Other
Note: Values 3, 4, and 5 will be used when rejecting an order due to pre-allocation information errors.

58 Text String No Free format text string, usually exceptions
207 SecurityExchange String No "Deribit"
55 Symbol String Yes Instrument symbol
854 QtyType int No Type of quantity specified in a quantity. Currently only 1 - Contracts
231 ContractMultiplier float No Specifies a multiply factor to convert from contracts to total units
6 AvgPx float No Average execution price or 0.0 if not executed yet or rejected
210 MaxShow Qty No Maximum quantity (e.g. number of shares) within an order to be shown to other customers
100012 DeribitAdvOrderType int No If it is present then it denotes advanced order for options.
Possible values:

0 = Implied Volatility Order (price defines fixed implied volatility in %),
1 = USD Order (price defines fixed USD price of the option, advanced USD orders are not supported for linear options)
1188 Volatility float No Volatility for Implied Volatility Orders (options orders with fixed volatility)
839 PeggedPrice Price No Value of fixed USD price for USD Orders (options orders with fixed USD price)
31 LastPx Price No Price of this last fill
32 LastQty Qty No Quantity bought/sold on this last fill
100010 DeribitLabel String No A custom label for your order, max 64 grapheme clusters. Can be used by Order Cancel Request(F) to amend the order later on. This tag operates on grapheme clusters. A grapheme cluster is a user-perceived character, which can be represented by several unicode codepoints. Please refer to Unicode specification for more details about the grapheme clusters
9008 DeribitMMProtection Boolean No Order Market Maker Protection (MMP) flag
9019 MMPGroup String No A custom tag of MMP Group. This tag is present only for orders from Mass Quote
302 QuoteSetID String No identifier for the Quote Set. This tag is present only for orders from Mass Quote.
117 QuoteID String No identifier for the Quote. This tag is present only for orders from Mass Quote.
299 QuoteEntryID String No identifier for the Quote Entry. This tag is present only for orders from Mass Quote.
Group FillsGrp
1362 NoFills NumInGroup No Number of fill entries for the order
=>1363 FillExecID String No Unique identifier of execution, concatenated via '#' symbol and trade sequence number, e.g., BTC-28SEP18#38
=>1364 FillPx Price No Price of this partial fill
=>1365 FillQty Qty No Quantity bought/sold on this partial fill
=>1443 FillLiquidityInd int No Indicator to identify whether this fill was a result of a liquidity provider providing or liquidity taker taking the liquidity.
Possible values:

1 = Added Liquidity,
2 = Removed Liquidity
Security Status Request(e)
This message provides for the ability to request the status of a security.

Arguments
Tag Name Type Required Comments
324 SecurityStatusReqID String Yes ID of the request
55 Symbol String Yes Instrument symbol. See instrument naming convention for more details
263 SubscriptionRequestType char Yes 0 = Snapshot, 1 = Snapshot + Updates (Subscribe), 2 = Unsubscribe
(Please note that our system does not send notifications when currencies are locked. Users are advised to subscribe to the platform_state channel to monitor the state of currencies actively.)

Response
The server will respond with a Security Status (f) message.

Security Status (f)
The Security Status (f) message provides for the ability to report changes in status to a security.

Response
Tag Name Type Required Comments
324 SecurityStatusReqID String No ID of the request
55 Symbol String Yes Instrument symbol
326 SecurityTradingStatus int No Identifies the trading status.
Possible values:

7 = Ready to trade,
8 = Not Available for trading,
20 = Unknown or Invalid
330 BuyVolume float No Volume in buy contracts, absent if there weren't any trades
331 SellVolume float No Volume in sell contracts, absent if there weren't any trades
332 HighPx Price No Price of the 24h highest trade, absent if there weren't any trades
333 LowPx Price No Price of the 24h lowest trade, absent if there weren't any trades
31 LastPx Price No The price of the latest trade, absent if there weren't any trades
58 Text String No Explanatory text string of SubscriptionRequestType outcome.
Possible values:

success = Snapshot successfully provided,
subscribed = Subscription confirmed,
unsubscribed = Subscription cancelled
MMProtection Limits (MM)
Important: manual admin action is necessary to activate Market Maker Protection (MMP) for an account. The MMProtection Limits (MM) message can be used to set or get the limits for Market Maker Protection (MMP) for a currency pair.

Arguments
Tag Name Type Required Comments
20114 ProtectionRequestID String Yes Unique identifier assigned by the requestor. Will be returned in responses
15 Currency String Yes First currency of the currency pair to set or get MMP for e.g. BTC, ETH
5544 SecondaryCurrency String No Secondary currency of the currency pair to set or get MMP for. e.g. USD, USDC, defaults to USD if not provided
20110 ProtectionQtyLimit float Yes Specify the limit of the total traded contracts per underlying within the exposure time interval when market maker protection is triggered. When this value is met or exceeded the system automatically removes the quotes for the instruments connected to the underlying
20111 ProtectionDeltaLimit float Yes The limit of the delta value per underlying within the exposure time interval when market maker protection is triggered. When this value is met or exceeded the system automatically removes the quotes for the instruments connected to the underlying
20112 FrozenLimit float Yes Time interval in seconds when quotes are rejected after market maker protection has been triggered
20116 IntervalLength int Yes Interval Length in seconds
9019 MMPGroup String No A custom tag of MMP Group
To set MMProtection Limits, the message must contain all fields. In reply to this message, the server sends MMProtection Limits Result/Reject (MR).
To get current MMProtection Limits, the message must contain only ProtectionRequestID (20114) and Currency (15) fields (without all limits). In reply to this message, the server sends MMProtection Limits (MM) message with filled limits.
MMProtection Limits Result/Reject (MR)
Important: manual admin action is necessary to activate Market Maker Protection (MMP) for an account. This message is sent by the server in reply to MMProtection Limits (MM) or MMProtectionReset (MZ)

Response
Tag Name Type Required Comments
20114 ProtectionRequestID String Yes Identifier taken from corresponding MM or MZ message
20117 ProtectionRequestResult Boolean Yes Y = applied or succeeded, N = rejected
58 Text String No Text describes reject reason or equal to "success"
MMProtection Reset (MZ)
Important: manual admin action is necessary to activate Market Maker Protection (MMP) for an account. This message resets Market Maker Protection (MMP) after triggering.

Arguments
Tag Name Type Required Comments
20114 ProtectionRequestID String Yes Unique identifier assigned by the requestor. Will be returned in responses
15 Currency String Yes First currency of the currency pair to reset MMP for. e.g. BTC, ETH
5544 SecondaryCurrency String No Secondary currency of the currency pair to reset MMP for. e.g. USD, USDC, defaults to USD if not provided
9019 MMPGroup String No A custom tag of MMP Group
Response
The server sends MMProtection Result (MR) message as a response.

Security Definition Request (c)
Request a specific Security to be traded with the second party. The request security is defined as a multileg security made up of two or more instrument legs. Also it can be used to query a list of combo-instrument securities offered by a trading parties. (this method is FIX equivalent of private/create_combo, public/get_combo_ids and private/get_combo_details request for WS/HTTPS end-points depending on SecurityRequestType (321) tag value).

Arguments
Tag Name Type Required Comments
320 SecurityReqID String Yes Request identifier
321 SecurityRequestType int Yes Type of Security Definition Request(c).
Valid values:

0 = Request Security details, specifications by SecurityId,
1 = Request Security identity for the specifications provided, the combo-instrument will be created if necessary.
3 = Request list of existing combo-instruments
15 Currency String Yes Required is SecurityRequestType = 3, examples: BTC, ETH
48 SecurityID String No Required if SecurityRequestType = 0. Identifies combo instrument.
Group InstrmtLegGrp
555 NoLegs int Yes Number of legs that make up the Security
=>600 LegSymbol String No Non-combo instrument name
=>624 LegSide char No Valid values:
1 = Buy,
2 = Sell
=>623 LegRatioQty int No Positive integer for the strategy
Response
The server sends Security Definition (d) message as a response, or rejects the request

Security Definition (d)
The Security Definition message is used for the following:

Accept the security defined in a Security Definition Request (c) message with changes to the definition and/or identity of the security.
Reject the security requested in a Security Definition Request message
Tag Name Type Required Comments
320 SecurityReqID String Yes Request identifier
322 SecurityResponseID sting Yes Equal to the SecurityReqID
323 SecurityResponseType int Yes Type of Security Definition response.
Valid values:

2 = accept security proposal with possible revisions as indicated in the message,
5 = reject proposal
55 Symbol String No Common, "human understood" representation of the security
48 SecurityID String No Takes precedence in identifying security to counterparty.
22 SecurityIDSource String No 101 = Multi-cast identifier, 102 = Combo instrument identifier
225 IssueDate UTCTimestamp No Creation timestamp
873 DatedDate UTCTimestamp No State timestamp
58 Text String No Explanatory text string
Group UnderlyingInstrument
711 NoUnderlyings int No Number of underlying items in the group, if applicable. Underlying group is present in reply to Security Definition Request (c) with SecurityRequestType(321) = 3
=>311 UnderlyingSymbol String No Combo-instrument symbols in reply to Security Definition Request (c) with SecurityRequestType(321) = 3
965 SecurityStatus String No Denotes the current state of the Instrument.
Valid values:

1 = Active,
2 = Inactive,
3 = RFQ,
4 = Closed,
12 = Archivized
Group InstrmtLegGrp
555 NoLegs int Yes Number of legs that make up the Security
=>600 LegSymbol String No Non-combo instrument name
=>623 LegRatioQty int No Positive or negative adjusted to the strategy definition
Quote Request (R)
The message for requesting for quotes from Deribit RFQ market. The request can be used as the equivalent of WS/REST private/send_rfq, as well as can be received via RFQ subscription or in the snapshots.

Tag Name Type Required Comments
131 QuoteReqID String Yes Request identifier
58 Text String No Explanatory text string
387 TotalVolumeTraded Qty No Traded volume
60 TransactTime UTCTimestamp No Update time (last trade or when requested)
Group QuotReqGrp
146 NoRelatedSym int Yes Number of related symbols in Request. Currently it must be equal to 1, only 1 symbol is supported for now
=>55 Symbol String No Common, "human understood" representation of the security
=>167 SecurityType String No Describes type of security.
Valid values:

FUT for futures,
OPT for options,
FUTCO for future combo,
OPTCO for option combo
=>54 Side char No Side of order.
Valid values:

1 = Buy,
2 = Sell
=>38 OrderQty Qty No Order quantity in contracts
Response
In case of success, the response will be a Quote Status Report (AI). If the request fails, the Quote Request Reject (AG) will be sent, or session level Reject(3) if processing of request is impossible.

Quote Request Reject (AG)
Tag Name Type Required Comments
131 QuoteReqID String Yes Request identifier
658 QuoteRequestRejectReason int Yes Reason QuoteRequest (R) was rejected:
101 = exceeded rate limit,
102 = service unavailable temporary,
3 = limit exceeded,
1 = non-implemented feature requested,
6 = account is not authorized to request quote,
99 = other reason of reject
58 Text String No Text describes the reject reason.
Possible values:

1 = missing or unknown symbol,
3 = quote request exceeds limit,
6 = account is locked,
99 = other reason,
101 = rate limit exceeded,
102 = temporary unavailable
Group QuotReqRjctGrp
146 NoRelatedSym int Yes Number of related symbols in Request
=>55 Symbol String No Common, "human understood" representation of the security
Quote Status Report (AI)
The message is used in response to Quote Request (R) and also for reporting expired quotes when a user subscribes for quotes via RFQ Request (AH).

Tag Name Type Required Comments
131 QuoteReqID String No Request identifier which triggered the report, if applicable
117 QuoteID int No Unique identifier for quote
297 QuoteStatus int Yes Identifies the status of the quote acknowledgement.
Possible values:

0 = Accepted,
7 = Expired
55 Symbol String No Common, "human understood" representation of the security
54 Side int No Side of order.
Possible values:

1 = Buy,
2 = Sell
60 TransactTime UTCTimestamp No Timestamp for last trade or quote creation
58 Text String No Explanatory text string
RFQ Request (AH)
RFQ request is sent by trader interested in receiving quote requests from other traders. It is possible to subscribe for new quotes as well as to get a snapshot of the current quotes in the system.

Tag Name Type Required Comments
644 RFQReqID String Yes Request ID
15 Currency Currency Yes Base currency which quotes requester is interested in
167 SecurityType String No Describes type of security.
Valid values:

FUT for futures,
OPT for options,
FUTCO for future combo,
OPTCO for option combo
263 SubscriptionRequestType char No Subscription Request Type to get notifications about new or terminated instruments. Valid values:
0 = Snapshot,
1 = Snapshot + Updates (Subscribe),
2 = Disable previous Snapshot + Update Request (Unsubscribe)
Response
RFQ request can be used to request existing Quote Requests (R) as well as to subscribe for new Quote Requests (R) and Quote Status Reports (AI) about expiration of the requests.

TradeCaptureReportRequest (AD)
Request one or more trade capture reports based upon selection criteria provided on the trade capture report request.

Tag Name Type Required Comments
568 TradeRequestID String Yes Identifier for the trade request
569 TradeRequestType Int Yes Describes request type.
Valid value:

0 for all trades
55 Symbol String Yes Common, "human understood" representation of the security, e.g., BTC-28JUL17, see instrument naming convention for more details
263 SubscriptionRequestType char No Used to subscribe / unsubscribe for trade capture reports If the field is absent, the value 1 will be the default (subscription). Valid values:
1 = Subscribe
2 = Unsubscribe
(Note: 0 = Snapshot is not implemented for now)
TradeCaptureReportRequestAck (AQ)
The Trade Capture Request Ack message is used to: _ Provide an acknowledgement to a Trade Capture Report Request in the case where the Trade Capture Report Request is used to specify a subscription. _ The Trade Capture Request was invalid for some business reason, such as the request is not authorized, invalid or unknown instrument, party, trading session, etc.

Tag Name Type Required Comments
568 TradeRequestID String Yes Identifier for the trade request
569 TradeRequestType Int Yes Describes request type.
Valid value:

0 for all trades
571 TradeRequestResult Int Yes Result of Trade Request.
Valid values:

0 - Successful
2 - Invalid type of trade requested
750 TradeRequestStatus Int Yes Status of Trade Request.
Valid values:

0 - Accepted
2 - Rejected
55 Symbol String Yes Common, "human understood" representation of the security, e.g., BTC-28JUL17, see instrument naming convention for more details
TradeCaptureReport (AE)
Used to report trades between counterparties.

Tag Name Type Required Comments
568 TradeRequestId String No Request ID if the Trade Capture Report is in response to a Trade Capture Report Request
570 PreviouslyReported Boolean Yes Indicates if the trade capture report was previously reported to the counterparty
55 Symbol String Yes Common, "human understood" representation of the security, e.g., BTC-28JUL17, see instrument naming convention for more details
32 LastQty Qty Yes Trade Quantity
31 LastPx Price Yes Trade Price
1003 TradeId String Yes The unique ID assigned to the trade
1040 SecondaryTradeId String No Block Trade ID or Combo Trade ID
75 TradeDate LocalMktDate Yes Indicates date of trade referenced in this message in YYYYMMDD format.
60 TransactTime UTCTimestamp Yes Time of execution/order creation (expressed in UTC (Universal Time Coordinated, also known as "GMT")
555 NoLegs NumInGroup No Number of legs. Identifies a Multi-leg Execution if present and non-zero.
=>600 LegSymbol String No Multileg instrument's individual security's Symbol.
=>687 LegQty Qty Yes Quantity of the leg
=>566 LegPrice Price Yes Price for leg of a multileg
=>624 LegSide Char Yes The side of this individual leg (multileg security).
Valid values:

1 - Buy
2- Sell
552 NoSides NumInGroup Yes Number of sides
=>54 Side Char Yes Side of order.
Valid values:

1 - Buy
2- Sell
=>37 OrderId String Yes Unique identifier for Order as assigned by sell-side
=>12 Commission Amt Yes Deprecated. Always 0
=>479 CommCurrency Currency Yes Specifies currency to be use for Commission <12>
Mass Quote (i)
Place buy and/or sell orders on one or more instruments. This endpoint can only be used after approval from the administrators. The repeating group structure follows the standard FIX specification, as follows:

Tag Name Type Required Comments
117 QuoteID String Yes Identifier of a mass quote message. Can be used to match trades to requests. We recommend using an incrementing counter.
9019 MMPGroup String Yes Custom tag of the MMP group. An MMP group has to be used and only one quote can exist per instrument per side per MMP group.
62 ValidUntilTime UTCTimestamp No Indicates expiration time of indication for the request, in UTC.
296 NoQuoteSets NumInGroup Yes The number of QuoteSets in the repeating group.
=> 302 QuoteSetID String Yes Identifier for the QuoteSet. Can be used in Quote Cancel (Z).
=> 304 TotNoQuoteEntries int No Total number of quotes for the quote set. IMPORTANT: For now, splitting QuoteSets over several messages is not supported.
=> 295 NoQuoteEntries NumInGroup Yes Number of quotes in the QuoteSet repeating group.
=> => 299 QuoteEntryID String Yes Identifier of the quote. It is echoed in the Mass Quote Acknowledgement (b).
=> => 55 Symbol String Yes Common, "human understood" representation of the security, e.g., BTC-28JUL17, see instrument naming convention for more details.
=> => 132 BidPx Price No Bid price. If no price is supplied, only the quantity is amended.
=> => 133 OfferPx Price No Offer price. If no price is supplied, only the quantity is amended.
=> => 134 BidSize Qty No Bid quantity in contracts. If no quantity is supplied, only the price is amended.
=> => 135 OfferSize Qty No Offer quantity in contracts. If no quantity is supplied, only the price is amended.
=> => 18 ExecInst MultipleCharValue No Supports post-only and post-only-reject, see NewOrderSingle (D).
Mass Quote (i) requires Cancel On Disconnect enabled and MMP.

Request example:

MassQuote
QuoteID="MyQuote1"
9019="default"
NoQuote_sets=1
QuoteSetID=1
TotNoQuoteEntries=2
NoQuoteEntries=2
QuoteEntry_id=1
Symbol="BTC-PERPETUAL"
BidPx=41000.0
OfferPx=42000.0
BidSize=10.0
OfferSize=10.0
QuoteEntryID=2
Symbol="BTC-29DEC23"
BidPx=41500.0
BidSize=5.0

In reply to Mass Quote (i), the server sends Mass Quote Acknowledgement (b) message as well as corresponding Execution Report-s (8). The reports and acknowledgement are send asynchronously and via different queues, so the precedence of acknowledgement message is not guaranteed.

Mass Quote Acknowledgement (b)
Mass Quote Acknowledgement (b) is a reply to a Mass Quote (i) message. The message contains orders, trades and possible errors resulting from the Mass Quote (i) message. The QuoteEntries are not grouped by QuoteSets for performance reasons, only marked with QuoteSetIDs.

Tag Name Type Required Comments
117 QuoteID String No The same QuoteID as supplied in the Mass Quote (i) message.
297 QuoteStatus int Yes Status of the mass quote as a whole. 0 = Accepted, 5 = Rejected
300 QuoteRejectReason int No Reason Mass Quote (i) was rejected. 1 = Unknown symbol (Security), 2 = Exchange(Security) closed, 3 = Mass Quote (i) size exceeds limit, 4 = Timed out (Too late to enter), 9 = Not allowed to quote security, 99 = Other
295 NoQuoteEntries NumInGroup No Number of quotes in the repeating group.
=> 299 QuoteEntryID String No Echoed from the Mass Quote (i) message for orders. For trades, it is the trade ID.
=> 9020 QuoteEntryType int No 0 = order, 1 = trade, 2 = error
=> 302 QuoteSetID String No Identifier of the QuoteSet supplied in Mass Quote (i). Only present for orders.
=> 1167 QuoteEntryStatus int No Status of individual Quote Entry. 0 = Accepted, 5 = Rejected, 17 - Canceled
=> 55 Symbol String No Common, "human understood" representation of the security, e.g., BTC-28JUL17, see instrument naming convention for more details.
=> 54 Side char No Side of the trade, in case of a trade.
=> 192 OrderQty2 Qty No Size of the trade in contracts, in case of a trade.
=> 37 OrderId String No Unique identifier of the quote, assigned by the exchange. It follows the format of OrderIDs for regular orders.
=> 60 TransactTime UTCTimestamp No Timestamp of the transaction.
=> 132 BidPx Price No Bid price.
=> 134 BidSize Qty No Bid quantity in contracts.
=> 133 OfferPx Price No Offer price.
=> 135 OfferSize Qty No Offer quantity in contracts.
=> 368 QuoteEntryRejectReason int No RPC error code, in case of an error.
=> 58 Text String No The error description, in case of an error.
Quote Cancel (Z)
The Quote Cancel (Z) message is used by an originator of quotes to cancel his quotes and related orders.

The Quote Cancel message supports cancelation of: _ All quotes _ Quotes for a specific symbol _ All quotes for a security kind (like futures, options) _ By QuoteSetID _ By base Currency of the instruments _ By Delta range

The canceling is accomplished by indicating the type of cancelation in the QuoteCancelType (298) field and optional additional parameters.

The message is equivalent of the private/cancel_quotes and shares the same semantic, so it is quite different from the other exchanges. The same as the Websockets "alter-ego" it is acknowledged only via list (possibly empty) of canceled orders, namely as the Order Mass Cancel Report (r) with ClOrdID equal to the QuoteMsgID of the request, with the affected order ID's and subsequent Execution Report (8)-s for each individual canceled order if there are any.

Tag Name Type Required Comments
1166 QuoteMsgID String No Optionally used to supply a message identifier for a quote cancel.
298 QuoteCancelType int No Default is 4. Identifies the type of Quote Cancel (Z) request. 1 = Cancel for Symbol(55), 2 = Cancel for SecurityType (167), 4 = Cancel All Quotes, 5 = for Currency (5), 6 = for QuoteSetID (302), 7 = for Delta range defined by MinDelta and MaxDelta see below
55 Symbol String Required if QuoteCancelType = 1 Common, "human understood" representation of the security, e.g., BTC-28JUL17, see instrument naming convention for more details.
15 Currency String if QuoteCancelType = 2, 5 or 7 Currency
9031 FreezeQuotes Boolean No Whether or not to reject incoming quotes for 1 second after cancelling
167 SecurityType String If QuoteCancelType=2 Describes type of security.
Possible values:

FUT for futures,
OPT for options,
FUTCO for future combo,
OPTCO for option combo
SPOT for spot
302 QuoteSetID String Required if QuoteCancelType = 6 Identifier for the Quote Set
9032 MinDelta float Required if QuoteCancelType = 7 Min Delta to cancel by delta range
9033 MaxDelta float Required if QuoteCancelType = 7 Max Delta to cancel by delta range
Changes Log
Release 21.05.24
New Order Single (D): added nonmandatory tag ValidUntilTime (62)
Order Cancel/Replace Request (G): added nonmandatory tag ValidUntilTime (62)
Mass Quote (i): added nonmandatory tag ValidUntilTime (62)
Execution Reports (8): added nonmandatory tags IsLiquidation (9034), IsRebalance (9035), IsRiskReducing (9036)
SecurityListRequest (x): added Currency, SecurityType, SecondaryCurrency
Release 09.03.24
SecurityStatusRequest (e): added subscription
SecurityStatus (f): added Text field
Changed scope for MMProtection Limits (MM) from account to trade
Release 13.02.24
Added Mass Quote (i)
Added Mass Quote Acknowledgement (b)
Execution Reports (8): added nonmandatory tags MMPGroup (9019), QuoteSetID (302), QuoteID (117), QuoteEntryID (299) related to Mass Quoting
Added Quote Cancel (Z)
Mass Cancel Report (r): added one more type for MassCancelRequestType, added optional field QuoteCancelType for mass cancel reports generated by Quote Cancel (Z), ClOrdID is not required tag anymore
MMProtection Reset (MZ), MMProtection Limits (MM) -- added optional MMPGroup.
Release 12.12.23
Fixed an issue where Reject (3) was incorrectly returned instead of OrderCancelReject (9), with the specified ClOrdID, DeribitLabel, or OrigClOrdId, in response to an Order Cancel Request (F).
Release 1.3.21
User Request(BE): added CROSS as currency
Release 1.3.20
DeribitLiquidation is hidden from the public for the first hour after the trade (to prevent abusing).
Release 1.3.19
changed MMProtectionLimits and MMProtectionReset to work with currency pair instead of a single currency.
Release 1.3.18
added the following messages: TradeCaptureReportRequest (AD), TradeCaptureReportRequestAck (AQ), and TradeCaptureReport (AE). Clients can now utilize these to subscribe for receiving reports on their own trades.
Release 1.3.17
added fields NoTickRules(1205), StartTickPriceRange(1206), TickIncrement(1208) to the instrument for tick size steps
added option DisplayIncrementSteps(9018) to Logon and Security List Request(x) so the client can enable receiving the above mentioned new fields in the instrument
Release 1.3.16
added possibility to search closed orders by ClOrdID or DeribitLabel via OrderMassStatusRequest
Release 1.3.16
incremental refresh for indices now has 1 entry instead of 2
BTC-DVOL, ETH-DVOL are renamed in compliance with other indices: BTCDVOL_USDC-DERIBIT-INDEX, ETHDVOL_USDC-DERIBIT-INDEX
Release 1.3.15
SecurityList (y): added new value FXSPOT of SecurityType for currency exchange spot market.
SecurityList (y): added PriceQuoteCurrency (1524)
Release 1.3.14
Documentation alignment
Release 1.3.13
Added combo API:

added Security Definition Request (c)
added Security Definition (d)
Added RFQ API:

added Quote Request (R)
added Quote Request Reject (AG)
added Quote Status Report (AI)
added RFQ Request (AH)
Release 1.3.12
MarketData Request (V) added DeribitShowBlockTradeId (9012)
MarketData (W) and (X): added TrdMatchID(880) as blocktrade ID
Release 1.3.11
MarketData Request (V): added DeribitSkipBlockTrades (9011)
Release 1.3.10
added possibility to use client's ClOrdID and DeribitLabel in Order Cancel Request(F), Order Mass Cancel Request(q) and Order Cancel/Replace Request(G) without exchange generated OrigClOrdID (equivalent of REST/WS cancel_by_label etc)
Release 1.3.09
Added Sequence Reset(4)
Security List Request(x) added SubscriptionRequestType(263) - possibilty to get notifications about new or terminated instruments
SecurityList (y): added SecurityStatus(965) in the notifications
Release 1.3.08
Logon(A): Added custom tag ConnectionOnlyExecutionReports(9010)
Release 1.3.07
Order Cancel/Replace Request (G): adjusted behavior for MMP orders when DeribitMMProtection (9008) flag is not specified
Release 1.3.06
SecurityList (y): added Deribit Volatility Index instruments: BTC-VIX, ETH-VIX
MarketData Request (V): added requests for Deribit Volatility Index
Release 1.3.05
Added MMProtection Limits (MM)
Added MMProtection Limits Result/Reject (MR)
Added MMProtection Reset (MZ)
New Order Single (D): added nonmandatory DeribitMMProtection (9008)
Order Cancel/Replace Request (G): added nonmandatory DeribitMMProtection (9008)
Execution Reports (8): added nonmandatory DeribitMMProtection (9008)
Release 1.3.04
Logon(A): Added custom tag DeribitSequential(9007)
Execution Reports (8): added SecondaryExecID which is ID of the last change of the order
Release 1.3.03
Added SecurityStatusRequest(e) request and SecurityStatus(f) response
Release 1.3.02
Execution Reports (8): added FillsGrp for non-immediate fills also (before it was only for immediate fills)
Position Report (AP): added missing PosType (703) added into PositionQty block
Execution Reports (8): added LastQty (32) and LastPx (31)
Release 1.3.01
MarketData Request (V): added support for multiple Symbols (NoRelatedSym and followed group of Symbols)
MarketData (W) and (X): added custom field DeribitLiquidation (100091)
Release 1.3.00
MarketData (W) and (X): added OpenInterest (746)
MarketData (W) and (X): added MarkPrice (100090)
MarketData (W) and (X): added UnderlyingSymbol(311)
MarketData (W) and (X): added UnderlyingPx(810)
MarketData (W) and (X): added ContractMultiplier(231)
Position Report (AP): added ContractMultiplier(231)
Position Report (AP): added UnderlyingEndPrice(883)
SecurityList (y): PutOrCall changed for compliance - put = 0, call = 1
SecurityList (y): added InstrumentPricePrecision(2576)
SecurityList (y): added MinPriceIncrement(969)
SecurityList (y): added UnderlyingSymbol(311)
SecurityList (y): added MinTradeVol(562)
User Request(BE): added parameter Currency(15), default is BTC
Order Mass Cancel Request(q): added parameter Currency(15)
added notification for StopLimit and StopMarket Orders. StopMarket orders has OrdType=S
Execution Report (8): added ContractMultiplier(231)
Execution Report (8): added ConditionTriggerMethod(5127)
shell
javascript
python
