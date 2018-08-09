//const URL = 'http://10.0.2.2:5000';
//const URL = "http://192.168.1.38:5000";
import { AsyncStorage } from "react-native";
const URL = "https://still-gorge-30183.herokuapp.com";
const URL_LOCAL = "http://localhost:5000";
let fetching = false;

export function getPosts(type, filter, dateFilter, position) {
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

export function getNotifications(userId) {
    return fetch(URL + `/getNotifications/${userId}`)
        .then(response => Promise.all([response, response.json()]))
        .catch(err => {
            return Promise.reject(err);
        })
}

export function unLikePost(userId, postId) {
    return fetch(URL + `/removeLike/${userId}/${postId}`, {
        method: 'delete'
    })
        .then(response => Promise.all([response, response.json()]))
        .catch(err => {
            return Promise.reject(err);
        })
}

export function likePost(bodyLike) {
    let data = {
        name: bodyLike.name,
        userId: bodyLike.userId,
        postId: bodyLike.postId
    }
    var headers = {
        'Content-Type': 'application/json',
        'Access-Control-Origin': '*'
    }

    return fetch(URL + "/addLike", {
        method: "post",
        headers: headers,
        body: JSON.stringify(data)
    })
        .then(response => Promise.resolve(response.json()))
        .catch(err => {
            return Promise.reject(err);
        })
}


export function saveLocalExpire(key, jsonData, total, expirationMin) {
    let expirationMS = expirationMin * 60 * 1000;
    let record = { value: jsonData, total: total, timestamp: new Date().getTime() + expirationMS };
    storage.save({
        key: key,
        data: record,
        expires: null
    });
}

export function getLocalExpire(key) {
    return new Promise((resolve, reject) => {
        storage.load({
            key: key,
        }).then(data => {
            if (!data) {
                resolve(false);
                return;
            } else {
                resolve(new Date().getTime() < data.timestamp && data.value);
            }
        }).catch(err => {
            resolve(false);
            return;
        })
    })
}