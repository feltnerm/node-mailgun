"use strict";
//
// Mailgun REST client using their API
//
// Usage:
//  > Mailgun = require('./mailgun');
//  > mailgun = new Mailgun('API_KEY', 'DOMAIN');
//  > mailgun.get_lists();
//  ...
//
var request = require('request');

function Mailgun(api_key, domain) {
    this._base_url = 'https://api.mailgun.net/v2/';
    this._apiKey64 = new Buffer('api:' + api_key).toString('base64');
    this._apiKey = api_key;
    this._domain = domain;

    this._createHttpOptions = function (resource, method, data) {
        var url = this._base_url + resource;
        if (resource === 'messages') {
            url = this._base_url + this._domain + '/' + resource;
        }

        var log_msg = "[Mailgun]: " + url;
        if (data) { log_msg += ' - ' + JSON.stringify(data); }
        console.log(log_msg);

        return {
            url: url,
            method: method,
            auth: { user: 'api', password: this._apiKey },
            form: data || null
        };
    };

    this._makeHttpRequest = function (httpOpts, callback) {
        callback = callback || function() {};
        request(httpOpts, function (e, r, body) {
            if (r.statusCode !== 200) { return callback(r.statusCode); }
            var data = {};
            if (body) { data = JSON.parse(body); }
            return callback(null, data);
        });
    };
}

Mailgun.prototype = {

    get_lists: function (callback) {
        var httpOpts = this._createHttpOptions('lists', 'GET');
        this._makeHttpRequest(httpOpts, callback);
    },
    get_list: function (address, callback) {
        var httpOpts = this._createHttpOptions('lists/' + address, 'GET');
        this._makeHttpRequest(httpOpts, callback);
    },
    post_list: function (address, member, callback) {
        var httpOpts = this._createHttpOptions('lists/' + address + '/members', 'POST', member);
        this._makeHttpRequest(httpOpts, callback);
    },
    delete_list: function (address, member, callback) {
        var httpOpts = this._createHttpOptions('lists/' + address + '/members/' + member, 'DELETE');
        this._makeHttpRequest(httpOpts, callback);
    },
    post_message: function (from, to, message, subject, callback) {
        var httpOpts = this._createHttpOptions('messages', 'POST');

        httpOpts.form = { from: from, to: to };
        if (message.html) httpOpts.form.html = message.html;
        if (message.text) httpOpts.form.text = message.text;
        if (subject) httpOpts.form.subject = subject;

        this._makeHttpRequest(httpOpts, callback);
    }
};

module.exports = Mailgun;
