"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const templates = [
  {
    id: "blank",
    label: "Blank Document",
    imageUrl: "/blank-document.svg",
    initialContent: "",
  },
  {
    id: "software-proposal",
    label: "Software development proposal",
    imageUrl: "/software-proposal.svg",
    initialContent: `
      <h1>Software Development Proposal</h1>
      <h2>Project Overview</h2>
      <p>Brief description of the proposed software development project.</p>
     
      <h2>Scope of Work</h2>
      <p>Detailed breakdown of project deliverables and requirements.</p>
     
      <h2>Timeline</h2>
      <p>Project milestones and delivery schedule.</p>
     
      <h2>Budget</h2>
      <p>Cost breakdown and payment terms.</p>
    `,
  },
  {
    id: "project-proposal",
    label: "Project proposal",
    imageUrl: "/project-proposal.svg",
    initialContent: `
      <h1>Project Proposal</h1>
      <h2>Executive Summary</h2>
      <p>Brief overview of the project proposal.</p>
     
      <h2>Project Goals</h2>
      <p>Key objectives and expected outcomes.</p>
     
      <h2>Implementation Plan</h2>
      <p>Strategy and methodology for project execution.</p>
     
      <h2>Resources Required</h2>
      <p>Team, equipment, and budget requirements.</p>
    `,
  },
  {
    id: "business-letter",
    label: "Business letter",
    imageUrl: "/business-letter.svg",
    initialContent: `
      <h1>Business Letter</h1>
      <p>This is a business letter template.</p>
    `,
  },
  {
    id: "resume",
    label: "Resume",
    imageUrl: "/resume.svg",
    initialContent: `
      <h1>[Your Name]</h1>
      <p>[Contact Information]</p>
     
      <h2>Professional Summary</h2>
      <p>Brief overview of your professional background and key strengths.</p>
     
      <h2>Work Experience</h2>
      <p>[Company Name] - [Position]<br>
      [Date Range]</p>
     
      <h2>Education</h2>
      <p>[Degree] - [Institution]<br>
      [Graduation Year]</p>
     
      <h2>Skills</h2>
      <p>List of relevant skills and competencies.</p>
    `,
  },
  {
    id: "cover-letter",
    label: "Cover letter",
    imageUrl: "/cover-letter.svg",
    initialContent: `
      <p>[Your Name]<br>
      [Your Address]<br>
      [City, State ZIP]</p>
     
      <p>[Date]</p>
     
      <p>[Recipient's Name]<br>
      [Company Name]<br>
      [Company Address]</p>
     
      <p>Dear [Recipient's Name],</p>
     
      <p>I am writing to express my interest in [position] at [company name].</p>
     
      <p>Sincerely,<br>
      [Your Name]</p>
    `,
  },
  {
    id: "letter",
    label: "Letter",
    imageUrl: "/letter.svg",
    initialContent: `
      <p>Subject: [Email Subject]</p>
     
      <p>Dear [Recipient],</p>
     
      <p>I hope this email finds you well.</p>
     
      <p>[Email Body]</p>
     
      <p>Best regards,<br>
      [Your Name]</p>
    `,
  },
];

export const TemplateGallery = () => {
  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-16 py-6 flex flex-col gap-y-4">
        <h1 className="font-medium">Start a new document</h1>

        <Carousel>
          <CarouselContent className="-ml-4">
            {templates.map((template) => (
              <CarouselItem
                key={template.id}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.285714%] pl-4"
              >
                <div className="aspect-3/4 space-y-2.5">
                  <button
                    style={{
                      backgroundImage: `url(${template.imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    className="size-full hover:border-blue-500 rounded-sm border hover:bg-blue-50 transition flex flex-col items-center justify-center gap-y-4 bg-white"
                  />
                  <p className="text-xs font-medium truncate">
                    {template.label}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};
