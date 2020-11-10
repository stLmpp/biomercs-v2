import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

class NgLetContext<T> {
  $implicit: T | null = null;
  ngLet: T | null = null;

  setData(value: T | null): void {
    this.$implicit = value;
    this.ngLet = value;
  }
}

@Directive({ selector: '[ngLet]' })
export class NgLetDirective<T> implements OnDestroy, OnInit {
  private _context = new NgLetContext<T>();

  constructor(private viewContainer: ViewContainerRef, private templateRef: TemplateRef<NgLetContext<T>>) {}

  static ngTemplateContextGuard<T>(dir: NgLetDirective<T>, ctx: any): ctx is NgLetContext<NonNullable<T>> {
    return true;
  }

  @Input()
  set ngLet(value: T | null) {
    this._context.setData(value);
  }

  ngOnInit(): void {
    this.viewContainer.clear();
    this.viewContainer.createEmbeddedView(this.templateRef, this._context);
  }

  ngOnDestroy(): void {
    this.viewContainer.clear();
  }
}
