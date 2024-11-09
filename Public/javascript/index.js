document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".card");
    const searchBar = document.getElementById("searchbar");

    // Function to filter cards based on search query
    function filterCards() {
        const query = searchBar.value.toLowerCase(); // Get the search query and convert to lowercase
        cards.forEach(card => {
            const title = card.querySelector("h3").textContent.toLowerCase(); // Get the text of the title in lowercase
            if (title.includes(query)) {
                card.style.display = "block"; // Show card if it matches the query
            } else {
                card.style.display = "none"; // Hide card if it doesn't match the query
            }
        });
    }

    // Add event listener to search bar to trigger filtering on input
    searchBar.addEventListener("input", filterCards);

    // Existing functionality to navigate to the algorithm page on card click
    cards.forEach(card => {
        card.addEventListener("click", function () {
            const url = card.getAttribute("data-url");
            window.location.href = url;
        });
    });
});
