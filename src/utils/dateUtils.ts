/**
 * 日付関連のユーティリティ関数
 */

/**
 * 指定された時間（時:分）の今日の日付を取得する
 * @param hours 時間（0-23）
 * @param minutes 分（0-59）
 * @returns 指定された時間の今日の日付
 */
export const getTodayAt = (hours: number, minutes: number = 0): Date => {
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
};

/**
 * 昨日の日付を取得する
 * @returns 昨日の日付
 */
export const getYesterday = (): Date => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date;
};

/**
 * 明日の日付を取得する
 * @returns 明日の日付
 */
export const getTomorrow = (): Date => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date;
};

/**
 * 日付をフォーマットする（YYYY-MM-DD HH:MM:SS）
 * @param date フォーマットする日付
 * @returns フォーマットされた日付文字列
 */
export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

/**
 * 2つの日付が同じ日かどうかを判定する
 * @param date1 日付1
 * @param date2 日付2
 * @returns 同じ日の場合はtrue、そうでない場合はfalse
 */
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};