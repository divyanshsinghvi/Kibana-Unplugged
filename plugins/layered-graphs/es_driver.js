function run(client, data, callback) {
    client.get({
        index: data.index,
        type: data.index,
        id: data.query
    }, function(err, response, status) {
        data.data = response._source[data.field];
        callback(data);
    })
}

module.exports = {
    "run": run
};