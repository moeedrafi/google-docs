import { Navbar } from "./Navbar";
import { MyDocuments } from "./documents-table";
import { TemplateGallery } from "./template-gallery";

export default function Home() {
  return (
    <div>
      <Navbar />
      <TemplateGallery />
      <MyDocuments />
    </div>
  );
}
