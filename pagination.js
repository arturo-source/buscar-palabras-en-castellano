class Paginator {
  constructor({
    elements,
    cellsPerRow = 5,
    rowsPerPage = 4,
    prevBtn,
    nextBtn,
  }) {
    this.elements = elements;

    this.currentPage = 0;

    this.cellsPerRow = cellsPerRow;
    this.rowsPerPage = rowsPerPage;

    this.prevBtn = prevBtn;
    this.nextBtn = nextBtn;

    this.prevBtn.onclick = () => {
      if (this.currentPage > 0) {
        this.currentPage--;
        this.disable();
      }
    };
    this.nextBtn.onclick = () => {
      if (this.currentPage < this.lastPage) {
        this.currentPage++;
        this.disable();
      }
    };
  }

  disable() {
    if (this.currentPage == 0) this.prevBtn.setAttribute("disabled", "");
    else this.prevBtn.removeAttribute("disabled", "");

    if (this.currentPage == this.lastPage || this.lastPage == -1)
      this.nextBtn.setAttribute("disabled", "");
    else this.nextBtn.removeAttribute("disabled", "");
  }

  get cellsPerPage() {
    return this.rowsPerPage * this.cellsPerRow;
  }
  get lastPage() {
    return Math.ceil(this.elements.length / cellsPerPage) - 1;
  }
  get currentElements() {
    let next_pos = this.currentPage * this.cellsPerPage;
    let table = Array(this.rowsPerPage).fill(Array());
    for (const i in table) {
      table[i] = Array(this.cellsPerRow);
    }

    for (let i = 0; i < this.rowsPerPage; i++) {
      for (let j = 0; j < this.cellsPerRow; j++) {
        if (next_pos < this.elements.length) {
          table[i][j] = this.elements[next_pos];
          next_pos++;
        }
      }
    }

    return table;
  }
}

// Example
window.onload = () => {
  prevBtn = document.getElementById("prev"); // Introduce btn ID
  nextBtn = document.getElementById("next"); // Introduce btn ID

  var paginator = new Paginator({
    elements: [2, 3, 65, "sd", "dfo", "95j", 3],
    cellsPerRow: 5,
    rowsPerPage: 4,
    prevBtn: prevBtn,
    nextBtn: nextBtn,
  });

  // var elements = paginator.currentElements
};
