const optiosPesos = {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0
}
const formatPesos = new Intl.NumberFormat('es-CL', optiosPesos);
module.exports = formatPesos;