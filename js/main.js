let currency = "usd";
let forPage = "10";

async function getCrypto() {
    let response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${forPage}&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`);
    let data = await response.json();
    return data;
}

getCrypto().then(data =>{
    let size = Object.keys(data).length;
    for (let i = 0; i < size; i++){
        let coin = data[i];
        let range = document.createRange();
        let currentPrice = coin.current_price;
        let price1h = coin.price_change_percentage_1h_in_currency.toFixed(1);
        let price24h = coin.price_change_percentage_24h_in_currency.toFixed(1);
        let price7d = coin.price_change_percentage_7d_in_currency.toFixed(1);
        const tableData = `
            <td>${coin.market_cap_rank}</td>
            <td><img src="${coin.image}"></img> ${coin.name} [${coin.symbol}]</td>
            <td>${currentPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
            <td class="value">${price1h}%</td>
            <td class="value">${price24h}%</td>
            <td class="value">${price7d}%</td>
            <td>${coin.total_volume.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
            <td>${coin.market_cap.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>          
        `;

        range.selectNode(document.getElementsByTagName("tr").item(i));
        const documentFragment = range.createContextualFragment(tableData);
        const table = document.querySelector("tbody");  
        table.append(documentFragment);
        /*const as = document.getElementsByClassName('value');
        for (const a of as) {
            if (price1h <= -0) {
                a.style.color = 'red';
            } else {
                a.style.color = 'green';
            }
        }*/

    }
});
/*
function getCrypto(done) {
    const results = fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${forPage}&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`);

    results
        .then(response => response.json())
        .then(data => {
            done(data)
        });
}

getCrypto(data => {

    let size = Object.keys(data).length;
    for (let i = 0; i < size; i++){
        let coin = data[i];
        let range = document.createRange();
        let currentPrice = coin.current_price;
        const tableData = `
            <td>${coin.market_cap_rank}</td>
            <td><img src="${coin.image}"></img> ${coin.name} [${coin.symbol}]</td>
            <td>${currentPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
            <td>${coin.price_change_percentage_1h_in_currency.toFixed(1)}%</td>
            <td>${coin.price_change_percentage_24h_in_currency.toFixed(1)}%</td>
            <td>${coin.price_change_percentage_7d_in_currency.toFixed(1)}%</td>
            <td>${coin.total_volume.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
            <td>${coin.market_cap.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>          
        `;
       
        range.selectNode(document.getElementsByTagName("tr").item(i));
        const documentFragment = range.createContextualFragment(tableData);
        const table = document.querySelector("tbody");  
        table.append(documentFragment);
    }
   
});*/