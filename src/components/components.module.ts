import { NgModule } from "@angular/core";
import { GeneralMenuComponent } from "./general-menu/general-menu";
import { GeneralToolbarComponent } from "./general-toolbar/general-toolbar";
import { RequestItemComponent } from './request-item/request-item';
@NgModule({
  declarations: [GeneralMenuComponent, GeneralToolbarComponent,
    RequestItemComponent],
  imports: [],
  exports: [GeneralMenuComponent, GeneralToolbarComponent,
    RequestItemComponent]
})
export class ComponentsModule { }