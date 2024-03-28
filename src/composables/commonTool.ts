export class CommonTools {
  public static formatDateTime(strDate: string) {
    const date = new Date(strDate)
    const y = date.getFullYear()
    let m: string | number = date.getMonth() + 1
    m = m < 10 ? (`0${m}`) : m
    let d: string | number = date.getDate()
    d = d < 10 ? (`0${d}`) : d
    let h: string | number = date.getHours()
    h = h < 10 ? (`0${h}`) : h
    let minute: string | number = date.getMinutes()
    minute = minute < 10 ? (`0${minute}`) : minute
    let second: string | number = date.getSeconds()
    second = second < 10 ? (`0${second}`) : second
    return `${y}-${m}-${d} ${h}:${minute}:${second}`
  }
}
