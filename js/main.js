const monto = document.getElementById('monto');
const tiempo = document.getElementById('tiempo');
const interes = document.getElementById('interes');
const btnCalcular = document.getElementById('btnCalcular');
const alerta = document.getElementById('alert-error');
const llenarTabla = document.querySelector('#lista-tabla tbody')

btnCalcular.addEventListener('click', () => {
    if (monto.value === '' || tiempo.value === '' || interes.value === '') {
        alerta.hidden = false;
        setTimeout(() => {
            alerta.hidden = true;
        }, 2000);
    } else {
        calcularCronograma(monto.value, interes.value, tiempo.value);
    }
})

function calcularCronograma(monto, interes, tiempo) {

    while (llenarTabla.firstChild) {
        llenarTabla.removeChild(llenarTabla.firstChild);
    }

    let mesActual = dayjs().add(1, 'day');

    let resto = 0, // credito restante
        balance = monto * 50, // precio de compra de paquetes
        recompraE = 0, // gastos de compra de paquetes
        recompra = 0, // gastos de compra de paquetes
        pago = 0;

    tiempo = tiempo * (365 / 108);

    for (let i = 0; i <= tiempo; i++) {

        let fecha = mesActual.format('DD-MM-YYYY');
        mesActual = mesActual.add(108, 'day');

        pago = (recompra * 1.5 * interes) - 50000 + resto;

        const row = document.createElement('tr');

        if (pago >= 1) {
            resto = 0;
            recompraE = 50000;
            recompra = recompraE / 50;
            balance = recompra * 1.5 * interes;

            row.innerHTML = `
                <td>${i}</td>
                <td>${fecha}</td>
                <td>${recompra}</td>
                <td>${resto.toFixed(2)}</td>
                <td>${recompraE.toFixed(2)}</td>
                <td>${balance.toFixed(2)}</td>
                <td>${pago.toFixed(2)}</td>
            `;
        } else {
            recompraE = balance - resto;
            recompra = recompraE / 50;
            resto = recompra % 50 - .5;
            if (balance >= 150 && i <= 0) {
                row.innerHTML = `
                    <td>${i}</td>
                    <td>${fecha}</td>
                    <td>${recompra}</td>
                    <td>${resto.toFixed(2)}</td>
                    <td>${recompraE.toFixed(2)}</td>
                    <td>${balance.toFixed(2)}</td>
                    <td>${recompraE}</td>
                `;
                balance = 50 + resto;

            } else {
                resto = balance % 50;
                recompraE = balance - resto;
                recompra = recompraE / 50;
                balance = recompra * 67.5 + resto;
                row.innerHTML = `
                    <td>${i}</td>
                    <td>${fecha}</td>
                    <td>${recompra}</td>
                    <td>${resto.toFixed(2)}</td>
                    <td>${recompraE.toFixed(2)}</td>
                    <td>${balance.toFixed(2)}</td>
                    <td>0</td>
                `;
            }

        }

        llenarTabla.appendChild(row);

    }
}