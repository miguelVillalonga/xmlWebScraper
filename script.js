document.getElementById('load-btn').addEventListener('click', function() {
    const url = document.getElementById('url-input').value;
    const iframe = document.getElementById('webpage-frame');
    iframe.src = url;

    fetch('https://api.allorigins.win/get?url=' + encodeURIComponent(url))
        .then(response => response.json())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data.contents, 'text/html');
            const textContent = doc.body.textContent;
            
            const xmlDocument = document.implementation.createDocument('', '', null);
            const root = xmlDocument.createElement('root');
            const textNode = xmlDocument.createElement('text');
            textNode.textContent = textContent;
            root.appendChild(textNode);
            xmlDocument.appendChild(root);

            const serializer = new XMLSerializer();
            const xmlString = serializer.serializeToString(xmlDocument);

            document.getElementById('info-output').textContent = xmlString;
        })
        .catch(error => {
            console.error('Error fetching the webpage:', error);
        });
});
