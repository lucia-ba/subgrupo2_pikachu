let products = []; // Declare products array
        const divInfo = document.getElementById("container");
        const searchBar = document.getElementById('search-bar');

        document.addEventListener("DOMContentLoaded", function() {
            fetch("https://pokeapi.co/api/v2/pokemon") // Fetch with a limit to get a manageable number of Pokémon
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json(); // Convert the response to JSON
                })
                .then(data => {
                    console.log(data); // Log the response to see its structure
                    if (data && data.results) {
                        products = data.results; // Save products globally
                        
                    }
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
                searchBar.addEventListener('input', (event) => {
                    const query = event.target.value;
                    filterProducts(query);
                });
        });

        function renderProducts(productsToRender) {
            divInfo.innerHTML = ''; // Clear the container
            productsToRender.forEach((product) => {
                // Create a container div for each product
                const productContainer = document.createElement('div');
                productContainer.className = 'product-container'; // Add class
                productContainer.innerHTML = product.name; // Display Pokémon name
                divInfo.appendChild(productContainer);
            });
        }

        

        function filterProducts(query) {
            const lowerCaseQuery = query.toLowerCase();
            
            // Check if the query is empty
            if (lowerCaseQuery === '') {
                renderProducts([]); // Render nothing if the search bar is empty
                return;
            }
        
            const filteredProducts = products.filter(product =>
                product.name.toLowerCase().includes(lowerCaseQuery)
            );
            renderProducts(filteredProducts);
        }