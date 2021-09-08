import { Component, NgModule, Output, Input, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ItemClickEvent } from 'devextreme/ui/tree_view';
import { DxTreeViewModule, DxTreeViewComponent } from 'devextreme-angular/ui/tree-view';
import { navigation } from '../../../app-navigation';

import * as events from 'devextreme/events';

@Component({
  selector: 'app-side-navigation-menu',
  templateUrl: './side-navigation-menu.component.html',
  styleUrls: ['./side-navigation-menu.component.scss']
})
export class SideNavigationMenuComponent implements AfterViewInit, OnDestroy {
  @ViewChild(DxTreeViewComponent, { static: true })
  menu!: DxTreeViewComponent;

  @Output()
  selectedItemChanged = new EventEmitter<ItemClickEvent>();

  @Output()
  openMenu = new EventEmitter<any>();

  private _selectedItem!: String;
  @Input()
  set selectedItem(value: String) {
    this._selectedItem = value;
    if (!this.menu.instance) {
      return;
    }

    this.menu.instance.selectItem(value);
  }

  private _items!: Record<string, unknown>[];
  get items() {
    //let items = JSON.parse(localStorage.getItem("menuData")!);
    if (!this._items) {
    this._items = navigation.map((item) => {
      if(item.path && !(/^\//.test(item.path))){
        item.path = `/${item.path}`;
      }
      this.enableItemsByUserRole(item);
      return { ...item, expanded: !this._compactMode }
    });
    //localStorage.setItem("menuData", JSON.stringify(this._items))
  }
    return this._items;
  }

  private _compactMode = false;
  @Input()
  get compactMode() {
    return this._compactMode;
  }
  set compactMode(val) {
    this._compactMode = val;

    if (!this.menu.instance) {
      return;
    }

    if (val) {
      this.menu.instance.collapseAll();
    } else {
      this.menu.instance.expandItem(this._selectedItem);
    }
  }

  constructor(private elementRef: ElementRef) { }

  enableItemsByUserRole(item: any) {

    let userData = JSON.parse(localStorage.getItem("auth_meta")!);

    if (userData != undefined) {

      //habilitar menu principal
        if(item.rolesMenu.length>0){
          let estaEnRol = item.rolesMenu.find((y: { rol: string; }) => y.rol == userData.tipo) != undefined ? true : false;
        if (item.rolesMenu != undefined && estaEnRol == false) {
          item.visible = false;
        }
        }


      //habilitar subMenus
      item.items.forEach((x: { roles: string | any; visible: boolean; }) => {
        if(x.roles){
          let estaEnRol = x.roles.find((y: { rol: string; }) => y.rol == userData.tipo) != undefined ? true : false;
        if (x.roles != undefined && estaEnRol == false) {
          x.visible = false;
        }
        }
      });
    }

  }

  onItemClick(event: ItemClickEvent) {
    this.selectedItemChanged.emit(event);
  }

  ngAfterViewInit() {
    events.on(this.elementRef.nativeElement, 'dxclick', (e: Event) => {
      this.openMenu.next(e);
    });
  }

  ngOnDestroy() {
    events.off(this.elementRef.nativeElement, 'dxclick');
  }
}

@NgModule({
  imports: [DxTreeViewModule],
  declarations: [SideNavigationMenuComponent],
  exports: [SideNavigationMenuComponent]
})
export class SideNavigationMenuModule { }
