import type { FC } from "react";
import GridLayout from "~/components/layout/GridLayout/GridLayout";

const BENEFITS = [
  {
    id: 1,
    title: "Suitable for amateurs",
    text: `Designed to cater to both professionals and amateurs alike, 
           providing an intuitive platform where users can effortlessly create 
           tournaments when playing with friends.`,
  },
  {
    id: 2,
    title: "Multi-sport compatible",
    text: `Not limited to just one sport. It caters to a 
           wide range of athletic disciplines. From tennis and volleyball to football 
           and basketball, you can rely on Wupzy to elevate your tournament organization, 
           regardless of the sport you're involved in.`,
  },
  {
    id: 3,
    title: "Save time",
    text: `Saves you time by automatically calculating the winners and keeping 
           track of the points for each team or player. No more manual calculations or 
           tedious scorekeeping – let Wupzy handle it all efficiently for you.`,
  },
  {
    id: 4,
    title: "Share results",
    text: `You can easily share the results of your competitions. 
           Engage and excite your participants by effortlessly distributing 
           the results, allowing everyone to stay connected and informed.`,
  },
  {
    id: 5,
    title: `"King" tournament`,
    text: `In a King Tournament, every participant competes against every other 
           participant, with the winner being the one with the highest overall 
           point total at the end of the tournament.`,
  },
  {
    id: 6,
    title: `Easy to cancel`,
    text: `Users have full control over their subscription. 
           If you ever need to unsubscribe, you can easily do so with just a few clicks, 
           no questions asked. If you unsubscribe in the middle of a month, you still 
           have access to all of our features for the remainder of that month.`,
  },
  {
    id: 7,
    title: `Playoff bracket`,
    text: `Our platform simplifies the process, allowing you to generate accurate and 
           fair playoff brackets with just a few clicks. Say goodbye to manual bracket 
           creation and enjoy the convenience of automated playoff bracket generation.`,
  },
];

const Benefits: FC = () => {
  return (
    <div className="mx-auto max-w-4xl">
      <GridLayout isGap minWith="320">
        {BENEFITS.map(({ id, title, text }) => (
          <div
            key={id}
            className="rounded-md border border-gray-50 bg-gray-50 px-3 py-3 shadow md:px-8"
          >
            <h2 className="text-3xl">{title}</h2>
            <div className="mb-3 mt-1 h-1 w-40 rounded-full bg-gradient-to-r from-purple-400 to-pink-600"></div>
            <p className="font-primary">{text}</p>
          </div>
        ))}
      </GridLayout>
    </div>
  );
};

export default Benefits;
