import RoundButton from "components/elements/RoundButton/RoundButton";

const CreatePlayOff = () => {
  return (
    <div>
      <RoundButton
        textSize="sm"
        icon={<></>}
        bgColor="gray"
        btnClass="mr-2"
        btnType="button"
        btnContent="Create Playoffs"
        handleClick={() => {
          console.log("Create");
        }}
      />
    </div>
  );
};

export default CreatePlayOff;
