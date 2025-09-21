import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";

const worldChat = [
  {
    sender: "Alpha Coder",
    message: "Anyone up for a coding challenge tonight?",
    avatar: "https://picsum.photos/seed/10/100/100",
    time: "5:30 PM",
  },
  {
    sender: "Syntax Samurai",
    message: "I'm in! What kind of challenge?",
    avatar: "https://picsum.photos/seed/11/100/100",
    time: "5:31 PM",
  },
  {
    sender: "Cody Clash",
    message: "Let's do a hard one from LeetCode.",
    avatar: "https://picsum.photos/seed/1/100/100",
    time: "5:32 PM",
    isCurrentUser: true,
  },
  {
    sender: "Data Diva",
    message: "Sounds good! I'll join too.",
    avatar: "https://picsum.photos/seed/14/100/100",
    time: "5:33 PM",
  },
];

const allianceChat = [
  {
    sender: "Syntax Slayer",
    message: "Team, let's sync up for the next alliance war.",
    avatar: "https://picsum.photos/seed/2/100/100",
    time: "10:00 AM",
  },
  {
    sender: "Cody Clash",
    message: "Ready when you are. I've been practicing my graph algorithms.",
    avatar: "https://picsum.photos/seed/1/100/100",
    time: "10:01 AM",
    isCurrentUser: true,
  },
  {
    sender: "Algo Queen",
    message: "I've scouted the opponent. They are strong in dynamic programming.",
    avatar: "https://picsum.photos/seed/3/100/100",
    time: "10:02 AM",
  },
];

const personalChat = [
  {
    sender: "Cody Clash",
    message: "Hey, did you solve that DP problem we discussed?",
    avatar: "https://picsum.photos/seed/1/100/100",
    time: "Yesterday 2:15 PM",
    isCurrentUser: true,
  },
  {
    sender: "Byte Baron",
    message: "Almost! I'm stuck on the state transition. Can you give me a hint?",
    avatar: "https://picsum.photos/seed/4/100/100",
    time: "Yesterday 2:20 PM",
  },
];

const ChatMessage = ({ msg }: { msg: { sender: string; message: string; avatar: string; time: string; isCurrentUser?: boolean } }) => {
  return (
    <div className={cn("flex items-start gap-4 p-4", msg.isCurrentUser && "justify-end")}>
      {!msg.isCurrentUser && (
        <Avatar className="h-10 w-10">
          <AvatarImage src={msg.avatar} alt={msg.sender} />
          <AvatarFallback>{msg.sender.substring(0, 2)}</AvatarFallback>
        </Avatar>
      )}
      <div className={cn("rounded-lg p-3 max-w-[75%]", msg.isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted")}>
        {!msg.isCurrentUser && <p className="font-semibold text-sm mb-1">{msg.sender}</p>}
        <p className="text-sm">{msg.message}</p>
        <p className={cn("text-xs mt-2", msg.isCurrentUser ? "text-primary-foreground/70" : "text-muted-foreground")}>{msg.time}</p>
      </div>
      {msg.isCurrentUser && (
        <Avatar className="h-10 w-10">
          <AvatarImage src={msg.avatar} alt={msg.sender} />
          <AvatarFallback>{msg.sender.substring(0, 2)}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};


const ChatTabContent = ({ messages }: { messages: any[] }) => (
    <div className="flex flex-col h-full">
    <ScrollArea className="flex-1">
      <div className="p-4 space-y-2">
        {messages.map((msg, index) => (
          <ChatMessage key={index} msg={msg} />
        ))}
      </div>
    </ScrollArea>
    <div className="p-4 flex items-center gap-2 border-t">
      <Input placeholder="Type a message..." className="flex-1" />
      <Button><Send className="h-4 w-4" /></Button>
    </div>
  </div>
);

export default function ChatPage() {
  return (
    <div className="flex flex-col h-full">
       <Tabs defaultValue="worldwide" className="flex flex-col flex-1">
          <div className="p-4 border-b">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="worldwide">Worldwide</TabsTrigger>
                <TabsTrigger value="alliance">Alliance</TabsTrigger>
                <TabsTrigger value="personal">Personal</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="worldwide" className="flex-1 mt-0">
            <ChatTabContent messages={worldChat} />
          </TabsContent>
          <TabsContent value="alliance" className="flex-1 mt-0">
            <ChatTabContent messages={allianceChat} />
          </TabsContent>
          <TabsContent value="personal" className="flex-1 mt-0">
            <ChatTabContent messages={personalChat} />
          </TabsContent>
        </Tabs>
    </div>
  );
}
