// console.log("Hello World");

const myBookDivEl = document.getElementById("books");

async function getData() {
    const url = "http://127.0.0.1:3000/reviews/"; 
    myBookDivEl.innerHTML = "";                     // Rensa innehållet i div-elementet innan vi lägger till nya böcker
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // console.log(data);
        // return data;
             
        const sortedData = data.sort((a, b) => {
            const numA = a.title.match(/^\d+/);     // Hitta siffror i början av titeln
            const numB = b.title.match(/^\d+/);     // Hitta siffror i början av titeln
        
            if (numA && numB) {
                return parseInt(numA[0]) - parseInt(numB[0]);
            } else if (numA) {
                return -1;                          // Om bara `a.title` har siffror, placera den först
            } else if (numB) {
                return 1;                           // Om bara `b.title` har siffror, placera den först
            }
            
            return a.title.localeCompare(b.title, 'sv', { sensitivity: 'base' });
        });
        

        sortedData.forEach((book) => {
            const bookDiv = document.createElement("div");  // Skapa ett nytt div-element
            bookDiv.classList.add("booklist");              // Lägg till en klass för styling

            bookDiv.innerHTML = `
                <h2>${book.title}</h2>
                <p>Författare:<br><span>${book.author.join("<br>")}</span></p>
                <p>Recension:<br><span>${book.review}</span></p>
                <p>Rating: <span>${book.rating}</span></p>
            `;
        
            myBookDivEl.appendChild(bookDiv);               // Lägg till den skapade div i huvudcontainern
        });
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

getData();