export default  {
    baseUrl: 'https://d9w7u528o3.execute-api.us-west-2.amazonaws.com/v1/inv/',
    authUrl: 'https://d9w7u528o3.execute-api.us-west-2.amazonaws.com/v1/inv/login',
    apiKey:  '',
    userDetails: 'user',
    cliets : {
        getAllClients: 'clients',
        clientById: 'clients?clientId='
    },
    funds: {
        getAllfunds: 'funds_details',
        }
}