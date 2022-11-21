/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

$(document).ready(function() {
  console.log("Ready");
  const $tweet = createTweetElement(tweetData);
  console.log($tweet); // to see what it looks like
  $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

});


function createTweetElement(tweetObject) {
  const $tweet = $(`<article class="tweet">

  <header>
    <div>
      <img src="${tweetObject.user.avatars}">
      <span>${tweetObject.user.name}</span>
    </div>
    <div id="user"><span>${tweetObject.user.handle}</span></div>
  </header>

  <p>${tweetObject.content.text}</p>

  <footer>

    <div><span id="date">${tweetObject.created_at}</span></div>
    <div><ul>
      <li><i class="fa-solid fa-flag"></i></li>
      <li><i class="fa-solid fa-arrows-retweet"></i></li>
      <li><i class="fa-solid fa-heart"></i></li>
    </ul></div>
    

  </footer>

</article>`);

/* */

return $tweet;
}



