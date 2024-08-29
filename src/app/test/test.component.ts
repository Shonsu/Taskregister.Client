import {Component} from '@angular/core';
// import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faCoffee, faEnvelope, faKey} from '@fortawesome/free-solid-svg-icons';
import {FaInputComponent} from "./fa-input.component";
import {InputRefDirective} from "./input-ref.directive";

@Component({
    selector: 'app-test',
    standalone: true,
    imports: [FaInputComponent, InputRefDirective],
    template: `
        <h1>FA Input</h1>

        <fa-input [inputIcon]="faEnvelope" tabindex="0">
            <input inputRef type="email" placeholder="Email" (keyup)="logValue(input.value)" #input>
        </fa-input>
        <fa-input [inputIcon]="faKey" tabindex="0">
            <input inputRef type="password" placeholder="password" (keyup)="logValue(pass.value)" #pass>
        </fa-input>
    `,
    styles: ``
})
export class TestComponent {
    protected readonly faEnvelope = faEnvelope;

    onNewValue(val: string) {
        console.log(val);
    }

    logValue(value: string) {
        console.log(value);
    }

    protected readonly faKey = faKey;
}
