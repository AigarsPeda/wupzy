import type { FC } from "react";
import Highlighter from "react-highlight-words";

const ExplanationsSection: FC = () => {
  return (
    <div className="mx-auto mt-10 flex max-w-3xl md:mt-20">
      <p className="font-primary">
        <Highlighter
          autoEscape={true}
          highlightClassName="highlightLine px-1 py-0.5"
          searchWords={["tournament tables", "save game scores"]}
          textToHighlight="What is wupzy? Wupzy is a powerful platform that lets you effortlessly create
            tournament tables, save game scores, view
            real-time results, and share them with all participants in just a few
            clicks"
        />
      </p>
    </div>
  );
};

export default ExplanationsSection;
