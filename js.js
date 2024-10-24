let products = []; // Declare products array
        const divInfo = document.getElementById("container");
        const searchBar = document.getElementById('search-bar');
        const busqueda = searchBar.value.toLowerCase();
        const boton = document.getElementById('btn');

        btn.addEventListener("click", function() {
            const busqueda = searchBar.value.toLowerCase(); // Obtener el valor del input
            fetch("https://pokeapi.co/api/v2/pokemon/" + busqueda) // Fetch para un Pokémon específico
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json(); // Convertir la respuesta a JSON
                })
                .then(data => {
                    console.log(data); // Loguear la respuesta para ver su estructura
                    if (data) {
                        products.push(data); // Guardar el Pokémon encontrado
                        renderProducts(); // Llamar a la función para mostrar los Pokémon
                    }
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        });

        function renderProducts(productsToRender) {
            divInfo.innerHTML = ''; // Clear the container
                // Create a container div for each product
                const productContainer = document.createElement('div');
                productContainer.className = 'product-container'; // Add class
                productContainer.innerHTML = product.name; // Display Pokémon name
                divInfo.appendChild(productContainer);
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