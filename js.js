let products = []; // Declare products array
        const divInfo = document.getElementById("container");
        const searchBar = document.getElementById('search-bar');
        const busqueda = searchBar.value.toLowerCase();
        const boton = document.getElementById("btn");
        const url = 'https://pokeapi.co/api/v2/pokemon/${}'  

        btn.addEventListener("click", function() {
            fetch(url) 
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json(); 
                })
                .then(data => {
                    console.log(data); 
                    if (data && data.results) {
                        products = data.results; 
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
                productContainer.className = 'product-container'; 
                productContainer.innerHTML = product.name; // Display Pokémon name
                divInfo.appendChild(productContainer);
        
                // Fetch Pokémon data
                fetch(product.url)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json(); // Convert the response to JSON
                    })
                    .then(data => {
                        console.log(data); // Log the response to see its structure

                        if(data && data.sprites){
                            const imagen = document.createElement('div');
                            imagen.innerHTML = '<img src="'+data.sprites.front_default +'"/>';
                            productContainer.appendChild(imagen);
                        }
                        
                        // Display base stats
                        if (data && data.stats) {
                            const statsLabel = document.createElement('div');
                            statsLabel.innerHTML = 'Base Stats:'; // Label for base stats
                            productContainer.appendChild(statsLabel);
        
                            data.stats.forEach(stat => {
                                const statContainer = document.createElement('div');
                                statContainer.innerHTML = `${stat.stat.name}: ${stat.base_stat}`; // Display stat name and value
                                productContainer.appendChild(statContainer);
                            });
                        }
        
                        // Display abilities
                        if (data && data.abilities) {
                            const abilitiesLabel = document.createElement('div');
                            abilitiesLabel.innerHTML = 'Abilities:'; // Label for abilities
                            productContainer.appendChild(abilitiesLabel);
        
                            data.abilities.forEach(ability => {
                                const abilityContainer = document.createElement('div');
                                abilityContainer.innerHTML = ability.ability.name; // Display ability name
                                productContainer.appendChild(abilityContainer);
        
                                // Fetch ability details
                                fetch(ability.ability.url)
                                    .then(response => {
                                        if (!response.ok) {
                                            throw new Error('Network response was not ok');
                                        }
                                        return response.json(); // Convert the response to JSON
                                    })
                                    .then(abilityData => {
                                        // Check if the ability data contains a description
                                        if (abilityData && abilityData.effect_entries) {
                                            const description = abilityData.effect_entries.find(entry => entry.language.name === 'en');
                                            const abilityDescription = document.createElement('div');
                                            abilityDescription.innerHTML = description ? description.effect : 'No description available.';
                                            abilityContainer.appendChild(abilityDescription); // Append description to abilityContainer
                                        }
                                    })
                                    .catch(error => {
                                        console.error('There was a problem with the fetch operation for ability:', error);
                                    });
                            });
                        }
                    })
                    .catch(error => {
                        console.error('There was a problem with the fetch operation for Pokémon:', error);
                    });
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