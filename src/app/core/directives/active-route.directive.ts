import { Directive, ElementRef, Input, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Directive({
    selector: '[appActiveRoute]',
    standalone: true
})
export class ActiveRouteDirective implements OnInit, OnDestroy {
    @Input('appActiveRoute') route: string = '';
    @Input() activeClass: string = 'active';

    private subscription: Subscription = new Subscription();

    constructor(
        private router: Router,
        private el: ElementRef,
        private renderer: Renderer2
    ) { }

    ngOnInit() {
        this.checkRouteMatch();
        this.subscription.add(
            this.router.events.pipe(
                filter(event => event instanceof NavigationEnd)
            ).subscribe(() => {
                this.checkRouteMatch();
            })
        );
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    private checkRouteMatch() {
        const currentUrl = this.router.url;
        if (this.isRouteMatch(currentUrl, this.route)) {
            this.renderer.addClass(this.el.nativeElement, this.activeClass);
        } else {
            this.renderer.removeClass(this.el.nativeElement, this.activeClass);
        }
    }

    private isRouteMatch(currentUrl: string, targetRoute: string): boolean {
        return currentUrl === targetRoute;
    }
}