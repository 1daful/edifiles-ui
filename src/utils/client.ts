import { Client, cacheExchange, fetchExchange } from '@urql/vue';

const client = new Client({
  url: 'http://your-graphql-api-endpoint', // Replace with your actual GraphQL endpoint.
  exchanges: [cacheExchange, fetchExchange],
});

export default client;