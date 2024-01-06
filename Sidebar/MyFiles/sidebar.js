// 创建表格行
function createRow(item) {
  const newRow = document.createElement('tr');

  const checkboxCell = document.createElement('td');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkboxCell.appendChild(checkbox);
  newRow.appendChild(checkboxCell);

  const appNameCell = document.createElement('td');
  appNameCell.textContent = item.name;
  newRow.appendChild(appNameCell);

  const appPathCell = document.createElement('td');
  appPathCell.textContent = item.path;
  newRow.appendChild(appPathCell);

  const appRatingCell = document.createElement('td');
  appRatingCell.textContent = '🌟🌟🌟';
  newRow.appendChild(appRatingCell);

  return newRow;
}

// 清空表格
function clearTable(tableBody) {
  tableBody.innerHTML = '';
}

// 处理复选框操作
function handleCheckboxOperations() {
  chrome.storage.local.get(['currentURL'], function (result) {
    const rows = document.querySelectorAll('#tableBody > tr');
    rows.forEach((row) => {
      const checkbox = row.querySelector('input[type="checkbox"]');
      if (checkbox) {
        checkbox.checked = true; // 选中所有复选框
      }
    });
  });
}

// 提取并显示主要文本
function extractAndAlertMainText(data, result) {
  const parser = new DOMParser();
  const parsedHtml = parser.parseFromString(result, 'text/html');
  const mainText = parsedHtml.querySelectorAll(
    '.movie-list.h.cols-4.vcols-8 .video-title > strong'
  );

  const tableBody = document.getElementById('tableBody');
  clearTable(tableBody);
  const dataMap = {};
  data.forEach((item) => {
    dataMap[item.name] = item;
  });

  mainText.forEach((file) => {
    const itemName = file.innerText;
    if (dataMap[itemName]) {
      const item = dataMap[itemName];
      const newRow = createRow(item);
      tableBody.appendChild(newRow);
    }
  });
}

// 更新当前标签页的数据
function updateDataForCurrentTab() {
  try {
    fetch('data.json')
      .then((response) => response.json())
      .then((data) => {
        chrome.storage.local.get(['currentPageContent'], function (result) {
          extractAndAlertMainText(data, result.currentPageContent);
          handleCheckboxOperations();
        });
      })
      .catch((error) => {
        // 错误处理
      });
  } catch (error) {
    // 错误处理
  }
}

// 页面加载完毕时触发
document.addEventListener('DOMContentLoaded', function () {
  toggleDarkMode();
  updateDataForCurrentTab();
});

// 监听标签页切换事件
chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    const currentURL = tab.url;
    if (currentURL.includes('javdb')) {
      updateDataForCurrentTab();
    } else {
      const tableBody = document.getElementById('tableBody');
      clearTable(tableBody);
    }
  });
});

// 监听标签页URL更新事件
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.url && tab.active && tab.url.includes('javdb')) {
    updateDataForCurrentTab();
  }
});

// 切换暗黑模式
const toggleDarkMode = () => {
  const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
  const updateTheme = (isDark) => {
    if (isDark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };
  matchMedia.addEventListener('change', () => updateTheme(matchMedia.matches));
  updateTheme(matchMedia.matches);
};
