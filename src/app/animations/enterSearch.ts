import { AnimationController } from "@ionic/angular";
import { Animation, createAnimation } from "@ionic/core";

export function myEnterAnimationSearch(baseEl: HTMLElement): Animation {
  const animationCtrl = new AnimationController();
  const backdropAnimation = createAnimation().addElement(
    baseEl.querySelector("ion-backdrop")!
  );
  // .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

  const wrapperAnimation = createAnimation()
    .addElement(baseEl.querySelector(".modal-wrapper")!)
    // .keyframes([
    //   { offset: 0, opacity: '0', transform: 'scale(0)' },
    //   { offset: 1, opacity: '0.99', transform: 'scale(1)' }
    // ]);
    .beforeStyles({ opacity: 1 })

    .fromTo("transform", "translateY(100%)", "translateY(0%)");
  return (
    animationCtrl
      .create()
      .addElement(baseEl)
      // .easing('cubic-bezier(0.36,0.66,0.04,1)')
      .duration(600)
      .beforeAddClass("show-modal")
      .addAnimation([backdropAnimation, wrapperAnimation])
  );
}
