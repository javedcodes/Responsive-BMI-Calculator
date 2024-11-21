// Update placeholders based on unit selection
function updatePlaceholders() {
  const weightInput = document.getElementById('weight');
  const heightInput = document.getElementById('height');
  const selectedUnit = document.querySelector('input[name="units"]:checked').value;

  if (selectedUnit === 'metric') {
    weightInput.placeholder = "Weight in kg";
    heightInput.placeholder = "Height in cm";
  } else if (selectedUnit === 'us') {
    weightInput.placeholder = "Weight in lbs";
    heightInput.placeholder = "Height in inches";
  }
}

// Listen for unit change and update placeholders
document.querySelectorAll('input[name="units"]').forEach(radio => {
  radio.addEventListener('change', updatePlaceholders);
});

// Initial placeholder update
updatePlaceholders();

// Calculate BMI
function calculateBMI() {
  const weight = parseFloat(document.getElementById('weight').value);
  const height = parseFloat(document.getElementById('height').value);
  const units = document.querySelector('input[name="units"]:checked')?.value;
  const gender = document.querySelector('input[name="gender"]:checked')?.value;

  if (isNaN(weight) || weight <= 0) {
    alert("Please enter a valid weight.");
    return;
  }

  if (isNaN(height) || height <= 0) {
    alert("Please enter a valid height.");
    return;
  }

  let bmi;
  if (units === "metric") {
    bmi = weight / ((height / 100) ** 2); // Metric (kg, cm)
  } else {
    bmi = (weight / (height ** 2)) * 703; // US (lbs, inches)
  }

  displayBMI(bmi, gender);
}

// Display BMI Result
function displayBMI(bmi, gender) {
  const bmiValueElement = document.getElementById('bmiValue');
  const bmiCategoryElement = document.getElementById('bmiCategory');

  // Display the BMI result
  bmiValueElement.textContent = `BMI: ${bmi.toFixed(2)}`;

  // Determine and display the BMI category
  let category = "";
  let color = "";

  if (bmi < 18.5) {
    category = "Underweight";
    color = "black";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    category = "Normal weight";
    color = "green";
  } else if (bmi >= 25 && bmi < 29.9) {
    category = "Overweight";
    color = "red";
  } else {
    category = "Obese";
    color = "red";
  }

  bmiCategoryElement.innerHTML = `Category: <span style="color:${color}; font-weight: bold;">${category}</span>`;
}

// Attach calculateBMI function to the button click
document.querySelector('button').addEventListener('click', calculateBMI);