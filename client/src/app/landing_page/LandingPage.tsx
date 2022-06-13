import { LandingTemplate } from './LandingTemplate';
import classes from './LandingPage.module.css';
import dragon from 'shared/images/dragon.svg';

export const LandingPage = () => {
  return (
    <LandingTemplate>
      <div className={classes.landing_page}>
        <img src={dragon} />
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat
          dicta, qui sequi facilis suscipit corrupti! At aliquam quos quia! Eius
          enim recusandae eum impedit iusto doloribus et aperiam aut nam, saepe
          modi quidem explicabo eaque officiis rem, consequuntur dolorum! Non
          assumenda accusamus modi temporibus ipsam accusantium recusandae optio
          deleniti ullam possimus placeat sunt consectetur architecto, aliquam
          aspernatur nostrum. Labore, natus.
        </p>
      </div>
    </LandingTemplate>
  );
};
