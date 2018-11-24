import { LoginManager, LoginButton, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import RNFetchBlob from 'rn-fetch-blob'
import * as API from '../api'
const fs = RNFetchBlob.fs;

export function facebookLogin() {
    return new Promise((resolve, reject) => {
        LoginManager.logInWithReadPermissions(["public_profile, email"]).then(function (result) {
            AccessToken.getCurrentAccessToken().then((data) => {
                const accessToken = data.accessToken;
                const responseInfoCallback = (error, result) => {
                    if (error) {
                        console.log(error);
                        console.log('Error fetching data=', error);
                    } else {

                        console.log("face",result)
                        let imagePath = null;
                        RNFetchBlob.config({
                            fileCache: true
                        })
                            .fetch("GET", result.picture.data.url)
                            .then(resp => {
                                imagePath = resp.path();
                                return resp.readFile("base64");
                            })
                            .then(base64Data => {

                                let userObject = {
                                    name: result.name,
                                    email: result.email,
                                    picture: base64Data
                                };

                                API.newUser(userObject).then((data) => {
                                    //data.ops[0] cuando es nuevo user
                                    storage.save({
                                        key: "user",
                                        data: data.ops != undefined ? data.ops[0] : data,
                                        expires: null
                                    });
                                    resolve(true);
                                    return fs.unlink(imagePath);
                                })
                            });
                    }

                };
                const infoRequest = new GraphRequest(
                    '/me',
                    {
                        accessToken,
                        parameters: {
                            fields: {
                                string: 'email,name,first_name,middle_name,last_name, picture.type(large)',
                            },
                        },
                    },
                    responseInfoCallback,
                );
                new GraphRequestManager().addRequest(infoRequest).start();
            });
        }, function (error) {
            console.log("Login fail with error: " + error);
            resolve(false);
        });
    })
}
