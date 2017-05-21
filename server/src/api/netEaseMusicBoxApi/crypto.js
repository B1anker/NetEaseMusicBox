// 参考 https://github.com/darknessomi/musicbox/wiki/
'use strict'
const crypto = require('crypto');
const bigInt = require('big-integer');
const modulus = '00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7';
const nonce = '0CoJUm6Qyw8W8jud';
const pubKey = '010001';

String.prototype.hexEncode = function() {
	let hex,
		i;

	let result = "";
	for (i = 0; i < this.length; i++) {
		hex = this.charCodeAt(i).toString(16);
		result += ("" + hex).slice(-4);
	}
	return result
}

function createSecretKey(size) {
	let keys = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	let key = "";
	for (let i = 0; i < size; i++) {
		let pos = Math.random() * keys.length;
		pos = Math.floor(pos);
		key = key + keys.charAt(pos)
	}
	return key;
}

function aesEncrypt(text, secKey) {
	let _text = text;
	let lv = new Buffer('0102030405060708', "binary");
	let _secKey = new Buffer(secKey, "binary");
	let cipher = crypto.createCipheriv('AES-128-CBC', _secKey, lv);
	let encrypted = cipher.update(_text, 'utf8', 'base64');
	encrypted += cipher.final('base64');
	return encrypted;
}

function zfill(str, size) {
	while (str.length < size)
		str = "0" + str;
	return str;
}

function rsaEncrypt(text, pubKey, modulus) {
	let _text = text.split('').reverse().join('');
	let biText = bigInt(new Buffer(_text).toString('hex'), 16),
		biEx = bigInt(pubKey, 16),
		biMod = bigInt(modulus, 16),
		biRet = biText.modPow(biEx, biMod);
	return zfill(biRet.toString(16), 256);
}

function Encrypt(obj) {
	let text = JSON.stringify(obj);
	let secKey = createSecretKey(16);
	let encText = aesEncrypt(aesEncrypt(text, nonce), secKey);
	let encSecKey = rsaEncrypt(secKey, pubKey, modulus);
	return {params: encText, encSecKey: encSecKey}
}

export default Encrypt
