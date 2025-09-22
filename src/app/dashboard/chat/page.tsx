
"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ArrowLeft, Send, User, ShieldX, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const worldChat = [
  {
    sender: "Alpha Coder",
    message: "Anyone up for a coding challenge tonight?",
    avatar: "https://picsum.photos/seed/10/100/100",
    time: "5:30 PM",
    isFriend: false,
    allianceCode: "RECR",
  },
  {
    sender: "Syntax Samurai",
    message: "I'm in! What kind of challenge?",
    avatar: "https://picsum.photos/seed/11/100/100",
    time: "5:31 PM",
    isFriend: true,
    allianceCode: "BINB",
  },
  {
    sender: "Cody Clash",
    message: "Let's do a hard one from LeetCode.",
    avatar: "https://picsum.photos/seed/1/100/100",
    time: "5:32 PM",
    isCurrentUser: true,
    allianceCode: "TCC",
  },
  {
    sender: "Data Diva",
    message: "Sounds good! I'll join too.",
    avatar: "https://picsum.photos/seed/14/100/100",
    time: "5:33 PM",
    isFriend: false,
    allianceCode: "PYPH",
  },
];

const allianceChat = [
  {
    sender: "Syntax Slayer",
    message: "Team, let's sync up for the next alliance war.",
    avatar: "https://picsum.photos/seed/2/100/100",
    time: "10:00 AM",
    isFriend: true,
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
    isFriend: true,
  },
];

const initialContacts = [
    { name: "Byte Baron", username: 'byte_baron', avatar: "https://picsum.photos/seed/4/100/100", online: true, lastMessage: "Almost! I'm stuck on...", time: "2:20 PM", allianceCode: "TCC", newMessageCount: 1 },
    { name: "Syntax Slayer", username: 'syntax_slayer', avatar: "https://picsum.photos/seed/2/100/100", online: false, lastMessage: "See you in the arena.", time: "Yesterday", allianceCode: "TCC", newMessageCount: 0 },
    { name: "Algo Queen", username: 'algo_queen', avatar: "https://picsum.photos/seed/3/100/100", online: true, lastMessage: "Good luck on the contest!", time: "Monday", allianceCode: "TCC", newMessageCount: 3 },
    { name: "Pixel Pioneer", username: 'pixel_pioneer', avatar: "https://picsum.photos/seed/5/100/100", online: false, lastMessage: "Wanna duo?", time: "Monday", allianceCode: "TCC", newMessageCount: 0 },
    { name: "Data Diva", username: 'data_diva', avatar: "https://picsum.photos/seed/14/100/100", online: true, lastMessage: "That was a fun match.", time: "4/28/24", allianceCode: "PYPH", newMessageCount: 0 },
];

const getPersonalChat = (contactName: string) => {
    const contact = initialContacts.find(c => c.name === contactName);
    if (contactName === 'Byte Baron') {
        return [
            {
                sender: "Cody Clash",
                message: "Hey, did you solve that DP problem we discussed?",
                avatar: "https://picsum.photos/seed/1/100/100",
                time: "Yesterday 2:15 PM",
                isCurrentUser: true,
                allianceCode: "TCC",
            },
            {
                sender: "Byte Baron",
                message: "Almost! I'm stuck on the state transition. Can you give me a hint?",
                avatar: "https://picsum.photos/seed/4/100/100",
                time: "Yesterday 2:20 PM",
                isFriend: true,
                allianceCode: contact?.allianceCode,
            },
        ]
    }
     if (contactName === 'Algo Queen') {
        return [
            { sender: contactName, message: "Hey, are you joining the contest tonight?", avatar: contact?.avatar || '', time: "Mon 9:00 AM", isFriend: true, allianceCode: contact?.allianceCode },
            { sender: contactName, message: "The problem set looks interesting.", avatar: contact?.avatar || '', time: "Mon 9:01 AM", isFriend: true, allianceCode: contact?.allianceCode },
            { sender: contactName, message: "Let me know!", avatar: contact?.avatar || '', time: "Mon 9:01 AM", isFriend: true, allianceCode: contact?.allianceCode },
        ]
    }
    return [
        {
            sender: "Cody Clash",
            message: `Hey ${contactName}, how's it going?`,
            avatar: "https://picsum.photos/seed/1/100/100",
            time: "1:00 PM",
            isCurrentUser: true,
            allianceCode: "TCC",
        },
        {
            sender: contactName,
            message: `Hey Cody! All good. You?`,
            avatar: contact?.avatar || '',
            time: "1:01 PM",
            isFriend: true,
            allianceCode: contact?.allianceCode,
        },
    ]
};


