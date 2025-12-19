"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

// Reusable Scribble Button Component
const ScribbleButton = ({
  src,
  alt,
  position,
  link,
}: {
  src: string;
  alt: string;
  position: string;
  link: string;
}) => {
  const router = useRouter();
  return (
    <button
      className={`absolute ${position} w-[120px] h-[60px]`}
      onClick={() => router.push(link)}
      aria-label={`Navigate to ${alt}`}
    >
      <Image src={src} alt={alt} layout="fill" objectFit="contain" />
    </button>
  );
};

export default function WhiteboardPage() {
  const router = useRouter();

  return (
    <main className="relative w-full h-screen flex items-center justify-center bg-gray-900 font-[ubuntu]">
      {/* Background Whiteboard Image */}
      <Image
        src="/images/Whiteboard page.png"
        alt="Whiteboard"
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
      />

      {/* Clickable Scribble Images */}
      <div className="absolute inset-0 flex items-center justify-center">
        <ScribbleButton
          src="/images/whiteboard/10-steps.png"
          alt="10 Steps"
          position="top-[25%] left-[45%]"
          link="/10-steps"
        />
        <ScribbleButton
          src="/images/whiteboard/animation.png"
          alt="Animation"
          position="top-[30%] left-[60%]"
          link="/animation"
        />
        <ScribbleButton
          src="/images/whiteboard/agent-productivity-curve.png"
          alt="Agent Productivity Curve"
          position="top-[40%] left-[50%]"
          link="/agent-productivity-curve"
        />
        <ScribbleButton
          src="/images/whiteboard/cisco-profiling.png"
          alt="Cisco Profiling"
          position="top-[50%] left-[43%]"
          link="/cisco-profiling"
        />
        <ScribbleButton
          src="/images/whiteboard/seminar-registration.png"
          alt="Seminar Registration Process"
          position="top-[55%] left-[70%]"
          link="/seminar-registration-process"
        />
        <ScribbleButton
          src="/images/whiteboard/edm-examples.png"
          alt="eDM Examples"
          position="top-[30%] left-[75%]"
          link="/edm-examples"
        />

        {/* Back to Reception Button */}
        <button
          className="absolute bottom-4 left-4 px-5 py-2 bg-[#0091d2] text-white font-bold rounded-lg shadow-lg hover:bg-[#007fbf] transition-all duration-200"
          onClick={() => router.push("/reception")}
        >
          ⬅ Back to Reception
        </button>
      </div>
    </main>
  );
}
