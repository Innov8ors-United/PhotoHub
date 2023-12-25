function handleUpload() {
    const input = document.getElementById('uploadInput');
    const imageContainer = document.getElementById('imageContainer');
    const apertureText = document.getElementById('apertureText').value;
    const shutterText = document.getElementById('shutterText').value;
    const isoText = document.getElementById('isoText').value;

    if (input.files.length > 0 && apertureText.trim() !== '' && shutterText.trim() !== '' && isoText.trim() !== '') {
        const files = Array.from(input.files);

        files.forEach(file => {
            const reader = new FileReader();

            reader.readAsDataURL(file);

            const imageDiv = document.createElement('div');
            imageDiv.className = 'uploaded-image-container';

            reader.onload = function () {
                const imageUrl = reader.result;
                const imgElement = document.createElement('img');
                imgElement.src = imageUrl;
                imgElement.alt = 'Uploaded Image';
                imgElement.className = 'uploaded-image';
                imageDiv.appendChild(imgElement);
            };

            const apertureElement = document.createElement('p');
            apertureElement.textContent = `Aperture: ${apertureText}`;
            imageDiv.appendChild(apertureElement);

            const shutterElement = document.createElement('p');
            shutterElement.textContent = `Shutter: ${shutterText}`;
            imageDiv.appendChild(shutterElement);

            const isoElement = document.createElement('p');
            isoElement.textContent = `ISO: ${isoText}`;
            imageDiv.appendChild(isoElement);

            imageContainer.appendChild(imageDiv);
        });

        input.value = '';
        document.getElementById('apertureText').value = '';
        document.getElementById('shutterText').value = '';
        document.getElementById('isoText').value = '';
    } else {
        alert('Please select an image and enter all text fields before submitting.');
    }
}
