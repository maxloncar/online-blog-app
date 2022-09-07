import Sidebar from "../components/Sidebar";
import SingleBlogPost from "../components/SingleBlogPost";

export default function Single() {
  return (
    <div className="single">
      <SingleBlogPost />
      <Sidebar />
    </div>
  );
}
