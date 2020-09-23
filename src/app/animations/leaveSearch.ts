import { AnimationController } from "@ionic/angular";
import { Animation, createAnimation } from "@ionic/core";

export function myLeaveAnimationSearch(baseEl: HTMLElement): Animation {
  const animationCtrl = new AnimationController();
  const backdropAnimation = createAnimation().addElement(
    baseEl.querySelector("ion-backdrop")!
  );

  const wrapperAnimation = createAnimation()
    .addElement(baseEl.querySelector(".modal-wrapper")!)
    .beforeStyles({ opacity: 1 })

    .fromTo("transform", "translateY(0%)", "translateY(100%)");
  return animationCtrl
    .create()
    .addElement(baseEl)
    .duration(600)
    .beforeAddClass("show-modal")
    .addAnimation([backdropAnimation, wrapperAnimation]);
}
