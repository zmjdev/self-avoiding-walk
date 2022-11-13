class Grid {
  #rowCount;
  #columCount;
  constructor(_rows, _columns) {
    this.rows = [];
    this.#rowCount = _rows;
    this.#columCount = _columns;
    this.#addRow();
  }
  #addRow() {
    for (let i = 0; i < this.#rowCount; i++) {
      let rowHeight = height / this.#rowCount;
      let rowWidth = width;
      let row = new Row(rowHeight, rowWidth);
      row.pos.x = 0;
      row.pos.y = i * row.height;
      for (let j = 0; j < this.#rowCount; j++) {
        let columnWidth = rowWidth / this.#columCount;
        let column = new Column({
          _x: j * columnWidth,
          _y: i * rowHeight,
          _width: columnWidth,
          _height: rowHeight,
        });
        row.addColumn(column);
      }
      this.rows.push(row);
    }
  }
  setVisited(_x, _y, isVisited = true) {
    var { rows } = this;
    for (let i = 0; i < rows.length; i++) {
      let { columns } = rows[i];
      for (let j = 0; j < columns.length; j++) {
        let boundry = {
          top: columns[j].pos.y,
          right: columns[j].pos.x + columns[j].width,
          bottom: columns[j].pos.y + columns[j].height,
          left: columns[j].pos.x,
        };
        if (
          _y > boundry.top &&
          _y < boundry.bottom &&
          _x > boundry.left &&
          _x < boundry.right
        ) {
          this.rows[i].columns[j].isVisited = isVisited;
        }
      }
    }
  }
  getCellByCordinates(_x, _y) {
    var currentCell;
    var { rows } = this;
    for (let i = 0; i < rows.length; i++) {
      let { columns } = rows[i];
      let filteredColumns = columns.filter(function findCurrentColumn(column) {
        let boundry = {
          top: column.pos.y,
          right: column.pos.x + column.width,
          bottom: column.pos.y + column.height,
          left: column.pos.x,
        };
        return (
          _y > boundry.top &&
          _y < boundry.bottom &&
          _x > boundry.left &&
          _x < boundry.right
        );
      });
      if (filteredColumns.length > 0) {
        currentCell = filteredColumns[0];
        return currentCell;
      }
    }
    return {};
  }
  show() {
    for (let i = 0; i < this.rows.length; i++) {
      noFill();
      strokeWeight(1);
      stroke(255);
      rect(
        this.rows[i].pos.x,
        this.rows[i].pos.y,
        this.rows[i].width,
        this.rows[i].height
      );
      this.rows[i].show();
    }
  }
}

class Row {
  constructor(_height = height / 10, _width = width) {
    this.columns = [];
    this.height = _height;
    this.width = _width;
    this.pos = { x: 0, y: 0 };
  }
  addColumn(_column) {
    this.columns.push(_column);
  }

  show() {
    for (let i = 0; i < this.columns.length; i++) {
      noFill();
      strokeWeight(1);
      stroke(255);
      rect(
        this.columns[i].pos.x,
        this.columns[i].pos.y,
        this.columns[i].width,
        this.columns[i].height
      );
    }
  }
}
class Column {
  constructor({ _x, _y, _width, _height }) {
    this.pos = { x: _x, y: _y };
    this.height = _height;
    this.width = _width;
    this.isVisited = false;
  }
  show() {
    if (!this.isVisited) {
      fill(0, 255, 0);
      rect(this.pos.x, this.pos.y, this.width, this.height);
    } else {
      fill(255, 0, 0);
      rect(this.pos.x, this.pos.y, this.width, this.height);
    }
    // noFill();
    // noStroke();
    // rect(this.pos.x, this.pos.y, this.width, this.height);
  }
}
