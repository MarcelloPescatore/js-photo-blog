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
      const objTitle = obj.title;
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

    /* 
    Milestone 2
    Facciamo sparire l’overlay con l’aiuto di una classe CSS che imposti il display: none .
    Dopodichè facciamo sì che cliccando una qualunque foto. L’overlay ricompaia.
    Cliccando invece il button di chiusura, l’overlay scompare nuovamente.
    
    Milestone 3
    Inseriamo il pezzo di logica finale: quando una foto viene cliccata, dobbiamo fare in modo che sia proprio quella foto a essere mostrata all’interno dell’overlay.
    */

    // set up
    const photoEls = document.querySelectorAll(".photo");
    console.log(photoEls);

    //elaboration
    photoEls.forEach((photoEl) => {
      photoEl.addEventListener("click", function () {
        const photoUrl = photoEl.style.backgroundImage;
        console.log(photoUrl.length);

        const imgPhotoClicked = document.querySelector(".image-zoomed");
        console.log(imgPhotoClicked);

        imgPhotoClicked.style.backgroundImage = `${photoUrl}`;
        //appare overlay
        const containerOverlayEl = document.querySelector(".container-overlay");
        containerOverlayEl.style.display = "block";
        //scompare overlay
        const buttonEl = document.querySelector("button");
        buttonEl.addEventListener("click", function () {
          containerOverlayEl.style.display = "none";
        });
      });
    });
  })
  .catch((error) => {
    console.log(error);
  });
