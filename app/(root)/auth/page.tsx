import BasicForm from "@/components/auth/pages/login";

function form() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between px-4 md:px-24 py-[50px]">
      <BasicForm />
    </div>
  );
}

export default form;
