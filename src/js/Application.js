import EventEmitter from "eventemitter3";
import image from "../images/planet.svg";

export default class Application extends EventEmitter {
  static get events() {
    return {
      READY: "ready",
    };
  }

  constructor() {
    super();
    this.emit(Application.events.READY);
  };
  async _load() {
    this._startLoading();
    const res = await fetch('https://swapi.boom.dev/api/planets');
    const data = await res.json();
    const planetsData = data.results
    setTimeout(() => {
      this._stopLoading();
      planetsData.forEach(planet => {
        this._create(planet.name, planet.terrain, planet.population)
      });
    }, 1500)


  }
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
    document.getElementById("progress").style.visibility = "visible"

  }
  _stopLoading() {
    document.getElementById("progress").style.visibility = "hidden"
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
