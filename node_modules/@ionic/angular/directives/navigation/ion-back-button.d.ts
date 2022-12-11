import { Config } from '../../providers/config';
import { NavController } from '../../providers/nav-controller';
import { IonRouterOutlet } from './ion-router-outlet';
import * as ɵngcc0 from '@angular/core';
export declare class IonBackButtonDelegate {
    private routerOutlet;
    private navCtrl;
    private config;
    defaultHref: string | undefined | null;
    constructor(routerOutlet: IonRouterOutlet, navCtrl: NavController, config: Config);
    /**
     * @internal
     */
    onClick(ev: Event): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<IonBackButtonDelegate, [{ optional: true; }, null, null]>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<IonBackButtonDelegate, "ion-back-button", never, { "defaultHref": "defaultHref"; }, {}, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW9uLWJhY2stYnV0dG9uLmQudHMiLCJzb3VyY2VzIjpbImlvbi1iYWNrLWJ1dHRvbi5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLi8uLi9wcm92aWRlcnMvY29uZmlnJztcbmltcG9ydCB7IE5hdkNvbnRyb2xsZXIgfSBmcm9tICcuLi8uLi9wcm92aWRlcnMvbmF2LWNvbnRyb2xsZXInO1xuaW1wb3J0IHsgSW9uUm91dGVyT3V0bGV0IH0gZnJvbSAnLi9pb24tcm91dGVyLW91dGxldCc7XG5leHBvcnQgZGVjbGFyZSBjbGFzcyBJb25CYWNrQnV0dG9uRGVsZWdhdGUge1xuICAgIHByaXZhdGUgcm91dGVyT3V0bGV0O1xuICAgIHByaXZhdGUgbmF2Q3RybDtcbiAgICBwcml2YXRlIGNvbmZpZztcbiAgICBkZWZhdWx0SHJlZjogc3RyaW5nIHwgdW5kZWZpbmVkIHwgbnVsbDtcbiAgICBjb25zdHJ1Y3Rvcihyb3V0ZXJPdXRsZXQ6IElvblJvdXRlck91dGxldCwgbmF2Q3RybDogTmF2Q29udHJvbGxlciwgY29uZmlnOiBDb25maWcpO1xuICAgIC8qKlxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqL1xuICAgIG9uQ2xpY2soZXY6IEV2ZW50KTogdm9pZDtcbn1cbiJdfQ==