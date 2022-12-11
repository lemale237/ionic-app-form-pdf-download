import * as tslib_1 from "tslib";
import { Directive, HostListener, Optional } from '@angular/core';
import { Config } from '../../providers/config';
import { NavController } from '../../providers/nav-controller';
import { IonRouterOutlet } from './ion-router-outlet';
let IonBackButtonDelegate = class IonBackButtonDelegate {
    constructor(routerOutlet, navCtrl, config) {
        this.routerOutlet = routerOutlet;
        this.navCtrl = navCtrl;
        this.config = config;
    }
    /**
     * @internal
     */
    onClick(ev) {
        const defaultHref = this.defaultHref || this.config.get('backButtonDefaultHref');
        if (this.routerOutlet && this.routerOutlet.canGoBack()) {
            this.routerOutlet.pop();
            ev.preventDefault();
        }
        else if (defaultHref != null) {
            this.navCtrl.navigateBack(defaultHref);
            ev.preventDefault();
        }
    }
};
IonBackButtonDelegate.ctorParameters = () => [
    { type: IonRouterOutlet, decorators: [{ type: Optional }] },
    { type: NavController },
    { type: Config }
];
tslib_1.__decorate([
    HostListener('click', ['$event'])
], IonBackButtonDelegate.prototype, "onClick", null);
IonBackButtonDelegate = tslib_1.__decorate([
    Directive({
        selector: 'ion-back-button',
        inputs: ['defaultHref'],
    }),
    tslib_1.__param(0, Optional())
], IonBackButtonDelegate);
export { IonBackButtonDelegate };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW9uLWJhY2stYnV0dG9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlvbmljL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL25hdmlnYXRpb24vaW9uLWJhY2stYnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2hELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUUvRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFNdEQsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBcUI7SUFJaEMsWUFDc0IsWUFBNkIsRUFDekMsT0FBc0IsRUFDdEIsTUFBYztRQUZGLGlCQUFZLEdBQVosWUFBWSxDQUFpQjtRQUN6QyxZQUFPLEdBQVAsT0FBTyxDQUFlO1FBQ3RCLFdBQU0sR0FBTixNQUFNLENBQVE7SUFDckIsQ0FBQztJQUVKOztPQUVHO0lBRUgsT0FBTyxDQUFDLEVBQVM7UUFDZixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFFakYsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDdEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUN4QixFQUFFLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDckI7YUFBTSxJQUFJLFdBQVcsSUFBSSxJQUFJLEVBQUU7WUFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdkMsRUFBRSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3JCO0lBQ0gsQ0FBQztDQUNGLENBQUE7O1lBcEJxQyxlQUFlLHVCQUFoRCxRQUFRO1lBQ1EsYUFBYTtZQUNkLE1BQU07O0FBT3hCO0lBREMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29EQVdqQztBQXhCVSxxQkFBcUI7SUFKakMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGlCQUFpQjtRQUMzQixNQUFNLEVBQUUsQ0FBQyxhQUFhLENBQUM7S0FDeEIsQ0FBQztJQU1HLG1CQUFBLFFBQVEsRUFBRSxDQUFBO0dBTEYscUJBQXFCLENBeUJqQztTQXpCWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL2NvbmZpZyc7XG5pbXBvcnQgeyBOYXZDb250cm9sbGVyIH0gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL25hdi1jb250cm9sbGVyJztcblxuaW1wb3J0IHsgSW9uUm91dGVyT3V0bGV0IH0gZnJvbSAnLi9pb24tcm91dGVyLW91dGxldCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2lvbi1iYWNrLWJ1dHRvbicsXG4gIGlucHV0czogWydkZWZhdWx0SHJlZiddLFxufSlcbmV4cG9ydCBjbGFzcyBJb25CYWNrQnV0dG9uRGVsZWdhdGUge1xuXG4gIGRlZmF1bHRIcmVmOiBzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgcm91dGVyT3V0bGV0OiBJb25Sb3V0ZXJPdXRsZXQsXG4gICAgcHJpdmF0ZSBuYXZDdHJsOiBOYXZDb250cm9sbGVyLFxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWdcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgb25DbGljayhldjogRXZlbnQpIHtcbiAgICBjb25zdCBkZWZhdWx0SHJlZiA9IHRoaXMuZGVmYXVsdEhyZWYgfHwgdGhpcy5jb25maWcuZ2V0KCdiYWNrQnV0dG9uRGVmYXVsdEhyZWYnKTtcblxuICAgIGlmICh0aGlzLnJvdXRlck91dGxldCAmJiB0aGlzLnJvdXRlck91dGxldC5jYW5Hb0JhY2soKSkge1xuICAgICAgdGhpcy5yb3V0ZXJPdXRsZXQucG9wKCk7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0gZWxzZSBpZiAoZGVmYXVsdEhyZWYgIT0gbnVsbCkge1xuICAgICAgdGhpcy5uYXZDdHJsLm5hdmlnYXRlQmFjayhkZWZhdWx0SHJlZik7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxufVxuIl19