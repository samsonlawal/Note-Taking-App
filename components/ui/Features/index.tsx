import { FolderSync, PenTool, Users } from "lucide-react";

function Features() {
  const features = [
    {
      title: "Markdown",
      icon: <PenTool color="#292929" strokeWidth={1} size={18} />,
      content:
        "Easily format your notes using markdown syntax for rich text editing.",
      bgColor: true,
    },
    {
      title: "Sync",
      icon: <FolderSync color="#292929" strokeWidth={1} size={18} />,
      content:
        "Access your notes from any device and automatically sync them across platforms.",
    },
    // {
    //   title: "Collaboration",
    //   icon: <Users color="#292929" strokeWidth={1} size={18} />,
    //   content:
    //     "Invite others to collaborate on your notes in real-time. Perfect for team projects and shared knowledge.",
    // },
  ];

  return (
    <div className="w-fit border border-input bg-[#c9c9ce17] dark:bg-gray-200 text-black font-poppins rounded-2xl px-1 py-1 mb-[20px]">
      <div className="flex flex-row gap-3">
        {features.map((feature, index) => (
          <div
            key={index}
            className={` ${
              feature.bgColor ? "bg-[#a3d3cf] dark:bg-[#a3d3cf]/50" : ""
            } cursor-move rounded-xl flex items-center space-x-2 py-1 px-4 text-sm font-medium`}
          >
            <div>{feature.icon}</div>
            <span>{feature.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;
