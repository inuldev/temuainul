import Link from "next/link";
import Markdown from "react-markdown";
import {
  BookOpenTextIcon,
  FileTextIcon,
  FileVideoIcon,
  ClockFadingIcon,
  SparklesIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { formatDuration, formatDateLong } from "@/lib/utils";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Transcript } from "./transcript";
import { ChatProvider } from "./chat-provider";

import { MeetingGetOne } from "../../types";

interface Props {
  data: MeetingGetOne;
}

export const CompletedState = ({ data }: Props) => {
  return (
    <div className="flex flex-col gap-y-4">
      <Tabs defaultValue="summary">
        <div className="bg-card text-card-foreground rounded-lg border px-3">
          <ScrollArea>
            <TabsList className="p-0 bg-transparent text-muted-foreground justify-start rounded-none h-13">
              <TabsTrigger
                value="summary"
                className="rounded-none bg-transparent text-muted-foreground data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-foreground h-full hover:text-foreground transition-colors"
              >
                <BookOpenTextIcon />
                Summary
              </TabsTrigger>
              <TabsTrigger
                value="transcript"
                className="rounded-none bg-transparent text-muted-foreground data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-foreground h-full hover:text-foreground transition-colors"
              >
                <FileTextIcon />
                Transcript
              </TabsTrigger>
              <TabsTrigger
                value="recording"
                className="rounded-none bg-transparent text-muted-foreground data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-foreground h-full hover:text-foreground transition-colors"
              >
                <FileVideoIcon />
                Recording
              </TabsTrigger>
              <TabsTrigger
                value="chat"
                className="rounded-none bg-transparent text-muted-foreground data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-foreground h-full hover:text-foreground transition-colors"
              >
                <SparklesIcon />
                Ask AI
              </TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        <TabsContent value="chat">
          <ChatProvider meetingId={data.id} meetingName={data.name} />
        </TabsContent>
        <TabsContent value="transcript">
          <Transcript meetingId={data.id} />
        </TabsContent>
        <TabsContent value="recording">
          <div className="bg-card text-card-foreground rounded-lg border px-4 py-5">
            <video
              src={data.recordingUrl!}
              className="w-full rounded-lg"
              controls
            />
          </div>
        </TabsContent>
        <TabsContent value="summary">
          <div className="bg-card text-card-foreground rounded-lg border">
            <div className="px-4 py-5 gap-y-5 flex flex-col col-span-5">
              <h2 className="text-2xl font-medium capitalize">{data.name}</h2>
              <div className="flex gap-x-2 items-center">
                <Link
                  href={`/agents/${data.agent.id}`}
                  className="flex items-center gap-x-2 underline underline-offset-4 capitalize hover:text-primary dark:hover:text-primary-dark"
                >
                  <GeneratedAvatar
                    variant="botttsNeutral"
                    seed={data.agent.name}
                    className="size-5"
                  />
                  {data.agent.name}
                </Link>{" "}
                <p className="text-muted-foreground">
                  {data.startedAt ? formatDateLong(data.startedAt) : ""}
                </p>
              </div>
              <div className="flex gap-x-2 items-center">
                <SparklesIcon className="size-4" />
                <p>General Summary</p>
              </div>
              <Badge
                variant="outline"
                className="flex items-center gap-x-2 [&>svg]:size-4"
              >
                <ClockFadingIcon className="text-blue-700 dark:text-blue-400" />
                {data.duration
                  ? formatDuration(data.duration)
                  : "Tidak ada durasi"}
              </Badge>
              <div>
                <Markdown
                  components={{
                    h1: (props) => (
                      <h1 className="text-2xl font-medium mb-6" {...props} />
                    ),
                    h2: (props) => (
                      <h2 className="text-xl font-medium mb-6" {...props} />
                    ),
                    h3: (props) => (
                      <h3 className="text-lg font-medium mb-6" {...props} />
                    ),
                    h4: (props) => (
                      <h4 className="text-base font-medium mb-6" {...props} />
                    ),
                    p: (props) => (
                      <p className="mb-6 leading-relaxed text-sm" {...props} />
                    ),
                    ul: (props) => (
                      <ul className="list-disc list-inside mb-6" {...props} />
                    ),
                    ol: (props) => (
                      <ol
                        className="list-decimal list-inside mb-6"
                        {...props}
                      />
                    ),
                    li: (props) => <li className="mb-1 text-sm" {...props} />,
                    strong: (props) => (
                      <strong className="font-semibold" {...props} />
                    ),
                    code: (props) => (
                      <code
                        className="bg-muted px-1 py-0.5 rounded text-sm"
                        {...props}
                      />
                    ),
                    blockquote: (props) => (
                      <blockquote
                        className="border-l-4 border-border pl-4 italic my-4 text-muted-foreground"
                        {...props}
                      />
                    ),
                  }}
                >
                  {data.summary}
                </Markdown>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
