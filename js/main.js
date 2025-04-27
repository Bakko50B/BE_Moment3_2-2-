console.log("Hello World");

const myBookDivEl = document.getElementById("books");

async function getData() {
    const url = "http://127.0.0.1:3000/reviews/"; // Replace with your actual API endpoint
    myBookDivEl.innerHTML = ""; // Clear previous content

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // console.log(data);
        // return data;
        const sortedData = data.sort((a, b) => a.title.localeCompare(b.title));


        sortedData.forEach((book) => {
            const bookDiv = document.createElement("div"); // Skapa ett nytt div-element
            bookDiv.classList.add("booklist"); // Lägg till en klass för styling

            bookDiv.innerHTML = `
                <h2>${book.title}</h2>
                <p>Författare:<br><span>${book.author.join("<br>")}</span></p>
                <p>Recension:<br><span>${book.review}</span></p>
                <p>Rating: <span>${book.rating}</span></p>
            `;
        
            myBookDivEl.appendChild(bookDiv); // Lägg till den skapade div i huvudcontainern
        });
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

getData();