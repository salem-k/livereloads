import { Animation, createAnimation } from '@ionic/core';
import { AnimationController } from '@ionic/angular';

export function myLeaveAnimationNotif( baseEl: HTMLElement): Animation {

    const animationCtrl = new AnimationController();
    const backdropAnimation = createAnimation()
    .addElement(baseEl.querySelector('ion-backdrop')!)
    // .keyframes([
    //     { offset: 0, opacity: '0.99', transform: 'scale(0)' },
    //     { offset: 1, opacity: '0.3', transform: 'scale(1)' }
    //   ])

  const wrapperAnimation = createAnimation()
    .addElement(baseEl.querySelector('.modal-wrapper')!)
    .beforeStyles({ 'opacity': 1 })
    .fromTo('opacity', 1, 0.1)

    .fromTo('transform', 'translateY(0%)', 'translateY(-100%)')
    return  animationCtrl.create()
        .addElement(baseEl)
        .duration(1000)
        .beforeAddClass('show-modal')
        .addAnimation([backdropAnimation, wrapperAnimation]);
        

}