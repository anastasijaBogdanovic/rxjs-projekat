import {
  concat,
  from,
  merge,
  zip,
} from "../node_modules/rxjs/index";
import { refreshPage } from "./overView";

const container = document.getElementById("iceCream-view");
const iceCreamInGlass = from(["vanila", "jagoda", "banana"]);

const icCreamOnTap = from(["plazma", "cokolada"]);

export function createIceCreamView() {
  createLabel();
  merge(iceCreamInGlass, icCreamOnTap).subscribe((x) =>
    iceCreamRadioButtons(x)
  );
  createButtonForOrdering();
}

function iceCreamRadioButtons(ice: string) {
  let divRb = document.createElement("div");
  let option = document.createElement("input");
  option.type = "radio";
  option.name = "group";
  option.value = ice;

  let lblIceCream = document.createElement("label");
  lblIceCream.innerHTML = ice;

  divRb.appendChild(option);
  divRb.appendChild(lblIceCream);
  container.appendChild(divRb);
  container.appendChild(divRb);
}

function createLabel() {
  let lblRecept = document.createElement("label");
  lblRecept.innerHTML = `Ice-creams:`;
  container.appendChild(lblRecept);
}

function createButtonForOrdering() {
  let orderBtn = document.createElement("button");
  orderBtn.innerHTML = "Order";
  orderBtn.className = "orderBtn2";

  orderBtn.addEventListener("click", function () {
    alert(`Narucili ste slaladoled!\nVas racun je 150 dinara`);
    refreshPage();
  });
  container.appendChild(orderBtn);
}

function displayOrderButton() {
  var checkRadio = container.querySelector('input[name="group"]:checked');
  if (checkRadio != null) createButtonForOrdering();
}
