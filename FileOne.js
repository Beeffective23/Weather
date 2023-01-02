let myObject = {
  names: ["Peter", "Ivan", "Valeri"],
};

let myButton = document.querySelector("button");
myButton.addEventListener("click", function () {
  myObject.names.push("Vesela");
});
export { myObject};
