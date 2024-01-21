// Seleziona l'elemento con classe 'container'
document.addEventListener('DOMContentLoaded', function () {
    const containerEl = document.querySelector('.container');

// Seleziona l'elemento con ID 'searchBar'
const formEl = document.querySelector('#searchBar');

// Seleziona l'elemento con classe 'pokemonList'
const dropEl = document.querySelector('.pokemonList');

// Seleziona l'elemento con ID 'selectedPokemonList'
const selectedPokemonListEl = document.querySelector('#selectedPokemonList');

// Funzione che gestisce gli eventi del form
const formHandler = (e) => {
    // Effettua una richiesta fetch per ottenere il contenuto del file "pokemon.json"
    fetch('/pokemon.json')
      .then(response => response.json())
      .then(data => {
        // Estrae i nomi dei Pokémon dal risultato della richiesta
        const results = data.results;
        const names = results.map(pokemon => pokemon.name);

        // Ottiene l'input dell'utente e lo converte in minuscolo
        const userInput = e.target.value.toLowerCase();

        // Se l'input è vuoto, resetta la lista e nasconde la dropdown
        if(userInput.length === 0) {
            dropEl.style.height = 0;
            return dropEl.innerHTML = '';              
        }

        // Filtra i nomi dei Pokémon in base all'input dell'utente
        const filteredWords = names.filter(word => word.toLowerCase().includes(userInput)).sort().splice(0, 5);
        
        // Resetta la lista nella dropdown
        dropEl.innerHTML = '';

        // Aggiunge elementi alla dropdown per i risultati filtrati
        filteredWords.forEach(item => {
            const listEl = document.createElement('li');
            listEl.textContent = item;
            console.log(item);
            // Aggiunge una classe 'match' se l'elemento corrisponde esattamente all'input
            if(item === userInput && userInput.length > 0) 
                listEl.classList.add('match');

            // Aggiunge un listener per l'evento 'click' a ciascun elemento nella dropdown
            listEl.addEventListener('click', () => selectPokemon(item));

            // Aggiunge l'elemento alla dropdown
            dropEl.appendChild(listEl);
        });

        // Se la dropdown è vuota, nasconde la dropdown
        if(dropEl.children[0] === undefined) {
            return dropEl.style.height = 0;
        }

        // Calcola l'altezza totale della dropdown in base al numero di elementi
        let totalChildrenHeight = dropEl.children[0].offsetHeight * filteredWords.length;
        dropEl.style.height = totalChildrenHeight + 'px';

      })
      .catch(error => console.error('Errore durante il recupero del file JSON:', error));
}

// Funzione per selezionare un Pokémon e aggiungerlo alla lista dei Pokémon selezionati
const selectPokemon = (pokemon) => {
    // Aggiunge il Pokémon alla lista dei selezionati
    const listItem = document.createElement('h3');
    listItem.textContent = pokemon;
    console.log(listItem)
    document.getElementById('selectedPokemonList').appendChild(listItem); // Modifica questa riga
    
    console.log("Pokemon scelto: "+pokemon);
    

    // Pulisce la dropdown e nasconde la dropdown
    dropEl.innerHTML = '';
    formEl.value = '';
    dropEl.style.height = 0;
}

// Aggiunge un listener per l'evento 'input' al form
formEl.addEventListener('input', formHandler);

});



