let qr;
function handleGenerateQrCode() {
    const url = document.getElementById("URL").value.trim();
    if (!url) return alert("Enter a valid URL");

    const dark = document.getElementById("darkColor").value;
    const light = document.getElementById("lightColor").value;
    const size = document.getElementById("qrSize").value;

    document.getElementById("QR-CODE").innerHTML = "";

    qr = new QRCode(document.getElementById("QR-CODE"), {
        text: url,
        width: size,
        height: size,
        colorDark: dark,
        colorLight: light
    });

    detectWebsite(url);
    document.getElementById("download-btn").style.display = "inline-block";
}

function detectWebsite(url) {
    let site = "";

    if (url.includes("youtube")) site = "YouTube Link";
    else if (url.includes("facebook")) site = "Facebook Link";
    else if (url.includes("instagram")) site = "Instagram Link";
    else if (url.includes("tiktok")) site = "TikTok Link";
    else site = "Website URL";

    document.getElementById("website-name").innerText = site;
}

function downloadQR() {
    const format = document.getElementById("downloadFormat").value.toLowerCase();
    const canvas = document.querySelector("#QR-CODE canvas");

    const link = document.createElement("a");
    link.download = `QRCode.${format}`;
    link.href = canvas.toDataURL(`image/${format}`);
    link.click();
}


document.getElementById("darkToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

document.getElementById("qrSize").addEventListener("input", (e) => {
    document.getElementById("sizeValue").innerText = e.target.value;
});
