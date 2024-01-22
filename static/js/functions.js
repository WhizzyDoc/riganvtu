//const base_image_url = `http://127.0.0.1:8000`;
const base_image_url = `https://riganapi.pythonanywhere.com`;
const base_url = `${base_image_url}/api/v4/`;
const mtn = ['0803', '0703', '0903', '0806', '0706', '0813', '0810', '0814', '0816']
const glo = ['0805', '0705', '0905', '0807', '0815', '0811', '0905']
const etisalat = ['0809', '0909', '0817', '0818']
const airtel = ['0802', '0902', '0701', '0808', '0708', '0812']

/* Navigation bar */
/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
//localStorage.removeItem('api_key')
function openNav() {
    $(".sidenav").toggleClass('active');
    $("main").toggleClass('active');
  }

  function digify(n) {
    a = Number(n)
    return a.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
  }

