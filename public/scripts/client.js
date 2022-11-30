
$(document).ready(function () {

  //console.log("Ready");
  const form = $("#tweets-forms");

  // Attach a submit handler to the form
  form.submit(function (event) {
    // Stop form from submitting normally
    event.preventDefault();
    const text = $("#tweet-text").val();
    const error = document.getElementById("error")

    if (text === "" || text === null) {
      $("#error").slideDown("500", function () {
        if ((text === "" || text === null)) {
          error.textContent = "Please enter your tweet"
          document.querySelector("#tweet-text").addEventListener("input", function () {
            error.textContent = "";

            $("#error").slideUp();
          });

        }
      });

    }

    else {
      $.ajax({
        type: form.attr('method'),//POST
        url: form.attr('action'),
        data: form.serialize(),
        success: (res) => {
          if (text.length > 140) {
            error.textContent = 'Please enter only 140 characteres';
            $("#error").slideDown();
            document.querySelector("#tweet-text").addEventListener("input", function (event) {
              let currentLength = event.target.value.length;
              if (currentLength <= 140) {
                error.textContent = "";
                $("#error").slideUp();
              }else{
                error.textContent = 'Please enter only 140 characteres';
            $("#error").slideDown();
              }
              
            });

          }

          else {

            $.get("/tweets", function (data) {

             console.log(data.tweets.length)
             const lastTweet= createTweetElement(data.tweets.pop());
              
             $('#tweets-container').prepend(lastTweet);
            });

            $("#tweet-text").val("");
            $("#counter").css('color', 'black')
            $("#counter").text(140);

          }

        },
        error: error => {
          console.error(`Error Encountered: ${error.status} - ${error.statusText}`);
        }
      });

    }


  });
  //$("<div>").text(textFromUser);

  const createTweetElement = function (tweetObject) {
    // const textEnterByUser = tweetObject.content.text;


    const $tweet = $(`<article class="tweet">
  <header>
    <div>
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
      <li><i class="fa-solid fa-arrows-retweet"></i></li>
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


  //takes in an array of tweet objects and append each one to the #tweets-container
  const renderTweets = function (tweetsArray) {
    //console.log("Tweets Array", tweetsArray);

    for (const element of tweetsArray) {
      const $tweet = createTweetElement(element);
      $('#tweets-container').prepend($tweet);
    }
    //$('#tweets-container').apend($tweet);


  };
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  loadTweets();

});




