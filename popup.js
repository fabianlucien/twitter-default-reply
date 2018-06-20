// When the icon is clicked, we retrieve the current text.
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, { type: "getText" }, function(response) {
    $("#reply-text").val(response);
  });
});

// When the popup is opened, we set the current text.
$(document).ready(function() {
  var text;
  chrome.storage.local.get(["key"], function(result) {
    text = result.key;
  });

  var textArea = $("#reply-text");
  textArea.val(text);

  // When the save button is clicked, we are going to store the new replyText.
  $("#save-reply-text").click(function() {
    var replyText = $("#reply-text").val();
    setText(replyText);
    showSucces();
  });

  function setText(text) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { type: "setText", text }, function(
        response
      ) {});
    });
  }

  function showSucces() {
    $("#confirm")
      .css("opacity", "100")
      .fadeIn()
      .delay(1500)
      .animate({ opacity: 0 });
  }
});
