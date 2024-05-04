const whichGod = ["熊神","硕神","于神","昊神","易神",null,"校长"];
let godSeq = 5;

function selectImage(img) {
  const images = document.querySelectorAll('.image-container img');
  images.forEach(image => image.classList.remove('selected'));
  img.classList.add('selected');
  godSeq = img.id;
}

const baseImages = document.querySelectorAll('.base-image');

baseImages.forEach(function(image) {
  image.addEventListener('click', function() {
    const godSeq1 = this.id
    document.querySelectorAll("img.overlay-image")[0].style.display = 'none';
    document.querySelectorAll("img.overlay-image")[1].style.display = 'none';
    document.querySelectorAll("img.overlay-image")[2].style.display = 'none';
    document.querySelectorAll("img.overlay-image")[3].style.display = 'none';
    document.querySelectorAll("img.overlay-image")[4].style.display = 'none';
    document.querySelectorAll("img.overlay-image")[godSeq1].style.display = 'block';
    const overlayImage = this.nextElementSibling;
    //overlayImage.style.display = 'block';
    overlayImage.style.left = `${20*(this.id)}%`;
  });
});


function pray(sentence) {
  let load0 = [];
  let load1 = [];
  for (const codePoint of sentence) {
    const every = codePoint.codePointAt(0).toString(4);
    load0.push(every);
  }
  for (let numArray of load0) {
    numArray += "";
    let subArray = [];
    for (let i = 0; i < numArray.length; i++) {
      switch (numArray[i]) {
      case "0" :
        subArray.push(`${whichGod[godSeq]}，`);
        break;
      case "1" :
        subArray.push(`${whichGod[godSeq]}？`);
        break;
      case "2" :
        subArray.push(`${whichGod[godSeq]}！`);
        break;
      case "3" :
        subArray.push(`${whichGod[godSeq]}。`);
        break;
      }
    }
    let subString = subArray.join("");
    load1.push(subString);
  }
  let prayer = load1.join("\u0300");
  prayer += `${whichGod[godSeq]}！！！`;
  return prayer;
}


function depray (prayer) {
  prayer = prayer.slice(0,-5);
  let bigArray = prayer.split("\u0300");
  let load2 = [];
  for (let charSeries of bigArray) {
    let subArray = [];
    for (let i = 2; i < charSeries.length; i+=3) {
      switch (charSeries[i]) {
      case "，" :
        subArray.push("0");
        break;
      case "？" :
        subArray.push("1");
        break;
      case "！" :
        subArray.push("2");
        break;
      case "。" :
        subArray.push("3");
        break;
      }
    }
    let subString = subArray.join("");
    load2.push(subString);
  }
  let hexNums = [];
  for (let nums of load2) {
    nums = parseInt(nums,4).toString(16);
    hexNums.push(String.fromCodePoint("0x"+nums));
  }
  const sentence = hexNums.join("");
  return sentence;
}


document.querySelector("button#b1").addEventListener("click", () => {
  if (godSeq == 5) {
    alert("可是你向谁祈祷？");
    godSeq = 6;
  }
  else {
    if (godSeq == 6) {
      document.querySelector("h1").textContent = "神膜拜校长。";
    }
    let sent = document.querySelector("div#input").textContent;
    document.querySelector("div#input").textContent = pray(sent);
  }
});
document.querySelector("button#b2").addEventListener("click", () => {
  let prayer = document.querySelector("div#input").textContent;
  document.querySelector("div#input").textContent = depray(prayer);
});
document.querySelector("button#copy").addEventListener("click", async () => {
  const content = document.querySelector("div#input").textContent;
  await navigator.clipboard.writeText(content);
})
document.querySelector("button#clear").addEventListener("click", () => {
  document.querySelector("div#input").textContent = "";
})
