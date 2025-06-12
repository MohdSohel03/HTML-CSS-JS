async function testOpenAI() {
    const key = document.getElementById('apiKey').value.trim();
    const userMessage = document.getElementById('userInput').value.trim();
    const responseBox = document.getElementById('response');

    if (!key || !userMessage) {
        alert("Please enter both your API key and a message.");
        return;
    }

    responseBox.textContent = "Loading";
    responseBox.classList.add("loading");

    try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${key}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: userMessage }]
            })
        });

        const data = await res.json();
        responseBox.classList.remove("loading");

        if (res.ok) {
            const reply = data.choices[0].message.content;
            responseBox.textContent = reply;
        } else {
            responseBox.textContent = `❌ Error: ${data.error?.message || res.status}`;
        }

    } catch (err) {
        responseBox.classList.remove("loading");
        responseBox.textContent = `❌ Failed to fetch: ${err.message}`;
    }
}