import {Component, Input, output} from '@angular/core';

@Component({
  selector: 'app-pages-nav',
  imports: [],
  templateUrl: './pages-nav.component.html',
  styleUrl: './pages-nav.component.scss'
})
export class PagesNavComponent {
  onPageUpdate = output<number>();
  page: number = 1;
  @Input() maxPage: number = 1;

  nextPage() {
    if (this.page < this.maxPage) {
      this.page++;
      this.onPageUpdate.emit(this.page);
    }
  }

  prevPage() {
    if (this.page > 0) {
      this.page--;
      this.onPageUpdate.emit(this.page);
    }
  }
}
