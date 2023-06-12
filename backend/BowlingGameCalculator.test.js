const { calculateTotalScore } = require('./BowlingGameCalculator');

test('strike, spare, 4|0 should give the output 38', () => {
  const turns = [
    [10],
    [6, 4],
    [4, 0]
  ];
  const totalScore = calculateTotalScore(turns);
  expect(totalScore).toBe(38);
});

test('perfect series (12 strikes) should give 300', () => {
  const turns = [
    [10],
    [10],
    [10],
    [10],
    [10],
    [10],
    [10],
    [10],
    [10],
    [10, 10, 10]
  ];
  const totalScore = calculateTotalScore(turns);
  expect(totalScore).toBe(300);
});
