chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  const queryOptions = { active: true, lastFocusedWindow: true };
  const [currentTab] = await chrome.tabs.query(queryOptions);
  const currentTabId = currentTab.id;
  if (request.message === "enable") {
    chrome.action.enable(currentTabId);
    sendResponse({ message: "enable", status: "200", data: null });
    return true;
  } else if (request.message === "disable") {
    chrome.action.disable(currentTabId);
    chrome.action.setBadgeBackgroundColor({ color: "#FFD6A5" }, () => {});
    chrome.action.setBadgeText(
      {
        text: "!",
        tabId: currentTabId,
      },
      () => {}
    );
    chrome.action.setTitle(
      {
        title: "Colorisation unavailable",
        tabId: currentTabId,
      },
      () => {}
    );
    sendResponse({ message: "disable", status: "200", data: null });
    return true;
  }
});

chrome.tabs.onActivated.addListener(async function (activeInfo) {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  currentTabId = tab.id;
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["scripts/check_enable.js"],
  });
});

chrome.action.onClicked.addListener((tab) => {
  if (tab.url?.startsWith("http")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["scripts/colorize.js"],
    });
  }
});
