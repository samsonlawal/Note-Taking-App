function Tag({ tag }: any) {
  return (
    <div className="flex flex-row gap-1 text-zinc-500 dark:text-gray-400">
      <div className="bg-gray-300 dark:bg-gray-700 px-1 flex justify-center items-center rounded-[2px]">
        <p className="text-[12px] dark:text-gray-400">{tag}</p>
      </div>
    </div>
  );
}

export default Tag;
