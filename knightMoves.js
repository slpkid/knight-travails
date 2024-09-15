function knightFactory(coord, moveHistory) {
  if (coord[0] < 0 || coord[1] < 0 || coord[0] > 7 || coord[1] > 7) return null;
  let upLeft = null;
  let upRight = null;
  let leftUp = null;
  let leftDown = null;
  let rightUp = null;
  let rightDown = null;
  let downLeft = null;
  let downRight = null;
  if (moveHistory) {
    moveHistory = [...moveHistory, coord];
  } else {
    moveHistory = [[coord[0], coord[1]]];
  }

  return {
    upRight,
    upLeft,
    leftUp,
    leftDown,
    rightUp,
    rightDown,
    downRight,
    downLeft,
    coord,
    moveHistory,
  };
}

function knightMoves(startCoord, endCoord) {
  if (!startCoord || !endCoord) return console.log("Missing input");
  if (Array.isArray(startCoord) === false || Array.isArray(endCoord) === false)
    return console.log("Invalid input. Enter two coordinates in array form.");
  if (startCoord.length !== 2 || endCoord.length !== 2)
    return console.log("Invalid ");

  const knight = knightFactory(startCoord);
  let queueFIFO = [];
  let solutionsArray = [];
  let solutionFound = false;

  function findKnightShortestPath() {
    if (startCoord[0] === endCoord[0] && startCoord[1] === endCoord[1])
      return solutionsArray.push([startCoord, endCoord]);
    queueFIFO.push(knight);

    while (queueFIFO.length > 0) {
      let current = queueFIFO[0];
      // check if current knight's coordiantes match the destination.
      if (
        current.coord[0] === endCoord[0] &&
        current.coord[1] === endCoord[1]
      ) {
        // if so, stop enqueueing and push the solution to the solutionArray
        solutionFound = true;
        solutionsArray.push(current.moveHistory);
      }

      // create the all of the knight's possible moves
      current.upLeft = knightFactory(
        [current.coord[0] - 1, current.coord[1] + 2],
        current.moveHistory
      );
      current.upRight = knightFactory(
        [current.coord[0] + 1, current.coord[1] + 2],
        current.moveHistory
      );
      current.leftUp = knightFactory(
        [current.coord[0] - 2, current.coord[1] + 1],
        current.moveHistory
      );
      current.leftDown = knightFactory(
        [current.coord[0] - 2, current.coord[1] - 1],
        current.moveHistory
      );
      current.rightUp = knightFactory(
        [current.coord[0] + 2, current.coord[1] + 1],
        current.moveHistory
      );
      current.rightDown = knightFactory(
        [current.coord[0] + 2, current.coord[1] - 1],
        current.moveHistory
      );
      current.downLeft = knightFactory(
        [current.coord[0] - 1, current.coord[1] - 2],
        current.moveHistory
      );
      current.downRight = knightFactory(
        [current.coord[0] + 1, current.coord[1] - 2],
        current.moveHistory
      );

      //if a solution hasn't been found then enqueue child nodes
      if (solutionFound === false) {
        if (current.upLeft !== null) queueFIFO.push(current.upLeft);
        if (current.upRight !== null) queueFIFO.push(current.upRight);
        if (current.leftUp !== null) queueFIFO.push(current.leftUp);
        if (current.leftDown !== null) queueFIFO.push(current.leftDown);
        if (current.rightUp !== null) queueFIFO.push(current.rightUp);
        if (current.rightDown !== null) queueFIFO.push(current.rightDown);
        if (current.downLeft !== null) queueFIFO.push(current.downLeft);
        if (current.downRight !== null) queueFIFO.push(current.downRight);
      }
      // dequeue first item in queue
      queueFIFO.shift();
    }
  }

  findKnightShortestPath();

  console.log(solutionsArray);

  console.log(
    `Shortest route is ${solutionsArray[0].length - 1} steps! There were also ${
      solutionsArray.length
    } possible solutions! Here is one such path:`
  );
  solutionsArray[0].forEach((step) => {
    console.log(`[${step[0]},${step[1]}]`);
  });
}

knightMoves([0, 0], [5, 5]);
