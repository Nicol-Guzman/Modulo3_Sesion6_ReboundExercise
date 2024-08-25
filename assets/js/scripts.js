document.addEventListener('DOMContentLoaded', function() {
    let drinks = [
        { name: 'Martini', price: 2550 },
        { name: 'Cappuccino', price: 1370 },
        { name: 'Latte', price: 1350 },
        { name: 'Mojito', price: 2290 }
    ];

    let plates = [
        {
            name: 'Insalata de riso',
            price: 6750,
            description: 'L`insalata di riso è un classico delle ricette estive. Veloce e facile da preparare lìnsalata di riso si può insaporire con gil ingredienti più vari.',
            image: './assets/img/1.png'
        },
        {
            name: 'Insalata al cipollotti',
            price: 5990,
            description: 'Più delicate delle cipolle, i cipollotti sono perfetti in insalata, sui pesce e sulia carne.',
            image: './assets/img/2.png'
        },
        {
            name: 'Insalata caprese',
            price: 8250,
            description: 'Questo piatto è culto della città partenopea dove la mozzarella è protagonista di moltissimo platti.',
            image: './assets/img/3.png'
        }
    ];

    let formatCurrency = (price) => {
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP',
            minimumFractionDigits: 0,
        }).format(price);
    };

    let createRowDrinks = ({ name, price }) => {
        return `<tr>
        <td>
        <input type="checkbox" id="${name}" data-price="${price}">
        <label for="${name}">${name}</label>
        </td>
        <td>${formatCurrency(price)}</td>
        </tr>`;
    };

    let createRowPlates = ({ name, price, description, image }) => {
        return `<tr>
            <td>
                <input type="checkbox" id="${name}" data-price="${price}">
                <label for="${name}"><strong>${name}</strong></label>
                <div>${description}</div>
                <div>Precio: ${formatCurrency(price)}</div>
            </td>
            <td>
                <img src="${image}" alt="${name}" style="width: 100px;">
            </td>
        </tr>`;
    };

    document.getElementById('checkItemsDrinks').innerHTML = drinks.map(createRowDrinks).join('');
    document.getElementById('checkItemsPlates').innerHTML = plates.map(createRowPlates).join('');

    let checkoutTbody = document.getElementById('checkoutTbody');

    let updateCheckout = () => {
        checkoutTbody.innerHTML = `
            <tr><th>Item</th>
            <th>Precio</th></tr>
        
            ${Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => `<tr>
                <td>${checkbox.id}</td>
                <td>${formatCurrency(checkbox.dataset.price)}</td>
                </tr>`).join('')}
                <tr>
                <th>Total</th>
                <th>${formatCurrency(Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).reduce((total, checkbox) => total + parseInt(checkbox.dataset.price), 0))}</th>
                </tr>`;
    };

    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', updateCheckout);
    });

    updateCheckout();
});