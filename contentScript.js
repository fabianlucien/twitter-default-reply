/* Responses on requests the background scripts sends */
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  var storage = chrome.storage.local;
  var keyName = "replyText";
  if (message.type === "getText") {
    storage.get(keyName, function(result) {
      sendResponse(result.replyText);
    });
    return true;
  } else if (message.type === "setText") {
    var newReplyText = message.text;
    storage.set({
      [keyName]: newReplyText
    });
    sendResponse("New text has been set");
  }
  return false;
});
