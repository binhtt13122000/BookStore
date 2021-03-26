"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.storage = void 0;
var app_1 = require("firebase/app");
exports.default = app_1.default;
require("firebase/storage");
require("firebase/analytics");
var firebaseConfig = {
    apiKey: "AIzaSyBzE8MfLHDkdnBEBhFwufm7PcemXP9Arjw",
    authDomain: "bookshop-9bea7.firebaseapp.com",
    projectId: "bookshop-9bea7",
    storageBucket: "bookshop-9bea7.appspot.com",
    messagingSenderId: "657395139025",
    appId: "1:657395139025:web:30724668f21afee46220f0",
    measurementId: "G-K8BXQFR1LH"
};
// Initialize Firebase
app_1.default.initializeApp(firebaseConfig);
app_1.default.analytics();
var storage = app_1.default.storage();
exports.storage = storage;
//# sourceMappingURL=firebase.js.map