const UserAvatar = ({ msg }: {msg: { sender: string; avatar: string; isCurrentUser?: boolean, isFriend?: boolean }}) => {
  const content = (
    <Avatar className="h-10 w-10 cursor-pointer">
      <AvatarImage src={msg.avatar} alt={msg.sender} />
      <AvatarFallback>{msg.sender.substring(0, 2)}</AvatarFallback>
    </Avatar>
  );

  if (msg.isCurrentUser) {
    return <Link href="/dashboard/profile">{content}</Link>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{content}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
            <Link href="/dashboard/profile">
                <User className="mr-2 h-4 w-4" />
                <span>See Profile</span>
            </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-500 focus:text-red-500 focus:bg-red-500/10">
          <ShieldX className="mr-2 h-4 w-4" />
          <span>Block</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

type ChatMessageProps = { msg: { sender: string; message: string; avatar: string; time: string; isCurrentUser?: boolean, isFriend?: boolean, allianceCode?: string }, showAllianceCode?: boolean };
const ChatMessage = ({ msg, showAllianceCode = true }: ChatMessageProps) => {
  return (
    <div className={cn("flex items-start gap-4 p-4", msg.isCurrentUser && "justify-end")}>
      {!msg.isCurrentUser && <UserAvatar msg={msg} />}
      <div className={cn("rounded-lg p-3 max-w-[75%]", msg.isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted")}>
        {!msg.isCurrentUser && (
            <p className="font-semibold text-sm mb-1">
                {showAllianceCode && msg.allianceCode && <span className="font-mono text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded-sm mr-1">[{msg.allianceCode}]</span>}
                {msg.sender}
            </p>
        )}
        <p className="text-sm">{msg.message}</p>
        <p className={cn("text-xs mt-2", msg.isCurrentUser ? "text-primary-foreground/70" : "text-muted-foreground")}>{msg.time}</p>
      </div>
      {msg.isCurrentUser && <UserAvatar msg={msg} />}
    </div>
  );
};


const ChatWindow = ({ messages, contactName, onBack, showAllianceCode = true, onSendMessage }: { messages: any[], contactName?: string, onBack?: () => void, showAllianceCode?: boolean, onSendMessage?: (message: string) => void }) => {
  const [inputMessage, setInputMessage] = useState('');
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() && onSendMessage) {
      onSendMessage(inputMessage.trim());
      setInputMessage('');
    }
  };

  return (
    <div className="h-full flex flex-col">
        {/* Optional header for personal chat */}
        {contactName && onBack && (
            <div className="flex-shrink-0 p-4 border-b flex items-center gap-4 bg-background">
                <Button variant="ghost" size="icon" onClick={onBack}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <h2 className="text-lg font-semibold">{contactName}</h2>
            </div>
        )}
        
        {/* Scrollable messages area */}
        <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full" ref={scrollAreaRef}>
                <div className="p-4 space-y-2">
                    {messages.map((msg, index) => (
                        <ChatMessage key={index} msg={msg} showAllianceCode={showAllianceCode} />
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </ScrollArea>
        </div>
        
        {/* Sticky input at bottom */}
        <div className="flex-shrink-0 p-4 flex items-center gap-2 border-t bg-background">
            <Input 
              placeholder="Type a message..." 
              className="flex-1" 
              value={inputMessage} 
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button onClick={handleSendMessage}><Send className="h-4 w-4" /></Button>
        </div>
    </div>
  );
};


const ContactList = ({ contacts, onSelectContact }: { contacts: any[], onSelectContact: (name: string) => void }) => (
    <div className="h-full overflow-hidden">
        <ScrollArea className="h-full">
            <div className="p-4 space-y-1">
                {contacts.map(contact => (
                    <div key={contact.name} onClick={() => onSelectContact(contact.name)} className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted cursor-pointer">
                        <div className="relative">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={contact.avatar} alt={contact.name} />
                                <AvatarFallback>{contact.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            {contact.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />}
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="font-semibold truncate">
                               {contact.name}
                            </p>
                            <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            <span className="text-xs text-muted-foreground">{contact.time}</span>
                            {contact.newMessageCount > 0 && (
                                <Badge className="bg-red-500 text-white hover:bg-red-500/80">{contact.newMessageCount}</Badge>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </ScrollArea>
    </div>
)

const NoAllianceChat = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <Users className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold">Join an Alliance to Chat</h3>
        <p className="text-muted-foreground mt-2 max-w-sm">You must be a member of an alliance to access the alliance chat. Find an alliance to join and start collaborating with your new teammates!</p>
        <Button asChild className="mt-6">
            <Link href="/dashboard/alliance">Find an Alliance</Link>
        </Button>
    </div>
);


const ChatPageContent = () => {
  const searchParams = useSearchParams();
  const user = searchParams.get('user');

  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('worldwide');
  const [hasAlliance] = useState(true);
  const [contacts, setContacts] = useState(initialContacts);
  const [worldMessages, setWorldMessages] = useState(worldChat);
  const [allianceMessages, setAllianceMessages] = useState(allianceChat);
  const [personalMessages, setPersonalMessages] = useState<{[contactName: string]: any[]}>({});
  
  const hasNewMessages = contacts.some(c => c.newMessageCount > 0);

  // Helper function to create a new message
  const createMessage = (message: string) => ({
    sender: "Cody Clash",
    message,
    avatar: "https://picsum.photos/seed/1/100/100",
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    isCurrentUser: true,
    allianceCode: "TCC"
  });

  // Message handlers
  const handleSendWorldMessage = (message: string) => {
    const newMessage = createMessage(message);
    setWorldMessages(prev => [...prev, newMessage]);
  };

  const handleSendAllianceMessage = (message: string) => {
    const newMessage = createMessage(message);
    setAllianceMessages(prev => [...prev, newMessage]);
  };

  const handleSendPersonalMessage = (message: string) => {
    if (!selectedContact) return;
    const newMessage = createMessage(message);
    setPersonalMessages(prev => ({
      ...prev,
      [selectedContact]: [...(prev[selectedContact] || getPersonalChat(selectedContact)), newMessage]
    }));
  };

  useEffect(() => {
    if (user) {
      const contact = contacts.find(c => c.name === user || c.username === user);
      if (contact) {
        handleSelectContact(contact.name);
      }
    }
  }, [user]);
  
  useEffect(() => {
    if (!hasAlliance && activeTab === 'alliance') {
        setActiveTab('worldwide');
    }
  }, [hasAlliance, activeTab]);

  const handleSelectContact = (name: string) => {
    setSelectedContact(name);
    setContacts(prevContacts => prevContacts.map(c => 
        c.name === name ? { ...c, newMessageCount: 0 } : c
    ));
  };

  const handleBack = () => {
    setSelectedContact(null);
  }
  
  const handleTabChange = (value: string) => {
    if(value === 'personal') {
       setSelectedContact(null);
    }
    setActiveTab(value);
  }


  return (
    <div className="h-full flex flex-col">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="h-full flex flex-col">
        {/* Fixed Header - Tabs */}
        <div className="flex-shrink-0 p-4 border-b bg-background">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="worldwide">Worldwide</TabsTrigger>
            <TabsTrigger value="alliance" disabled={!hasAlliance}>Alliance</TabsTrigger>
            <TabsTrigger value="personal" className="relative">
              Personal
              {hasNewMessages && <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />}
            </TabsTrigger>
          </TabsList>
        </div>
        
        {/* Dynamic Content - Scrollable Area */}
        <div className="flex-1 min-h-0">
          <TabsContent value="worldwide" className="h-full m-0 data-[state=active]:flex data-[state=active]:flex-col">
            <ChatWindow messages={worldMessages} onSendMessage={handleSendWorldMessage} />
          </TabsContent>
          <TabsContent value="alliance" className="h-full m-0 data-[state=active]:flex data-[state=active]:flex-col">
            {hasAlliance ? 
              <ChatWindow messages={allianceMessages} showAllianceCode={false} onSendMessage={handleSendAllianceMessage} /> : 
              <NoAllianceChat />
            }
          </TabsContent>
          <TabsContent value="personal" className="h-full m-0 data-[state=active]:flex data-[state=active]:flex-col">
            {selectedContact ? (
              <ChatWindow 
                messages={personalMessages[selectedContact] || getPersonalChat(selectedContact)} 
                contactName={selectedContact} 
                onBack={handleBack} 
                onSendMessage={handleSendPersonalMessage}
              />
            ) : (
              <ContactList contacts={contacts} onSelectContact={handleSelectContact} />
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatPageContent />
    </Suspense>
  )
}
