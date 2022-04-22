const demo1 = document.getElementById("demo1");

let text = "";
const tiempo = 108; //dias

let resto = 0, // credito restante
    balance = 100, // precio de compra de paquetes
    recompraE = 0, // gastos de compra de paquetes
    recompra = 0, // gastos de compra de paquetes
    recompraS = 0; // 


function myFunction() {
    for (let i = 0; i < 32; i++) {
        dias = i * tiempo;


        pago = (recompra * 67.5) - 50000 + resto;

        if (pago >= 1) {
            resto = 0;
            recompraE = 50000;
            recompra = recompraE / 50;
            balance = recompra * 67.5;

            text += "<tr><td align='center'>" + i + "</td><td align='center'>" +
                dias + "</td><td align='right'>" +
                resto + " € </td><td align='right'> " +
                recompraE + " € </td><td align='center'> " +
                recompra + " </td><td align='right'> " +
                balance + " </td><td> " +
                pago + "</td></tr>";
        } else {
            resto = balance % 50;
            recompraE = balance - resto;
            recompra = recompraE / 50;
            balance = recompra * 67.5 + resto;

            text += "<tr><td align='center'>" + i + "</td><td align='center'>" +
                dias + "</td><td align='right'>" +
                resto + " € </td><td align='right'> " +
                recompraE + " € </td><td align='center'> " +
                recompra + " </td><td align='right'> " +
                balance + " </td><td> " +
                0 + "</td></tr>";
        }
    }
    demo.innerHTML = text;
}

myFunction()