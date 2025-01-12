function Tag() {
  return (
    <div className="flex flex-row gap-1 text-zinc-500">
      <div className="bg-gray-300 px-1 flex justify-center items-center rounded-[2px]">
        <p className="text-[12px]">personal</p>
      </div>

      <div className="bg-gray-300 px-1 flex justify-center items-center rounded-[2px]">
        <p className="text-[12px]">work</p>
      </div>
    </div>
  );
}

export default Tag;
