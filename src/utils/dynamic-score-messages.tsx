
interface MessageTypes{
  success:string[],
  fail:string[],
}
const messages : MessageTypes = {
  success: ["Harika 👏", "İyisin 👍", "Süper 👏", "Müthiş 👍", "Çok iyi 👏"],
  fail: ["Sorun yok 😌", "Vazgeçme 😓"],
};

export function DynamicScoreMessages(lastChoise: boolean | null) {
  return lastChoise == true
    ? messages.success[Math.floor(Math.random() * messages.success.length)]
    : lastChoise==null ? "" : messages.fail[Math.floor(Math.random() * messages.fail.length)];
}
