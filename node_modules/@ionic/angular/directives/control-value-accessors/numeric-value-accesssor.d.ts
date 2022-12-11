import { ElementRef } from '@angular/core';
import { ValueAccessor } from './value-accessor';
import * as ɵngcc0 from '@angular/core';
export declare class NumericValueAccessor extends ValueAccessor {
    constructor(el: ElementRef);
    _handleIonChange(el: any): void;
    registerOnChange(fn: (_: number | null) => void): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NumericValueAccessor, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<NumericValueAccessor, "ion-input[type=number]", never, {}, {}, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtZXJpYy12YWx1ZS1hY2Nlc3Nzb3IuZC50cyIsInNvdXJjZXMiOlsibnVtZXJpYy12YWx1ZS1hY2Nlc3Nzb3IuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZhbHVlQWNjZXNzb3IgfSBmcm9tICcuL3ZhbHVlLWFjY2Vzc29yJztcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE51bWVyaWNWYWx1ZUFjY2Vzc29yIGV4dGVuZHMgVmFsdWVBY2Nlc3NvciB7XG4gICAgY29uc3RydWN0b3IoZWw6IEVsZW1lbnRSZWYpO1xuICAgIF9oYW5kbGVJb25DaGFuZ2UoZWw6IGFueSk6IHZvaWQ7XG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKF86IG51bWJlciB8IG51bGwpID0+IHZvaWQpOiB2b2lkO1xufVxuIl19