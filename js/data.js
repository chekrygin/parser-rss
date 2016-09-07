'use strict'

let $ = require('jquery');
let singleNewsModule = require('./single-news');

module.exports = (dataUrl, dataType, singlNewsId) => {
  let dfd = $.Deferred();

  $.support.cors = true;

  $.ajax({
    url: dataUrl,
    dataType: dataType,
    success: response => {
      if (!isNaN(parseInt(singlNewsId))) {
        return dfd.resolve(singleNewsModule(response, singlNewsId));
      } else {
        return dfd.resolve(response);
      }
    },
    error: (xhr, status, errorThrown) => {
      console.log(xhr, status, errorThrown);
    }
  });

  return dfd.promise();
}