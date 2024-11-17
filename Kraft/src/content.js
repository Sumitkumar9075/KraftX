// content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'getName') {
        const nameElement = document.querySelector('.text-heading-xlarge');
        const name = nameElement ? nameElement.textContent.trim() : '';

        // Updated selector to target the image with the class you provided
        const imageElement = document.querySelector('.evi-image.lazy-image.ember-view.org-top-card-primary-content__logo');
        const imageUrl = imageElement ? imageElement.src : '';

        // Alert to check if the image URL is captured
        if (imageUrl) {
           console.log("image is there");
           
        } else {
            alert('No image URL found');
        }

        sendResponse({ name: name, imageUrl: imageUrl });
    }
});
