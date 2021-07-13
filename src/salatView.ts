import {
  combineLatest,
  fromEvent,
  Observable,
} from "../node_modules/rxjs/index";
import {
  debounceTime,
  filter,
  map,
  switchMap,
} from "../node_modules/rxjs/operators/index";
import { Fruits } from "./fruits";
import {
  getFruitObservableByName,
  getTopingObservableByName,
} from "./getMethods";
import { refreshPage } from "./overView";
import { Topings } from "./topings";

const containerFruits = document.getElementById("fruit-view");
const containerTopings = document.getElementById("toping-view");

export function drawSalat() {
  const voce = createFruitSearchBox();
  voce.subscribe((fruit: Fruits) => console.log(fruit));
  const prilog = createTopingSearchBox();
  prilog.subscribe((toping: Topings) => console.log(toping));

  showOrder(voce, prilog);
}

function orderBill(hrana: number, prilog: number) {
  let price = hrana + prilog;
  alert(`Vas racun je: ` + price + ` dinara`);
  refreshPage();
}

function createFruitSearchBox() {
  var fruitLbl = document.createElement("label");
  fruitLbl.innerHTML = "Fruit:";
  containerFruits.appendChild(fruitLbl);
  const input = document.createElement("input");
  containerFruits.appendChild(input);
  return fromEvent(input, "input").pipe(
    debounceTime(500),
    map((ev: InputEvent) => (<HTMLInputElement>ev.target).value),
    filter((text) => text.length >= 2),
    switchMap((text) => getFruitObservableByName(text)),
    map((text) => text[0])
  );
}

function createTopingSearchBox() {
  var topingLbl = document.createElement("label");
  topingLbl.innerHTML = "Toping:";
  containerTopings.appendChild(topingLbl);
  const input = document.createElement("input");
  containerTopings.appendChild(input);
  return fromEvent(input, "input").pipe(
    debounceTime(500),
    map((ev: InputEvent) => (<HTMLInputElement>ev.target).value),
    filter((text) => text.length >= 2),
    switchMap((text) => getTopingObservableByName(text)),
    map((text) => text[0])
  );
}

function showOrder(voce: Observable<Fruits>, prilog: Observable<Topings>) {
  combineLatest([voce, prilog])
    .pipe(
      map(([voce, prilog]) => [voce, prilog]),
      filter(([voce, prilog]) => voce !== undefined),
      filter(([voce, prilog]) => prilog !== undefined)
    )
    .subscribe((x) => orderBill(x[0].price, x[1].price));
}
