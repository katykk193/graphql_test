const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://katy:katy@testcluster0.m3rtt.mongodb.net/graphql-test?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.connection.once('open', () => {
  console.log('DB connected');
});

const schema = require('./schema/schema');
// const testSchema = require('./schema/types_schema');

const cors = require('cors');

const app = express();

app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema: schema
  })
);

app.listen(5000, () => {
  console.log('Listening for requests on my awesome port 5000');
});
