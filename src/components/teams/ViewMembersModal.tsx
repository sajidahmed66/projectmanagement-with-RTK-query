import React from "react";

interface IModalProps {
  open: boolean;
  control: () => void;
}
const ViewMembersModal = ({ control, open }: IModalProps) => {
  return open ? (
    <>
      <div
        onClick={control}
        className="fixed inset-0 z-10 w-full h-full cursor-pointer bg-black/50"
      ></div>
      <div>ViewmembersModal</div>;
    </>
  ) : (
    <></>
  );
};

export default ViewMembersModal;
