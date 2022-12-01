
$(document).ready(function () {

  const error = document.getElementById("error")
  //console.log("Ready");
  const form = $("#tweets-forms");

  // Attach a submit handler to the form
  form.submit(function (event) {
    // Stop form from submitting normally
    event.preventDefault();



    if ($("#tweet-text").val() === "" || $("#tweet-text").val() === null) {
      $("#error").slideDown("50", function () {

        error.textContent = "Please enter your tweet"


      });



    }
    else if ($("#tweet-text").val().length > 140) {
      error.textContent = 'Please enter only 140 characteres';
      $("#error").slideDown();
    }

    else {
      $.ajax({
        type: form.attr('method'),//POST
        url: form.attr('action'),
        data: form.serialize(),
        success: (res) => {
            $.get("/tweets", function (data) {

            //Add to the tweet container the last tweet
            //const lastTweet= createTweetElement(data.tweets.pop());
            //$('#tweets-container').prepend(lastTweet);

            //Add all the tweets again
            let arr = [];
            arr = data.tweets;
            console.log('data.tweets', arr);
            renderTweets(arr);
          });

          $("#tweet-text").val("");
          $("#counter").css('color', 'black')
          $("#counter").text(140);

      

        },
        error: error => {
          console.error(`Error Encountered: ${error.status} - ${error.statusText}`);
        }
      });

    }


  });


  $("#tweet-text").on("keyup", function (event) {
    let currentLength = event.target.value.length;
    console.log('Current length', currentLength);

    if ($("#tweet-text").length > 140) {
      $("#error").textContent = 'Please enter only 140 characteres';
      $("#error").slideDown();
    }

    else {
      error.textContent = "";
      $("#error").slideUp();
    }

  });


  //$("<div>").text(textFromUser);

  const createTweetElement = function (tweetObject) {
    // const textEnterByUser = tweetObject.content.text;


    const $tweet = $(`<article class="tweet">
  <header>
    <div id="avatar-name">
      <img src="${tweetObject.user.avatars}">
      <span>${tweetObject.user.name}</span>
    </div>
    <div id="user"><span>${tweetObject.user.handle}</span></div>
  </header>
  <div id="paragraph-section"><p>${escape(tweetObject.content.text)}</p></div>
  

  <footer>
    <div id="date"><datetime  class="timeago">${$.timeago(tweetObject.created_at)}</datetime></div>
    <div><ul>
      <li><i class="fa-solid fa-flag"></i></li>
      <li><i class="fa-solid fa-retweet"></i></li>
      <li><i class="fa-solid fa-heart"></i></li>
    </ul></div>
  </footer>

</article>`);

    return $tweet;
  };



  const loadTweets = function () {
    $.get("/tweets", function (data) {

      console.log("Load was performed.", data);
      renderTweets(data.tweets);
    });
  }


  //takes in an array of tweet objects and add each one to the #tweets-container
  const renderTweets = function (tweetsArray) {


    for (const element of tweetsArray) {

      const $tweet = createTweetElement(element);
      $('#tweets-container').prepend($tweet);
    }





  };
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  loadTweets();

});




