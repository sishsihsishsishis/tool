export function DateFormat (date,fmt) {
  let ret;
  const dic = {
      '1':'Jan',
      '2':'Feb',
      '3':'Mar',
      '4':'Apr',
      '5':'May',
      '6':'Jun',
      '7':'Jul',
      '8':'Aug',
      '9':'Sep',
      '10':'Oct',
      '11':'Nov',
      '12':'Dec',
  };
  const opt = {
      "Y+": date.getFullYear().toString(),        // 年
      "y+": date.getFullYear().toString(),        // 年
      "m+": (date.getMonth() + 1).toString(),     // 月
      "d+": date.getDate().toString(),            // 日
      "H+": date.getHours().toString(),           // 时
      "P+": date.getHours()>12?'pm':'am',           // 时
      "M+": date.getMinutes().toString(),         // 分
      "S+": date.getSeconds().toString(),         // 秒
      "E+": dic[(date.getMonth() + 1).toString()]      // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
      };
  };
  return fmt;
}


export function chunk(arr, len) {
  // if(len === 0) return arr;
  const ArrayList = []
  let index = 0
  while (index < arr.length) {
    ArrayList.push(arr.slice(index, index += len))
  }
  return ArrayList;
}

// const average = (arr) => arr.reduce((a, b) => a + b) / arr.length;
export const average = (arr) => arr.length === 0 ? null : arr.reduce((a, b) => a + b ) / arr.length;

