let square;
square = document.getElementsByTagName("convert-currency");
console.log(square);

getData = async () => {
    try {
      const response = await fetch(
        "http://data.fixer.io/api/latest?access_key=88a05af2429bb04eab46649be838ebea&format=1"
      );
      const data = await response.json();
      if (data.success) {    
          for(var i = 0;i< square.length ;i++){
            square[i].updateData(data.rates);
          } 
          
      }
      else {
        alert("Fail to Fetch Data from Fixer")
      }
    } catch (err) {
      alert(err);
    }
};

getData();