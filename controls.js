// controls.js

// Get references to the user input elements.
const angleSlider = document.getElementById('angleSlider');
const angleInput = document.getElementById('angleInput');
const angleDisplay = document.getElementById('angleDisplay');
const coterminalDisplay = document.getElementById('coterminalDisplay');
const nInput = document.getElementById('nInput');
const angleExpressions = document.getElementById('angleExpressions');

// Update the canvas drawing and the text displays based on the current inputs.
function updateCanvas() {
  const angleDeg = parseInt(angleSlider.value, 10);
  const n = parseInt(nInput.value, 10);
  
  // Draw the circle and terminal side using functions from canvas.js.
  drawCircle();
  drawTerminalSide(angleDeg);
  
  // Update the displayed angle.
  angleDisplay.textContent = angleDeg;
  angleInput.value = angleDeg;  // Synchronize the numeric input.
  
  // Calculate the coterminal angle in the range [0, 360).
  let coterminal = angleDeg % 360;
  if (coterminal < 0) {
    coterminal += 360;
  }
  coterminalDisplay.textContent = `Coterminal Angle (0°–360°): ${coterminal}°`;
  
  // Calculate and display the positive and negative coterminal expressions.
  const positiveCoterminal = angleDeg + (360 * n);
  const negativeCoterminal = angleDeg - (360 * n);
  angleExpressions.innerHTML =
    `Positive Coterminal (Angle + 360° × n): ${angleDeg} + 360×${n} = ${positiveCoterminal}°<br>` +
    `Negative Coterminal (Angle - 360° × n): ${angleDeg} - 360×${n} = ${negativeCoterminal}°`;
}

// Synchronize the slider and numeric input for the angle.
angleSlider.addEventListener('input', () => {
  angleInput.value = angleSlider.value;
  updateCanvas();
});

angleInput.addEventListener('input', () => {
  angleSlider.value = angleInput.value;
  updateCanvas();
});

// Listen for changes on the n input.
nInput.addEventListener('input', updateCanvas);

// Initial draw.
updateCanvas();
