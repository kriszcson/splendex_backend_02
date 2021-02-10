const constants = {
    username: 'admin',
    password: 'admin',
}
const connectionString = `mongodb+srv://${constants.username}:${constants.password}@cluster0.vripv.mongodb.net/test?retryWrites=true&w=majority`;

module.exports = connectionString;