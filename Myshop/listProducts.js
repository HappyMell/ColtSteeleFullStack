var faker = require("faker");

function product() {
  for(var i = 0; i <= 10; i++) {
      console.log(faker.fake("{{commerce.productName}} - ${{commerce.price}}"));
  }
}

console.log(product())