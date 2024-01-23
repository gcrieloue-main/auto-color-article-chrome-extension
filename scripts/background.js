async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  const currentTab = await getCurrentTab();
  const currentTabId = currentTab.id;
  if (request.message === "enable") {
    chrome.action.enable(currentTabId);
    sendResponse({ message: "enable", status: "200", data: null });
    return true;
  } else if (request.message === "disable") {
    console.log({ disable: currentTabId, currentTab });
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
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["scripts/colorize.js"],
  });
});
