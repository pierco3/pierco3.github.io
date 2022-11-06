/* jshint esversion: 8 */
/* jshint browser: true */
/* jshint node: true */
'use strict';

var languages = ['en', 'es', 'de'];
var categories = ['all', 'neutral', 'chuck'];

function populateSelectorOptions(selectId, optionList) {
    let sel = document.getElementById(selectId);

    for (let o of optionList) {
        let newOption = document.createElement("option");
        newOption.innerHTML = o;
        sel.appendChild(newOption);
    }
}

async function get_user_jokes() {
    let language = document.getElementById('language-select').value;
    let category = document.getElementById('category-select').value;
    let number = document.getElementById('joke-number').value;
    var id;
    var retrieved_jokes;

    if (document.getElementById('joke-id')) {
        id = document.getElementById('joke-id').value;
    }

    let jokes_col = document.getElementById('jokes-col');
    jokes_col.innerHTML = "";

    if (language == "es" && category == "chuck") {
        jokes_col.innerHTML = "No kidding!";
        jokes_col.setAttribute("style", "margin-top: 25%; font-size: 20px;");
    } 
    else {

        jokes_col.setAttribute("style", "");

        if (id) {
            console.log(id);
            retrieved_jokes = await fetch(`https://cp-inpro-pyjokesapi.herokuapp.com/api/v1/jokes?language=${language}&category=${category}&id=${id}`)
                .then(response => response.json())
                .catch(error => console.log(error));
            number = 1;
        } else {
            retrieved_jokes = await fetch(`https://cp-inpro-pyjokesapi.herokuapp.com/api/v1/jokes?language=${language}&category=${category}&number=${number}`)
                .then(response => response.json())
                .catch(error => console.log(error));
        }

        for (let j = 0; j < number; ++j) {
            let retrieved_joke_div = document.createElement("div");
            retrieved_joke_div.innerHTML = retrieved_jokes[j];
            retrieved_joke_div.setAttribute("style", "margin-top: 20px;");
            jokes_col.appendChild(retrieved_joke_div);
        }
    }

}

window.onload = function () {
    populateSelectorOptions("language-select", languages);
    populateSelectorOptions("category-select", categories);
};