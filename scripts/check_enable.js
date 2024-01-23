{
  const article = document.querySelector("article");

  if (article) {
    chrome.runtime.sendMessage({ message: "enable" }, function (response) {});
  } else {
    chrome.runtime.sendMessage({ message: "disable" }, function (response) {});
  }
}
