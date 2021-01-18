// Create a class for the element
class ConvertCurrency extends HTMLElement {
  static get observedAttributes() {
    return ["data"];
  }

  constructor() {
    // Always call super first in constructor
    super();
    this.loader = document.createElement("div");
    this.loader.className = "loader";
    const shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    shadow.appendChild(style);
    shadow.appendChild(this.loader);
  }

  connectedCallback() {
    let data = this.getAttribute('data');
    console.log("Custom square element added to page.");
    updateStyle(this);
    if(data){
      this.updateData(data);
    }
  }

  disconnectedCallback() {
    console.log("Custom square element removed from page.");
  }

  adoptedCallback() {
    console.log("Custom square element moved to new page.");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log("Custom square element attributes changed.");
    updateStyle(this);
  }

  updateData = (data) => {
    this.shadowRoot.innerHTML = `<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        `;

    var layout = document.createElement("form");
    layout.className = "form-inline";

    var input = document.createElement("input");
    input.type = "number";
    input.className = "form-control";
    input.placeholder = "Input number";
    input.min = 0;
    var switchButton = document.createElement("button");
    switchButton.textContent = "<=>";
    switchButton.className = "btn btn-danger";

    var submitButton = document.createElement("button");
    submitButton.textContent = "=>";
    submitButton.className = "btn btn-danger";

    var select1 = document.createElement("select");
    select1.className = "form-control col-md-1";

    var select2 = document.createElement("select");
    select2.className = "form-control col-md-1";

    var result = document.createElement("input");
    result.readOnly = "true";
    result.className = "form-control";
    result.placeholder = "Result";

    for (const [key, value] of Object.entries(data)) {
      var option1 = document.createElement("option");
      var option2 = document.createElement("option");
      option1.value = key;
      option1.text = key;
      option2.value = key;
      option2.text = key;
      select1.appendChild(option1);
      select2.appendChild(option2);
    }

    switchButton.addEventListener("click", (event) => {
      event.preventDefault();
      var temp = select1.value;
      select1.value = select2.value;
      select2.value = temp;

      temp = input.value;
      input.value = result.value;
      result.value = temp;
    });

    submitButton.addEventListener("click", (event) => {
      event.preventDefault();
      if (!input.value) return;
      var rate1 = data[select1.value];
      var rate2 = data[select2.value];
      result.value = (input.value / rate1) * rate2;
    });

    this.loader.remove();

    this.shadowRoot.appendChild(layout);
    layout.appendChild(input);
    layout.appendChild(select1);
    layout.appendChild(switchButton);
    layout.appendChild(select2);
    layout.appendChild(submitButton);
    layout.appendChild(result);
  };
}

customElements.define("convert-currency", ConvertCurrency);

function updateStyle(elem) {
  const shadow = elem.shadowRoot;
  shadow.querySelector("style").textContent = `
      .loader {
        margin-left: 250px;
        border: 16px solid #f3f3f3; /* Light grey */
        border-top: 16px solid #3498db; /* Blue */
        border-radius: 50%;
        width: 150px;
        height: 150px;
        animation: spin 2s linear infinite;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      } 
    `;
}
