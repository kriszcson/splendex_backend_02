const constants = {
    username: 'admin',
    password: 'admin',
    databaseName: 'SPL_bank'
};

const connectionString = `mongodb+srv://${constants.username}:${constants.password}@cluster0.vripv.mongodb.net/${constants.databaseName}?retryWrites=true&w=majority
`

module.exports = connectionString;