var apigClientFactory = require('aws-api-gateway-client').default;

var config = {invokeUrl:'https://aby4vh6mhj.execute-api.us-east-1.amazonaws.com/test'};
var apigClient = apigClientFactory.newClient(config);

var pathParams = {}

// Template syntax follows url-template https://www.npmjs.com/package/url-template
var pathTemplate = '/searchEvents'
var method = 'GET';
var additionalParams = {
    //If there are query parameters or headers that need to be sent with the request you can add them here
    // headers: {
    //     param0: '',
    //     param1: ''
    // },
    queryParams: {
        "neighborhood": "The Flatiron District",
        "start": 1651384800,
        "category": "Food & Drink"
    }
};
var body = {
    //This is where you define the body of the request
};

apigClient.invokeApi(pathParams, pathTemplate, method, additionalParams, body)
    .then(function(result){
        //This is where you would put a success callback
        console.log('apiClient result', result);
    }).catch( function(result){
        //This is where you would put an error callback
        console.log('apiClient error', result);
    });


// apigClient.invokeApi(pathParams, pathTemplate, method, additionalParams, body)
//     .then(function(result){
//         //This is where you would put a success callback
//         console.log('apiClient result', result);
//     }).catch( function(result){
//         //This is where you would put an error callback
//         console.log('apiClient error', result);
//     });

export default apigClient;