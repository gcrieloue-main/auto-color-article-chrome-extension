{
  const article = document.querySelector("article");

  if (article) {
    chrome.runtime.sendMessage({ message: "enable" });
  } else {
    chrome.runtime.sendMessage({ message: "disable" });
  }
}
