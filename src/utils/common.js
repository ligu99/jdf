/**
 * 
 * @param {Array} dataList 所有數據
 * @param {Number} currentPage 選擇頁碼1~..
 * @param {Number} pageSize 每頁條數
 */
export function tableDataPagination(dataList, currentPage, pageSize, searchValue) {
  let resList = [];
  if (searchValue) {
    resList = dataList.filter(item => item.value.indexOf(searchValue) !== -1);
  } else {
    resList = dataList;
  }
  let startIndex = (currentPage - 1) * pageSize;
  let endIndex = currentPage * pageSize;
  return {
    dataList: resList.slice(startIndex, endIndex),
    dataTotal: resList.length
  }
}

/**
 * 獲取圖片寬高
 * @param {flie} imaFile 
 * @returns 
 */
export function getImageInfo(imaFile) {
  let img = new Image();
  img.src = URL.createObjectURL(imaFile);
  return new Promise(resolve => {
    img.onload = function () {
      resolve({
        imgWidth: img.width,
        imgHeight: img.height
      })
    };
  })
}
/**
 * 校驗URL
 * @param {string} url 
 * @returns 
 */
export function checkURL(url) {
  let reg = new RegExp(/^(https?:\/\/(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+\.)+[a-zA-Z]+)(:\d+)?(\/.*)?(\?.*)?(#.*)?$/);
  if (reg.test(url)) {
    return true;
  } else {
    return false;
  }
}

