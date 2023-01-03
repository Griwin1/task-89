import { data } from "autoprefixer";
import EventEmitter from "eventemitter3";
import image from "../images/planet.svg";

export default class Application extends EventEmitter {
  static get events() {
    return {
      READY: "ready",
    };
  }

  progress = document.createElement('progress');

  constructor() {
    super();
    this.emit(Application.events.READY);
  };
  async _load() {

    this._startLoading();

    const responsesJSON = await Promise.all([
      fetch('https://swapi.boom.dev/api/planets'),
      fetch('https://swapi.boom.dev/api/planets?page=2'),
      fetch('https://swapi.boom.dev/api/planets?page=3'),
      fetch('https://swapi.boom.dev/api/planets?page=4'),
      fetch('https://swapi.boom.dev/api/planets?page=5'),
      fetch('https://swapi.boom.dev/api/planets?page=6'),
    ]);
    const allPlanets = await Promise.all(responsesJSON.map(r => r.json()));
    allPlanets.forEach((data) => {
      const planetsData = data.results
      planetsData.forEach(planet => {

        this._create(planet.name, planet.terrain, planet.population)
      });
    })
    setTimeout (()=>{
      this._stopLoading();
    }, 1500);
  };

    
    
  _create(name, terrain, population) {
    const box = document.createElement("div");
    box.classList.add("box");
    box.innerHTML = this._render({
      name: name,
      terrain: terrain,
      population: population,
    });
    document.body.querySelector(".main").appendChild(box);
  }

  _startLoading() {

    this.progress.classList.add('progress');
    this.progress.classList.add('is-small');
    this.progress.classList.add('is-primary');
    this.progress.setAttribute('max', 100);
    document.body.querySelector('.main').appendChild(this.progress);

  }
  _stopLoading() {
    this.progress.remove()
  }


  _render({ name, terrain, population }) {
    return `
<article class="media">
  <div class="media-left">
    <figure class="image is-64x64">
      <img src="${image}" alt="planet">
    </figure>
  </div>
  <div class="media-content">
    <div class="content">
    <h4>${name}</h4>
      <p>
        <span class="tag">${terrain}</span> <span class="tag">${population}</span>
        <br>
      </p>
    </div>
  </div>
</article>
    `;
  }
}
