// 获取HTML元素
const textbox = document.getElementById('main-textarea');
const copyButton = document.getElementById('copyButton');
const clearButton = document.getElementById('clearButton');

// 当点击“拷贝”按钮时，复制文本区域中的内容到剪贴板
copyButton.addEventListener('click', () => {
  navigator.clipboard
    .writeText(textbox.value)
    .then(() => {
      //alert('已复制文本到剪贴板！'); // 提示用户
    })
    .catch((error) => {
      console.error('无法复制文本到剪贴板：', error);
    });
});

// 当点击“清空”按钮时，清空文本区域中的内容
clearButton.addEventListener('click', () => {
  textbox.value = '';
});

document.addEventListener('DOMContentLoaded', function () {
  let matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
  if (matchMedia.matches) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
  matchMedia.addEventListener('change', function () {
    if (matchMedia.matches) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  });
});
