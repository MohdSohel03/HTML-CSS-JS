function generateQRCode() {
    let text = document.getElementById("text").value;
    let qrContainer = document.getElementById("qrcode");
    let downloadBtn = document.getElementById("download");

    if (text.trim() === "") {
        alert("Please enter text or URL");
        return;
    }
    qrContainer.innerHTML = "";
    let qr = new QRCode(qrContainer, {
        text: text,
        width: 200,
        height: 200
    });

    setTimeout(() => {
        downloadBtn.style.display = "block";
    }, 500);
}

function downloadQRCode() {
    let qrCanvas = document.querySelector("#qrcode canvas");
    if (qrCanvas) {
        let img = qrCanvas.toDataURL("image/png");
        let link = document.createElement("a");
        link.href = img;
        link.download = "qrcode.png";
        link.click();
    }
}