import {Component, ContentChild, EventEmitter, HostBinding, Input, Output, ViewEncapsulation} from '@angular/core';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {InputRefDirective} from "./input-ref.directive";

@Component({
    selector: 'fa-input',
    standalone: true,
    imports: [
        FontAwesomeModule
    ],
    template: `
        <fa-icon [icon]="icon"></fa-icon>
        <ng-content></ng-content>
    `,
    styles: ``,
    styleUrl: './fa-input.component.css',
    encapsulation: ViewEncapsulation.None
})
export class FaInputComponent {
    @Input() inputIcon!: IconDefinition;
    @ContentChild(InputRefDirective) input!: InputRefDirective;

    get icon() {
        return this.inputIcon;
    }

    @HostBinding('class.focus')
    get focus() {
        console.log(this.input.focus);
        return this.input ? this.input.focus : false;
    }

}
