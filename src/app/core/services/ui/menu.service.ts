import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {IMenu} from "../../models/ui/menu";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private _menuSubject: Subject<IMenu> = new Subject<IMenu>();
  public menu$ = this._menuSubject.asObservable();

  public show(menu: IMenu): void {
    this._menuSubject.next(menu);
  }
}
