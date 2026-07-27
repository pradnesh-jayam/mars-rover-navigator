/**
 * Performance Clock Module
 * Measures algorithm execution time with millisecond precision
 * 
 * Used to benchmark and compare algorithm performance
 * across different grid configurations and obstacle layouts
 */

/**
 * Start the performance clock
 * Captures current timestamp at algorithm start
 * @returns {Date} Timestamp object marking algorithm start
 */
function startClock() {
  var startTime = new Date();
  return startTime;
}

/**
 * Stop the performance clock and calculate elapsed time
 * 
 * Calculation:
 * - Elapsed milliseconds = current time - start time
 * - Formatted output: "Xms" for readability
 * 
 * @param {Date} startTime - Timestamp from startClock()
 * @returns {string} Formatted elapsed time (e.g., "15ms", "42.5ms")
 */
function stopClock(startTime) {
  var elapsedTime = new Date() - startTime;
  // Convert to seconds.milliseconds format
  return elapsedTime / 1000 + "ms";
}
