class Paginator {
  constructor({
    elements,
    cellsPerRow = 5,
    rowsPerPage = 4,
    renderFunc,
    prevBtn,
    nextBtn,
    firstBtn,
    lastBtn,
  }) {
    this.elements = elements;

    this.currentPage = 0;

    this.cellsPerRow = cellsPerRow;
    this.rowsPerPage = rowsPerPage;

    this.renderFunc = renderFunc;

    this.prevBtn = prevBtn;
    this.nextBtn = nextBtn;
    this.firstBtn = firstBtn;
    this.lastBtn = lastBtn;

    if (this.prevBtn != undefined)
      this.prevBtn.onclick = () => this.goToPrevPage();

    if (this.nextBtn != undefined)
      this.nextBtn.onclick = () => this.goToNextPage();

    if (this.firstBtn != undefined)
      this.firstBtn.onclick = () => this.goToFirstPage();

    if (this.lastBtn != undefined)
      this.lastBtn.onclick = () => this.goToLastPage();
  }

  render() {
    if (this.currentPage == 0) {
      this.prevBtn?.setAttribute("disabled", "");
      this.firstBtn?.setAttribute("disabled", "");
    } else {
      this.prevBtn?.removeAttribute("disabled", "");
      this.firstBtn?.removeAttribute("disabled", "");
    }

    if (this.currentPage == this.lastPage || this.lastPage == 0) {
      this.nextBtn?.setAttribute("disabled", "");
      this.lastBtn?.setAttribute("disabled", "");
    } else {
      this.nextBtn?.removeAttribute("disabled", "");
      this.lastBtn?.removeAttribute("disabled", "");
    }

    this.renderFunc(this.currentElements);
  }

  getCurrentPageInfo(messageGeneratorFunc) {
    return messageGeneratorFunc({
      count: this.cellsPerPage,
      curr: this.currentPage + 1,
      last: this.lastPage + 1,
    });
  }

  goToPrevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.render();
    }
  }
  goToNextPage() {
    if (this.currentPage < this.lastPage) {
      this.currentPage++;
      this.render();
    }
  }
  goToFirstPage() {
    this.currentPage = 0;
    this.render();
  }
  goToLastPage() {
    this.currentPage = this.lastPage;
    this.render();
  }

  get cellsPerPage() {
    return this.rowsPerPage * this.cellsPerRow;
  }
  get lastPage() {
    return Math.floor(this.elements.length / this.cellsPerPage);
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
