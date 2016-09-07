'use strict'

// define modules of project
let dataModule = require('./data');
let socialShareModule = require('./social-share');

let wrapper = document.getElementById('wrapper'),
    newsList = document.getElementById('news-list'),
    singleNewsContainer = document.getElementById('single-news'),
    categoryNews = document.getElementById('news-category'),
    socialButtonsVk = document.getElementById('vk'),
    socialButtonsGoogle = document.getElementById('google'),
    socialButtonsFb = document.getElementById('facebook'),
    rssDataType = wrapper.dataset.type,
    currentPageUrl = document.URL,
    newsId = parseInt(currentPageUrl.substring(currentPageUrl.lastIndexOf('?') + 1)),
    newsListUrl = currentPageUrl.substring(currentPageUrl.lastIndexOf('&') + 1),
    rssUrl = wrapper.dataset.rssUrl,
    showDataOnPage,
    appendSocialUrl;
    if (newsListUrl.indexOf(rssDataType) !== -1) {
      rssUrl = newsListUrl;
    }

/**
  * dataModule() getting news function
  * based on the passed parameters
  *
  * @param {rssUrl} news data url
  * @param {rssDataType} type of data
  * @param {newsId} news id
*/
dataModule(rssUrl, rssDataType, newsId).then(data => {
  return showDataOnPage(data)
});

/**
  * showDataOnPage() output news to page
  * based on the passed parameters
  *
  * @param {data} news returned from dataModule function
*/
showDataOnPage = (data) => {

  // checking if id news exists
  if (isNaN(newsId)) {
    let xmlDoc = data.querySelectorAll('item'),
        ul = document.createElement("ul"),
        dataNewsList = document.createDocumentFragment();

    if (newsList) {

      // appending list of news to the page
      xmlDoc.forEach(function(e) {
        let li = document.createElement("li"),
            template = `<a href="single-news.html?${e.getElementsByTagName('guid')[0].childNodes[0].nodeValue}&${rssUrl}"><h2>${e.getElementsByTagName('title')[0].childNodes[0].nodeValue}</h2>
                    <p>${e.getElementsByTagName('description')[0].childNodes[0].nodeValue}</p></a>`;
        li.innerHTML = template;
        dataNewsList.appendChild(li);
      });

      ul.appendChild(dataNewsList);
      newsList.appendChild(ul);
    }
  } else {

    // appending single news to the page
    let dataSingleNews = document.createDocumentFragment(),
        div = document.createElement("article"),
        singleNews = `<h1>${data.getElementsByTagName('title')[0].childNodes[0].nodeValue}</h1>
                    ${data.getElementsByTagName('image')[0].childNodes[0].nodeValue}
                    <p>${data.getElementsByTagName('fulltext')[0].childNodes[0].nodeValue}</p>`;
    div.innerHTML = singleNews;
    dataSingleNews.appendChild(div);
    singleNewsContainer.appendChild(dataSingleNews);
    appendSocialUrl(socialShareModule(data));
  }
}

/**
  * appendSocialUrl() output news to page
  * based on the passed parameters
  *
  * @param {data} object of social links returned from socialShareModule function
*/
appendSocialUrl = (data) => {
  socialButtonsVk.setAttribute("href", `${data.vkShareLink}`);
  socialButtonsGoogle.setAttribute("href", `${data.googleShareLink}`);
  socialButtonsFb.setAttribute("href", `${data.fbShareLink}`);
}

// event for changing news category
if (categoryNews) {
  categoryNews.onchange = function () {
    let currentSelectUrl = this.value;
    rssUrl = currentSelectUrl;

    // call dataModule function for changing news on page
    dataModule(currentSelectUrl, rssDataType, newsId).then(data => {
      newsList.innerHTML = '';
      showDataOnPage(data);
    });
  }
}