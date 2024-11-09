function searchFunction() {
    const input = document.getElementById('searchBar').value.toLowerCase();
    const items = document.getElementById('itemsList').getElementsByTagName('li');

    for (let i = 0; i < items.length; i++) {
        let itemText = items[i].textContent || items[i].innerText;
        items[i].style.display = itemText.toLowerCase().includes(input) ? "" : "none";
    }
}