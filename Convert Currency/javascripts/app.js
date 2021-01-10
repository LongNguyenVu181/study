var convertCurrency = document.querySelector(".convertCurrency");
var layout = document.createElement("form");
layout.className = "form-inline";
var loader = document.createElement("div");
loader.className = "loader";

convertCurrency.appendChild(loader);

getData = async () => {
  try {
    const response = await fetch(
      "http://data.fixer.io/api/latest?access_key=88a05af2429bb04eab46649be838ebea&format=1"
    );
    const data = await response.json();
    if (data.success) {
      loader.remove();

      var input = document.createElement("input");
      input.type = "number";
      input.className = "form-control";
      input.placeholder = "Input number"
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
      result.placeholder = "Result"

      for (const [key, value] of Object.entries(data.rates)) {
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
      });

      submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        if (!input.value) return;
        var rate1 = data.rates[select1.value];
        var rate2 = data.rates[select2.value];
        result.value = (input.value / rate1) * rate2;
      });
      convertCurrency.appendChild(layout);
      layout.appendChild(input);
      layout.appendChild(select1);
      layout.appendChild(switchButton);
      layout.appendChild(select2);
      layout.appendChild(submitButton);
      layout.appendChild(result);
    }
    else {
      alert("Fail to Fetch")
    }
  } catch (err) {
    alert(err);
  }
};

getData();
