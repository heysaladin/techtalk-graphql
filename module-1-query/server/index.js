import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema';

import restify from 'restify';

const app = express();

app.use(graphqlHTTP({
    schema,
    graphiql: true,
}));

app.listen(5000);
