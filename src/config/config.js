// Without memcache
export default  {
    baseUrl: 'https://d9w7u528o3.execute-api.us-west-2.amazonaws.com/v1/inv/',
    authUrl: 'https://d9w7u528o3.execute-api.us-west-2.amazonaws.com/v1/inv/login_second',
    apiKey:  'OE2maFOW3i68Vv9jVeOpz2UG8lBNoERg2xZE5Isx',
    userDetails: 'user',
    cliets : {
        getAllClients: 'clients',
        clientById: 'clients?clientId='
    },
    funds: {
        getAllfunds: 'funds_details',
        }
}

// With memcache

// export default  {
//     baseUrl: 'https://i171qxn6k9.execute-api.us-west-2.amazonaws.com/v1/inv/',
//     authUrl: 'https://i171qxn6k9.execute-api.us-west-2.amazonaws.com/v1/inv/login_second',
//     apiKey:  'tw9K8ssZSh4h3bnMQfRZL6F77l4QW0AeaDdZQYWX',
//     userDetails: 'user',
//     cliets : {
//         getAllClients: 'clients',
//         clientById: 'clients?clientId='
//     },
//     funds: {
//         getAllfunds: 'funds_details',
//         }
// }