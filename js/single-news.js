'use strict'

module.exports = (data, id) => {
  let newsItem,
      xmlDoc = data.querySelectorAll('item');
  for (let i = 0; i < xmlDoc.length; i++) {
    let currentNews = xmlDoc[i],
        currentId = parseInt(xmlDoc[i].getElementsByTagName('guid')[0].childNodes[0].nodeValue);
    if (currentId === id) {
      newsItem = currentNews;
    }
  }
  return newsItem;
}