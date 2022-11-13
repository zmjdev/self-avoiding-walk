var rows = 5;
var columns = 5;
var grid;
var spot;
var path = [];
var step;
var pos = {};

function setup() {
  createCanvas(600, 600);
  frameRate(1);
  step = width / columns;
  pos.x = width / 2;
  pos.y = height / 2;
  grid = new Grid(rows, columns);
  spot = new Spot({ _x: pos.x, _y: pos.y, neighbors: [] });
}
function draw() {
  background(0);
  grid.show();
  spot.show(grid);
  noFill();
  stroke(160, 32, 240);
  strokeWeight(3);
  beginShape();
  for (let i = 0; i < spot.path.length; i++) {
    vertex(
      spot.path[i].pos.x + spot.path[i].width / 2,
      spot.path[i].pos.y + spot.path[i].height / 2
    );
  }
  endShape();
  //spot.showNeighbours();
  //showAll(grid);
  if (path.length === grid.rows.length * grid.rows[0].columns.length) {
    console.log("Completed!!");
    noLoop();
  }
}

function showAll(_grid) {
  var { rows } = _grid;
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].columns.length; j++) {
      grid.rows[i].columns[j].show();
    }
  }
}
