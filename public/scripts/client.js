
$(document).ready(function() {
  //console.log("Ready");
   const form = $("#tweets-forms");
  
  // Attach a submit handler to the form
  form.submit(function( event ) {
   // Stop form from submitting normally
    event.preventDefault();
    const text=$("#tweet-text").val();
    if ( text=== ""||text===null ) {
      alert('Please enter your tweet');
    }
    else{
    $.ajax({
      type : form.attr('method'),
      url :  form.attr('action'),
      data : form.serialize(),
      success: ()=> {
        if(text.length >140) {
          alert('Please enter only 140 characteres');
          
        }else
       loadTweets();
      },
      error: error => {
          console.error(`Error Encountered: ${error.status} - ${error.statusText}`);
      }
    });

  }
  
  
});

const createTweetElement = function(tweetObject) {
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
const loadTweets= function(){
  $.ajax('/tweets', { method: 'GET' })
    .then(function (JSON) {
      renderTweets(JSON)
      
    });
}
const renderTweets = function(tweetsArray) {
  for (const elements of tweetsArray) {
    const $tweet = createTweetElement(elements);
    $('#tweets-container').prepend($tweet);
  }

};

 
});




