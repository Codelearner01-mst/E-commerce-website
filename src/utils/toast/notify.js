import { ShowSucessMessage } from "../shared.js";
import { displayCartsCount } from "../shared.js";

export function runCartActionsConfirmation(msg, carts, countEle) {
  ShowSucessMessage(msg);
  displayCartsCount(countEle, carts);
}
