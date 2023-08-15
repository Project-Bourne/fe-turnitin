// home page
import HomeLayout from "@/layout/HomeLayout";
import { HomeSubData } from "@/utils/constants";
import HomeHistory from "./components/history";
import SettingsLayout from "@/layout/SettingsLayout";
import { useRouter } from "next/router";
import FileUpload from "./components/FileUpload";

function Home() {
  const showTitle = false;
  const router = useRouter();
  console.log(router, "i am router");
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className="mt-[8rem] h-[100%] rounded-[1rem] bg-sirp-lightGrey mx-5">
      <HomeLayout>
        <h1 className="text-2xl pl-10 pt-5 font-bold">Add Content</h1>
        <FileUpload />
      </HomeLayout>
      <HomeHistory />
    </div>
  );
}

export default Home;
