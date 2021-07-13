import { from, fromEvent, Observable } from "../node_modules/rxjs/index";
import { Smoothies } from "./smoothies";
import { Fruits } from "./fruits";

const API_URL = "http://localhost:3000";

export function getSmoothieObservableByName(
  name: string
): Observable<Smoothies[]> {
  return from(
    fetch(`${API_URL}/smoothies/?name=${name}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Greska");
        } else {
          return response.json();
        }
      })
      .catch((err) => console.log("Error" + err))
  );
}

export function getSmoothieObservableByFruit(
  fruit: string
): Observable<Smoothies[]> {
  return from(
    fetch(`${API_URL}/smoothies/?ingredients=${fruit}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Smoothie not found!");
        }
      })
      .catch((err) => console.log("Error" + err))
  );
}

export function getFruitObservableByName(fruit: string): Observable<Fruits[]> {
  return from(
    fetch(`${API_URL}/fruits/?name=${fruit}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Greska");
        } else {
          return response.json();
        }
      })
      .catch((err) => console.log("Error" + err))
  );
}

export function getTopingObservableByName(
  toping: string
): Observable<Fruits[]> {
  return from(
    fetch(`${API_URL}/topings/?name=${toping}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Toping not found!");
        }
      })
      .catch((err) => console.log("Error" + err))
  );
}
