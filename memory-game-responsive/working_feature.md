The newer version includes a refinement in the generateFruitBorder function to adjust the fruit border placement more precisely.
Removed JavaScript-based game container resizing (Previously, clicking "Start Game" adjusted .game-container size dynamically. Now, CSS controls its size).

Improved confetti animation:
Adjusted animation duration and delay logic to make the confetti fall more naturally.
The removal of confetti now ensures better cleanup after 5 seconds.
Optimized the start timer function to ensure no duplicate timers are created.

Effect of Changes:
The removal of game container resizing from JavaScript means the layout is now purely managed by CSS, improving maintainability.
The fruit border logic is cleaner and works better on different screen sizes.
Confetti animations appear smoother.