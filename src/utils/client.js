import { Client, cacheExchange, fetchExchange } from '@urql/vue';
const client = new Client({
    url: 'http://your-graphql-api-endpoint',
    exchanges: [cacheExchange, fetchExchange],
});
export default client;
