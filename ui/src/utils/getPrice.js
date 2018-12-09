const getPrice = (weight = 0) => {
  let pricePerKg;
  if (weight <= 10) {
    pricePerKg = 1000;
  } else if (weight > 10 && weight <= 50) {
    pricePerKg = 990;
  } else if (weight > 50 && weight <= 100) {
    pricePerKg = 900;
  } else if (weight > 100) {
    pricePerKg = 800;
  }
  return parseFloat(weight) * pricePerKg;
};

export default getPrice;
