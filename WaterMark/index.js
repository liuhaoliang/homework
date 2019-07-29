(function() {
  function createWaterMark(text, color, fontSize) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const textWidth = Math.ceil(ctx.measureText(text).width);
    canvas.width = textWidth + 3 * fontSize;
    canvas.height = textWidth * Math.sin((30 / 180) * Math.PI) + 3 * fontSize;
    ctx.font = fontSize + "px Arial";
    ctx.fillStyle = color;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((-30 / 180) * Math.PI);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
    ctx.fillText(text, (canvas.width - textWidth) / 2, canvas.height / 2);
    return canvas.toDataURL("image/png");
  }

  function loadWaterMark(username, color, fontSize) {
    const backgroundImage = createWaterMark(username, color, fontSize);
    const div = document.createElement("div");
    div.style = `
    position:fixed;
    top:0;
    left:0;
    zIndex:9999;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    background-image: url(${backgroundImage});
    `;
    document.body.appendChild(div);
  }

  loadWaterMark("haoliang.liu", "rgba(0,0,0,.05)", 17);
})();
