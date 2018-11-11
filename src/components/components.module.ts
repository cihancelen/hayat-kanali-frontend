import { NgModule } from "@angular/core";
import { GeneralMenuComponent } from "./general-menu/general-menu";
import { GeneralToolbarComponent } from "./general-toolbar/general-toolbar";
@NgModule({
  declarations: [GeneralMenuComponent, GeneralToolbarComponent],
  imports: [],
  exports: [GeneralMenuComponent, GeneralToolbarComponent]
})
export class ComponentsModule { }