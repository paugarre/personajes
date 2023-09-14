const result = document.querySelector('.result');
const form = document.querySelector('.get-character');
const characterInput = document.querySelector('#character');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (characterInput.value === '') {
        showError('El campo de búsqueda es obligatorio...');
        return;
    }

    callAPI(characterInput.value);
})

function callAPI(characterName){
    const apiUrl = `https://rickandmortyapi.com/api/character/?name=${characterName}`;
   
    fetch(apiUrl)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data.error) {
                showError('Personaje no encontrado...');
            } else {
                clearHTML();
                showCharacters(data.results);
            }
        })
        .catch(error => {
            console.log(error);
        })
}

function clearHTML() {
    result.innerHTML = '';
}

function showCharacters(characters) {
    characters.forEach(character => {
        const characterCard = document.createElement('div');
        characterCard.classList.add('character-card');
        characterCard.innerHTML = `
            <h2>${character.name}</h2>
            <p>Especie: ${character.species}</p>
            <p>Género: ${character.gender}</p>
            <p>Origen: ${character.origin.name}</p>
            <img src="${character.image}" alt="${character.name}">
        `;
        result.appendChild(characterCard);
    });
}

function showError(message) {
    clearHTML();
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('error');
    errorDiv.textContent = message;
    result.appendChild(errorDiv);
}
