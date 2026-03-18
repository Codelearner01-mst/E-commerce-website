import { ShowSucessMessage } from "../shared.js";
import { displayCartsCount } from "../shared.js";

export function runCartActionsConfirmation(msgEle, msg, carts, countEle) {
  ShowSucessMessage(msgEle, msg);
  displayCartsCount(countEle, carts);
}
