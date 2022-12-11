import { Location } from '@angular/common';
import { ComponentFactoryResolver, ComponentRef, ElementRef, EventEmitter, NgZone, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, ChildrenOutletContexts, OutletContext, Router } from '@angular/router';
import { AnimationBuilder } from '../../';
import { Config } from '../../providers/config';
import { NavController } from '../../providers/nav-controller';
import { RouteView } from './stack-utils';
import * as ɵngcc0 from '@angular/core';
export declare class IonRouterOutlet implements OnDestroy, OnInit {
    private parentContexts;
    private location;
    private resolver;
    private config;
    private navCtrl;
    readonly parentOutlet?: IonRouterOutlet;
    nativeEl: HTMLIonRouterOutletElement;
    private activated;
    private activatedView;
    private _activatedRoute;
    private _swipeGesture?;
    private name;
    private stackCtrl;
    private proxyMap;
    private currentActivatedRoute$;
    tabsPrefix: string | undefined;
    stackEvents: EventEmitter<any>;
    activateEvents: EventEmitter<any>;
    deactivateEvents: EventEmitter<any>;
    animation: AnimationBuilder;
    animated: boolean;
    swipeGesture: boolean;
    constructor(parentContexts: ChildrenOutletContexts, location: ViewContainerRef, resolver: ComponentFactoryResolver, name: string, tabs: string, config: Config, navCtrl: NavController, commonLocation: Location, elementRef: ElementRef, router: Router, zone: NgZone, activatedRoute: ActivatedRoute, parentOutlet?: IonRouterOutlet);
    ngOnDestroy(): void;
    getContext(): OutletContext | null;
    ngOnInit(): void;
    readonly isActivated: boolean;
    readonly component: object;
    readonly activatedRoute: ActivatedRoute;
    readonly activatedRouteData: any;
    /**
     * Called when the `RouteReuseStrategy` instructs to detach the subtree
     */
    detach(): ComponentRef<any>;
    /**
     * Called when the `RouteReuseStrategy` instructs to re-attach a previously detached subtree
     */
    attach(_ref: ComponentRef<any>, _activatedRoute: ActivatedRoute): void;
    deactivate(): void;
    activateWith(activatedRoute: ActivatedRoute, resolver: ComponentFactoryResolver | null): void;
    /**
     * Returns `true` if there are pages in the stack to go back.
     */
    canGoBack(deep?: number, stackId?: string): boolean;
    /**
     * Resolves to `true` if it the outlet was able to sucessfully pop the last N pages.
     */
    pop(deep?: number, stackId?: string): Promise<boolean>;
    /**
     * Returns the URL of the active page of each stack.
     */
    getLastUrl(stackId?: string): string | undefined;
    /**
     * Returns the RouteView of the active page of each stack.
     * @internal
     */
    getLastRouteView(stackId?: string): RouteView | undefined;
    /**
     * Returns the root view in the tab stack.
     * @internal
     */
    getRootView(stackId?: string): RouteView | undefined;
    /**
     * Returns the active stack ID. In the context of ion-tabs, it means the active tab.
     */
    getActiveStackId(): string | undefined;
    /**
     * Since the activated route can change over the life time of a component in an ion router outlet, we create
     * a proxy so that we can update the values over time as a user navigates back to components already in the stack.
     */
    private createActivatedRouteProxy;
    /**
     * Create a wrapped observable that will switch to the latest activated route matched by the given component
     */
    private proxyObservable;
    /**
     * Updates the activated route proxy for the given component to the new incoming router state
     */
    private updateActivatedRouteProxy;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<IonRouterOutlet, [null, null, null, { attribute: "name"; }, { attribute: "tabs"; optional: true; }, null, null, null, null, null, null, null, { optional: true; skipSelf: true; }]>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<IonRouterOutlet, "ion-router-outlet", ["outlet"], { "animated": "animated"; "animation": "animation"; "swipeGesture": "swipeGesture"; }, { "stackEvents": "stackEvents"; "activateEvents": "activate"; "deactivateEvents": "deactivate"; }, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW9uLXJvdXRlci1vdXRsZXQuZC50cyIsInNvdXJjZXMiOlsiaW9uLXJvdXRlci1vdXRsZXQuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQ29tcG9uZW50UmVmLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIE5nWm9uZSwgT25EZXN0cm95LCBPbkluaXQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBDaGlsZHJlbk91dGxldENvbnRleHRzLCBPdXRsZXRDb250ZXh0LCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQW5pbWF0aW9uQnVpbGRlciB9IGZyb20gJy4uLy4uLyc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLi8uLi9wcm92aWRlcnMvY29uZmlnJztcbmltcG9ydCB7IE5hdkNvbnRyb2xsZXIgfSBmcm9tICcuLi8uLi9wcm92aWRlcnMvbmF2LWNvbnRyb2xsZXInO1xuaW1wb3J0IHsgUm91dGVWaWV3IH0gZnJvbSAnLi9zdGFjay11dGlscyc7XG5leHBvcnQgZGVjbGFyZSBjbGFzcyBJb25Sb3V0ZXJPdXRsZXQgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gICAgcHJpdmF0ZSBwYXJlbnRDb250ZXh0cztcbiAgICBwcml2YXRlIGxvY2F0aW9uO1xuICAgIHByaXZhdGUgcmVzb2x2ZXI7XG4gICAgcHJpdmF0ZSBjb25maWc7XG4gICAgcHJpdmF0ZSBuYXZDdHJsO1xuICAgIHJlYWRvbmx5IHBhcmVudE91dGxldD86IElvblJvdXRlck91dGxldDtcbiAgICBuYXRpdmVFbDogSFRNTElvblJvdXRlck91dGxldEVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBhY3RpdmF0ZWQ7XG4gICAgcHJpdmF0ZSBhY3RpdmF0ZWRWaWV3O1xuICAgIHByaXZhdGUgX2FjdGl2YXRlZFJvdXRlO1xuICAgIHByaXZhdGUgX3N3aXBlR2VzdHVyZT87XG4gICAgcHJpdmF0ZSBuYW1lO1xuICAgIHByaXZhdGUgc3RhY2tDdHJsO1xuICAgIHByaXZhdGUgcHJveHlNYXA7XG4gICAgcHJpdmF0ZSBjdXJyZW50QWN0aXZhdGVkUm91dGUkO1xuICAgIHRhYnNQcmVmaXg6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBzdGFja0V2ZW50czogRXZlbnRFbWl0dGVyPGFueT47XG4gICAgYWN0aXZhdGVFdmVudHM6IEV2ZW50RW1pdHRlcjxhbnk+O1xuICAgIGRlYWN0aXZhdGVFdmVudHM6IEV2ZW50RW1pdHRlcjxhbnk+O1xuICAgIGFuaW1hdGlvbjogQW5pbWF0aW9uQnVpbGRlcjtcbiAgICBhbmltYXRlZDogYm9vbGVhbjtcbiAgICBzd2lwZUdlc3R1cmU6IGJvb2xlYW47XG4gICAgY29uc3RydWN0b3IocGFyZW50Q29udGV4dHM6IENoaWxkcmVuT3V0bGV0Q29udGV4dHMsIGxvY2F0aW9uOiBWaWV3Q29udGFpbmVyUmVmLCByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBuYW1lOiBzdHJpbmcsIHRhYnM6IHN0cmluZywgY29uZmlnOiBDb25maWcsIG5hdkN0cmw6IE5hdkNvbnRyb2xsZXIsIGNvbW1vbkxvY2F0aW9uOiBMb2NhdGlvbiwgZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcm91dGVyOiBSb3V0ZXIsIHpvbmU6IE5nWm9uZSwgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwYXJlbnRPdXRsZXQ/OiBJb25Sb3V0ZXJPdXRsZXQpO1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQ7XG4gICAgZ2V0Q29udGV4dCgpOiBPdXRsZXRDb250ZXh0IHwgbnVsbDtcbiAgICBuZ09uSW5pdCgpOiB2b2lkO1xuICAgIHJlYWRvbmx5IGlzQWN0aXZhdGVkOiBib29sZWFuO1xuICAgIHJlYWRvbmx5IGNvbXBvbmVudDogb2JqZWN0O1xuICAgIHJlYWRvbmx5IGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZTtcbiAgICByZWFkb25seSBhY3RpdmF0ZWRSb3V0ZURhdGE6IGFueTtcbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2hlbiB0aGUgYFJvdXRlUmV1c2VTdHJhdGVneWAgaW5zdHJ1Y3RzIHRvIGRldGFjaCB0aGUgc3VidHJlZVxuICAgICAqL1xuICAgIGRldGFjaCgpOiBDb21wb25lbnRSZWY8YW55PjtcbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2hlbiB0aGUgYFJvdXRlUmV1c2VTdHJhdGVneWAgaW5zdHJ1Y3RzIHRvIHJlLWF0dGFjaCBhIHByZXZpb3VzbHkgZGV0YWNoZWQgc3VidHJlZVxuICAgICAqL1xuICAgIGF0dGFjaChfcmVmOiBDb21wb25lbnRSZWY8YW55PiwgX2FjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSk6IHZvaWQ7XG4gICAgZGVhY3RpdmF0ZSgpOiB2b2lkO1xuICAgIGFjdGl2YXRlV2l0aChhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUsIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIgfCBudWxsKTogdm9pZDtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGVyZSBhcmUgcGFnZXMgaW4gdGhlIHN0YWNrIHRvIGdvIGJhY2suXG4gICAgICovXG4gICAgY2FuR29CYWNrKGRlZXA/OiBudW1iZXIsIHN0YWNrSWQ/OiBzdHJpbmcpOiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIFJlc29sdmVzIHRvIGB0cnVlYCBpZiBpdCB0aGUgb3V0bGV0IHdhcyBhYmxlIHRvIHN1Y2Vzc2Z1bGx5IHBvcCB0aGUgbGFzdCBOIHBhZ2VzLlxuICAgICAqL1xuICAgIHBvcChkZWVwPzogbnVtYmVyLCBzdGFja0lkPzogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPjtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBVUkwgb2YgdGhlIGFjdGl2ZSBwYWdlIG9mIGVhY2ggc3RhY2suXG4gICAgICovXG4gICAgZ2V0TGFzdFVybChzdGFja0lkPzogc3RyaW5nKTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIFJvdXRlVmlldyBvZiB0aGUgYWN0aXZlIHBhZ2Ugb2YgZWFjaCBzdGFjay5cbiAgICAgKiBAaW50ZXJuYWxcbiAgICAgKi9cbiAgICBnZXRMYXN0Um91dGVWaWV3KHN0YWNrSWQ/OiBzdHJpbmcpOiBSb3V0ZVZpZXcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgcm9vdCB2aWV3IGluIHRoZSB0YWIgc3RhY2suXG4gICAgICogQGludGVybmFsXG4gICAgICovXG4gICAgZ2V0Um9vdFZpZXcoc3RhY2tJZD86IHN0cmluZyk6IFJvdXRlVmlldyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBhY3RpdmUgc3RhY2sgSUQuIEluIHRoZSBjb250ZXh0IG9mIGlvbi10YWJzLCBpdCBtZWFucyB0aGUgYWN0aXZlIHRhYi5cbiAgICAgKi9cbiAgICBnZXRBY3RpdmVTdGFja0lkKCk6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTaW5jZSB0aGUgYWN0aXZhdGVkIHJvdXRlIGNhbiBjaGFuZ2Ugb3ZlciB0aGUgbGlmZSB0aW1lIG9mIGEgY29tcG9uZW50IGluIGFuIGlvbiByb3V0ZXIgb3V0bGV0LCB3ZSBjcmVhdGVcbiAgICAgKiBhIHByb3h5IHNvIHRoYXQgd2UgY2FuIHVwZGF0ZSB0aGUgdmFsdWVzIG92ZXIgdGltZSBhcyBhIHVzZXIgbmF2aWdhdGVzIGJhY2sgdG8gY29tcG9uZW50cyBhbHJlYWR5IGluIHRoZSBzdGFjay5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNyZWF0ZUFjdGl2YXRlZFJvdXRlUHJveHk7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgd3JhcHBlZCBvYnNlcnZhYmxlIHRoYXQgd2lsbCBzd2l0Y2ggdG8gdGhlIGxhdGVzdCBhY3RpdmF0ZWQgcm91dGUgbWF0Y2hlZCBieSB0aGUgZ2l2ZW4gY29tcG9uZW50XG4gICAgICovXG4gICAgcHJpdmF0ZSBwcm94eU9ic2VydmFibGU7XG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgYWN0aXZhdGVkIHJvdXRlIHByb3h5IGZvciB0aGUgZ2l2ZW4gY29tcG9uZW50IHRvIHRoZSBuZXcgaW5jb21pbmcgcm91dGVyIHN0YXRlXG4gICAgICovXG4gICAgcHJpdmF0ZSB1cGRhdGVBY3RpdmF0ZWRSb3V0ZVByb3h5O1xufVxuIl19