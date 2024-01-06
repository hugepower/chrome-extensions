// 允许用户通过单击操作工具栏图标打开侧边栏
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.urlFromTab) {
    chrome.action.setPopup({ tabId: sender.tab.id, popup: 'sidepanel.html' });
    chrome.storage.local.set({ currentURL: request.urlFromTab });
  }
  if (request.pageContent) {
    const pageContent = request.pageContent;
    chrome.storage.local.set({ currentPageContent: pageContent });
  }
});

// 在 Background Script 中监听标签更新事件，并在标签更新时向 Sidebar 页面发送当前标签页的 URL
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
  if (changeInfo.url) {
    if (changeInfo.url) {
      chrome.tabs.sendMessage(tabId, { urlFromTab: changeInfo.url });
    }
  }
  if (request.pageContent) {
    const pageContent = request.pageContent;
    chrome.storage.local.set({ currentPageContent: pageContent });
  }
  if (changeInfo.status === 'loading') {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: sendPageContentToBackground,
    });
  }
});

function sendPageContentToBackground() {
  const currentPageContent = document.documentElement.outerHTML;
  chrome.runtime.sendMessage({ pageContent: currentPageContent });
}
