function run(client, data, callback) {
    if(data.url) {
        return data;
    }
    const response = client.search({
        index: data.index,
        type: data.index,
        body: data.query
    }, function(err, response, status) {
        data.url = response.hits.hits[0]._source[data.field];
        callback(data);
    });
    return data;
}

module.exports = {
    "run": run
};

// var req = {
//     "sort": [
//         {"date": {"order": "desc"}}
//     ],
//     "size": 1
// }