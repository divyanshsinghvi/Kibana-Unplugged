function run(client, data, callback) {
    // if(data.url) {
    //     return data;
    // }
    // const response =  search({
    //     index: data.index,
    //     type: data.index,
    //     body: data.query
    // });
    const response = client.search({
        index: "url",
        type: "url",
        body: {
            "query": {
                "match_all": {}
            }
        }
    }, function(err, response, status) {
        console.log(response);
        console.log(status);
        data.url = response.hits.hits[0]._source.url;
        callback(data);
    });
    return data;
}

module.exports = {
    "run": run
};