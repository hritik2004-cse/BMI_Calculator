import "./style.css";
const bmiForm = document.getElementById("bmiForm");

bmiForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const gender = document.getElementById("gender").value;
  const ageData = parseInt(document.getElementById("age").value);
  const heightInFeet = parseInt(document.getElementById("heightFeet").value);
  const heightInInch = parseInt(document.getElementById("heightInches").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const result = document.getElementById("result");

  if (
    !gender ||
    isNaN(ageData) ||
    isNaN(heightInFeet) ||
    isNaN(heightInInch) ||
    isNaN(weight)
  ) {
    alert("Please fill all fields correctly.");
    return;
  }

  if (
    ageData < 1 ||
    ageData > 100 ||
    heightInFeet < 1 ||
    heightInFeet > 8 ||
    heightInInch < 0 ||
    heightInInch > 11 ||
    weight <= 0 ||
    weight > 400
  ) {
    alert("Entered values are not valid.");
    return;
  }

  const bmi = bmiCalculator(weight, heightInFeet, heightInInch);
  const { category, position } = getBMIInfo(bmi);

  if (result) {
    result.classList.remove("hidden");
    result.classList.add("block");
    result.innerHTML = `
        <div class="text-center">
          <p class="mb-1 flex items-center justify-center gap-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-slate-500">
            <i class="fa-solid fa-chart-simple text-orange-500" aria-hidden="true"></i>
            Your BMI
          </p>
          <p id="bmiValue" class="gradient-text text-4xl font-extrabold leading-none">
            ${bmi.toFixed(2)}
          </p>
          <p id="bmiCategory" class="mt-1 text-[0.65rem] font-semibold uppercase tracking-widest text-orange-400">
            ${category}
          </p>
        </div>

        <!-- Scale bar -->
        <div class="mt-3.5">
          <div class="relative h-2 overflow-visible rounded-full"
               style="background: linear-gradient(to right, #38bdf8, #4ade80, #facc15, #f97316, #ef4444);"
               aria-hidden="true">
            <div id="bmiIndicator"
                 class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-white ring-[3px] ring-orange-500 shadow-md shadow-black/50"
                 style="left: ${position}">
            </div>
          </div>
          <div class="mt-1.5 flex justify-between text-[0.57rem] font-medium text-slate-600" aria-hidden="true">
            <span>Under</span><span>Normal</span><span>Over</span><span>Obese</span>
          </div>
        </div>
      `;
  }
});

// function that calculate BMI
const bmiCalculator = (weight, heightFeet, heightInches) => {
  // converting height to meter
  const height = (heightFeet * 12 + heightInches) * 0.0254; // 1 inch = 0.0254 meters
  return weight / (height * height);
};

const getBMIInfo = (bmi) => {
  if (bmi < 18.5) {
    return {
      category: "Under Weight",
      position: "0%",
    };
  }

  if (bmi < 25) {
    return {
      category: "Normal Weight",
      position: "35%",
    };
  }

  if (bmi < 30) {
    return {
      category: "Over Weight",
      position: "70%",
    };
  }

  return {
    category: "Obese",
    position: "100%",
  };
};
