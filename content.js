console.log("YOOOOOOOOO");

var targetNode = document.querySelector('main[role="main"]');
main();
async function main() {
  var twitchUserId = await validTwitchUserCheck("stanz");

  console.log("Twitch user, ", twitchUserId);
  var bttvEmoteList = await getBTTV(twitchUserId);
  var mainTwitterNode = await checkForNode();

  var callback = function (mutationsList) {
    for (var mutation of mutationsList) {
      //   if (bttvEmoteList.length > 0) {
      //     modifyDOM(bttvEmoteList);
      //   } else {
      //     console.log("No emotes available");
      //   }
      modifyDOM();
    }
  };
  var observer = new MutationObserver(callback);

  observer.observe(mainTwitterNode, {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
  });

  function modifyDOM() {
    //You can play with your DOM here or check URL against your regex

    const tweetTexts = document.querySelectorAll("span");

    // var img = document.createElement("img");
    // img.src = "https://cdn.betterttv.net/emote/5c04c335693c6324ee6a23b2/3x";

    for (let i = 0; i < tweetTexts.length; i++) {
      //   for (emote in emoteList) {
      if (tweetTexts[i].innerHTML.includes("peepoPog")) {
        tweetTexts[i].innerHTML = tweetTexts[i].innerHTML.replace(
          "peepoPog",
          `<img style="width:25px;height:25px;" src="https://cdn.betterttv.net/emote/5c04c335693c6324ee6a23b2/3x">`
        );
      }
      if (tweetTexts[i].innerHTML.includes("blobDance")) {
        tweetTexts[i].innerHTML = tweetTexts[i].innerHTML.replace(
          "blobDance",
          `<img style="width:25px;height:25px;" src="https://cdn.betterttv.net/emote/5ada077451d4120ea3918426/3x">`
        );
      }
      //   }
    }
  }
}

function modifyDOMTest(emoteList) {
  //You can play with your DOM here or check URL against your regex

  const tweetTexts = document.querySelectorAll("span");

  // var img = document.createElement("img");
  // img.src = "https://cdn.betterttv.net/emote/5c04c335693c6324ee6a23b2/3x";

  for (let i = 0; i < tweetTexts.length; i++) {
    //   for (emote in emoteList) {
    if (tweetTexts[i].innerHTML.includes("peepoPog")) {
      tweetTexts[i].innerHTML = tweetTexts[i].innerHTML.replace(
        "peepoPog",
        `<img style="width:25px;height:25px;" src="https://cdn.betterttv.net/emote/5c04c335693c6324ee6a23b2/3x">`
      );
    }
    if (tweetTexts[i].innerHTML.includes("blobDance")) {
      tweetTexts[i].innerHTML = tweetTexts[i].innerHTML.replace(
        "blobDance",
        `<img style="width:25px;height:25px;" src="https://cdn.betterttv.net/emote/5ada077451d4120ea3918426/3x">`
      );
    }
    //   }
  }
}

async function checkForNode() {
  while (!targetNode) {
    await new Promise((r) => setTimeout(r, 2000));
    targetNode = document.querySelector('main[role="main"]');
    console.log("inside script:", targetNode);
  }

  return targetNode;
}

async function validTwitchUserCheck(username) {
  var user;
  await fetch(
    `https://api.twitch.tv/v5/users?login=${username}&client_id=xu66f5pxfyx4o4wh9nofrcodnvh5dg`
  )
    .then((response) => response.json())
    .then((response) => {
      try {
        user = response["users"][0]["_id"];
      } catch (err) {
        console.log("NO USER of name ", username);
      }
    });

  return user;
}

async function getBTTV(twitchID) {
  var fullList = [];
  await fetch(`https://api.betterttv.net/3/cached/users/twitch/${twitchID}`)
    .then((response) => response.json())
    .then((response) => {
      try {
        const channelEmote = response.channelEmotes;
        const sharedEmote = response.sharedEmotes;
        fullList = channelEmote.concat(sharedEmote);
        console.log("BTTV EMOTES", fullList);
      } catch (err) {
        console.log(err);
        console.log("No BTTV Emotes");
      }
    });

  return fullList;
}
