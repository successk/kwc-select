window.addEventListener("WebComponentsReady", () => {
  const select = document.querySelector("#select");

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "../resources/lang.json", true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      select.setAttribute("items", xhr.responseText);
    }
  };
  xhr.send();

  select.addEventListener("value-changed", (event) => document.querySelector("#selected").textContent = event.detail.value);
});