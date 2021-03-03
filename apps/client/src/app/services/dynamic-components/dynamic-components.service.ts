import {
  ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef,
  Injectable, Injector, Renderer2, RendererFactory2, Type
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicComponentsService {

  private renderer: Renderer2;
  private componentRef: ComponentRef<any>;

  set componentRefInstance(value: ComponentRef<any>) {

    if (!value) {
      return;
    }

    this.componentRef = value;
  }

  get componentRefInstance(): ComponentRef<any> {
    return this.componentRef;
  }

  private get isCreated(): boolean {
    return !!this.componentRef;
  }

  constructor(
    private rendererFactory: RendererFactory2,
    private applicationRef: ApplicationRef,
    private injector: Injector,
    private cmpResolver: ComponentFactoryResolver
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  attachComponentToBody<T>(body: any, component: Type<T>): void {

    if (this.isCreated) {
      return;
    }

    this.componentRef = this.cmpResolver.resolveComponentFactory(component)
      .create(this.injector);

    this.applicationRef.attachView(this.componentRef.hostView);

    const domElement = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    this.renderer.appendChild(body, domElement);
  }

  destroyComponent(): void {

    if (!this.componentRef) {
      return;
    }

    this.componentRefInstance.hostView.destroy();
    this.componentRefInstance.destroy();
    this.componentRef = null;
  }

}
