// canvas.js

// Get the canvas and its 2D drawing context.
const canvas = document.getElementById('angleCanvas');
const ctx = canvas.getContext('2d');

// Global variables for the canvas center and the circle's radius.
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 150;

// Convert degrees to radians.
function degToRad(deg) {
  return deg * (Math.PI / 180);
}

// Compute the effective (minor) angle between 0° and the terminal side.
// Returns an angle (in degrees) in the range (-180, 180].
function computeEffectiveAngle(angleDeg) {
  let effective = angleDeg % 360;
  if (effective > 180) {
    effective -= 360;
  } else if (effective <= -180) {
    effective += 360;
  }
  return effective;
}

// Draw the static circle and the fixed initial side (0° along the positive x-axis).
function drawCircle() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw the main circle.
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 2;
  ctx.stroke();
  
  // Draw the fixed initial side (pointing right).
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(centerX + radius, centerY);
  ctx.strokeStyle = '#007ACC';
  ctx.lineWidth = 3;
  ctx.stroke();
}

// Draw the terminal side and the interior (green) arc.
// The terminal side is drawn using the full given angle (angleDeg),
// but the green arc is drawn using the effective (minor) angle between the fixed side (0°)
// and the terminal side.
function drawTerminalSide(angleDeg) {
  // Calculate the full angle in radians and determine the endpoint.
  const angleRad = degToRad(angleDeg);
  const endX = centerX + radius * Math.cos(angleRad);
  const endY = centerY - radius * Math.sin(angleRad);
  
  // Draw the terminal side (red).
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(endX, endY);
  ctx.strokeStyle = '#D32F2F';
  ctx.lineWidth = 3;
  ctx.stroke();
  
  // Compute the effective (minor) angle for the green arc.
  let effectiveAngleDeg = computeEffectiveAngle(angleDeg);
  let effectiveAngleRad = degToRad(effectiveAngleDeg);
  
  // Draw the interior (green) arc representing the angle.
  // We flip the y-axis to use standard mathematical orientation.
  const arcRadius = radius / 4;
  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.scale(1, -1);  // Flip the y-axis so that positive angles are drawn counterclockwise.
  ctx.beginPath();
  // Draw the arc from 0 to the effective angle.
  ctx.arc(0, 0, arcRadius, 0, effectiveAngleRad, false);
  ctx.strokeStyle = '#388E3C';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();
  
  // Mark the terminal point with a small red circle.
  ctx.beginPath();
  ctx.arc(endX, endY, 4, 0, 2 * Math.PI);
  ctx.fillStyle = '#D32F2F';
  ctx.fill();
}
