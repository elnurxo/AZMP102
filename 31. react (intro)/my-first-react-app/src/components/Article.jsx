import BlogTitle from "./BlogTitle.jsx";
import BlogContent from "./BlogContent.jsx";
import Img from "./Img.jsx";

//smart component - parent component
const Article = () => {
  return (
    <>
      {/* self-close component */}
      <BlogTitle />
      <BlogContent />
      <Img />
      <hr />
      <h4>additional title</h4>
    </>
  );
};

export default Article;
