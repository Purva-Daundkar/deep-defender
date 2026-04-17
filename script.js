const form = document.getElementById("detectForm");
const imageInput = document.getElementById("imageInput");
const audioInput = document.getElementById("audioInput");
const urlInput = document.getElementById("urlInput");
const resultDiv = document.getElementById("result");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData();

    const imageFile = imageInput.files[0];
    const audioFile = audioInput.files[0];
    const urlValue = urlInput.value;

    // Append data
    if (imageFile) {
        formData.append("image", imageFile);
    }

    if (audioFile) {
        formData.append("audio", audioFile);
    }

    if (urlValue) {
        formData.append("url", urlValue);
    }

    // Optional: show loading
    resultDiv.innerHTML = "Processing...";

    // Send request to backend
    fetch("http://127.0.0.1:5000/detect", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        resultDiv.innerHTML = `
            <p><strong>Result:</strong> ${data.result}</p>
        `;
    })
    .catch(error => {
        console.error(error);
        resultDiv.innerHTML = `<p style="color:red;">Error occurred</p>`;
    });
});