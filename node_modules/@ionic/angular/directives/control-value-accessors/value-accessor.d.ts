import { ElementRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as ɵngcc0 from '@angular/core';
export declare class ValueAccessor implements ControlValueAccessor {
    protected el: ElementRef;
    private onChange;
    private onTouched;
    protected lastValue: any;
    constructor(el: ElementRef);
    writeValue(value: any): void;
    handleChangeEvent(el: HTMLElement, value: any): void;
    _handleBlurEvent(el: any): void;
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<ValueAccessor, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<ValueAccessor, never, never, {}, {}, never>;
}
export declare const setIonicClasses: (element: ElementRef<any>) => void;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsdWUtYWNjZXNzb3IuZC50cyIsInNvdXJjZXMiOlsidmFsdWUtYWNjZXNzb3IuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgVmFsdWVBY2Nlc3NvciBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgICBwcm90ZWN0ZWQgZWw6IEVsZW1lbnRSZWY7XG4gICAgcHJpdmF0ZSBvbkNoYW5nZTtcbiAgICBwcml2YXRlIG9uVG91Y2hlZDtcbiAgICBwcm90ZWN0ZWQgbGFzdFZhbHVlOiBhbnk7XG4gICAgY29uc3RydWN0b3IoZWw6IEVsZW1lbnRSZWYpO1xuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQ7XG4gICAgaGFuZGxlQ2hhbmdlRXZlbnQoZWw6IEhUTUxFbGVtZW50LCB2YWx1ZTogYW55KTogdm9pZDtcbiAgICBfaGFuZGxlQmx1ckV2ZW50KGVsOiBhbnkpOiB2b2lkO1xuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiB2b2lkKTogdm9pZDtcbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQ7XG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZDtcbn1cbmV4cG9ydCBkZWNsYXJlIGNvbnN0IHNldElvbmljQ2xhc3NlczogKGVsZW1lbnQ6IEVsZW1lbnRSZWY8YW55PikgPT4gdm9pZDtcbiJdfQ==