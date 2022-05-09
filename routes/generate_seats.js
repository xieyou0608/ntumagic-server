function generate_seats() {
  const range = (start, end, step) => {
    numbers = Math.ceil((end - start) / step);
    return new Array(numbers).fill(start).map((el, i) => start + step * i);
  };

  // 座位排數
  top_rows = range(1, 14, 1); // [1, 2, 3,  4,  5,  6, 7, 8, 9, 10, 11, 12, 13]
  bottom_rows = range(14, 24, 1); // [14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

  // 座位號碼
  left_sign = [34];
  left_cols = range(32, 13, -2); // [32, 30, 28, 26, 24, 22, 20, 18, 16, 14]
  middle_cols = range(12, 0, -2).concat(range(1, 12, 2)); // [12, 10, 8, 6, 4, 2, 1, 3, 5, 7,9, 11]
  right_cols = range(13, 32, 2); // [13, 15, 17, 19, 21, 23, 25, 27, 29, 31]
  right_sign = [33];

  let seats = [];
  //上半部
  for (i of top_rows) {
    seats.push({ area: "Sign", row: i, col: 34, sold: 0 });
    for (j of left_cols) seats.push({ area: "B", row: i, col: j, sold: 0 }); //左上B區
    for (j of middle_cols) seats.push({ area: "A", row: i, col: j, sold: 0 }); //中上A區
    for (j of right_cols) seats.push({ area: "B", row: i, col: j, sold: 0 }); //右上B區
    seats.push({ area: "Sign", row: i, col: 33, sold: 0 });
  }
  //下半部
  for (i of bottom_rows) {
    seats.push({ area: "Sign", row: i, col: 34, sold: 0 });
    for (j of left_cols) seats.push({ area: "C", row: i, col: j, sold: 0 }); //左上B區
    for (j of middle_cols) seats.push({ area: "B", row: i, col: j, sold: 0 }); //中上A區
    for (j of right_cols) seats.push({ area: "C", row: i, col: j, sold: 0 }); //右上B區
    seats.push({ area: "Sign", row: i, col: 33, sold: 0 });
  }

  for (s of seats) {
    s.position = { row: s.row, col: s.col };
  }

  return seats;
}

// seats = generate_seats();
// console.log(seats);
module.exports = generate_seats;
