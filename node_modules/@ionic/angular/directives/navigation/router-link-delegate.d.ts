import { LocationStrategy } from '@angular/common';
import { ElementRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RouterDirection } from '@ionic/core';
import { NavController } from '../../providers/nav-controller';
import * as ɵngcc0 from '@angular/core';
export declare class RouterLinkDelegate {
    private locationStrategy;
    private navCtrl;
    private elementRef;
    private router;
    private routerLink?;
    private subscription?;
    routerDirection: RouterDirection;
    constructor(locationStrategy: LocationStrategy, navCtrl: NavController, elementRef: ElementRef, router: Router, routerLink?: RouterLink);
    ngOnInit(): void;
    ngOnChanges(): any;
    ngOnDestroy(): any;
    private updateTargetUrlAndHref;
    /**
     * @internal
     */
    onClick(ev: UIEvent): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<RouterLinkDelegate, [null, null, null, null, { optional: true; }]>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<RouterLinkDelegate, "[routerLink]", never, { "routerDirection": "routerDirection"; }, {}, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLWxpbmstZGVsZWdhdGUuZC50cyIsInNvdXJjZXMiOlsicm91dGVyLWxpbmstZGVsZWdhdGUuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9jYXRpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIsIFJvdXRlckxpbmsgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgUm91dGVyRGlyZWN0aW9uIH0gZnJvbSAnQGlvbmljL2NvcmUnO1xuaW1wb3J0IHsgTmF2Q29udHJvbGxlciB9IGZyb20gJy4uLy4uL3Byb3ZpZGVycy9uYXYtY29udHJvbGxlcic7XG5leHBvcnQgZGVjbGFyZSBjbGFzcyBSb3V0ZXJMaW5rRGVsZWdhdGUge1xuICAgIHByaXZhdGUgbG9jYXRpb25TdHJhdGVneTtcbiAgICBwcml2YXRlIG5hdkN0cmw7XG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmO1xuICAgIHByaXZhdGUgcm91dGVyO1xuICAgIHByaXZhdGUgcm91dGVyTGluaz87XG4gICAgcHJpdmF0ZSBzdWJzY3JpcHRpb24/O1xuICAgIHJvdXRlckRpcmVjdGlvbjogUm91dGVyRGlyZWN0aW9uO1xuICAgIGNvbnN0cnVjdG9yKGxvY2F0aW9uU3RyYXRlZ3k6IExvY2F0aW9uU3RyYXRlZ3ksIG5hdkN0cmw6IE5hdkNvbnRyb2xsZXIsIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHJvdXRlcjogUm91dGVyLCByb3V0ZXJMaW5rPzogUm91dGVyTGluayk7XG4gICAgbmdPbkluaXQoKTogdm9pZDtcbiAgICBuZ09uQ2hhbmdlcygpOiBhbnk7XG4gICAgbmdPbkRlc3Ryb3koKTogYW55O1xuICAgIHByaXZhdGUgdXBkYXRlVGFyZ2V0VXJsQW5kSHJlZjtcbiAgICAvKipcbiAgICAgKiBAaW50ZXJuYWxcbiAgICAgKi9cbiAgICBvbkNsaWNrKGV2OiBVSUV2ZW50KTogdm9pZDtcbn1cbiJdfQ==