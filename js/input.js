document.getElementById("newBookForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // Hindrar att formuläret skickas på vanligt sätt

    // Hämta värden från input-fälten
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const rating = document.getElementById("rating").value;
    const review = document.getElementById("review").value;

    // Skapa objektet att skicka till API
    const newBook = {
        title: title,
        author: author.split(",").map(a => a.trim()), // Om flera författare anges, dela upp dem
        rating: rating, 
        review: review
    };

    console.log("Data som skickas:", newBook);

    try {
        const response = await fetch("http://127.0.0.1:3000/reviews/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newBook)
        });
    
        console.log("Serverstatus:", response.status);
        console.log("Serverresponse:", await response.text());
    
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        alert("Boken har lagts till!");
        document.querySelector("form").reset();
        window.location.href = "index.html";
    
    } catch (error) {
        console.error("Fel vid postning:", error);
        alert("Något gick fel, försök igen.");
    }
    
});
