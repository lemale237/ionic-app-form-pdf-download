import * as tslib_1 from "tslib";
import { Location } from '@angular/common';
import { Injectable, Optional } from '@angular/core';
import { NavigationExtras, NavigationStart, Router, UrlSerializer, UrlTree } from '@angular/router';
import { Platform } from './platform';
import * as i0 from "@angular/core";
import * as i1 from "./platform";
import * as i2 from "@angular/common";
import * as i3 from "@angular/router";
let NavController = class NavController {
    constructor(platform, location, serializer, router) {
        this.location = location;
        this.serializer = serializer;
        this.router = router;
        this.direction = DEFAULT_DIRECTION;
        this.animated = DEFAULT_ANIMATED;
        this.guessDirection = 'forward';
        this.lastNavId = -1;
        // Subscribe to router events to detect direction
        if (router) {
            router.events.subscribe(ev => {
                if (ev instanceof NavigationStart) {
                    const id = (ev.restoredState) ? ev.restoredState.navigationId : ev.id;
                    this.guessDirection = id < this.lastNavId ? 'back' : 'forward';
                    this.guessAnimation = !ev.restoredState ? this.guessDirection : undefined;
                    this.lastNavId = this.guessDirection === 'forward' ? ev.id : id;
                }
            });
        }
        // Subscribe to backButton events
        platform.backButton.subscribeWithPriority(0, processNextHandler => {
            this.pop();
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
    navigateForward(url, options = {}) {
        this.setDirection('forward', options.animated, options.animationDirection);
        return this.navigate(url, options);
    }
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
    navigateBack(url, options = {}) {
        this.setDirection('back', options.animated, options.animationDirection);
        return this.navigate(url, options);
    }
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
    navigateRoot(url, options = {}) {
        this.setDirection('root', options.animated, options.animationDirection);
        return this.navigate(url, options);
    }
    /**
     * Same as [Location](https://angular.io/api/common/Location)'s back() method.
     * It will use the standard `window.history.back()` under the hood, but featuring a `back` animation
     * by default.
     */
    back(options = { animated: true, animationDirection: 'back' }) {
        this.setDirection('back', options.animated, options.animationDirection);
        return this.location.back();
    }
    /**
     * This methods goes back in the context of Ionic's stack navigation.
     *
     * It recursively finds the top active `ion-router-outlet` and calls `pop()`.
     * This is the recommended way to go back when you are using `ion-router-outlet`.
     */
    pop() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let outlet = this.topOutlet;
            while (outlet) {
                if (yield outlet.pop()) {
                    break;
                }
                else {
                    outlet = outlet.parentOutlet;
                }
            }
        });
    }
    /**
     * This methods specifies the direction of the next navigation performed by the Angular router.
     *
     * `setDirection()` does not trigger any transition, it just sets some flags to be consumed by `ion-router-outlet`.
     *
     * It's recommended to use `navigateForward()`, `navigateBack()` and `navigateRoot()` instead of `setDirection()`.
     */
    setDirection(direction, animated, animationDirection) {
        this.direction = direction;
        this.animated = getAnimation(direction, animated, animationDirection);
    }
    /**
     * @internal
     */
    setTopOutlet(outlet) {
        this.topOutlet = outlet;
    }
    /**
     * @internal
     */
    consumeTransition() {
        let direction = 'root';
        let animation;
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
            direction,
            animation
        };
    }
    navigate(url, options) {
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
            const urlTree = this.serializer.parse(url.toString());
            if (options.queryParams !== undefined) {
                urlTree.queryParams = Object.assign({}, options.queryParams);
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
    }
};
NavController.ctorParameters = () => [
    { type: Platform },
    { type: Location },
    { type: UrlSerializer },
    { type: Router, decorators: [{ type: Optional }] }
];
NavController.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function NavController_Factory() { return new NavController(i0.ɵɵinject(i1.Platform), i0.ɵɵinject(i2.Location), i0.ɵɵinject(i3.UrlSerializer), i0.ɵɵinject(i3.Router, 8)); }, token: NavController, providedIn: "root" });
NavController = tslib_1.__decorate([
    Injectable({
        providedIn: 'root',
    }),
    tslib_1.__param(3, Optional())
], NavController);
export { NavController };
const getAnimation = (direction, animated, animationDirection) => {
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
const ɵ0 = getAnimation;
const DEFAULT_DIRECTION = 'auto';
const DEFAULT_ANIMATED = undefined;
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2LWNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaW9uaWMvYW5ndWxhci8iLCJzb3VyY2VzIjpbInByb3ZpZGVycy9uYXYtY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxPQUFPLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUtwRyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sWUFBWSxDQUFDOzs7OztBQVl0QyxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFhO0lBU3hCLFlBQ0UsUUFBa0IsRUFDVixRQUFrQixFQUNsQixVQUF5QixFQUNiLE1BQWU7UUFGM0IsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixlQUFVLEdBQVYsVUFBVSxDQUFlO1FBQ2IsV0FBTSxHQUFOLE1BQU0sQ0FBUztRQVY3QixjQUFTLEdBQXlDLGlCQUFpQixDQUFDO1FBQ3BFLGFBQVEsR0FBa0IsZ0JBQWdCLENBQUM7UUFDM0MsbUJBQWMsR0FBb0IsU0FBUyxDQUFDO1FBRTVDLGNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQVFyQixpREFBaUQ7UUFDakQsSUFBSSxNQUFNLEVBQUU7WUFDVixNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDM0IsSUFBSSxFQUFFLFlBQVksZUFBZSxFQUFFO29CQUNqQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7b0JBQ3RFLElBQUksQ0FBQyxjQUFj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Q0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDckQ7SUFDSCxDQUFDO0NBQ0YsQ0FBQTs7WUEzTGEsUUFBUTtZQUNBLFFBQVE7WUFDTixhQUFhO1lBQ0osTUFBTSx1QkFBbEMsUUFBUTs7O0FBYkEsYUFBYTtJQUh6QixVQUFVLENBQUM7UUFDVixVQUFVLEVBQUUsTUFBTTtLQUNuQixDQUFDO0lBY0csbUJBQUEsUUFBUSxFQUFFLENBQUE7R0FiRixhQUFhLENBcU16QjtTQXJNWSxhQUFhO0FBdU0xQixNQUFNLFlBQVksR0FBRyxDQUFDLFNBQTBCLEVBQUUsUUFBNkIsRUFBRSxrQkFBa0QsRUFBNEIsRUFBRTtJQUMvSixJQUFJLFFBQVEsS0FBSyxLQUFLLEVBQUU7UUFDdEIsT0FBTyxTQUFTLENBQUM7S0FDbEI7SUFDRCxJQUFJLGtCQUFrQixLQUFLLFNBQVMsRUFBRTtRQUNwQyxPQUFPLGtCQUFrQixDQUFDO0tBQzNCO0lBQ0QsSUFBSSxTQUFTLEtBQUssU0FBUyxJQUFJLFNBQVMsS0FBSyxNQUFNLEVBQUU7UUFDbkQsT0FBTyxTQUFTLENBQUM7S0FDbEI7U0FBTSxJQUFJLFNBQVMsS0FBSyxNQUFNLElBQUksUUFBUSxLQUFLLElBQUksRUFBRTtRQUNwRCxPQUFPLFNBQVMsQ0FBQztLQUNsQjtJQUNELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUMsQ0FBQzs7QUFFRixNQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQztBQUNqQyxNQUFNLGdCQUFnQixHQUFHLFNBQVMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEluamVjdGFibGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uRXh0cmFzLCBOYXZpZ2F0aW9uU3RhcnQsIFJvdXRlciwgVXJsU2VyaWFsaXplciwgVXJsVHJlZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBOYXZEaXJlY3Rpb24sIFJvdXRlckRpcmVjdGlvbiB9IGZyb20gJ0Bpb25pYy9jb3JlJztcblxuaW1wb3J0IHsgSW9uUm91dGVyT3V0bGV0IH0gZnJvbSAnLi4vZGlyZWN0aXZlcy9uYXZpZ2F0aW9uL2lvbi1yb3V0ZXItb3V0bGV0JztcblxuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICcuL3BsYXRmb3JtJztcblxuZXhwb3J0IGludGVyZmFjZSBBbmltYXRpb25PcHRpb25zIHtcbiAgYW5pbWF0ZWQ/OiBib29sZWFuO1xuICBhbmltYXRpb25EaXJlY3Rpb24/OiAnZm9yd2FyZCcgfCAnYmFjayc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTmF2aWdhdGlvbk9wdGlvbnMgZXh0ZW5kcyBOYXZpZ2F0aW9uRXh0cmFzLCBBbmltYXRpb25PcHRpb25zIHt9XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBOYXZDb250cm9sbGVyIHtcblxuICBwcml2YXRlIHRvcE91dGxldD86IElvblJvdXRlck91dGxldDtcbiAgcHJpdmF0ZSBkaXJlY3Rpb246ICdmb3J3YXJkJyB8ICdiYWNrJyB8ICdyb290JyB8ICdhdXRvJyA9IERFRkFVTFRfRElSRUNUSU9OO1xuICBwcml2YXRlIGFuaW1hdGVkPzogTmF2RGlyZWN0aW9uID0gREVGQVVMVF9BTklNQVRFRDtcbiAgcHJpdmF0ZSBndWVzc0RpcmVjdGlvbjogUm91dGVyRGlyZWN0aW9uID0gJ2ZvcndhcmQnO1xuICBwcml2YXRlIGd1ZXNzQW5pbWF0aW9uPzogTmF2RGlyZWN0aW9uO1xuICBwcml2YXRlIGxhc3ROYXZJZCA9IC0xO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHBsYXRmb3JtOiBQbGF0Zm9ybSxcbiAgICBwcml2YXRlIGxvY2F0aW9uOiBMb2NhdGlvbixcbiAgICBwcml2YXRlIHNlcmlhbGl6ZXI6IFVybFNlcmlhbGl6ZXIsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSByb3V0ZXI/OiBSb3V0ZXIsXG4gICkge1xuICAgIC8vIFN1YnNjcmliZSB0byByb3V0ZXIgZXZlbnRzIHRvIGRldGVjdCBkaXJlY3Rpb25cbiAgICBpZiAocm91dGVyKSB7XG4gICAgICByb3V0ZXIuZXZlbnRzLnN1YnNjcmliZShldiA9PiB7XG4gICAgICAgIGlmIChldiBpbnN0YW5jZW9mIE5hdmlnYXRpb25TdGFydCkge1xuICAgICAgICAgIGNvbnN0IGlkID0gKGV2LnJlc3RvcmVkU3RhdGUpID8gZXYucmVzdG9yZWRTdGF0ZS5uYXZpZ2F0aW9uSWQgOiBldi5pZDtcbiAgICAgICAgICB0aGlzLmd1ZXNzRGlyZWN0aW9uID0gaWQgPCB0aGlzLmxhc3ROYXZJZCA/ICdiYWNrJyA6ICdmb3J3YXJkJztcbiAgICAgICAgICB0aGlzLmd1ZXNzQW5pbWF0aW9uID0gIWV2LnJlc3RvcmVkU3RhdGUgPyB0aGlzLmd1ZXNzRGlyZWN0aW9uIDogdW5kZWZpbmVkO1xuICAgICAgICAgIHRoaXMubGFzdE5hdklkID0gdGhpcy5ndWVzc0RpcmVjdGlvbiA9PT0gJ2ZvcndhcmQnID8gZXYuaWQgOiBpZDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gU3Vic2NyaWJlIHRvIGJhY2tCdXR0b24gZXZlbnRzXG4gICAgcGxhdGZvcm0uYmFja0J1dHRvbi5zdWJzY3JpYmVXaXRoUHJpb3JpdHkoMCwgcHJvY2Vzc05leHRIYW5kbGVyID0+IHtcbiAgICAgIHRoaXMucG9wKCk7XG4gICAgICBwcm9jZXNzTmV4dEhhbmRsZXIoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCB1c2VzIEFuZ3VsYXIncyBbUm91dGVyXShodHRwczovL2FuZ3VsYXIuaW8vYXBpL3JvdXRlci9Sb3V0ZXIpIHVuZGVyIHRoZSBob29kLFxuICAgKiBpdCdzIGVxdWl2YWxlbnQgdG8gY2FsbGluZyBgdGhpcy5yb3V0ZXIubmF2aWdhdGVCeVVybCgpYCwgYnV0IGl0J3MgZXhwbGljaXQgYWJvdXQgdGhlICoqZGlyZWN0aW9uKiogb2YgdGhlIHRyYW5zaXRpb24uXG4gICAqXG4gICAqIEdvaW5nICoqZm9yd2FyZCoqIG1lYW5zIHRoYXQgYSBuZXcgcGFnZSBpcyBnb2luZyB0byBiZSBwdXNoZWQgdG8gdGhlIHN0YWNrIG9mIHRoZSBvdXRsZXQgKGlvbi1yb3V0ZXItb3V0bGV0KSxcbiAgICogYW5kIHRoYXQgaXQgd2lsbCBzaG93IGEgXCJmb3J3YXJkXCIgYW5pbWF0aW9uIGJ5IGRlZmF1bHQuXG4gICAqXG4gICAqIE5hdmlnYXRpbmcgZm9yd2FyZCBjYW4gYWxzbyBiZSB0cmlnZ2VyZWQgaW4gYSBkZWNsYXJhdGl2ZSBtYW5uZXIgYnkgdXNpbmcgdGhlIGBbcm91dGVyRGlyZWN0aW9uXWAgZGlyZWN0aXZlOlxuICAgKlxuICAgKiBgYGBodG1sXG4gICAqIDxhIHJvdXRlckxpbms9XCIvcGF0aC90by9wYWdlXCIgcm91dGVyRGlyZWN0aW9uPVwiZm9yd2FyZFwiPkxpbms8L2E+XG4gICAqIGBgYFxuICAgKi9cbiAgbmF2aWdhdGVGb3J3YXJkKHVybDogc3RyaW5nIHwgVXJsVHJlZSB8IGFueVtdLCBvcHRpb25zOiBOYXZpZ2F0aW9uT3B0aW9ucyA9IHt9KTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgdGhpcy5zZXREaXJlY3Rpb24oJ2ZvcndhcmQnLCBvcHRpb25zLmFuaW1hdGVkLCBvcHRpb25zLmFuaW1hdGlvbkRpcmVjdGlvbik7XG4gICAgcmV0dXJuIHRoaXMubmF2aWdhdGUodXJsLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCB1c2VzIEFuZ3VsYXIncyBbUm91dGVyXShodHRwczovL2FuZ3VsYXIuaW8vYXBpL3JvdXRlci9Sb3V0ZXIpIHVuZGVyIHRoZSBob29kLFxuICAgKiBpdCdzIGVxdWl2YWxlbnQgdG8gY2FsbGluZzpcbiAgICpcbiAgICogYGBgdHNcbiAgICogdGhpcy5uYXZDb250cm9sbGVyLnNldERpcmVjdGlvbignYmFjaycpO1xuICAgKiB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKHBhdGgpO1xuICAgKiBgYGBcbiAgICpcbiAgICogR29pbmcgKipiYWNrKiogbWVhbnMgdGhhdCBhbGwgdGhlIHBhZ2VzIGluIHRoZSBzdGFjayB1bnRpbCB0aGUgbmF2aWdhdGVkIHBhZ2UgaXMgZm91bmQgd2lsbCBiZSBwb3BwZWQsXG4gICAqIGFuZCB0aGF0IGl0IHdpbGwgc2hvdyBhIFwiYmFja1wiIGFuaW1hdGlvbiBieSBkZWZhdWx0LlxuICAgKlxuICAgKiBOYXZpZ2F0aW5nIGJhY2sgY2FuIGFsc28gYmUgdHJpZ2dlcmVkIGluIGEgZGVjbGFyYXRpdmUgbWFubmVyIGJ5IHVzaW5nIHRoZSBgW3JvdXRlckRpcmVjdGlvbl1gIGRpcmVjdGl2ZTpcbiAgICpcbiAgICogYGBgaHRtbFxuICAgKiA8YSByb3V0ZXJMaW5rPVwiL3BhdGgvdG8vcGFnZVwiIHJvdXRlckRpcmVjdGlvbj1cImJhY2tcIj5MaW5rPC9hPlxuICAgKiBgYGBcbiAgICovXG4gIG5hdmlnYXRlQmFjayh1cmw6IHN0cmluZyB8IFVybFRyZWUgfCBhbnlbXSwgb3B0aW9uczogTmF2aWdhdGlvbk9wdGlvbnMgPSB7fSk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHRoaXMuc2V0RGlyZWN0aW9uKCdiYWNrJywgb3B0aW9ucy5hbmltYXRlZCwgb3B0aW9ucy5hbmltYXRpb25EaXJlY3Rpb24pO1xuICAgIHJldHVybiB0aGlzLm5hdmlnYXRlKHVybCwgb3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgdXNlcyBBbmd1bGFyJ3MgW1JvdXRlcl0oaHR0cHM6Ly9hbmd1bGFyLmlvL2FwaS9yb3V0ZXIvUm91dGVyKSB1bmRlciB0aGUgaG9vZCxcbiAgICogaXQncyBlcXVpdmFsZW50IHRvIGNhbGxpbmc6XG4gICAqXG4gICAqIGBgYHRzXG4gICAqIHRoaXMubmF2Q29udHJvbGxlci5zZXREaXJlY3Rpb24oJ3Jvb3QnKTtcbiAgICogdGhpcy5yb3V0ZXIubmF2aWdhdGVCeVVybChwYXRoKTtcbiAgICogYGBgXG4gICAqXG4gICAqIEdvaW5nICoqcm9vdCoqIG1lYW5zIHRoYXQgYWxsIGV4aXN0aW5nIHBhZ2VzIGluIHRoZSBzdGFjayB3aWxsIGJlIHJlbW92ZWQsXG4gICAqIGFuZCB0aGUgbmF2aWdhdGVkIHBhZ2Ugd2lsbCBiZWNvbWUgdGhlIHNpbmdsZSBwYWdlIGluIHRoZSBzdGFjay5cbiAgICpcbiAgICogTmF2aWdhdGluZyByb290IGNhbiBhbHNvIGJlIHRyaWdnZXJlZCBpbiBhIGRlY2xhcmF0aXZlIG1hbm5lciBieSB1c2luZyB0aGUgYFtyb3V0ZXJEaXJlY3Rpb25dYCBkaXJlY3RpdmU6XG4gICAqXG4gICAqIGBgYGh0bWxcbiAgICogPGEgcm91dGVyTGluaz1cIi9wYXRoL3RvL3BhZ2VcIiByb3V0ZXJEaXJlY3Rpb249XCJyb290XCI+TGluazwvYT5cbiAgICogYGBgXG4gICAqL1xuICBuYXZpZ2F0ZVJvb3QodXJsOiBzdHJpbmcgfCBVcmxUcmVlIHwgYW55W10sIG9wdGlvbnM6IE5hdmlnYXRpb25PcHRpb25zID0ge30pOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICB0aGlzLnNldERpcmVjdGlvbigncm9vdCcsIG9wdGlvbnMuYW5pbWF0ZWQsIG9wdGlvbnMuYW5pbWF0aW9uRGlyZWN0aW9uKTtcbiAgICByZXR1cm4gdGhpcy5uYXZpZ2F0ZSh1cmwsIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNhbWUgYXMgW0xvY2F0aW9uXShodHRwczovL2FuZ3VsYXIuaW8vYXBpL2NvbW1vbi9Mb2NhdGlvbikncyBiYWNrKCkgbWV0aG9kLlxuICAgKiBJdCB3aWxsIHVzZSB0aGUgc3RhbmRhcmQgYHdpbmRvdy5oaXN0b3J5LmJhY2soKWAgdW5kZXIgdGhlIGhvb2QsIGJ1dCBmZWF0dXJpbmcgYSBgYmFja2AgYW5pbWF0aW9uXG4gICAqIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBiYWNrKG9wdGlvbnM6IEFuaW1hdGlvbk9wdGlvbnMgPSB7IGFuaW1hdGVkOiB0cnVlLCBhbmltYXRpb25EaXJlY3Rpb246ICdiYWNrJyB9KSB7XG4gICAgdGhpcy5zZXREaXJlY3Rpb24oJ2JhY2snLCBvcHRpb25zLmFuaW1hdGVkLCBvcHRpb25zLmFuaW1hdGlvbkRpcmVjdGlvbik7XG4gICAgcmV0dXJuIHRoaXMubG9jYXRpb24uYmFjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kcyBnb2VzIGJhY2sgaW4gdGhlIGNvbnRleHQgb2YgSW9uaWMncyBzdGFjayBuYXZpZ2F0aW9uLlxuICAgKlxuICAgKiBJdCByZWN1cnNpdmVseSBmaW5kcyB0aGUgdG9wIGFjdGl2ZSBgaW9uLXJvdXRlci1vdXRsZXRgIGFuZCBjYWxscyBgcG9wKClgLlxuICAgKiBUaGlzIGlzIHRoZSByZWNvbW1lbmRlZCB3YXkgdG8gZ28gYmFjayB3aGVuIHlvdSBhcmUgdXNpbmcgYGlvbi1yb3V0ZXItb3V0bGV0YC5cbiAgICovXG4gIGFzeW5jIHBvcCgpIHtcbiAgICBsZXQgb3V0bGV0ID0gdGhpcy50b3BPdXRsZXQ7XG5cbiAgICB3aGlsZSAob3V0bGV0KSB7XG4gICAgICBpZiAoYXdhaXQgb3V0bGV0LnBvcCgpKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3V0bGV0ID0gb3V0bGV0LnBhcmVudE91dGxldDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2RzIHNwZWNpZmllcyB0aGUgZGlyZWN0aW9uIG9mIHRoZSBuZXh0IG5hdmlnYXRpb24gcGVyZm9ybWVkIGJ5IHRoZSBBbmd1bGFyIHJvdXRlci5cbiAgICpcbiAgICogYHNldERpcmVjdGlvbigpYCBkb2VzIG5vdCB0cmlnZ2VyIGFueSB0cmFuc2l0aW9uLCBpdCBqdXN0IHNldHMgc29tZSBmbGFncyB0byBiZSBjb25zdW1lZCBieSBgaW9uLXJvdXRlci1vdXRsZXRgLlxuICAgKlxuICAgKiBJdCdzIHJlY29tbWVuZGVkIHRvIHVzZSBgbmF2aWdhdGVGb3J3YXJkKClgLCBgbmF2aWdhdGVCYWNrKClgIGFuZCBgbmF2aWdhdGVSb290KClgIGluc3RlYWQgb2YgYHNldERpcmVjdGlvbigpYC5cbiAgICovXG4gIHNldERpcmVjdGlvbihkaXJlY3Rpb246IFJvdXRlckRpcmVjdGlvbiwgYW5pbWF0ZWQ/OiBib29sZWFuLCBhbmltYXRpb25EaXJlY3Rpb24/OiAnZm9yd2FyZCcgfCAnYmFjaycpIHtcbiAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICB0aGlzLmFuaW1hdGVkID0gZ2V0QW5pbWF0aW9uKGRpcmVjdGlvbiwgYW5pbWF0ZWQsIGFuaW1hdGlvbkRpcmVjdGlvbik7XG4gIH1cblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBzZXRUb3BPdXRsZXQob3V0bGV0OiBJb25Sb3V0ZXJPdXRsZXQpIHtcbiAgICB0aGlzLnRvcE91dGxldCA9IG91dGxldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGNvbnN1bWVUcmFuc2l0aW9uKCkge1xuICAgIGxldCBkaXJlY3Rpb246IFJvdXRlckRpcmVjdGlvbiA9ICdyb290JztcbiAgICBsZXQgYW5pbWF0aW9uOiBOYXZEaXJlY3Rpb24gfCB1bmRlZmluZWQ7XG5cbiAgICBpZiAodGhpcy5kaXJlY3Rpb24gPT09ICdhdXRvJykge1xuICAgICAgZGlyZWN0aW9uID0gdGhpcy5ndWVzc0RpcmVjdGlvbjtcbiAgICAgIGFuaW1hdGlvbiA9IHRoaXMuZ3Vlc3NBbmltYXRpb247XG4gICAgfSBlbHNlIHtcbiAgICAgIGFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0ZWQ7XG4gICAgICBkaXJlY3Rpb24gPSB0aGlzLmRpcmVjdGlvbjtcbiAgICB9XG4gICAgdGhpcy5kaXJlY3Rpb24gPSBERUZBVUxUX0RJUkVDVElPTjtcbiAgICB0aGlzLmFuaW1hdGVkID0gREVGQVVMVF9BTklNQVRFRDtcblxuICAgIHJldHVybiB7XG4gICAgICBkaXJlY3Rpb24sXG4gICAgICBhbmltYXRpb25cbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBuYXZpZ2F0ZSh1cmw6IHN0cmluZyB8IFVybFRyZWUgfCBhbnlbXSwgb3B0aW9uczogTmF2aWdhdGlvbk9wdGlvbnMpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh1cmwpKSB7XG4gICAgICByZXR1cm4gdGhpcy5yb3V0ZXIhLm5hdmlnYXRlKHVybCwgb3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcblxuICAgICAgLyoqXG4gICAgICAgKiBuYXZpZ2F0ZUJ5VXJsIGlnbm9yZXMgYW55IHByb3BlcnRpZXMgdGhhdFxuICAgICAgICogd291bGQgY2hhbmdlIHRoZSB1cmwsIHNvIHRoaW5ncyBsaWtlIHF1ZXJ5UGFyYW1zXG4gICAgICAgKiB3b3VsZCBiZSBpZ25vcmVkIHVubGVzcyB3ZSBjcmVhdGUgYSB1cmwgdHJlZVxuICAgICAgICogTW9yZSBJbmZvOiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8xODc5OFxuICAgICAgICovXG4gICAgICBjb25zdCB1cmxUcmVlID0gdGhpcy5zZXJpYWxpemVyLnBhcnNlKHVybC50b1N0cmluZygpKTtcblxuICAgICAgaWYgKG9wdGlvbnMucXVlcnlQYXJhbXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB1cmxUcmVlLnF1ZXJ5UGFyYW1zID0geyAuLi5vcHRpb25zLnF1ZXJ5UGFyYW1zIH07XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRpb25zLmZyYWdtZW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdXJsVHJlZS5mcmFnbWVudCA9IG9wdGlvbnMuZnJhZ21lbnQ7XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogYG5hdmlnYXRlQnlVcmxgIHdpbGwgc3RpbGwgYXBwbHkgYE5hdmlnYXRpb25FeHRyYXNgIHByb3BlcnRpZXNcbiAgICAgICAqIHRoYXQgZG8gbm90IG1vZGlmeSB0aGUgdXJsLCBzdWNoIGFzIGByZXBsYWNlVXJsYCB3aGljaCBpcyB3aHlcbiAgICAgICAqIGBvcHRpb25zYCBpcyBwYXNzZWQgaW4gaGVyZS5cbiAgICAgICAqL1xuICAgICAgcmV0dXJuIHRoaXMucm91dGVyIS5uYXZpZ2F0ZUJ5VXJsKHVybFRyZWUsIG9wdGlvbnMpO1xuICAgIH1cbiAgfVxufVxuXG5jb25zdCBnZXRBbmltYXRpb24gPSAoZGlyZWN0aW9uOiBSb3V0ZXJEaXJlY3Rpb24sIGFuaW1hdGVkOiBib29sZWFuIHwgdW5kZWZpbmVkLCBhbmltYXRpb25EaXJlY3Rpb246ICdmb3J3YXJkJyB8ICdiYWNrJyB8IHVuZGVmaW5lZCk6IE5hdkRpcmVjdGlvbiB8IHVuZGVmaW5lZCA9PiB7XG4gIGlmIChhbmltYXRlZCA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIGlmIChhbmltYXRpb25EaXJlY3Rpb24gIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBhbmltYXRpb25EaXJlY3Rpb247XG4gIH1cbiAgaWYgKGRpcmVjdGlvbiA9PT0gJ2ZvcndhcmQnIHx8IGRpcmVjdGlvbiA9PT0gJ2JhY2snKSB7XG4gICAgcmV0dXJuIGRpcmVjdGlvbjtcbiAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdyb290JyAmJiBhbmltYXRlZCA9PT0gdHJ1ZSkge1xuICAgIHJldHVybiAnZm9yd2FyZCc7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn07XG5cbmNvbnN0IERFRkFVTFRfRElSRUNUSU9OID0gJ2F1dG8nO1xuY29uc3QgREVGQVVMVF9BTklNQVRFRCA9IHVuZGVmaW5lZDtcbiJdfQ==