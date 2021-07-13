import {
    debounceTime,
    filter,
    map,
    switchMap,
  } from "../node_modules/rxjs/operators/index";
import {fromEvent} from "../node_modules/rxjs/index";
import {Smoothies} from "./smoothies";
import {getSmoothieObservableByName} from "./getMethods";
import {refreshPage} from "./overView";

const container = document.getElementById("smoothies-view");
export function drawSmoothie(){
  createLabelForSmoothieSearchBox();
  const smoothie = createSmoothieSearchBox().subscribe((smooth:Smoothies) => showSmoothies(smooth));
}

function createLabelForSmoothieSearchBox(){
  var smoothieLabel = document.createElement('label');
  smoothieLabel.className="smooth-lbl";
  smoothieLabel.innerHTML = "Smoothie name:";    
  container.appendChild(smoothieLabel);
}

function createSmoothieSearchBox() {
  const input = document.createElement("input");
  container.appendChild(input);

  return fromEvent(input, "input")
    .pipe(
      debounceTime(500),
      map((ev:InputEvent) => (<HTMLInputElement>ev.target).value),
      filter((text) => text.length >= 2),
      switchMap( text => getSmoothieObservableByName(text)),
      map(text => text[0])
    );
}
  
const smoothieContainer = document.createElement("div");
function showSmoothies(smoothie: Smoothies){
  if(! smoothie) return;

  smoothieContainer.className="smoothieContainer";
  container.appendChild(smoothieContainer);
  smoothieContainer.innerHTML = `${smoothie.name} Smoothie &nbsp;&nbsp; ${smoothie.price} din <br/> <i class="ingreditents"> ${smoothie.ingredients} </i>`;

  let price = `${smoothie.price}`
  createButtonForOrdering(price);
  }
 
let orderBtn = document.createElement("button");
function createButtonForOrdering(price:string){
  orderBtn.innerHTML = "Order";
  orderBtn.className="orderBtn";
  orderBtn.id = "btn";
  orderBtn.addEventListener("click", function () {
    alert(`Narucili ste pice!\nVas racun je ` + price + ` dinara`);
    refreshPage();
  });
  container.appendChild(orderBtn);
}