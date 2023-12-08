import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Translate = () => {
    const [rawText, setRawText] = useState('');
    const [htmlText, setHtmlText] = useState('');
    const [postData, setPostData] = useState({
        query: 'Hello'
        // Lägg till dina parametrar här
    });

    const handlePostRequest = () => {
        console.log("Postdata:" + postData.data);

        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:8080/api/searchChatGPT', postData);

                const textData = response.data; // Justera detta beroende på API-svaret
                console.log("textData:" + textData)
                setRawText(textData);
                setHtmlText(textData); // Du kan behöva göra någon konvertering här beroende på API-svaret
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }

    const handleTextareaChange = (event) => {
        // Uppdatera state när textareans värde ändras
        setPostData({ query: event.target.value });
    };

    return (
        <div>
            <div>
                  <textarea
                      value={postData.query}
                      onChange={handleTextareaChange}
                      placeholder="Skriv indata här"
                      rows={10}
                      cols={180}
                  />
                <br />
                <button onClick={handlePostRequest}>Gör POST-anrop</button>
            </div>
            <div>
                <h3>Rå text</h3>
                <p>{rawText}</p>
            </div>
            <div>
                <h3>HTML</h3>
                <div dangerouslySetInnerHTML={{ __html: htmlText }} />
            </div>
        </div>
    );
};

export default Translate;