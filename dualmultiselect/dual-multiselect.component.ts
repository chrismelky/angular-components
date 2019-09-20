import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

@Component({
  selector: 'app-dual-multiselect',
  templateUrl: './dual-multiselect.component.html',
  styleUrls: ['./dual-multiselect.component.sass']
})
export class DualMultiselectComponent implements OnInit, AfterViewInit {

  items: any[] = [];
  searchName = '';
  itemsToSelect = [];
  itemsToRemove = [];
  isSearching: boolean;
  @Input() title: string;
  @Input() labelAll: string;
  @Input() labelSelected: string;
  @Input() itemService;
  @Input() selectedItems = [];
  @Output() selectionChanged: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    if (this.selectedItems == null) {
      this.selectedItems = [];
    }
  }

  /**
   * Load items after view is complete initialized
   */
  ngAfterViewInit(): void {
    this.loadItems({});
  }

  /**
   * Function to load items with optional search name
   * @param searchText = search string
   */
  loadItems(searchText) {
    this.isSearching = true;
    this.itemService.get(searchText).subscribe( items => {
      console.log(items);
      this.isSearching = false;
      this.items = items.data;
      this.refreshList();
    }, (err) => {
      this.isSearching = false;
      console.log('error', err);
    });
  }

  searchItems(searchName): void {
    console.log(searchName);
    this.loadItems({'name.contains': searchName});
  }

  selectItem() {
    this.itemsToSelect.forEach(item => {
      const idx = this.items.map(i => i.id).indexOf(item.id);
      if (idx !== -1) {
        this.items.splice(idx, 1);
        this.selectedItems.push(item);
        this.itemsToSelect = [];
      }
    });
    this.selectionChanged.emit(this.selectedItems);
    this.refreshList();
  }

  selectAll() {
    this.items.forEach(item => {
      this.selectedItems.push(item);
    });
    this.items = [];
    this.itemsToSelect = [];
    this.selectionChanged.emit(this.selectedItems);
    this.refreshList();
  }

  removeItem() {
    this.itemsToRemove.forEach(item => {
      const idx = this.selectedItems.map(i => i.id).indexOf(item.id);
      if (idx !== -1) {
        this.selectedItems.splice(idx, 1);
        this.items.push(item);
        this.itemsToRemove = [];
      }
    });
    this.selectionChanged.emit(this.selectedItems);
    this.refreshList();
  }

  removeAll() {
    this.selectedItems.forEach(item => {
      this.items.push(item);
    });
    this.itemsToRemove = [];
    this.selectedItems = [];
    this.selectionChanged.emit(this.selectedItems);
    this.refreshList();
  }

  refreshList() {
    this.selectedItems.forEach(item => {
      const idx = this.items.map(i => i.id).indexOf(item.id);

      if (idx !== -1) {
        this.items.splice(idx, 1);
      }
    });
  }
}
