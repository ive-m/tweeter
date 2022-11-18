$(document).ready(function() {
console.log('READY');

const textarea = document.querySelector("#tweet-text");

textarea.addEventListener("keydown", function(event){

 const maxLength = this.getAttribute("maxlength");
 const currentLength = event.target.value.length;

  $("#counter").text(maxLength-currentLength);

  if (currentLength >= maxLength) {
   textarea.removeEventListener("keydown", this );
  }

  console.log(`${maxLength - currentLength} chars left`);
});
});
