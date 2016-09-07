'use strict'

module.exports = (item) => {
  let vkShareLink = `https://vk.com/share.php?url=${item.getElementsByTagName('link')[0].childNodes[0].nodeValue}&title=${item.getElementsByTagName('title')[0].childNodes[0].nodeValue}&description=${item.getElementsByTagName('description')[0].childNodes[0].nodeValue}&noparse=true`,
  	  googleShareLink = `https://plus.google.com/share?url=${item.getElementsByTagName('link')[0].childNodes[0].nodeValue}`,
  	  fbShareLink = `https://www.facebook.com/sharer/sharer.php?u=${item.getElementsByTagName('link')[0].childNodes[0].nodeValue}`;

  return {
  	vkShareLink: vkShareLink,
  	googleShareLink: googleShareLink ,
  	fbShareLink: fbShareLink
  }
}