import { animate, group, state, style, transition, trigger } from '@angular/animations';

const borderRightColor = 'transparent';
const borderRightColorActive = 'rgba(0, 0, 0, 0.05)';

export const openCloseAnimation = trigger('openCloseAnimation', [
  state('void', style({
    opacity: 0,
    transform: 'translateX(-100%)',
    borderRightColor
  })),
  state('*', style({
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
    borderRightColor: borderRightColorActive
  })),
  transition('void => *', [
    style({
      opacity: 0,
      transform: 'translate3d(-100%, 0, 0)',
      borderRightColor
    }),
    group([
      animate('320ms ease-out',
        style({
          transform: 'translate3d(0, 0, 0)',
          borderRightColor: borderRightColorActive
        })),
      animate('500ms ease-out',
        style({
          opacity: 1
        }))
    ])
  ]),
  transition('* => void', [
    style({
      opacity: 1,
      transform: 'translate3d(0, 0, 0)',
      borderRightColor: borderRightColorActive
    }),
    animate('320ms ease-out',
      style({
        opacity: 0,
        transform: 'translate3d(-100%, 0, 0)',
        borderRightColor
      }))
  ])
]);
