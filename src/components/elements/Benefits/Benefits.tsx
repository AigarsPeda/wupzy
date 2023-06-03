import type { FC } from "react";

const BENEFITS = [
  {
    id: 1,
    title: "Suitable for amateurs and professionals",
    text: `Designed to cater to both professionals and amateurs alike, 
           providing an intuitive platform where users can effortlessly create 
           tournaments when playing with friends.`,
  },
  {
    id: 2,
    title: "Save time",
    text: `Saves you time by automatically calculating the winners and keeping 
           track of the points for each team or player. No more manual calculations or 
           tedious scorekeeping – let Wupzy handle it all efficiently for you.`,
  },
  {
    id: 3,
    title: "Share results",
    text: `You can easily share the results of your competitions. 
           Engage and excite your participants by effortlessly distributing 
           the results, allowing everyone to stay connected and informed.`,
  },
  {
    id: 3,
    title: `"King" tournament`,
    text: `In a King Tournament, every participant competes against every other 
           participant, with the winner being the one with the highest overall 
           point total at the end of the tournament`,
  },
];

const Benefits: FC = () => {
  return (
    <div className="">
      <div className="">
        <div className="">
          <div className="">Easy to use</div>
          <div className="">
            Wupzy is a powerful platform that lets you effortlessly create
            tournament tables, save game scores, view real-time results, and
            share them with all participants in just a few clicks.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
