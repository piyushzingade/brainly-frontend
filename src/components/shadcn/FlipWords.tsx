
import { FlipWords } from "../ui/flip-words";

export function FlipWordsDemo() {
  const words = ["better", "focused", "thoughtful", "optimized"];

  return (
    <div className="flex justify-center items-center px-4">
      <div className="md:text-5xl text-3xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
       <span className="text-blue-400">Build 100X</span>
       <span className="w-16 h-6"><FlipWords words={words} /></span> 
         <br />
        with <span className="text-orange-500 font-semibold">Brainly</span>
      </div>
    </div>
  );
}
