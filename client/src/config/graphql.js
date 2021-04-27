import {ApolloClient, InMemoryCache} from '@apollo/client'

const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache()
})


// const client = new ApolloClient({
//     uri: 'http://52.204.162.51:4000/',
//     cache: new InMemoryCache()
// })

export default client