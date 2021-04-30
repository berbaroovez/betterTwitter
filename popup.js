// let changeColor = document.getElementById("changeColor");
// chrome.storage.sync.get("color", ({ color }) => {
//   changeColor.style.backgroundColor = color;
// });

// changeColor.addEventListener("click", async () => {
//   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: setPageBackgroundColor,
//   });
// });

// function setPageBackgroundColor() {
//   chrome.storage.sync.get("color", ({ color }) => {
//     document.body.style.backgroundColor = color;
//   });
// }

// function display_h1(results) {
//   h1 = results;
// }

// Callback function to execute when mutations are observed

// let readDom = document.getElementById("readDom");

// // readDom.style.backgroundColor = "red";

// readDom.addEventListener("click", async () => {
//   //   await chrome.tabs.query({ active: true, currentWindow: true }, () => {
//   //     console.log("Penis");
//   //   });

//   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: testConsole,
//   });

//   function testConsole() {
//     console.log("Poop2");
//   }
// });

let test = document.getElementById("test");
test.style.backgroundColor = "yellow";

test.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  console.log("Popup DOM fully loaded and parsed");

  function modifyDOM() {
    //You can play with your DOM here or check URL against your regex

    const text = document.querySelectorAll("span");

    var img = document.createElement("img");
    img.src = "https://cdn.betterttv.net/emote/5c04c335693c6324ee6a23b2/3x";

    for (let i = 0; i < text.length; i++) {
      if (text[i].innerHTML.includes("peepoPog")) {
        text[i].innerHTML = text[i].innerHTML.replace(
          "peepoPog",
          `<img style="width:25px;height:25px;" src="https://cdn.betterttv.net/emote/5c04c335693c6324ee6a23b2/3x">`
        );
      }
    }
    // console.l
    // return document.body.innerHTML;
  }

  //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: modifyDOM,
  });
});
