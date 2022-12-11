import * as tslib_1 from "tslib";
import { Location } from '@angular/common';
import { Injectable, Optional } from '@angular/core';
import { NavigationExtras, NavigationStart, Router, UrlSerializer, UrlTree } from '@angular/router';
import { Platform } from './platform';
import * as i0 from "@angular/core";
import * as i1 from "./platform";
import * as i2 from "@angular/common";
import * as i3 from "@angular/router";
var NavController = /** @class */ (function () {
    function NavController(platform, location, serializer, router) {
        var _this = this;
        this.location = location;
        this.serializer = serializer;
        this.router = router;
        this.direction = DEFAULT_DIRECTION;
        this.animated = DEFAULT_ANIMATED;
        this.guessDirection = 'forward';
        this.lastNavId = -1;
        // Subscribe to router events to detect direction
        if (router) {
            router.events.subscribe(function (ev) {
                if (ev instanceof NavigationStart) {
                    var id = (ev.restoredState) ? ev.restoredState.navigationId : ev.id;
                    _this.guessDirection = id < _this.lastNavId ? 'back' : 'forward';
                    _this.guessAnimation = !ev.restoredState ? _this.guessDirection : undefined;
                    _this.lastNavId = _this.guessDirection === 'forward' ? ev.id : id;
                }
            });
        }
        // Subscribe to backButton events
        platform.backButton.subscribeWithPriority(0, function (processNextHandler) {
            _this.pop();
            processNextHandler();
        });
    }
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
    NavController.prototype.navigateForward = function (url, options) {
        if (options === void 0) { options = {}; }
        this.setDirection('forward', options.animated, options.animationDirection);
        return this.navigate(url, options);
    };
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
    NavController.prototype.navigateBack = function (url, options) {
        if (options === void 0) { options = {}; }
        this.setDirection('back', options.animated, options.animationDirection);
        return this.navigate(url, options);
    };
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
    NavController.prototype.navigateRoot = function (url, options) {
        if (options === void 0) { options = {}; }
        this.setDirection('root', options.animated, options.animationDirection);
        return this.navigate(url, options);
    };
    /**
     * Same as [Location](https://angular.io/api/common/Location)'s back() method.
     * It will use the standard `window.history.back()` under the hood, but featuring a `back` animation
     * by default.
     */
    NavController.prototype.back = function (options) {
        if (options === void 0) { options = { animated: true, animationDirection: 'back' }; }
        this.setDirection('back', options.animated, options.animationDirection);
        return this.location.back();
    };
    /**
     * This methods goes back in the context of Ionic's stack navigation.
     *
     * It recursively finds the top active `ion-router-outlet` and calls `pop()`.
     * This is the recommended way to go back when you are using `ion-router-outlet`.
     */
    NavController.prototype.pop = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var outlet;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        outlet = this.topOutlet;
                        _a.label = 1;
                    case 1:
                        if (!outlet) return [3 /*break*/, 3];
                        return [4 /*yield*/, outlet.pop()];
                    case 2:
                        if (_a.sent()) {
                            return [3 /*break*/, 3];
                        }
                        else {
                            outlet = outlet.parentOutlet;
                        }
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This methods specifies the direction of the next navigation performed by the Angular router.
     *
     * `setDirection()` does not trigger any transition, it just sets some flags to be consumed by `ion-router-outlet`.
     *
     * It's recommended to use `navigateForward()`, `navigateBack()` and `navigateRoot()` instead of `setDirection()`.
     */
    NavController.prototype.setDirection = function (direction, animated, animationDirection) {
        this.direction = direction;
        this.animated = getAnimation(direction, animated, animationDirection);
    };
    /**
     * @internal
     */
    NavController.prototype.setTopOutlet = function (outlet) {
        this.topOutlet = outlet;
    };
    /**
     * @internal
     */
    NavController.prototype.consumeTransition = function () {
        var direction = 'root';
        var animation;
        if (this.direction === 'auto') {
            direction = this.guessDirection;
            animation = this.guessAnimation;
        }
        else {
            animation = this.animated;
            direction = this.direction;
        }
        this.direction = DEFAULT_DIRECTION;
        this.animated = DEFAULT_ANIMATED;
        return {
            direction: direction,
            animation: animation
        };
    };
    NavController.prototype.navigate = function (url, options) {
        if (Array.isArray(url)) {
            return this.router.navigate(url, options);
        }
        else {
            /**
             * navigateByUrl ignores any properties that
             * would change the url, so things like queryParams
             * would be ignored unless we create a url tree
             * More Info: https://github.com/angular/angular/issues/18798
             */
            var urlTree = this.serializer.parse(url.toString());
            if (options.queryParams !== undefined) {
                urlTree.queryParams = tslib_1.__assign({}, options.queryParams);
            }
            if (options.fragment !== undefined) {
                urlTree.fragment = options.fragment;
            }
            /**
             * `navigateByUrl` will still apply `NavigationExtras` properties
             * that do not modify the url, such as `replaceUrl` which is why
             * `options` is passed in here.
             */
            return this.router.navigateByUrl(urlTree, options);
        }
    };
    NavController.ctorParameters = function () { return [
        { type: Platform },
        { type: Location },
        { type: UrlSerializer },
        { type: Router, decorators: [{ type: Optional }] }
    ]; };
    NavController.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function NavController_Factory() { return new NavController(i0.ɵɵinject(i1.Platform), i0.ɵɵinject(i2.Location), i0.ɵɵinject(i3.UrlSerializer), i0.ɵɵinject(i3.Router, 8)); }, token: NavController, providedIn: "root" });
    NavController = tslib_1.__decorate([
        Injectable({
            providedIn: 'root',
        }),
        tslib_1.__param(3, Optional())
    ], NavController);
    return NavController;
}());
export { NavController };
var getAnimation = function (direction, animated, animationDirection) {
    if (animated === false) {
        return undefined;
    }
    if (animationDirection !== undefined) {
        return animationDirection;
    }
    if (direction === 'forward' || direction === 'back') {
        return direction;
    }
    else if (direction === 'root' && animated === true) {
        return 'forward';
    }
    return undefined;
};
var ɵ0 = getAnimation;
var DEFAULT_DIRECTION = 'auto';
var DEFAULT_ANIMATED = undefined;
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2LWNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaW9uaWMvYW5ndWxhci8iLCJzb3VyY2VzIjpbInByb3ZpZGVycy9uYXYtY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxPQUFPLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUtwRyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sWUFBWSxDQUFDOzs7OztBQVl0QztJQVNFLHVCQUNFLFFBQWtCLEVBQ1YsUUFBa0IsRUFDbEIsVUFBeUIsRUFDYixNQUFlO1FBSnJDLGlCQXVCQztRQXJCUyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGVBQVUsR0FBVixVQUFVLENBQWU7UUFDYixXQUFNLEdBQU4sTUFBTSxDQUFTO1FBVjdCLGNBQVMsR0FBeUMsaUJBQWlCLENBQUM7UUFDcEUsYUFBUSxHQUFrQixnQkFBZ0IsQ0FBQztRQUMzQyxtQkFBYyxHQUFvQixTQUFTLENBQUM7UUFFNUMsY0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBUXJCLGlEQUFpRDtRQUNqRCxJQUFJLE1BQU0sRUFBRTtZQUNWLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUEsRUFBRTtnQkFDeEIsSUFBSSxFQUFFLFlBQVksZUFBZSxFQUFFO29CQUNqQyxJQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7b0JBQ3RFLEtBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxHQUFHLEtB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QUFRLEtBQUssU0FBUyxFQUFFO2dCQUNsQyxPQUFPLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7YUFDckM7WUFFRDs7OztlQUlHO1lBQ0gsT0FBTyxJQUFJLENBQUMsTUFBTyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDckQ7SUFDSCxDQUFDOztnQkExTFcsUUFBUTtnQkFDQSxRQUFRO2dCQUNOLGFBQWE7Z0JBQ0osTUFBTSx1QkFBbEMsUUFBUTs7O0lBYkEsYUFBYTtRQUh6QixVQUFVLENBQUM7WUFDVixVQUFVLEVBQUUsTUFBTTtTQUNuQixDQUFDO1FBY0csbUJBQUEsUUFBUSxFQUFFLENBQUE7T0FiRixhQUFhLENBcU16Qjt3QkF4TkQ7Q0F3TkMsQUFyTUQsSUFxTUM7U0FyTVksYUFBYTtBQXVNMUIsSUFBTSxZQUFZLEdBQUcsVUFBQyxTQUEwQixFQUFFLFFBQTZCLEVBQUUsa0JBQWtEO0lBQ2pJLElBQUksUUFBUSxLQUFLLEtBQUssRUFBRTtRQUN0QixPQUFPLFNBQVMsQ0FBQztLQUNsQjtJQUNELElBQUksa0JBQWtCLEtBQUssU0FBUyxFQUFFO1FBQ3BDLE9BQU8sa0JBQWtCLENBQUM7S0FDM0I7SUFDRCxJQUFJLFNBQVMsS0FBSyxTQUFTLElBQUksU0FBUyxLQUFLLE1BQU0sRUFBRTtRQUNuRCxPQUFPLFNBQVMsQ0FBQztLQUNsQjtTQUFNLElBQUksU0FBUyxLQUFLLE1BQU0sSUFBSSxRQUFRLEtBQUssSUFBSSxFQUFFO1FBQ3BELE9BQU8sU0FBUyxDQUFDO0tBQ2xCO0lBQ0QsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQyxDQUFDOztBQUVGLElBQU0saUJBQWlCLEdBQUcsTUFBTSxDQUFDO0FBQ2pDLElBQU0sZ0JBQWdCLEdBQUcsU0FBUyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5hdmlnYXRpb25FeHRyYXMsIE5hdmlnYXRpb25TdGFydCwgUm91dGVyLCBVcmxTZXJpYWxpemVyLCBVcmxUcmVlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE5hdkRpcmVjdGlvbiwgUm91dGVyRGlyZWN0aW9uIH0gZnJvbSAnQGlvbmljL2NvcmUnO1xuXG5pbXBvcnQgeyBJb25Sb3V0ZXJPdXRsZXQgfSBmcm9tICcuLi9kaXJlY3RpdmVzL25hdmlnYXRpb24vaW9uLXJvdXRlci1vdXRsZXQnO1xuXG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJy4vcGxhdGZvcm0nO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFuaW1hdGlvbk9wdGlvbnMge1xuICBhbmltYXRlZD86IGJvb2xlYW47XG4gIGFuaW1hdGlvbkRpcmVjdGlvbj86ICdmb3J3YXJkJyB8ICdiYWNrJztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBOYXZpZ2F0aW9uT3B0aW9ucyBleHRlbmRzIE5hdmlnYXRpb25FeHRyYXMsIEFuaW1hdGlvbk9wdGlvbnMge31cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIE5hdkNvbnRyb2xsZXIge1xuXG4gIHByaXZhdGUgdG9wT3V0bGV0PzogSW9uUm91dGVyT3V0bGV0O1xuICBwcml2YXRlIGRpcmVjdGlvbjogJ2ZvcndhcmQnIHwgJ2JhY2snIHwgJ3Jvb3QnIHwgJ2F1dG8nID0gREVGQVVMVF9ESVJFQ1RJT047XG4gIHByaXZhdGUgYW5pbWF0ZWQ/OiBOYXZEaXJlY3Rpb24gPSBERUZBVUxUX0FOSU1BVEVEO1xuICBwcml2YXRlIGd1ZXNzRGlyZWN0aW9uOiBSb3V0ZXJEaXJlY3Rpb24gPSAnZm9yd2FyZCc7XG4gIHByaXZhdGUgZ3Vlc3NBbmltYXRpb24/OiBOYXZEaXJlY3Rpb247XG4gIHByaXZhdGUgbGFzdE5hdklkID0gLTE7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcGxhdGZvcm06IFBsYXRmb3JtLFxuICAgIHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uLFxuICAgIHByaXZhdGUgc2VyaWFsaXplcjogVXJsU2VyaWFsaXplcixcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIHJvdXRlcj86IFJvdXRlcixcbiAgKSB7XG4gICAgLy8gU3Vic2NyaWJlIHRvIHJvdXRlciBldmVudHMgdG8gZGV0ZWN0IGRpcmVjdGlvblxuICAgIGlmIChyb3V0ZXIpIHtcbiAgICAgIHJvdXRlci5ldmVudHMuc3Vic2NyaWJlKGV2ID0+IHtcbiAgICAgICAgaWYgKGV2IGluc3RhbmNlb2YgTmF2aWdhdGlvblN0YXJ0KSB7XG4gICAgICAgICAgY29uc3QgaWQgPSAoZXYucmVzdG9yZWRTdGF0ZSkgPyBldi5yZXN0b3JlZFN0YXRlLm5hdmlnYXRpb25JZCA6IGV2LmlkO1xuICAgICAgICAgIHRoaXMuZ3Vlc3NEaXJlY3Rpb24gPSBpZCA8IHRoaXMubGFzdE5hdklkID8gJ2JhY2snIDogJ2ZvcndhcmQnO1xuICAgICAgICAgIHRoaXMuZ3Vlc3NBbmltYXRpb24gPSAhZXYucmVzdG9yZWRTdGF0ZSA/IHRoaXMuZ3Vlc3NEaXJlY3Rpb24gOiB1bmRlZmluZWQ7XG4gICAgICAgICAgdGhpcy5sYXN0TmF2SWQgPSB0aGlzLmd1ZXNzRGlyZWN0aW9uID09PSAnZm9yd2FyZCcgPyBldi5pZCA6IGlkO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBTdWJzY3JpYmUgdG8gYmFja0J1dHRvbiBldmVudHNcbiAgICBwbGF0Zm9ybS5iYWNrQnV0dG9uLnN1YnNjcmliZVdpdGhQcmlvcml0eSgwLCBwcm9jZXNzTmV4dEhhbmRsZXIgPT4ge1xuICAgICAgdGhpcy5wb3AoKTtcbiAgICAgIHByb2Nlc3NOZXh0SGFuZGxlcigpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIHVzZXMgQW5ndWxhcidzIFtSb3V0ZXJdKGh0dHBzOi8vYW5ndWxhci5pby9hcGkvcm91dGVyL1JvdXRlcikgdW5kZXIgdGhlIGhvb2QsXG4gICAqIGl0J3MgZXF1aXZhbGVudCB0byBjYWxsaW5nIGB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKClgLCBidXQgaXQncyBleHBsaWNpdCBhYm91dCB0aGUgKipkaXJlY3Rpb24qKiBvZiB0aGUgdHJhbnNpdGlvbi5cbiAgICpcbiAgICogR29pbmcgKipmb3J3YXJkKiogbWVhbnMgdGhhdCBhIG5ldyBwYWdlIGlzIGdvaW5nIHRvIGJlIHB1c2hlZCB0byB0aGUgc3RhY2sgb2YgdGhlIG91dGxldCAoaW9uLXJvdXRlci1vdXRsZXQpLFxuICAgKiBhbmQgdGhhdCBpdCB3aWxsIHNob3cgYSBcImZvcndhcmRcIiBhbmltYXRpb24gYnkgZGVmYXVsdC5cbiAgICpcbiAgICogTmF2aWdhdGluZyBmb3J3YXJkIGNhbiBhbHNvIGJlIHRyaWdnZXJlZCBpbiBhIGRlY2xhcmF0aXZlIG1hbm5lciBieSB1c2luZyB0aGUgYFtyb3V0ZXJEaXJlY3Rpb25dYCBkaXJlY3RpdmU6XG4gICAqXG4gICAqIGBgYGh0bWxcbiAgICogPGEgcm91dGVyTGluaz1cIi9wYXRoL3RvL3BhZ2VcIiByb3V0ZXJEaXJlY3Rpb249XCJmb3J3YXJkXCI+TGluazwvYT5cbiAgICogYGBgXG4gICAqL1xuICBuYXZpZ2F0ZUZvcndhcmQodXJsOiBzdHJpbmcgfCBVcmxUcmVlIHwgYW55W10sIG9wdGlvbnM6IE5hdmlnYXRpb25PcHRpb25zID0ge30pOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICB0aGlzLnNldERpcmVjdGlvbignZm9yd2FyZCcsIG9wdGlvbnMuYW5pbWF0ZWQsIG9wdGlvbnMuYW5pbWF0aW9uRGlyZWN0aW9uKTtcbiAgICByZXR1cm4gdGhpcy5uYXZpZ2F0ZSh1cmwsIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIHVzZXMgQW5ndWxhcidzIFtSb3V0ZXJdKGh0dHBzOi8vYW5ndWxhci5pby9hcGkvcm91dGVyL1JvdXRlcikgdW5kZXIgdGhlIGhvb2QsXG4gICAqIGl0J3MgZXF1aXZhbGVudCB0byBjYWxsaW5nOlxuICAgKlxuICAgKiBgYGB0c1xuICAgKiB0aGlzLm5hdkNvbnRyb2xsZXIuc2V0RGlyZWN0aW9uKCdiYWNrJyk7XG4gICAqIHRoaXMucm91dGVyLm5hdmlnYXRlQnlVcmwocGF0aCk7XG4gICAqIGBgYFxuICAgKlxuICAgKiBHb2luZyAqKmJhY2sqKiBtZWFucyB0aGF0IGFsbCB0aGUgcGFnZXMgaW4gdGhlIHN0YWNrIHVudGlsIHRoZSBuYXZpZ2F0ZWQgcGFnZSBpcyBmb3VuZCB3aWxsIGJlIHBvcHBlZCxcbiAgICogYW5kIHRoYXQgaXQgd2lsbCBzaG93IGEgXCJiYWNrXCIgYW5pbWF0aW9uIGJ5IGRlZmF1bHQuXG4gICAqXG4gICAqIE5hdmlnYXRpbmcgYmFjayBjYW4gYWxzbyBiZSB0cmlnZ2VyZWQgaW4gYSBkZWNsYXJhdGl2ZSBtYW5uZXIgYnkgdXNpbmcgdGhlIGBbcm91dGVyRGlyZWN0aW9uXWAgZGlyZWN0aXZlOlxuICAgKlxuICAgKiBgYGBodG1sXG4gICAqIDxhIHJvdXRlckxpbms9XCIvcGF0aC90by9wYWdlXCIgcm91dGVyRGlyZWN0aW9uPVwiYmFja1wiPkxpbms8L2E+XG4gICAqIGBgYFxuICAgKi9cbiAgbmF2aWdhdGVCYWNrKHVybDogc3RyaW5nIHwgVXJsVHJlZSB8IGFueVtdLCBvcHRpb25zOiBOYXZpZ2F0aW9uT3B0aW9ucyA9IHt9KTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgdGhpcy5zZXREaXJlY3Rpb24oJ2JhY2snLCBvcHRpb25zLmFuaW1hdGVkLCBvcHRpb25zLmFuaW1hdGlvbkRpcmVjdGlvbik7XG4gICAgcmV0dXJuIHRoaXMubmF2aWdhdGUodXJsLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCB1c2VzIEFuZ3VsYXIncyBbUm91dGVyXShodHRwczovL2FuZ3VsYXIuaW8vYXBpL3JvdXRlci9Sb3V0ZXIpIHVuZGVyIHRoZSBob29kLFxuICAgKiBpdCdzIGVxdWl2YWxlbnQgdG8gY2FsbGluZzpcbiAgICpcbiAgICogYGBgdHNcbiAgICogdGhpcy5uYXZDb250cm9sbGVyLnNldERpcmVjdGlvbigncm9vdCcpO1xuICAgKiB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKHBhdGgpO1xuICAgKiBgYGBcbiAgICpcbiAgICogR29pbmcgKipyb290KiogbWVhbnMgdGhhdCBhbGwgZXhpc3RpbmcgcGFnZXMgaW4gdGhlIHN0YWNrIHdpbGwgYmUgcmVtb3ZlZCxcbiAgICogYW5kIHRoZSBuYXZpZ2F0ZWQgcGFnZSB3aWxsIGJlY29tZSB0aGUgc2luZ2xlIHBhZ2UgaW4gdGhlIHN0YWNrLlxuICAgKlxuICAgKiBOYXZpZ2F0aW5nIHJvb3QgY2FuIGFsc28gYmUgdHJpZ2dlcmVkIGluIGEgZGVjbGFyYXRpdmUgbWFubmVyIGJ5IHVzaW5nIHRoZSBgW3JvdXRlckRpcmVjdGlvbl1gIGRpcmVjdGl2ZTpcbiAgICpcbiAgICogYGBgaHRtbFxuICAgKiA8YSByb3V0ZXJMaW5rPVwiL3BhdGgvdG8vcGFnZVwiIHJvdXRlckRpcmVjdGlvbj1cInJvb3RcIj5MaW5rPC9hPlxuICAgKiBgYGBcbiAgICovXG4gIG5hdmlnYXRlUm9vdCh1cmw6IHN0cmluZyB8IFVybFRyZWUgfCBhbnlbXSwgb3B0aW9uczogTmF2aWdhdGlvbk9wdGlvbnMgPSB7fSk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHRoaXMuc2V0RGlyZWN0aW9uKCdyb290Jywgb3B0aW9ucy5hbmltYXRlZCwgb3B0aW9ucy5hbmltYXRpb25EaXJlY3Rpb24pO1xuICAgIHJldHVybiB0aGlzLm5hdmlnYXRlKHVybCwgb3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogU2FtZSBhcyBbTG9jYXRpb25dKGh0dHBzOi8vYW5ndWxhci5pby9hcGkvY29tbW9uL0xvY2F0aW9uKSdzIGJhY2soKSBtZXRob2QuXG4gICAqIEl0IHdpbGwgdXNlIHRoZSBzdGFuZGFyZCBgd2luZG93Lmhpc3RvcnkuYmFjaygpYCB1bmRlciB0aGUgaG9vZCwgYnV0IGZlYXR1cmluZyBhIGBiYWNrYCBhbmltYXRpb25cbiAgICogYnkgZGVmYXVsdC5cbiAgICovXG4gIGJhY2sob3B0aW9uczogQW5pbWF0aW9uT3B0aW9ucyA9IHsgYW5pbWF0ZWQ6IHRydWUsIGFuaW1hdGlvbkRpcmVjdGlvbjogJ2JhY2snIH0pIHtcbiAgICB0aGlzLnNldERpcmVjdGlvbignYmFjaycsIG9wdGlvbnMuYW5pbWF0ZWQsIG9wdGlvbnMuYW5pbWF0aW9uRGlyZWN0aW9uKTtcbiAgICByZXR1cm4gdGhpcy5sb2NhdGlvbi5iYWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2RzIGdvZXMgYmFjayBpbiB0aGUgY29udGV4dCBvZiBJb25pYydzIHN0YWNrIG5hdmlnYXRpb24uXG4gICAqXG4gICAqIEl0IHJlY3Vyc2l2ZWx5IGZpbmRzIHRoZSB0b3AgYWN0aXZlIGBpb24tcm91dGVyLW91dGxldGAgYW5kIGNhbGxzIGBwb3AoKWAuXG4gICAqIFRoaXMgaXMgdGhlIHJlY29tbWVuZGVkIHdheSB0byBnbyBiYWNrIHdoZW4geW91IGFyZSB1c2luZyBgaW9uLXJvdXRlci1vdXRsZXRgLlxuICAgKi9cbiAgYXN5bmMgcG9wKCkge1xuICAgIGxldCBvdXRsZXQgPSB0aGlzLnRvcE91dGxldDtcblxuICAgIHdoaWxlIChvdXRsZXQpIHtcbiAgICAgIGlmIChhd2FpdCBvdXRsZXQucG9wKCkpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvdXRsZXQgPSBvdXRsZXQucGFyZW50T3V0bGV0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZHMgc3BlY2lmaWVzIHRoZSBkaXJlY3Rpb24gb2YgdGhlIG5leHQgbmF2aWdhdGlvbiBwZXJmb3JtZWQgYnkgdGhlIEFuZ3VsYXIgcm91dGVyLlxuICAgKlxuICAgKiBgc2V0RGlyZWN0aW9uKClgIGRvZXMgbm90IHRyaWdnZXIgYW55IHRyYW5zaXRpb24sIGl0IGp1c3Qgc2V0cyBzb21lIGZsYWdzIHRvIGJlIGNvbnN1bWVkIGJ5IGBpb24tcm91dGVyLW91dGxldGAuXG4gICAqXG4gICAqIEl0J3MgcmVjb21tZW5kZWQgdG8gdXNlIGBuYXZpZ2F0ZUZvcndhcmQoKWAsIGBuYXZpZ2F0ZUJhY2soKWAgYW5kIGBuYXZpZ2F0ZVJvb3QoKWAgaW5zdGVhZCBvZiBgc2V0RGlyZWN0aW9uKClgLlxuICAgKi9cbiAgc2V0RGlyZWN0aW9uKGRpcmVjdGlvbjogUm91dGVyRGlyZWN0aW9uLCBhbmltYXRlZD86IGJvb2xlYW4sIGFuaW1hdGlvbkRpcmVjdGlvbj86ICdmb3J3YXJkJyB8ICdiYWNrJykge1xuICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgIHRoaXMuYW5pbWF0ZWQgPSBnZXRBbmltYXRpb24oZGlyZWN0aW9uLCBhbmltYXRlZCwgYW5pbWF0aW9uRGlyZWN0aW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHNldFRvcE91dGxldChvdXRsZXQ6IElvblJvdXRlck91dGxldCkge1xuICAgIHRoaXMudG9wT3V0bGV0ID0gb3V0bGV0O1xuICB9XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgY29uc3VtZVRyYW5zaXRpb24oKSB7XG4gICAgbGV0IGRpcmVjdGlvbjogUm91dGVyRGlyZWN0aW9uID0gJ3Jvb3QnO1xuICAgIGxldCBhbmltYXRpb246IE5hdkRpcmVjdGlvbiB8IHVuZGVmaW5lZDtcblxuICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gJ2F1dG8nKSB7XG4gICAgICBkaXJlY3Rpb24gPSB0aGlzLmd1ZXNzRGlyZWN0aW9uO1xuICAgICAgYW5pbWF0aW9uID0gdGhpcy5ndWVzc0FuaW1hdGlvbjtcbiAgICB9IGVsc2Uge1xuICAgICAgYW5pbWF0aW9uID0gdGhpcy5hbmltYXRlZDtcbiAgICAgIGRpcmVjdGlvbiA9IHRoaXMuZGlyZWN0aW9uO1xuICAgIH1cbiAgICB0aGlzLmRpcmVjdGlvbiA9IERFRkFVTFRfRElSRUNUSU9OO1xuICAgIHRoaXMuYW5pbWF0ZWQgPSBERUZBVUxUX0FOSU1BVEVEO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGRpcmVjdGlvbixcbiAgICAgIGFuaW1hdGlvblxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIG5hdmlnYXRlKHVybDogc3RyaW5nIHwgVXJsVHJlZSB8IGFueVtdLCBvcHRpb25zOiBOYXZpZ2F0aW9uT3B0aW9ucykge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHVybCkpIHtcbiAgICAgIHJldHVybiB0aGlzLnJvdXRlciEubmF2aWdhdGUodXJsLCBvcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuXG4gICAgICAvKipcbiAgICAgICAqIG5hdmlnYXRlQnlVcmwgaWdub3JlcyBhbnkgcHJvcGVydGllcyB0aGF0XG4gICAgICAgKiB3b3VsZCBjaGFuZ2UgdGhlIHVybCwgc28gdGhpbmdzIGxpa2UgcXVlcnlQYXJhbXNcbiAgICAgICAqIHdvdWxkIGJlIGlnbm9yZWQgdW5sZXNzIHdlIGNyZWF0ZSBhIHVybCB0cmVlXG4gICAgICAgKiBNb3JlIEluZm86IGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzE4Nzk4XG4gICAgICAgKi9cbiAgICAgIGNvbnN0IHVybFRyZWUgPSB0aGlzLnNlcmlhbGl6ZXIucGFyc2UodXJsLnRvU3RyaW5nKCkpO1xuXG4gICAgICBpZiAob3B0aW9ucy5xdWVyeVBhcmFtcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHVybFRyZWUucXVlcnlQYXJhbXMgPSB7IC4uLm9wdGlvbnMucXVlcnlQYXJhbXMgfTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMuZnJhZ21lbnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB1cmxUcmVlLmZyYWdtZW50ID0gb3B0aW9ucy5mcmFnbWVudDtcbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiBgbmF2aWdhdGVCeVVybGAgd2lsbCBzdGlsbCBhcHBseSBgTmF2aWdhdGlvbkV4dHJhc2AgcHJvcGVydGllc1xuICAgICAgICogdGhhdCBkbyBub3QgbW9kaWZ5IHRoZSB1cmwsIHN1Y2ggYXMgYHJlcGxhY2VVcmxgIHdoaWNoIGlzIHdoeVxuICAgICAgICogYG9wdGlvbnNgIGlzIHBhc3NlZCBpbiBoZXJlLlxuICAgICAgICovXG4gICAgICByZXR1cm4gdGhpcy5yb3V0ZXIhLm5hdmlnYXRlQnlVcmwodXJsVHJlZSwgb3B0aW9ucyk7XG4gICAgfVxuICB9XG59XG5cbmNvbnN0IGdldEFuaW1hdGlvbiA9IChkaXJlY3Rpb246IFJvdXRlckRpcmVjdGlvbiwgYW5pbWF0ZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQsIGFuaW1hdGlvbkRpcmVjdGlvbjogJ2ZvcndhcmQnIHwgJ2JhY2snIHwgdW5kZWZpbmVkKTogTmF2RGlyZWN0aW9uIHwgdW5kZWZpbmVkID0+IHtcbiAgaWYgKGFuaW1hdGVkID09PSBmYWxzZSkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgaWYgKGFuaW1hdGlvbkRpcmVjdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGFuaW1hdGlvbkRpcmVjdGlvbjtcbiAgfVxuICBpZiAoZGlyZWN0aW9uID09PSAnZm9yd2FyZCcgfHwgZGlyZWN0aW9uID09PSAnYmFjaycpIHtcbiAgICByZXR1cm4gZGlyZWN0aW9uO1xuICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ3Jvb3QnICYmIGFuaW1hdGVkID09PSB0cnVlKSB7XG4gICAgcmV0dXJuICdmb3J3YXJkJztcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufTtcblxuY29uc3QgREVGQVVMVF9ESVJFQ1RJT04gPSAnYXV0byc7XG5jb25zdCBERUZBVUxUX0FOSU1BVEVEID0gdW5kZWZpbmVkO1xuIl19