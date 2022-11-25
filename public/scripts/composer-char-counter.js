$(document).ready(function () {
  
  console.log('READY');
  const textarea = document.querySelector("#tweet-text");
  textarea.addEventListener("input", function (event) {
    const maxLength = 140;
    const currentLength = event.target.value.length;
    $("#counter").text(maxLength - currentLength);
    if (currentLength<0) {
      $("#counter").className="red";
    }
    console.log(`${maxLength - currentLength} chars left`);
  });
});
