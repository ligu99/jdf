import http from "./http";
import QS from "qs";

/**
 * 
 * @param {string} url 
 * @param {object} params 
 * @returns 
 */
export const getRequest = (url, params) => {
    return http({
        method: 'get',
        url: url,
        params: params || {}
    });
}
/**
 * 
 * @param {string} url 
 * @param {string} params 
 * @returns 
 */
export const getStrRequest = (url, params) => {
    return http({
        method: 'get',
        url: url + "?" + params
    });
}

/**
 * 
 * @param {string} url 
 * @param {object} params 
 * @returns 
 */
export const postRequest = (url, params) => {
    return http({
        method: 'post',
        url: url,
        data: params || {},
        headers: {
            'Content-Type': 'application/json'
        },
    });
}

/**
 * 
 * @param {string} url 
 * @param {object} params 
 * @returns 
 * 
 * let params = new FormData();
 * params.append("key", value);
 */
export const postFormReq = (url, params) => {
    return http({
        method: 'post',
        url: url,
        data: params,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    });
}

/**
 * 
 * @param {string} url 
 * @param {object} params 
 * @returns 
 */
export const postStrReq = (url, params) => {
    return http({
        method: 'post',
        url: url,
        data: params,
        transformRequest: [function (data) {
            let ret = '';
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
            }
            return ret.slice(0, -1);
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
    });
}
/**
 * 
 * @param {string} url 
 * @param {object} params 
 * @returns 
 */
export const deleteRequest = (url, params) => {
    return http({
        method: 'delete',
        url: url,
        params: params || {}
    });
}