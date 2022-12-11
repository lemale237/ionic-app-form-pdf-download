import { Location } from '@angular/common';
import { NavigationExtras, Router, UrlSerializer, UrlTree } from '@angular/router';
import { NavDirection, RouterDirection } from '@ionic/core';
import { IonRouterOutlet } from '../directives/navigation/ion-router-outlet';
import { Platform } from './platform';
import * as ɵngcc0 from '@angular/core';
export interface AnimationOptions {
    animated?: boolean;
    animationDirection?: 'forward' | 'back';
}
export interface NavigationOptions extends NavigationExtras, AnimationOptions {
}
export declare class NavController {
    private location;
    private serializer;
    private router?;
    private topOutlet?;
    private direction;
    private animated?;
    private guessDirection;
    private guessAnimation?;
    private lastNavId;
    constructor(platform: Platform, location: Location, serializer: UrlSerializer, router?: Router);
    /**
     * This method uses Angular's [Router](https://angular.io/api/router/Router) under the hood,
     * it's equivalent to calling `this.router.navigateByUrl()`, but it's explicit about the **direction** of the transition.
     *
     * Going **forward** means that a new page is going to be pushed to the stack of the outlet (ion-router-outlet),
     * and that it will show a "forward" animation by default.
     *
     * Navigating forward can also be triggered in a declarative manner by using the `[routerDirection]` directive:
     *
     * ```html
     * <a routerLink="/path/to/page" routerDirection="forward">Link</a>
     * ```
     */
    navigateForward(url: string | UrlTree | any[], options?: NavigationOptions): Promise<boolean>;
    /**
     * This method uses Angular's [Router](https://angular.io/api/router/Router) under the hood,
     * it's equivalent to calling:
     *
     * ```ts
     * this.navController.setDirection('back');
     * this.router.navigateByUrl(path);
     * ```
     *
     * Going **back** means that all the pages in the stack until the navigated page is found will be popped,
     * and that it will show a "back" animation by default.
     *
     * Navigating back can also be triggered in a declarative manner by using the `[routerDirection]` directive:
     *
     * ```html
     * <a routerLink="/path/to/page" routerDirection="back">Link</a>
     * ```
     */
    navigateBack(url: string | UrlTree | any[], options?: NavigationOptions): Promise<boolean>;
    /**
     * This method uses Angular's [Router](https://angular.io/api/router/Router) under the hood,
     * it's equivalent to calling:
     *
     * ```ts
     * this.navController.setDirection('root');
     * this.router.navigateByUrl(path);
     * ```
     *
     * Going **root** means that all existing pages in the stack will be removed,
     * and the navigated page will become the single page in the stack.
     *
     * Navigating root can also be triggered in a declarative manner by using the `[routerDirection]` directive:
     *
     * ```html
     * <a routerLink="/path/to/page" routerDirection="root">Link</a>
     * ```
     */
    navigateRoot(url: string | UrlTree | any[], options?: NavigationOptions): Promise<boolean>;
    /**
     * Same as [Location](https://angular.io/api/common/Location)'s back() method.
     * It will use the standard `window.history.back()` under the hood, but featuring a `back` animation
     * by default.
     */
    back(options?: AnimationOptions): void;
    /**
     * This methods goes back in the context of Ionic's stack navigation.
     *
     * It recursively finds the top active `ion-router-outlet` and calls `pop()`.
     * This is the recommended way to go back when you are using `ion-router-outlet`.
     */
    pop(): Promise<void>;
    /**
     * This methods specifies the direction of the next navigation performed by the Angular router.
     *
     * `setDirection()` does not trigger any transition, it just sets some flags to be consumed by `ion-router-outlet`.
     *
     * It's recommended to use `navigateForward()`, `navigateBack()` and `navigateRoot()` instead of `setDirection()`.
     */
    setDirection(direction: RouterDirection, animated?: boolean, animationDirection?: 'forward' | 'back'): void;
    /**
     * @internal
     */
    setTopOutlet(outlet: IonRouterOutlet): void;
    /**
     * @internal
     */
    consumeTransition(): {
        direction: RouterDirection;
        animation: NavDirection;
    };
    private navigate;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NavController, [null, null, null, { optional: true; }]>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<NavController>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2LWNvbnRyb2xsZXIuZC50cyIsInNvdXJjZXMiOlsibmF2LWNvbnRyb2xsZXIuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uRXh0cmFzLCBSb3V0ZXIsIFVybFNlcmlhbGl6ZXIsIFVybFRyZWUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgTmF2RGlyZWN0aW9uLCBSb3V0ZXJEaXJlY3Rpb24gfSBmcm9tICdAaW9uaWMvY29yZSc7XG5pbXBvcnQgeyBJb25Sb3V0ZXJPdXRsZXQgfSBmcm9tICcuLi9kaXJlY3RpdmVzL25hdmlnYXRpb24vaW9uLXJvdXRlci1vdXRsZXQnO1xuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICcuL3BsYXRmb3JtJztcbmV4cG9ydCBpbnRlcmZhY2UgQW5pbWF0aW9uT3B0aW9ucyB7XG4gICAgYW5pbWF0ZWQ/OiBib29sZWFuO1xuICAgIGFuaW1hdGlvbkRpcmVjdGlvbj86ICdmb3J3YXJkJyB8ICdiYWNrJztcbn1cbmV4cG9ydCBpbnRlcmZhY2UgTmF2aWdhdGlvbk9wdGlvbnMgZXh0ZW5kcyBOYXZpZ2F0aW9uRXh0cmFzLCBBbmltYXRpb25PcHRpb25zIHtcbn1cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE5hdkNvbnRyb2xsZXIge1xuICAgIHByaXZhdGUgbG9jYXRpb247XG4gICAgcHJpdmF0ZSBzZXJpYWxpemVyO1xuICAgIHByaXZhdGUgcm91dGVyPztcbiAgICBwcml2YXRlIHRvcE91dGxldD87XG4gICAgcHJpdmF0ZSBkaXJlY3Rpb247XG4gICAgcHJpdmF0ZSBhbmltYXRlZD87XG4gICAgcHJpdmF0ZSBndWVzc0RpcmVjdGlvbjtcbiAgICBwcml2YXRlIGd1ZXNzQW5pbWF0aW9uPztcbiAgICBwcml2YXRlIGxhc3ROYXZJZDtcbiAgICBjb25zdHJ1Y3RvcihwbGF0Zm9ybTogUGxhdGZvcm0sIGxvY2F0aW9uOiBMb2NhdGlvbiwgc2VyaWFsaXplcjogVXJsU2VyaWFsaXplciwgcm91dGVyPzogUm91dGVyKTtcbiAgICAvKipcbiAgICAgKiBUaGlzIG1ldGhvZCB1c2VzIEFuZ3VsYXIncyBbUm91dGVyXShodHRwczovL2FuZ3VsYXIuaW8vYXBpL3JvdXRlci9Sb3V0ZXIpIHVuZGVyIHRoZSBob29kLFxuICAgICAqIGl0J3MgZXF1aXZhbGVudCB0byBjYWxsaW5nIGB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKClgLCBidXQgaXQncyBleHBsaWNpdCBhYm91dCB0aGUgKipkaXJlY3Rpb24qKiBvZiB0aGUgdHJhbnNpdGlvbi5cbiAgICAgKlxuICAgICAqIEdvaW5nICoqZm9yd2FyZCoqIG1lYW5zIHRoYXQgYSBuZXcgcGFnZSBpcyBnb2luZyB0byBiZSBwdXNoZWQgdG8gdGhlIHN0YWNrIG9mIHRoZSBvdXRsZXQgKGlvbi1yb3V0ZXItb3V0bGV0KSxcbiAgICAgKiBhbmQgdGhhdCBpdCB3aWxsIHNob3cgYSBcImZvcndhcmRcIiBhbmltYXRpb24gYnkgZGVmYXVsdC5cbiAgICAgKlxuICAgICAqIE5hdmlnYXRpbmcgZm9yd2FyZCBjYW4gYWxzbyBiZSB0cmlnZ2VyZWQgaW4gYSBkZWNsYXJhdGl2ZSBtYW5uZXIgYnkgdXNpbmcgdGhlIGBbcm91dGVyRGlyZWN0aW9uXWAgZGlyZWN0aXZlOlxuICAgICAqXG4gICAgICogYGBgaHRtbFxuICAgICAqIDxhIHJvdXRlckxpbms9XCIvcGF0aC90by9wYWdlXCIgcm91dGVyRGlyZWN0aW9uPVwiZm9yd2FyZFwiPkxpbms8L2E+XG4gICAgICogYGBgXG4gICAgICovXG4gICAgbmF2aWdhdGVGb3J3YXJkKHVybDogc3RyaW5nIHwgVXJsVHJlZSB8IGFueVtdLCBvcHRpb25zPzogTmF2aWdhdGlvbk9wdGlvbnMpOiBQcm9taXNlPGJvb2xlYW4+O1xuICAgIC8qKlxuICAgICAqIFRoaXMgbWV0aG9kIHVzZXMgQW5ndWxhcidzIFtSb3V0ZXJdKGh0dHBzOi8vYW5ndWxhci5pby9hcGkvcm91dGVyL1JvdXRlcikgdW5kZXIgdGhlIGhvb2QsXG4gICAgICogaXQncyBlcXVpdmFsZW50IHRvIGNhbGxpbmc6XG4gICAgICpcbiAgICAgKiBgYGB0c1xuICAgICAqIHRoaXMubmF2Q29udHJvbGxlci5zZXREaXJlY3Rpb24oJ2JhY2snKTtcbiAgICAgKiB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKHBhdGgpO1xuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogR29pbmcgKipiYWNrKiogbWVhbnMgdGhhdCBhbGwgdGhlIHBhZ2VzIGluIHRoZSBzdGFjayB1bnRpbCB0aGUgbmF2aWdhdGVkIHBhZ2UgaXMgZm91bmQgd2lsbCBiZSBwb3BwZWQsXG4gICAgICogYW5kIHRoYXQgaXQgd2lsbCBzaG93IGEgXCJiYWNrXCIgYW5pbWF0aW9uIGJ5IGRlZmF1bHQuXG4gICAgICpcbiAgICAgKiBOYXZpZ2F0aW5nIGJhY2sgY2FuIGFsc28gYmUgdHJpZ2dlcmVkIGluIGEgZGVjbGFyYXRpdmUgbWFubmVyIGJ5IHVzaW5nIHRoZSBgW3JvdXRlckRpcmVjdGlvbl1gIGRpcmVjdGl2ZTpcbiAgICAgKlxuICAgICAqIGBgYGh0bWxcbiAgICAgKiA8YSByb3V0ZXJMaW5rPVwiL3BhdGgvdG8vcGFnZVwiIHJvdXRlckRpcmVjdGlvbj1cImJhY2tcIj5MaW5rPC9hPlxuICAgICAqIGBgYFxuICAgICAqL1xuICAgIG5hdmlnYXRlQmFjayh1cmw6IHN0cmluZyB8IFVybFRyZWUgfCBhbnlbXSwgb3B0aW9ucz86IE5hdmlnYXRpb25PcHRpb25zKTogUHJvbWlzZTxib29sZWFuPjtcbiAgICAvKipcbiAgICAgKiBUaGlzIG1ldGhvZCB1c2VzIEFuZ3VsYXIncyBbUm91dGVyXShodHRwczovL2FuZ3VsYXIuaW8vYXBpL3JvdXRlci9Sb3V0ZXIpIHVuZGVyIHRoZSBob29kLFxuICAgICAqIGl0J3MgZXF1aXZhbGVudCB0byBjYWxsaW5nOlxuICAgICAqXG4gICAgICogYGBgdHNcbiAgICAgKiB0aGlzLm5hdkNvbnRyb2xsZXIuc2V0RGlyZWN0aW9uKCdyb290Jyk7XG4gICAgICogdGhpcy5yb3V0ZXIubmF2aWdhdGVCeVVybChwYXRoKTtcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEdvaW5nICoqcm9vdCoqIG1lYW5zIHRoYXQgYWxsIGV4aXN0aW5nIHBhZ2VzIGluIHRoZSBzdGFjayB3aWxsIGJlIHJlbW92ZWQsXG4gICAgICogYW5kIHRoZSBuYXZpZ2F0ZWQgcGFnZSB3aWxsIGJlY29tZSB0aGUgc2luZ2xlIHBhZ2UgaW4gdGhlIHN0YWNrLlxuICAgICAqXG4gICAgICogTmF2aWdhdGluZyByb290IGNhbiBhbHNvIGJlIHRyaWdnZXJlZCBpbiBhIGRlY2xhcmF0aXZlIG1hbm5lciBieSB1c2luZyB0aGUgYFtyb3V0ZXJEaXJlY3Rpb25dYCBkaXJlY3RpdmU6XG4gICAgICpcbiAgICAgKiBgYGBodG1sXG4gICAgICogPGEgcm91dGVyTGluaz1cIi9wYXRoL3RvL3BhZ2VcIiByb3V0ZXJEaXJlY3Rpb249XCJyb290XCI+TGluazwvYT5cbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBuYXZpZ2F0ZVJvb3QodXJsOiBzdHJpbmcgfCBVcmxUcmVlIHwgYW55W10sIG9wdGlvbnM/OiBOYXZpZ2F0aW9uT3B0aW9ucyk6IFByb21pc2U8Ym9vbGVhbj47XG4gICAgLyoqXG4gICAgICogU2FtZSBhcyBbTG9jYXRpb25dKGh0dHBzOi8vYW5ndWxhci5pby9hcGkvY29tbW9uL0xvY2F0aW9uKSdzIGJhY2soKSBtZXRob2QuXG4gICAgICogSXQgd2lsbCB1c2UgdGhlIHN0YW5kYXJkIGB3aW5kb3cuaGlzdG9yeS5iYWNrKClgIHVuZGVyIHRoZSBob29kLCBidXQgZmVhdHVyaW5nIGEgYGJhY2tgIGFuaW1hdGlvblxuICAgICAqIGJ5IGRlZmF1bHQuXG4gICAgICovXG4gICAgYmFjayhvcHRpb25zPzogQW5pbWF0aW9uT3B0aW9ucyk6IHZvaWQ7XG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2RzIGdvZXMgYmFjayBpbiB0aGUgY29udGV4dCBvZiBJb25pYydzIHN0YWNrIG5hdmlnYXRpb24uXG4gICAgICpcbiAgICAgKiBJdCByZWN1cnNpdmVseSBmaW5kcyB0aGUgdG9wIGFjdGl2ZSBgaW9uLXJvdXRlci1vdXRsZXRgIGFuZCBjYWxscyBgcG9wKClgLlxuICAgICAqIFRoaXMgaXMgdGhlIHJlY29tbWVuZGVkIHdheSB0byBnbyBiYWNrIHdoZW4geW91IGFyZSB1c2luZyBgaW9uLXJvdXRlci1vdXRsZXRgLlxuICAgICAqL1xuICAgIHBvcCgpOiBQcm9taXNlPHZvaWQ+O1xuICAgIC8qKlxuICAgICAqIFRoaXMgbWV0aG9kcyBzcGVjaWZpZXMgdGhlIGRpcmVjdGlvbiBvZiB0aGUgbmV4dCBuYXZpZ2F0aW9uIHBlcmZvcm1lZCBieSB0aGUgQW5ndWxhciByb3V0ZXIuXG4gICAgICpcbiAgICAgKiBgc2V0RGlyZWN0aW9uKClgIGRvZXMgbm90IHRyaWdnZXIgYW55IHRyYW5zaXRpb24sIGl0IGp1c3Qgc2V0cyBzb21lIGZsYWdzIHRvIGJlIGNvbnN1bWVkIGJ5IGBpb24tcm91dGVyLW91dGxldGAuXG4gICAgICpcbiAgICAgKiBJdCdzIHJlY29tbWVuZGVkIHRvIHVzZSBgbmF2aWdhdGVGb3J3YXJkKClgLCBgbmF2aWdhdGVCYWNrKClgIGFuZCBgbmF2aWdhdGVSb290KClgIGluc3RlYWQgb2YgYHNldERpcmVjdGlvbigpYC5cbiAgICAgKi9cbiAgICBzZXREaXJlY3Rpb24oZGlyZWN0aW9uOiBSb3V0ZXJEaXJlY3Rpb24sIGFuaW1hdGVkPzogYm9vbGVhbiwgYW5pbWF0aW9uRGlyZWN0aW9uPzogJ2ZvcndhcmQnIHwgJ2JhY2snKTogdm9pZDtcbiAgICAvKipcbiAgICAgKiBAaW50ZXJuYWxcbiAgICAgKi9cbiAgICBzZXRUb3BPdXRsZXQob3V0bGV0OiBJb25Sb3V0ZXJPdXRsZXQpOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqL1xuICAgIGNvbnN1bWVUcmFuc2l0aW9uKCk6IHtcbiAgICAgICAgZGlyZWN0aW9uOiBSb3V0ZXJEaXJlY3Rpb247XG4gICAgICAgIGFuaW1hdGlvbjogTmF2RGlyZWN0aW9uO1xuICAgIH07XG4gICAgcHJpdmF0ZSBuYXZpZ2F0ZTtcbn1cbiJdfQ==