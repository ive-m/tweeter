
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
      $( "#error" ).slideDown( "1000", function() {
         if ((text === "" || text === null))
        {
            error.textContent = "Please enter your tweet"
             document.querySelector("#tweet-text").addEventListener("input", function () {            
              error.textContent= "";
              $( "#error" ).slideUp();
            });
           
        } 
    });
     
    }

    else {
      $.ajax({
        type: form.attr('method'),
        url: form.attr('action'),
        data: form.serialize(),
        success: () => {
          if (text.length > 140) {
            error.textContent = 'Please enter only 140 characteres';
            $( "#error" ).slideDown();
              document.querySelector("#tweet-text").addEventListener("input", function (event) {
                const currentLength = event.target.value.length;
                if (currentLength<=140) {
                  error.textContent= "";
                  $( "#error" ).slideUp();
    } 
  });

          } 
          
          else
            loadTweets();
        },
        error: error => {
          console.error(`Error Encountered: ${error.status} - ${error.statusText}`);
        }
      });

   }


  });
  //$("<div>").text(textFromUser);

  const createTweetElement = function (tweetObject) {
    const textEnterByUser = tweetObject.content.text;


    const $tweet = $(`<article class="tweet">
  <header>
    <div>
      <img src="${tweetObject.user.avatars}">
      <span>${tweetObject.user.name}</span>
    </div>
    <div id="user"><span>${tweetObject.user.handle}</span></div>
  </header>
  
  <p>${escape(textEnterByUser)}</p>

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
  
  //function errorMessage() {
//}

  const loadTweets = function () {
    $.ajax('/tweets', { method: 'GET' })
      .then(function (JSON) {
        renderTweets(JSON);

      });
  }
  const renderTweets = function (tweetsArray) {
    for (const elements of tweetsArray) {
      const $tweet = createTweetElement(elements);
      $('#tweets-container').prepend($tweet);
    }

  };
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


});




