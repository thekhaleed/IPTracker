var dw = window.innerWidth;
if (dw >= 768) {
  document.getElementById("contain").classList.add("contain_md");
} else {
  document.getElementById("contain").classList.add("contain_sm");
}
async function fetchIPAddressData() {
  var userIP = document.getElementById("search");

  const BaseURL =
    "https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_QTH7wcZN6omUi9WwDKEE4PrqxQGZX&";
  if (userIP.value) {
    var url = `${BaseURL + "domain=" + userIP.value}`;
    var response;

    try {
      response = await fetch(url).then((res) => {
        return res.json();
      });
      document.getElementById("ip_error").innerHTML = "SUCCESS!";
      document.getElementById("ip_error").classList.remove("text-danger");
      document.getElementById("ip_error").classList.add("text-success");
    } catch (error) {
      //if response failed to fetch
      // console.log('Fetch error: ', error);
      document.getElementById("ip_error").innerHTML = error;
      document.getElementById("ip_error").classList.remove("text-success");
      document.getElementById("ip_error").classList.add("text-danger");
    }
    if (response.ip) {
      //if response is defined
      document.getElementById("ip_address").innerHTML = response.ip;
      document.getElementById("ip_location").innerHTML = `${
        response.location.country + ", " + response.location.region
      }`;
      document.getElementById("ip_timezone").innerHTML = `${
        "UTC" + response.location.timezone
      }`;
      document.getElementById("ip_isp").innerHTML = response.isp;
    } else {
      //if response is undefined
      document.getElementById("ip_error").innerHTML = response.messages;
      document.getElementById("ip_error").classList.remove("text-success");
      document.getElementById("ip_error").classList.add("text-danger");
    }
  } else {
    document.getElementById("ip_error").innerHTML = "Enter An Address!";
    document.getElementById("ip_error").classList.remove("text-success");
    document.getElementById("ip_error").classList.add("text-danger");
  }
}
