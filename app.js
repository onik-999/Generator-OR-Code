const handleGenerateQrCode = () => {
    const url = document.getElementById("URL").value.trim();

    if (!url) {
        return alert("Please enter a valid URL!");
    }

    document.getElementById("URL").value = "";
    document.getElementById("QR-CODE").innerHTML = "";
    document.getElementById("website-name").innerHTML = "";

    let name = "Website Link";

    if (url.includes("youtube.com") || url.includes("youtu.be")) {
        name = "YouTube Link";
    }
    else if (url.includes("facebook.com")) {
        name = "Facebook Link";
    }
    else if (url.includes("instagram.com")) {
        name = "Instagram Link";
    }
    else if (url.includes("tiktok.com")) {
        name = "TikTok Link";
    }
    else if (url.includes("twitter.com") || url.includes("x.com")) {
        name = "Twitter Link";
    }

    document.getElementById("website-name").innerText = name;

    try {
        new QRCode(document.getElementById("QR-CODE"), {
            text: url,
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff"
        });

        // Show download button
        setTimeout(() => {
            document.getElementById("download-btn").style.display = "inline-block";
        }, 300);

    } catch (error) {
        console.log(error);
    }
};


const downloadBtn = document.createElement("button");
downloadBtn.id = "download-btn";
downloadBtn.innerText = "Download QR";
document.getElementById("qr-area").appendChild(downloadBtn);

downloadBtn.addEventListener("click", () => {
    const qrCanvas = document.querySelector("#QR-CODE canvas");

    if (!qrCanvas) return alert("Generate a QR code first!");

    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = qrCanvas.toDataURL();
    link.click();
});


const darkBtn = document.createElement("button");
darkBtn.id = "darkToggle";
darkBtn.innerText = "Dark Mode";
document.body.appendChild(darkBtn);

let darkMode = false;

darkBtn.addEventListener("click", () => {
    darkMode = !darkMode;

    document.body.classList.toggle("dark-mode");

    darkBtn.innerText = darkMode ? "Light Mode" : "Dark Mode";
});



function adjustQRSize() {
    const containerWidth = window.innerWidth;

    const qrBox = document.querySelector("#QR-CODE");
    qrBox.style.width = containerWidth < 500 ? "150px" : "200px";
    qrBox.style.height = containerWidth < 500 ? "150px" : "200px";
}

window.addEventListener("resize", adjustQRSize);