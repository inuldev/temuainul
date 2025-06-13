"use client";

import { useState } from "react";
import { InfoIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export const InstructionHelper = () => {
  const [isOpen, setIsOpen] = useState(false);

  const examples = [
    {
      title: "Customer Service Agent",
      instruction:
        "Anda adalah asisten customer service yang ramah dan profesional. Selalu berikan respons yang sopan, informatif, dan solution-oriented. Jika ada masalah yang tidak bisa diselesaikan, arahkan ke tim yang tepat dengan penjelasan yang jelas. Gunakan bahasa Indonesia yang natural dan mudah dipahami.",
    },
    {
      title: "Sales Assistant",
      instruction:
        "Anda adalah asisten penjualan yang membantu calon pelanggan memahami produk dan layanan. Berikan informasi yang akurat, tanyakan kebutuhan spesifik, dan tawarkan solusi yang sesuai. Selalu bersikap profesional namun tetap hangat dan approachable.",
    },
    {
      title: "Technical Support",
      instruction:
        "Anda adalah teknisi support yang membantu menyelesaikan masalah teknis. Berikan panduan step-by-step yang jelas, gunakan bahasa yang mudah dipahami, dan pastikan user memahami setiap langkah. Jika masalah kompleks, eskalasi ke tim teknis senior.",
    },
  ];

  const tips = [
    "Jelaskan peran dan kepribadian agent dengan spesifik",
    "Tentukan gaya komunikasi yang diinginkan (formal/casual, ramah/profesional)",
    "Berikan panduan untuk situasi khusus atau edge cases",
    "Gunakan bahasa yang jelas dan mudah dipahami",
    "Sertakan instruksi untuk selalu merespons dalam bahasa Indonesia",
    "Tentukan batasan atau hal yang tidak boleh dilakukan agent",
  ];

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-between text-muted-foreground hover:text-foreground"
        >
          <div className="flex items-center gap-2">
            <InfoIcon className="size-4" />
            <span>Tips Membuat Instruksi yang Efektif</span>
          </div>
          {isOpen ? (
            <ChevronUpIcon className="size-4" />
          ) : (
            <ChevronDownIcon className="size-4" />
          )}
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent className="space-y-4 pt-4">
        <div className="rounded-lg border bg-muted/50 p-4">
          <h4 className="font-medium mb-3">Tips Penting:</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium">Contoh Instruksi yang Baik:</h4>
          {examples.map((example, index) => (
            <div key={index} className="rounded-lg border p-3">
              <h5 className="font-medium text-sm mb-2 text-primary">
                {example.title}
              </h5>
              <p className="text-sm text-muted-foreground leading-relaxed">
                &ldquo;{example.instruction}&rdquo;
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-lg border bg-blue-50 dark:bg-blue-950/20 p-4">
          <div className="flex items-start gap-2">
            <InfoIcon className="size-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                Catatan Penting
              </p>
              <p className="text-blue-700 dark:text-blue-200">
                Agent akan secara otomatis dioptimasi untuk merespons dalam
                bahasa Indonesia yang natural. Fokuskan instruksi Anda pada
                peran, kepribadian, dan cara kerja yang diinginkan.
              </p>
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
