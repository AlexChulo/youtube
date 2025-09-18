/*--------------------------------------------------------------
>>> FUNCTIONS:
/*--------------------------------------------------------------
# GET URL PARAMETER
--------------------------------------------------------------*/

extension.functions.getUrlParameter = function (url, parameter) {
	var match = url.match(new RegExp('(\\?|\\&)' + parameter + '=[^&]+'));
	if (match) {return match[0].substr(3);}
};
extension.functions.getUrlParameter = function (url, parameter) {
	var match = url.match(new RegExp('(\\?|\\&)' + parameter + '=[^&]+'));
	if (match) {return match[0].substr(3);}
};

/*--------------------------------------------------------------
# REFRESH YOUTUBE CATEGORIES
--------------------------------------------------------------*/
console.log('Content script loaded!', window.location.href);

// Remove any existing listeners first (in case of reload)
if (window.improvedTubeListenerAdded) {
    console.log('Listener already exists, skipping...');
} else if (chrome && chrome.runtime) {
    console.log('Chrome runtime available, setting up listener...');
    
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        console.log('Message received:', request);
        if (request.action === 'refresh-youtube-categories') {
            console.log('Processing refresh request...');
            
            const chipContainer = document.querySelector('ytd-feed-filter-chip-bar-renderer');
            if (chipContainer) {
                chipContainer.style.display = 'none';
                setTimeout(() => {
                    chipContainer.style.display = '';
                    console.log('Chips refreshed!');
                    sendResponse({success: true});
                }, 100);
            } else {
                sendResponse({success: false, error: 'No chip container found'});
            }
            return true;
        }
    });
    
    // Mark that we've added the listener
    window.improvedTubeListenerAdded = true;
    console.log('Message listener set up successfully');
} else {
    console.log('Chrome runtime NOT available');
}