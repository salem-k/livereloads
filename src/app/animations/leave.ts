import { Animation, createAnimation } from '@ionic/core';
import { AnimationController } from '@ionic/angular';

export function myLeaveAnimation( baseEl: HTMLElement): Animation {

    const animationCtrl = new AnimationController();
    const backdropAnimation = createAnimation()
    .addElement(baseEl.querySelector('ion-backdrop')!)

  const wrapperAnimation = createAnimation()
    .addElement(baseEl.querySelector('.modal-wrapper')!)
    .beforeStyles({ 'opacity': 1 })

    .fromTo('transform', 'translateY(0%)', 'translateY(100%)')
    return  animationCtrl.create()
        .addElement(baseEl)
        .duration(300)
        .beforeAddClass('show-modal')
        .addAnimation([backdropAnimation, wrapperAnimation]);
        

}