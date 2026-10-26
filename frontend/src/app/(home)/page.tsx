import { Navbar } from "./Navbar";
import { MyDocuments } from "./MyDocuments";
import { TemplateGallery } from "./TemplateGallery";

export default function Home() {
  return (
    <div>
      <Navbar />
      <TemplateGallery />
      <MyDocuments />
    </div>
  );
}
