let currency = "usd";
let forPage = "10";
let page = "1";

function refresh(){
    for (let i = 0;i < forPage; i++){
        const removeTbody = document.querySelector("tbody tr");
        removeTbody.remove();
    }   
    load();
}

let next = document.getElementById("nxtBtn");
    next.addEventListener("click" , nextPage);

    function nextPage() {  
        page++;
        refresh();
    };

let previous = document.getElementById("pvuBtn");
    previous.addEventListener("click" , previousPage);
    
    function previousPage() {     
        page--;       
        refresh();
    };

load();
function load() {
  async function getCrypto() {
    let response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${forPage}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
    );
    let data = await response.json();
    return data;
  }

  getCrypto().then((data) => {
    let size = Object.keys(data).length;
    
    for (let i = 0; i < size; i++) {
      let coin = data[i];
      let range = document.createRange();
      let currentPrice = coin.current_price;

      let price1h = coin.price_change_percentage_1h_in_currency.toFixed(1);
      let price24h = coin.price_change_percentage_24h_in_currency.toFixed(1);
      let price7d = coin.price_change_percentage_7d_in_currency.toFixed(1);

      if (price1h < -0) { style1 = "red" } else { style1 = "green" }
      if (price24h < -0) { style2 = "red" } else { style2 = "green" }
      if (price7d < -0) { style3 = "red" } else { style3 = "green" }

      const tableData = `
            <td>${coin.market_cap_rank}</td>
            <td><img src="${coin.image}"></img> ${coin.name}</td>
            <td>${currentPrice.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}</td>
            <td id="${style1}">${price1h}%</td>
            <td id="${style2}">${price24h}%</td>
            <td id="${style3}">${price7d}%</td>
            <td>${coin.total_volume.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}</td>
            <td>${coin.market_cap.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}</td>          
        `;

      range.selectNode(document.getElementsByTagName("tr").item(i));    
      const documentFragment = range.createContextualFragment(tableData);
      const tbody = document.querySelector("tbody");
            tbody.append(documentFragment);
    }
  });

    const checkPvu = document.querySelector("#pvu");
        if (page <= 1) {
            checkPvu.classList.add("disabled");
        } else {
            checkPvu.classList.remove("disabled");
        }

    const checkNxt = document.querySelector("#nxt");
        if (page >= 25) {
            checkNxt.classList.add("disabled");
        } else {
            checkNxt.classList.remove("disabled");
        }
}