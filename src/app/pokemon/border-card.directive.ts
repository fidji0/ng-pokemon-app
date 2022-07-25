import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[pkmnBorderCard]'
})
export class BorderCardDirective {
  
  private defaultHeight : number = 180
  private defaultColor : string = '#009688'
  private initialColor : string = '#f5f5f5'


  constructor(private el: ElementRef) {
    this.setHight(this.defaultHeight)
    this.setBorder(this.initialColor)
  }
  @Input('pkmnBorderCard') borderColor:string
  

  @HostListener('mouseenter') onMouseEnter() {
    this.setBorder(this.borderColor ||  this.defaultColor)
  }

  @HostListener('mouseleave') onMouseLeve() {
    this.setBorder('#f5f5f5')
  }
  setHight(height: number) {
    this.el.nativeElement.style.height = `${height}px`;

  }

  setBorder(color: string) {
    this.el.nativeElement.style.border = `solid 4px ${color}`
  }
}
