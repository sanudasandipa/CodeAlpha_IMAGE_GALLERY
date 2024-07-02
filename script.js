document.addEventListener('DOMContentLoaded', function() {
    const filterItem = document.querySelector('.items');
    const filterImg = document.querySelectorAll('.gallery .image');
    
    filterItem.onclick = (selectedItem) => {
        if (selectedItem.target.classList.contains('item')) {
            filterItem.querySelector('.active').classList.remove('active');
            selectedItem.target.classList.add('active');
            let filterName = selectedItem.target.getAttribute('data-name');
            filterImg.forEach((image) => {
                let filterImges = image.getAttribute('data-name');
                if (filterImges === filterName || filterName === 'all') {
                    image.classList.remove('hide');
                    image.classList.add('show');
                } else {
                    image.classList.add('hide');
                    image.classList.remove('show');
                }
            });
        }
    };

    filterImg.forEach(image => {
        image.setAttribute('onclick', 'preview(this)');
    });
});

const previewBox = document.querySelector('.preview-box'),
      categoryName = previewBox.querySelector('.title p'),
      previewImg = previewBox.querySelector('img'),
      closeIcon = previewBox.querySelector('.icon'),
      shadow = document.querySelector('.shadow');

function preview(element) {
    document.querySelector('body').style.overflow = 'hidden';
    let selectedPrevImg = element.querySelector('img').src;
    let selectedImgCategory = element.getAttribute('data-name');
    previewImg.src = selectedPrevImg;
    categoryName.textContent = selectedImgCategory;
    previewBox.classList.add('show');
    shadow.classList.add('show');
    closeIcon.onclick = () => {
        previewBox.classList.remove('show');
        shadow.classList.remove('show');
        document.querySelector('body').style.overflow = 'auto';
    };
}

function downloadImage() {
    // Get the source of the preview image
    let imgSrc = previewImg.src;

    // Create a temporary link element
    let downloadLink = document.createElement('a');
    downloadLink.href = imgSrc;
    downloadLink.download = 'image.jpg'; // Set a default file name for download

    // Append the link to the body
    document.body.appendChild(downloadLink);

    // Trigger a click event on the link to start download
    downloadLink.click();

    // Remove the link from the body
    document.body.removeChild(downloadLink);
}
