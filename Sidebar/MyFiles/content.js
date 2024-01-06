const currentPageURL = window.location.href;
chrome.runtime.sendMessage({ urlFromTab: currentPageURL });

function sendPageContentToBackground() {
  const currentPageContent = document.documentElement.outerHTML;
  chrome.runtime.sendMessage({ pageContent: currentPageContent });
}

sendPageContentToBackground();
