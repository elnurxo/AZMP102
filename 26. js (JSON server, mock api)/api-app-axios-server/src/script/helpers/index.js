const singersWrapper = document.querySelector(".singers-wrapper");

export function renderSingerCards(arr) {
  arr.innerHTML = "";
  arr.forEach((singer) => {
    singersWrapper.innerHTML += `
         <div class="column is-3">
            <div class="card">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img src="https://bulma.io/assets/images/placeholders/1280x960.png" alt="Placeholder image" />
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-4">${singer.stageName}</p>
                    <p class="subtitle is-6">${singer.realName}</p>
                  </div>
                </div>

                <div class="content">
                  <span>genre: ${singer.genre}s</span> <br>
                  <span>nationality: ${singer.nationality}</span>
                  <br>
                  <a role="button" href="detail.html?id=${singer.id}" class="button d-block mt-3 is-success">get info</a>
                </div>
              </div>
            </div>
          </div>
        `;
  });
}
