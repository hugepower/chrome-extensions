// 1. 获取HTML元素
const getElements = () => {
  const topTextbox = document.getElementById('top-textarea');
  const mainTextbox = document.getElementById('main-textarea');
  const copyButton = document.getElementById('copyButton');
  const clearButton = document.getElementById('clearButton');
  return { topTextbox, mainTextbox, copyButton, clearButton };
};

// 2. 处理主文本区域的输入
const handleMainTextboxInput = ({ mainTextbox, topTextbox }) => {
  mainTextbox.addEventListener('input', function () {
    topTextbox.value = mainTextbox.value.length === 0 ? '' : mainTextbox.value.length;
  });
};

// 3. 处理Tab键的按下
const handleTabKeydown = ({ mainTextbox }) => {
  mainTextbox.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      this.value += '\t';
      this.selectionStart = this.value.length;
    }
  });
};

// 4. 复制文本到剪贴板
const copyTextToClipboard = ({ copyButton, mainTextbox }) => {
  copyButton.addEventListener('click', () => {
    navigator.clipboard
      .writeText(mainTextbox.value)
      .then(() => {}) // 提示用户，这里可以去掉alert，或者用其他方式提示用户
      .catch((error) => {
        console.error('无法复制文本到剪贴板：', error);
      });
  });
};

// 5. 清空文本区域
const clearTextboxes = ({ clearButton, mainTextbox, topTextbox }) => {
  clearButton.addEventListener('click', () => {
    mainTextbox.value = '';
    topTextbox.value = '';
  });
};

// 6. 切换暗黑模式
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

// 7. 设置按钮的tabindex
const setButtonsTabindex = () => {
  Array.from(document.querySelectorAll('button')).forEach((button) =>
    button.setAttribute('tabindex', -1)
  );
};

// 执行上述函数，封装完毕！
document.addEventListener('DOMContentLoaded', () => {
  const { topTextbox, mainTextbox, copyButton, clearButton } = getElements();
  handleMainTextboxInput({ topTextbox, mainTextbox });
  handleTabKeydown({ mainTextbox });
  copyTextToClipboard({ copyButton, mainTextbox });
  clearTextboxes({ clearButton, topTextbox, mainTextbox });
  toggleDarkMode();
  setButtonsTabindex();
});
