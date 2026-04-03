export function disableButton(btn) {
  btn.disabled = true;
  btn.classList.remove("cursor-pointer");
  btn.classList.add("cursor-not-allowed", "opacity-50");
}
