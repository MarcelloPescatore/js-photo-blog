/* console.log('test'); */

/* Milestone 3
Inseriamo un foglio JavaScript ed effettuiamo una chiamata AJAX all’API di JSON Placeholder, sfruttando la risposta per generare dinamicamente in pagina una serie di foto! */

//set up
const rowPostEl = document.getElementById("row_posts");


//elaboration
//effettuo una chiamata AJAX
axios
.get("https://jsonplaceholder.typicode.com/photos?_limit=6")
.then((response) => {
  // creo una variabile con all'interno la risposta dell'array del'endpoint
  const responseArr = response.data;
  
  //creo ua variabile in cui inserire tutto il template licteral
  let markup = "";
    // itero all'interno dgli oggetti della risposta
    responseArr.forEach((obj) => {
      //seleziono l'url dall'oggetto
      const objUrl = obj.url;
      const objTitle = obj.title
      // aggiungo ogni volta alla variabile markup un template con url diverso
      markup += `
                    <div class="card col-4">
                        <div class="pin">
                            <img src="./assets/img/pin.svg" alt="" />
                        </div>
                        <div id="loader" style="display: block;">Caricamento in corso...</div>
                        <div class="photo" style="background-image: url(${objUrl});">
                        </div>
                        <div class="title">
                            <p>${objTitle}</p>
                        </div>
                    </div> 
            `;
    });

    // inserisco il markup nella dom
    rowPostEl.innerHTML = markup;

    // verifichiamo l'array di risposta in console
    console.log(responseArr);
  })
  .catch((error) => {
    console.log(error);
  });
