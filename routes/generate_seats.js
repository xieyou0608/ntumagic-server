function generate_seats() {
  const range = (start, end, step) => {
    numbers = Math.ceil((end - start) / step);
    return new Array(numbers).fill(start).map((el, i) => start + step * i);
  };

  // 舞台在上的方向
  // 座位排數
  // top_rows = range(1, 14, 1); // [1, 2, 3,  4,  5,  6, 7, 8, 9, 10, 11, 12, 13]
  // bottom_rows = range(14, 24, 1); // [14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

  // 座位號碼
  // left_X = [34];
  // left_cols = range(32, 13, -2); // [32, 30, 28, 26, 24, 22, 20, 18, 16, 14]
  // middle_cols = range(12, 0, -2).concat(range(1, 12, 2)); // [12, 10, 8, 6, 4, 2, 1, 3, 5, 7,9, 11]
  // right_cols = range(13, 32, 2); // [13, 15, 17, 19, 21, 23, 25, 27, 29, 31]
  // right_X = [33];

  // 舞台在下的方向
  // top_rows = range(1, 12); // [23~14]
  // bottom_rows = range(12, 16); // [13~1]

  // left_cols = range(37, 16, -2); //[31,29, ~13]
  // middle_front_cols = range(17, 0, -2).concat(range(2, 17, 2));
  // middle_back_cols = range(19, 0, -2).concat(range(2, 21, 2));
  // right_cols = range(14, 33, 2);

  // let seats = [];
  // //上半部
  // for (i of top_rows) {
  //   for (j of left_cols) seats.push({ area: "C", row: i, col: j, sold: 0 }); //左上B區
  //   seats.push({ area: "M", row: i, col: 0, sold: 0 });
  //   for (j of middle_cols) seats.push({ area: "B", row: i, col: j, sold: 0 }); //中上A區
  //   seats.push({ area: "M", row: i, col: 0, sold: 0 });
  //   for (j of right_cols) seats.push({ area: "C", row: i, col: j, sold: 0 }); //右上B區
  // }

  // //中間走道
  // for (j of left_cols) seats.push({ area: "X", row: 0, col: j, sold: 0 }); //左上B區
  // seats.push({ area: "X", row: 0, col: 0, sold: 0 });
  // for (j of middle_cols) seats.push({ area: "X", row: 0, col: j, sold: 0 }); //中上A區
  // seats.push({ area: "X", row: 0, col: 0, sold: 0 });
  // for (j of right_cols) seats.push({ area: "X", row: 0, col: j, sold: 0 }); //右上B區

  // //下半部
  // for (i of bottom_rows) {
  //   for (j of left_cols) seats.push({ area: "B", row: i, col: j, sold: 0 }); //左上B區
  //   seats.push({ area: "M", row: i, col: 0, sold: 0 });
  //   for (j of middle_cols) seats.push({ area: "A", row: i, col: j, sold: 0 }); //中上A區
  //   seats.push({ area: "M", row: i, col: 0, sold: 0 });
  //   for (j of right_cols) seats.push({ area: "B", row: i, col: j, sold: 0 }); //右上B區
  // }

  // for (s of seats) {
  //   s.position = { row: s.row, col: s.col };
  // }
  let seats = [];
  // first floor
  // row 1
  for (let j = 29; j >= 23; j -= 2) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  for (let j = 21; j >= 9; j -= 2) seats.push({ area: "S", row: 1, col: j, sold: 0 });
  seats.push({ area: "M", row: 1, col: 0, sold: 0 });
  for (let j = 0; j < 5; j++) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  seats.push({ area: "M", row: 1, col: 0, sold: 0 });
  for (let j = 7; j >= 1; j -= 2) seats.push({ area: "S", row: 1, col: j, sold: 0 });
  for (let j = 2; j <= 6; j += 2) seats.push({ area: "S", row: 1, col: j, sold: 0 });
  seats.push({ area: "M", row: 1, col: 0, sold: 0 });
  for (let j = 0; j < 6; j++) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  seats.push({ area: "M", row: 1, col: 0, sold: 0 });
  for (let j = 8; j <= 20; j += 2) seats.push({ area: "S", row: 1, col: j, sold: 0 });
  for (let j = 22; j <= 28; j += 2) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  // row 2
  for (let j = 29; j >= 23; j -= 2) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  for (let j = 21; j >= 9; j -= 2) seats.push({ area: "S", row: 2, col: j, sold: 0 });
  seats.push({ area: "M", row: 2, col: 0, sold: 0 });
  for (let j = 0; j < 5; j++) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  seats.push({ area: "M", row: 2, col: 0, sold: 0 });
  for (let j = 7; j >= 1; j -= 2) seats.push({ area: "S", row: 2, col: j, sold: 0 });
  for (let j = 2; j <= 8; j += 2) seats.push({ area: "S", row: 2, col: j, sold: 0 });
  seats.push({ area: "M", row: 2, col: 0, sold: 0 });
  for (let j = 0; j < 5; j++) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  seats.push({ area: "M", row: 2, col: 0, sold: 0 });
  for (let j = 10; j <= 22; j += 2) seats.push({ area: "S", row: 2, col: j, sold: 0 });
  for (let j = 24; j <= 30; j += 2) seats.push({ area: "X", row: 0, col: j, sold: 0 });

  //row 3
  for (let j = 31; j >= 27; j -= 2) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  for (let j = 25; j >= 19; j -= 2) seats.push({ area: "B", row: 3, col: j, sold: 0 });
  for (let j = 17; j >= 11; j -= 2) seats.push({ area: "A", row: 3, col: j, sold: 0 });
  seats.push({ area: "M", row: 3, col: 0, sold: 0 });
  for (let j = 0; j < 4; j++) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  seats.push({ area: "M", row: 3, col: 0, sold: 0 });
  for (let j = 9; j >= 1; j -= 2) seats.push({ area: "A", row: 3, col: j, sold: 0 });
  for (let j = 2; j <= 8; j += 2) seats.push({ area: "A", row: 3, col: j, sold: 0 });
  seats.push({ area: "M", row: 3, col: 0, sold: 0 });
  for (let j = 0; j < 5; j++) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  seats.push({ area: "M", row: 3, col: 0, sold: 0 });
  for (let j = 10; j <= 16; j += 2) seats.push({ area: "A", row: 3, col: j, sold: 0 });
  for (let j = 18; j <= 24; j += 2) seats.push({ area: "B", row: 3, col: j, sold: 0 });
  for (let j = 26; j <= 30; j += 2) seats.push({ area: "X", row: 0, col: j, sold: 0 });

  // row 4
  for (let j = 31; j >= 27; j -= 2) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  for (let j = 25; j >= 21; j -= 2) seats.push({ area: "B", row: 4, col: j, sold: 0 });
  for (let j = 19; j >= 11; j -= 2) seats.push({ area: "A", row: 4, col: j, sold: 0 });
  seats.push({ area: "M", row: 4, col: 0, sold: 0 });
  for (let j = 0; j < 4; j++) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  seats.push({ area: "M", row: 4, col: 0, sold: 0 });
  for (let j = 9; j >= 1; j -= 2) seats.push({ area: "A", row: 4, col: j, sold: 0 });
  for (let j = 2; j <= 10; j += 2) seats.push({ area: "A", row: 4, col: j, sold: 0 });
  seats.push({ area: "M", row: 4, col: 0, sold: 0 });
  for (let j = 0; j < 4; j++) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  seats.push({ area: "M", row: 4, col: 0, sold: 0 });
  for (let j = 12; j <= 20; j += 2) seats.push({ area: "A", row: 4, col: j, sold: 0 });
  for (let j = 22; j <= 26; j += 2) seats.push({ area: "B", row: 4, col: j, sold: 0 });
  for (let j = 28; j <= 32; j += 2) seats.push({ area: "X", row: 0, col: j, sold: 0 });

  // row 5
  for (let j = 33; j >= 31; j -= 2) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  for (let j = 29; j >= 23; j -= 2) seats.push({ area: "B", row: 5, col: j, sold: 0 });
  for (let j = 21; j >= 13; j -= 2) seats.push({ area: "A", row: 5, col: j, sold: 0 });
  seats.push({ area: "M", row: 5, col: 0, sold: 0 });
  for (let j = 0; j < 3; j++) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  seats.push({ area: "M", row: 5, col: 0, sold: 0 });
  for (let j = 11; j >= 1; j -= 2) seats.push({ area: "A", row: 5, col: j, sold: 0 });
  for (let j = 2; j <= 10; j += 2) seats.push({ area: "A", row: 5, col: j, sold: 0 });
  seats.push({ area: "M", row: 5, col: 0, sold: 0 });
  for (let j = 0; j < 4; j++) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  seats.push({ area: "M", row: 5, col: 0, sold: 0 });
  for (let j = 12; j <= 20; j += 2) seats.push({ area: "A", row: 5, col: j, sold: 0 });
  for (let j = 22; j <= 28; j += 2) seats.push({ area: "B", row: 5, col: j, sold: 0 });
  for (let j = 30; j <= 32; j += 2) seats.push({ area: "X", row: 0, col: j, sold: 0 });

  // row 6
  for (let j = 33; j >= 31; j -= 2) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  for (let j = 29; j >= 25; j -= 2) seats.push({ area: "B", row: 6, col: j, sold: 0 });
  for (let j = 23; j >= 13; j -= 2) seats.push({ area: "A", row: 6, col: j, sold: 0 });
  seats.push({ area: "M", row: 6, col: 0, sold: 0 });
  for (let j = 0; j < 3; j++) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  seats.push({ area: "M", row: 6, col: 0, sold: 0 });
  for (let j = 11; j >= 1; j -= 2) seats.push({ area: "A", row: 6, col: j, sold: 0 });
  for (let j = 2; j <= 12; j += 2) seats.push({ area: "A", row: 6, col: j, sold: 0 });
  seats.push({ area: "M", row: 6, col: 0, sold: 0 });
  for (let j = 0; j < 3; j++) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  seats.push({ area: "M", row: 6, col: 0, sold: 0 });
  for (let j = 14; j <= 24; j += 2) seats.push({ area: "A", row: 6, col: j, sold: 0 });
  for (let j = 26; j <= 30; j += 2) seats.push({ area: "B", row: 6, col: j, sold: 0 });
  for (let j = 32; j <= 34; j += 2) seats.push({ area: "X", row: 0, col: j, sold: 0 });

  //row 7
  seats.push({ area: "X", row: 0, col: 35, sold: 0 });
  for (let j = 33; j >= 27; j -= 2) seats.push({ area: "B", row: 7, col: j, sold: 0 });
  for (let j = 25; j >= 15; j -= 2) seats.push({ area: "A", row: 7, col: j, sold: 0 });
  seats.push({ area: "M", row: 7, col: 0, sold: 0 });
  for (let j = 0; j < 2; j++) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  seats.push({ area: "M", row: 7, col: 0, sold: 0 });
  for (let j = 13; j >= 1; j -= 2) seats.push({ area: "A", row: 7, col: j, sold: 0 });
  for (let j = 2; j <= 12; j += 2) seats.push({ area: "A", row: 7, col: j, sold: 0 });
  seats.push({ area: "M", row: 7, col: 0, sold: 0 });
  for (let j = 0; j < 3; j++) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  seats.push({ area: "M", row: 7, col: 0, sold: 0 });
  for (let j = 14; j <= 24; j += 2) seats.push({ area: "A", row: 7, col: j, sold: 0 });
  for (let j = 26; j <= 32; j += 2) seats.push({ area: "B", row: 7, col: j, sold: 0 });
  seats.push({ area: "X", row: 0, col: 34, sold: 0 });

  //row 8
  seats.push({ area: "X", row: 0, col: 35, sold: 0 });
  for (let j = 33; j >= 29; j -= 2) seats.push({ area: "B", row: 8, col: j, sold: 0 });
  for (let j = 27; j >= 15; j -= 2) seats.push({ area: "A", row: 8, col: j, sold: 0 });
  seats.push({ area: "M", row: 8, col: 0, sold: 0 });
  for (let j = 0; j < 2; j++) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  seats.push({ area: "M", row: 8, col: 0, sold: 0 });
  for (let j = 13; j >= 1; j -= 2) seats.push({ area: "A", row: 8, col: j, sold: 0 });
  for (let j = 2; j <= 14; j += 2) seats.push({ area: "A", row: 8, col: j, sold: 0 });
  seats.push({ area: "M", row: 8, col: 0, sold: 0 });
  for (let j = 0; j < 2; j++) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  seats.push({ area: "M", row: 8, col: 0, sold: 0 });
  for (let j = 16; j <= 28; j += 2) seats.push({ area: "A", row: 8, col: j, sold: 0 });
  for (let j = 30; j <= 34; j += 2) seats.push({ area: "B", row: 8, col: j, sold: 0 });
  seats.push({ area: "X", row: 0, col: 36, sold: 0 });

  //row 9
  for (let j = 37; j >= 31; j -= 2) seats.push({ area: "B", row: 9, col: j, sold: 0 });
  for (let j = 29; j >= 17; j -= 2) seats.push({ area: "A", row: 9, col: j, sold: 0 });
  seats.push({ area: "M", row: 9, col: 0, sold: 0 });
  seats.push({ area: "X", row: 0, col: 0, sold: 0 });
  seats.push({ area: "M", row: 9, col: 0, sold: 0 });
  for (let j = 15; j >= 1; j -= 2) seats.push({ area: "A", row: 9, col: j, sold: 0 });
  for (let j = 2; j <= 14; j += 2) seats.push({ area: "A", row: 9, col: j, sold: 0 });
  seats.push({ area: "M", row: 9, col: 0, sold: 0 });
  for (let j = 0; j < 2; j++) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  seats.push({ area: "M", row: 9, col: 0, sold: 0 });
  for (let j = 16; j <= 28; j += 2) seats.push({ area: "A", row: 9, col: j, sold: 0 });
  for (let j = 30; j <= 36; j += 2) seats.push({ area: "B", row: 9, col: j, sold: 0 });

  //row 10
  for (let j = 37; j >= 17; j -= 2) seats.push({ area: "B", row: 10, col: j, sold: 0 });
  seats.push({ area: "M", row: 10, col: 0, sold: 0 });
  seats.push({ area: "X", row: 0, col: 0, sold: 0 });
  seats.push({ area: "M", row: 10, col: 0, sold: 0 });
  for (let j = 15; j >= 1; j -= 2) seats.push({ area: "A", row: 10, col: j, sold: 0 });
  for (let j = 2; j <= 16; j += 2) seats.push({ area: "A", row: 10, col: j, sold: 0 });
  seats.push({ area: "M", row: 10, col: 0, sold: 0 });
  seats.push({ area: "X", row: 0, col: 0, sold: 0 });
  seats.push({ area: "M", row: 10, col: 0, sold: 0 });
  for (let j = 18; j <= 38; j += 2) seats.push({ area: "B", row: 10, col: j, sold: 0 });

  //row 11
  for (let j = 39; j >= 37; j -= 2) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  for (let j = 35; j >= 19; j -= 2) seats.push({ area: "B", row: 11, col: j, sold: 0 });
  seats.push({ area: "M", row: 11, col: 0, sold: 0 });
  seats.push({ area: "M", row: 11, col: 0, sold: 0 });
  for (let j = 17; j >= 1; j -= 2) seats.push({ area: "A", row: 11, col: j, sold: 0 });
  for (let j = 2; j <= 16; j += 2) seats.push({ area: "A", row: 11, col: j, sold: 0 });
  seats.push({ area: "M", row: 11, col: 0, sold: 0 });
  seats.push({ area: "X", row: 0, col: 0, sold: 0 });
  seats.push({ area: "M", row: 11, col: 0, sold: 0 });
  for (let j = 18; j <= 34; j += 2) seats.push({ area: "B", row: 11, col: j, sold: 0 });
  for (let j = 36; j <= 38; j += 2) seats.push({ area: "X", row: 0, col: j, sold: 0 });


  for (let j = 0; j < 88; j++) seats.push({ area: "X", row: 0, col: j, sold: 0 });

  // row 12
  for (let j = 0; j < 11; j++) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  seats.push({ area: "M", row: 12, col: 0, sold: 0 });
  seats.push({ area: "X", row: 0, col: 0, sold: 0 });
  for (let j = 17; j >= 1; j -= 2) seats.push({ area: "B", row: 12, col: j, sold: 0 });
  for (let j = 2; j <= 18; j += 2) seats.push({ area: "B", row: 12, col: j, sold: 0 });
  seats.push({ area: "X", row: 0, col: 0, sold: 0 });
  seats.push({ area: "M", row: 12, col: 0, sold: 0 });
  for (let j = 0; j < 11; j++) seats.push({ area: "X", row: 0, col: j, sold: 0 });

  //row 13
  for (let j = 0; j < 11; j++) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  seats.push({ area: "M", row: 13, col: 0, sold: 0 });
  for (let j = 19; j >= 1; j -= 2) seats.push({ area: "B", row: 13, col: j, sold: 0 });
  for (let j = 2; j <= 18; j += 2) seats.push({ area: "B", row: 13, col: j, sold: 0 });
  seats.push({ area: "X", row: 0, col: 0, sold: 0 });
  seats.push({ area: "M", row: 13, col: 0, sold: 0 });
  for (let j = 0; j < 11; j++) seats.push({ area: "X", row: 0, col: j, sold: 0 });

  // row 14
  for (let j = 0; j < 11; j++) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  seats.push({ area: "M", row: 14, col: 0, sold: 0 });
  for (let j = 19; j >= 1; j -= 2) seats.push({ area: "B", row: 14, col: j, sold: 0 });
  for (let j = 2; j <= 20; j += 2) seats.push({ area: "B", row: 14, col: j, sold: 0 });
  seats.push({ area: "M", row: 14, col: 0, sold: 0 });
  for (let j = 0; j < 11; j++) seats.push({ area: "X", row: 0, col: j, sold: 0 });

  //row 15
  for (let j = 0; j < 11; j++) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  seats.push({ area: "M", row: 15, col: 0, sold: 0 });
  for (let j = 0; j < 2; j++) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  for (let j = 15; j >= 7; j -= 2) seats.push({ area: "B", row: 15, col: j, sold: 0 });
  seats.push({ area: "M", row: 15, col: 0, sold: 0 });
  for (let j = 0; j < 4; j++) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  seats.push({ area: "M", row: 15, col: 0, sold: 0 });
  for (let j = 8; j <= 16; j += 2) seats.push({ area: "B", row: 15, col: j, sold: 0 });
  for (let j = 0; j < 2; j++) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  seats.push({ area: "M", row: 15, col: 0, sold: 0 });
  for (let j = 0; j < 11; j++) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  // seats.reverse();

  // second floor
  //row 1
  for (let j = 35; j >= 25; j -= 2) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  for (let j = 23; j >= 21; j -= 2) seats.push({ area: "S", row: 1, col: j, sold: 0 });
  for (let j = 19; j >= 15; j -= 2) seats.push({ area: "C", row: 1, col: j, sold: 0 });
  seats.push({ area: "M", row: 1, col: 0, sold: 0 });
  for (let j = 0; j < 2; j++) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  seats.push({ area: "M", row: 1, col: 0, sold: 0 });
  for (let j = 13; j >= 1; j -= 2) seats.push({ area: "C", row: 1, col: j, sold: 0 });
  for (let j = 2; j <= 12; j += 2) seats.push({ area: "C", row: 1, col: j, sold: 0 });
  seats.push({ area: "M", row: 1, col: 0, sold: 0 });
  for (let j = 0; j < 3; j++) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  seats.push({ area: "M", row: 1, col: 0, sold: 0 });
  for (let j = 14; j <= 18; j += 2) seats.push({ area: "C", row: 1, col: j, sold: 0 });
  for (let j = 20; j <= 22; j += 2) seats.push({ area: "S", row: 1, col: j, sold: 0 });
  for (let j = 24; j <= 34; j += 2) seats.push({ area: "X", row: 0, col: j, sold: 0 });

  // row 2
  for (let j = 29; j >= 27; j -= 2) seats.push({ area: "S", row: 2, col: j, sold: 0 });
  for (let j = 0; j < 3; j++) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  for (let j = 25; j >= 21; j -= 2) seats.push({ area: "S", row: 2, col: j, sold: 0 });
  for (let j = 19; j >= 15; j -= 2) seats.push({ area: "C", row: 2, col: j, sold: 0 });
  seats.push({ area: "M", row: 2, col: 0, sold: 0 });
  for (let j = 0; j < 2; j++) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  seats.push({ area: "M", row: 2, col: 0, sold: 0 });
  for (let j = 13; j >= 1; j -= 2) seats.push({ area: "C", row: 2, col: j, sold: 0 });
  for (let j = 2; j <= 14; j += 2) seats.push({ area: "C", row: 2, col: j, sold: 0 });
  seats.push({ area: "M", row: 2, col: 0, sold: 0 });
  for (let j = 0; j < 2; j++) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  seats.push({ area: "M", row: 2, col: 0, sold: 0 });
  for (let j = 16; j <= 20; j += 2) seats.push({ area: "C", row: 2, col: j, sold: 0 });
  for (let j = 22; j <= 26; j += 2) seats.push({ area: "S", row: 2, col: j, sold: 0 });
  for (let j = 0; j < 3; j++) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  for (let j = 28; j <= 30; j += 2) seats.push({ area: "S", row: 2, col: j, sold: 0 });

  // row 3
  for (let j = 37; j >= 23; j -= 2) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  for (let j = 21; j >= 17; j -= 2) seats.push({ area: "C", row: 3, col: j, sold: 0 });
  seats.push({ area: "M", row: 3, col: 0, sold: 0 });
  seats.push({ area: "X", row: 0, col: 0, sold: 0 });
  seats.push({ area: "M", row: 3, col: 0, sold: 0 });
  for (let j = 15; j >= 1; j -= 2) seats.push({ area: "C", row: 3, col: j, sold: 0 });
  for (let j = 2; j <= 14; j += 2) seats.push({ area: "C", row: 3, col: j, sold: 0 });
  seats.push({ area: "M", row: 3, col: 0, sold: 0 });
  for (let j = 0; j < 2; j++) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  seats.push({ area: "M", row: 3, col: 0, sold: 0 });
  for (let j = 16; j <= 20; j += 2) seats.push({ area: "C", row: 3, col: j, sold: 0 });
  for (let j = 22; j <= 36; j += 2) seats.push({ area: "X", row: 0, col: j, sold: 0 });

  for (let j = 0; j < 44; j++) seats.push({ area: "X", row: 0, col: j, sold: 0 });

  //row 4
  for (let j = 31; j >= 15; j -= 2) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  for (let j = 13; j >= 11; j -= 2) seats.push({ area: "S", row: 4, col: j, sold: 0 });
  seats.push({ area: "M", row: 4, col: 0, sold: 0 });
  for (let j = 0; j < 4; j++) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  seats.push({ area: "M", row: 4, col: 0, sold: 0 });
  for (let j = 9; j >= 1; j -= 2) seats.push({ area: "S", row: 4, col: j, sold: 0 });
  for (let j = 2; j <= 6; j += 2) seats.push({ area: "S", row: 4, col: j, sold: 0 });
  seats.push({ area: "M", row: 4, col: 0, sold: 0 });
  for (let j = 0; j < 6; j++) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  seats.push({ area: "M", row: 4, col: 0, sold: 0 });
  for (let j = 8; j <= 10; j += 2) seats.push({ area: "S", row: 4, col: j, sold: 0 });
  for (let j = 12; j <= 28; j += 2) seats.push({ area: "X", row: 0, col: j, sold: 0 });

  //row 5
  for (let j = 31; j >= 17; j -= 2) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  for (let j = 15; j >= 11; j -= 2) seats.push({ area: "S", row: 5, col: j, sold: 0 });
  seats.push({ area: "M", row: 5, col: 0, sold: 0 });
  for (let j = 0; j < 4; j++) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  seats.push({ area: "M", row: 5, col: 0, sold: 0 });
  for (let j = 9; j >= 1; j -= 2) seats.push({ area: "S", row: 5, col: j, sold: 0 });
  for (let j = 2; j <= 8; j += 2) seats.push({ area: "S", row: 5, col: j, sold: 0 });
  seats.push({ area: "M", row: 5, col: 0, sold: 0 });
  for (let j = 0; j < 5; j++) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  seats.push({ area: "M", row: 5, col: 0, sold: 0 });
  for (let j = 10; j <= 14; j += 2) seats.push({ area: "S", row: 5, col: j, sold: 0 });
  for (let j = 16; j <= 30; j += 2) seats.push({ area: "X", row: 0, col: j, sold: 0 });

  //row 6
  for (let j = 31; j >= 15; j -= 2) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  for (let j = 13; j >= 11; j -= 2) seats.push({ area: "S", row: 6, col: j, sold: 0 });
  seats.push({ area: "M", row: 6, col: 0, sold: 0 });
  for (let j = 0; j < 20; j++) seats.push({ area: "X", row: 0, col: j, sold: 0 });
  seats.push({ area: "M", row: 6, col: 0, sold: 0 });
  for (let j = 10; j <= 12; j += 2) seats.push({ area: "S", row: 6, col: j, sold: 0 });
  for (let j = 14; j <= 30; j += 2) seats.push({ area: "X", row: 0, col: j, sold: 0 });



  for (let i = 0; i < 44 * 17; i++) seats[i].floor = 1;
  for (let i = 0; i < 44 * 17; i++) seats[i].position = { row: seats[i].row, col: seats[i].col, floor: seats[i].floor };
  for (let i = 44 * 17; i < seats.length; i++) seats[i].floor = 2;
  for (let i = 44 * 17; i < seats.length; i++) seats[i].position = { row: seats[i].row, col: seats[i].col, floor: seats[i].floor };
  return seats;
}

// seats = generate_seats();
// console.log(seats);
module.exports = generate_seats;
