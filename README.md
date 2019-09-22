# German silver audi

Backend developing challenge for an interview process.

Task: expose two endpoints allowing to create a new account for an existing user and to get user information including accounts and transactions.

## Getting up and running

1. Clone this repository
2. Install the dependencies (`npm i`)
3. Run `npm run migrate` to prepare the database
4. If wanted, seed the database with `npm run seed`
5. Start the service with `npm run start`
    1. For automatic service restart on code changes use `npm run dev`

You can now send GET requests to `http://localhost:3000/user/:customerId` to see user information. If the database was seeded the IDs 1 to 3 will have content.

New accounts can be created via POST requests to `http://localhost:3000/accounts`. The data posted has to contain a `customerId` value of an existing user and can contain a positive `amount` that will directly be added to the account in the form of a transaction. Data can be posted as JSON or as form data.

A `.env` file can be created to change the port and allowed origin (see [.env.example](.env.example)).

Logfiles can be found in the `logs` directory.

## Testing

Different stages have their own databases and the test-db is automatically cleared during the tests.

1. Start the service with `npm run test-start` (this will use the test-db)
2. Run the test suite with `npm run test`