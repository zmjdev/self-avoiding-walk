class Spot {
  constructor({ _x, _y }) {
    this.pos = { x: _x, y: _y };
    this.currentCell;
    this.grid;
    this.path = [];
    this.popedPath = [];
    this.options;
    this.neighbours;
    this.lastVisitedCell;
  }
  setOptions() {
    //console.log("nei", this.neighbours);
    if (this.lastVisitedCell === undefined) {
      //console.log("3");
      this.options = this.neighbours.filter((cell) => cell.isVisited === false);
    } else {
      //console.log("4");
      console.log("lastVisited", this.lastVisitedCell);
      this.options = this.neighbours.filter(
        (cell) =>
          cell.isVisited === false ||
          (this.lastVisitedCell.pos.x !== cell.pos.x &&
            this.lastVisitedCell.pos.y !== cell.pos.y)
      );
      console.log("options", this.options);
      this.lastVisitedCell = undefined;
    }
  }
  getNeighbours(_currentCell = this.currentCell) {
    let top = this.grid.getCellByCordinates(
      this.pos.x,
      this.pos.y - _currentCell.height
    );
    let right = this.grid.getCellByCordinates(
      this.pos.x + _currentCell.width,
      this.pos.y
    );
    let bottom = this.grid.getCellByCordinates(
      this.pos.x,
      this.pos.y + _currentCell.height
    );
    let left = this.grid.getCellByCordinates(
      this.pos.x - _currentCell.width,
      this.pos.y
    );
    var out = [top, right, bottom, left].filter(
      (cell) => Object.keys(cell).length !== 0
    );
    return out;
  }
  showNeighbours(_currentCell = this.currentCell) {
    //let neighbours = this.getNeighbours(_currentCell);
    for (let i = 0; i < this.neighbours.length; i++) {
      this.neighbours[i].show();
    }
  }
  show(_grid) {
    this.grid = _grid;
    if (
      this.currentCell === undefined ||
      Object.keys(this.currentCell).length === 0
    ) {
      //console.log("grid", this.grid);
      //noLoop();
      this.pos.x = 300;
      this.pos.y = 300;
      this.currentCell = this.grid.getCellByCordinates(this.pos.x, this.pos.y);
    }
    this.pos.x = this.currentCell.pos.x + this.currentCell.width / 2;
    this.pos.y = this.currentCell.pos.y + this.currentCell.height / 2;
    this.neighbours = this.getNeighbours(this.currentCell);
    this.setOptions();
    this.grid.setVisited(this.pos.x, this.pos.y);
    //TODO : Remove hard coded value 25
    // if (this.path.length === 25) {
    //   noLoop();
    // }
    if (this.options.length === 0 && this.path.length !== 0) {
      this.popedPath.push(this.path.pop());
      this.currentCell = this.path[this.path.length - 1];
      this.show(this.grid);
      if (this.popedPath.length !== 0) {
        this.popedPath.forEach((cell) => {
          this.grid.setVisited(
            cell.pos.x + cell.width / 2,
            cell.pos.y + cell.height / 2,
            false
          );
        });
        this.popedPath = [];
      }
      //console.log("grid", this.grid);
    } else {
      // if (this.popedPath.length !== 0) {
      //   this.popedPath.forEach((cell) => {
      //     this.grid.setVisited(
      //       cell.pos.x + cell.width / 2,
      //       cell.pos.y + cell.height / 2,
      //       false
      //     );
      //   });
      //   this.popedPath = [];
      // }
      this.path.push(this.currentCell);
      this.currentCell = random(this.options);
    }
    fill(255);
    ellipseMode(CENTER);
    ellipse(this.pos.x, this.pos.y, 10, 10);
  }
}
