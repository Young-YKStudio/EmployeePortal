export function formatPhoneNumber(telNum) {
  if (!telNum) return telNum;

  const telPhoneNum = telNum.replace(/[^\d]/g, "");
  const phoneNumberLength = telPhoneNum.length;
  if (phoneNumberLength < 4) return telPhoneNum;
  if (phoneNumberLength < 7) {
    return `(${telPhoneNum.slice(0, 3)}) ${telPhoneNum.slice(3)}`;
  }
  return `(${telPhoneNum.slice(0, 3)}) ${telPhoneNum.slice(
    3,
    6
  )}-${telPhoneNum.slice(6, 10)}`;
}