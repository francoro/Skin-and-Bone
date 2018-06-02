const URL = 'http://10.0.2.2:5000';

//'/search/' + type + '/' + filter + '/' + dateFilter + '/' + position + '/' + postId + '/' + userId
//http://localhost:8080/search/4/0/4/0/false/58b07a2bee844307c89adf0f
export default (type, filter, dateFilter, position) => {
    console.log("URLl", `/search/${type}/${filter}/${dateFilter}/${position}/0/0`)
    return fetch(URL + `/search/${type}/${filter}/${dateFilter}/${position}/0/0`)
    .then(response => Promise.all([response, response.json()]))
}