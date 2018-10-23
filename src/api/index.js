const URL_LOCAL = 'http://10.0.2.2:5000';
//const URL = "http://192.168.1.38:5000";
import { AsyncStorage } from "react-native";
const URL = "https://still-gorge-30183.herokuapp.com";
//const URL_LOCAL = "http://localhost:5000";
let fetching = false;
import axios from 'axios';
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

export function getUser(userId) {
    return fetch(URL + `/getUser/${userId}`)
        .then(response => Promise.all([response, response.json()]))
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
                console.log("CONDITION", new Date().getTime() < data.timestamp && data.value)
                resolve(new Date().getTime() < data.timestamp && data.value);
            }
        }).catch(err => {
            resolve(false);
            return;
        })
    })
}

export function removeFavorite(userId, postId) {
    return fetch(URL + `/removeFavorite/${userId}/${postId}`, {
        method: 'delete'
    })
        .then(response => Promise.all([response, response.json()]))
        .catch(err => {
            return Promise.reject(err);
        })
}

export function addFavorite(favorite) {

    return fetch(URL + "/addFavorite", {
        method: "post",
        body: JSON.stringify(favorite)
    })
        .then(response => Promise.resolve(response.json()))
        .catch(err => {
            return Promise.reject(err);
        })
}

export function removePost(postId, userId) {
    return fetch(URL + `/remove/${postId}/${userId}`, {
        method: 'delete'
    })
        .then(response => Promise.all([response, response.json()]))
        .catch(err => {
            return Promise.reject(err);
        })

}

export function uploadPost(post) {
    let data = {
        body: post.body,
        type: post.type,
        picture: post.picture,
        user: {
            _id: post.user._id,
            name: post.user.name,
            picture: post.user.picture
        } 
    }

    console.log("UPLOAD POST", data)

    var headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    return fetch(URL + "/uploadPost", {
        method: "post",
        headers: headers,
        body: JSON.stringify(data)
    })
        .then(response => Promise.resolve(response.json()))
        .catch(err => {
            return Promise.reject(err);
        })
}

export function addComment(post, body, user) {
    let date = new Date();
    let data = {
        postId: post._id,
        userIdPostCreated: post.user._id == user._id ? null : post.user._id,
        user: {
            _id: user._id,
            name: user.name,
            picture: user.picture,
        },
        body: body,
        created: date
    };

    var headers = {
        'Content-Type': 'application/json',
        'Access-Control-Origin': '*'
    }

    return fetch(URL + "/addComment", {
        method: "post",
        headers: headers,
        body: JSON.stringify(data)
    })
        .then(response => Promise.resolve(response.json()))
        .catch(err => {
            return Promise.reject(err);
        })
}

export function answerComment(post, body, user, nameToAnswer, userIdToAnswer) {
    let date = new Date();
    let data = {
        postId: post._id,
        userIdPostCreated: post.user._id,
        user: {
            _id: user._id,
            name: user.name,
            picture: user.picture,
        },
        body: body,
        created: date,
        nameToAnswer: nameToAnswer,
        userIdToAnswer: userIdToAnswer
    };

    var headers = {
        'Content-Type': 'application/json',
        'Access-Control-Origin': '*'
    }

    return fetch(URL + "/answerComment", {
        method: "post",
        headers: headers,
        body: JSON.stringify(data)
    })
        .then(response => Promise.resolve(response.json()))
        .catch(err => {
            return Promise.reject(err);
        })
}

export function addLikeComment(likeComment) {

    var headers = {
        'Content-Type': 'application/json',
        'Access-Control-Origin': '*'
    }

    return fetch(URL + "/addLikeComment", {
        method: "post",
        headers: headers,
        body: JSON.stringify(likeComment)
    })
        .then(response => Promise.resolve(response.json()))
        .catch(err => {
            return Promise.reject(err);
        })
}

export function removeLikeComment(userId, postId, commentId) {
    return fetch(URL + `/removeLikeComment/${userId}/${postId}/${commentId}`, {
        method: 'delete'
    })
        .then(response => Promise.all([response, response.json()]))
        .catch(err => {
            return Promise.reject(err);
        })
}


