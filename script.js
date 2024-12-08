const inputBox = document.getElementById('inputBox');
const outputBox = document.getElementById('outputBox');
const copyButton = document.getElementById('copyKeywordList');
const createButton = document.getElementById('createKeywordList'); // Ensure this ID is on the "Create Keyword List" button

createButton.addEventListener('click', () => {
    const keywords = inputBox.value.split('\n');
    let matchType = '';

    // Check for selected match type
    if (document.getElementById('broadMatch').checked) {
        matchType = 'broad';
    } else if (document.getElementById('phraseMatch').checked) {
        matchType = 'phrase';
    } else if (document.getElementById('exactMatch').checked) {
        matchType = 'exact';
    } else if (document.getElementById('modifiedBroadMatch').checked) {
        matchType = 'modified';
    } else {
        alert('Please select a keyword match type');
        return;
    }

    const makeLowercase = document.getElementById('makeKeywordsLowercase').checked;

    const formattedKeywords = keywords.map(keyword => {
        keyword = keyword.trim();
        keyword = keyword.replace(/[\[\]"']/g, ''); 
        
        if (makeLowercase) {
            keyword = keyword.toLowerCase();
        }

        switch (matchType) {
            case 'broad':
                return keyword;
            case 'phrase':
                return `"${keyword}"`;
            case 'exact':
                return `[${keyword}]`;
            case 'modified':
                return keyword.split(' ').map(word => `+${word}`).join(' ');
            default:
                return keyword; 
        }
    });

    outputBox.value = formattedKeywords.join('\n');
});

// Copy to clipboard
copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(outputBox.value)
        .then(() => {
            alert('Keywords have been copied to your clipboard!');
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
        });
});