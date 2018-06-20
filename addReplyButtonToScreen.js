/* Inject the observer when the dom is loaded */
$(document).ready(function() {
  observer();
});

/* Kickstart the observer */
function observer() {
  var target = document.querySelector("#permalink-overlay");
  var observer = new MutationObserver(function(mutations) {
    addButton();
  });
  var config = { attributes: true, childList: false, characterData: false };
  observer.observe(target, config);
}

/* We add a button when we detect that the reply modal is open */
function addButton() {
  var storage = chrome.storage.local;
  var keyName = "replyText";
  var text;
  storage.get(keyName, function(result) {
    text = result.replyText;
  });
  setTimeout(
    function() {
      var permalinkContainer = document.getElementsByClassName(
        "permalink-container"
      )[0];

      if (permalinkContainer !== undefined) {
        var container = document
          .getElementsByClassName("permalink-container")[0]
          .getElementsByClassName("TweetBoxToolbar")[0];
        if (container !== undefined) {
          var button = document.createElement("button");
          button.setAttribute("class", "btn-add-reply");
          button.innerHTML = "insert reply";
          button.style.cssText =
            "margin: 12px;background-color: #3a06f7;color: white;padding: 6px 12px;border-radius: 20px;font-weight: 700";

          button.onclick = function insertText() {
            document
              .getElementsByClassName("permalink-container")[0]
              .getElementsByClassName(
                "tweet-box"
              )[0].childNodes[0].textContent = text;
          };
          container.appendChild(button);
          var buttons = document.getElementsByClassName("btn-add-reply");
          if (buttons.length > 1) {
            for (var i = 1; i < buttons.length; i++) {
              buttons[i].parentNode.removeChild(buttons[i]);
            }
          }
        }
      }
    },
    2000,
    text
  );
}
