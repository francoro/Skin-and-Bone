const URL = 'http://10.0.2.2:5000';
//const URL = "http://192.168.1.38:5000";
let fetching = false;

export default (type, filter, dateFilter, position) => {
    if (fetching) return Promise.reject(new Error('Request in progress'));
    console.log("URLl", `/search/${type}/${filter}/${dateFilter}/${position}/0/0`)
    fetching = true;
    return fetch(URL + `/search/${type}/${filter}/${dateFilter}/${position}/0/0`)
        .then(response => Promise.all([response, response.json()]))
        .then(([response, responseObj]) => {
            fetching = false;
            return [response, responseObj];
        })
        .catch(err => {
            fetching = false;
            return Promise.reject(err);
          })

}