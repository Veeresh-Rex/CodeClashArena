
"use client";

import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Play,
  Upload,
  Clock,
  CheckCircle,
  XCircle,
  DoorClosed,
  Loader2,
  FileCode,
  History,
  PartyPopper,
  ArrowRight,
  Home,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { formatDistanceToNow } from "date-fns";


const languages = ["javascript", "python", "java", "csharp", "cpp"];

const problem = {
  title: "1. Two Sum",
  difficulty: "Easy",
  description: `
<p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.</p>
<p>You may assume that each input would have <strong><em>exactly</em> one solution</strong>, and you may not use the <em>same</em> element twice.</p>
<p>You can return the answer in any order.</p>
<pre class="bg-muted p-4 rounded-md mt-4"><strong>Example 1:</strong>
<strong>Input:</strong> nums = [2,7,11,15], target = 9
<strong>Output:</strong> [0,1]
<strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].</pre>
<pre class="bg-muted p-4 rounded-md mt-4"><strong>Example 2:</strong>
<strong>Input:</strong> nums = [3,2,4], target = 6
<strong>Output:</strong> [1,2]</pre>
<pre class="bg-muted p-4 rounded-md mt-4"><strong>Example 3:</strong>
<strong>Input:</strong> nums = [3,3], target = 6
<strong>Output:</strong> [0,1]</pre>
<div class="mt-4">
<p class="font-semibold">Constraints:</p>
<ul class="list-disc pl-6 mt-2 space-y-1">
    <li><code>2 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>
    <li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
    <li><code>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></li>
    <li><strong>Only one valid answer exists.</strong></li>
</ul>
</div>
<div class="mt-4">
  <p><strong>Follow-up:</strong> Can you come up with an algorithm that is less than <code>O(n<sup>2</sup>)</code> time complexity?</p>
</div>
`,
};

const defaultCode: Record<string, string> = {
  javascript: `/**
* @param {number[]} nums
* @param {number} target
* @return {number[]}
*/
var twoSum = function(nums, target) {
    
};`,
  python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
`,
  java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        
    }
}`,
  cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        
    }
};`,
    csharp: `public class Solution {
    public int[] TwoSum(int[] nums, int target) {
        
    }
}`,
};

const testCases = [
  {
    input: {
      nums: "[2, 7, 11, 15]",
      target: "9",
    },
    expected: "[0, 1]",
  },
  {
    input: {
      nums: "[3, 2, 4]",
      target: "6",
    },
    expected: "[1, 2]",
  },
  {
    input: {
      nums: "[3, 3]",
      target: "6",
    },
    expected: "[0, 1]",
  },
];

type EvaluationStatus = "idle" | "running" | "success" | "error";
type SubmissionStatus = "Accepted" | "Wrong Answer" | "Time Limit Exceeded" | "Memory Limit Exceeded";
type Submission = {
  id: string;
  status: SubmissionStatus;
  runtime: number;
  memory: number;
  language: string;
  code: string;
  timestamp: Date;
};
type RunResult = {
    status: SubmissionStatus;
    runtime: number;
    memory: number;
} | null;


export default function ArenaPage() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(defaultCode["javascript"]);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [bottomTab, setBottomTab] = useState("testcases");
  const [leftTab, setLeftTab] = useState("description");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [lastRunResult, setLastRunResult] = useState<RunResult>(null);
  const [isSessionActive, setIsSessionActive] = useState(true);
  
  const hasAcceptedSubmission = submissions.some(s => s.status === 'Accepted');


  useEffect(() => {
    if (!isSessionActive) return;
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isSessionActive]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  const onLanguageChange = (lang: string) => {
    setLanguage(lang);
    setCode(defaultCode[lang] || "");
  };

  const handleRunCode = () => {
    setIsEvaluating(true);
    setBottomTab("result");
    setTimeout(() => {
      const isSuccess = Math.random() > 0.3;
      setLastRunResult({
          status: isSuccess ? 'Accepted' : 'Wrong Answer',
          runtime: Math.floor(Math.random() * 50) + 50,
          memory: Math.round((Math.random() * 5 + 50) * 10) / 10,
      });
      setIsEvaluating(false);
    }, 2000);
  };

  const handleSubmitCode = () => {
    setIsSubmitting(true);
    setBottomTab("result");

    setTimeout(() => {
      const isSuccess = Math.random() > 0.3;
      const status: SubmissionStatus = isSuccess ? "Accepted" : "Wrong Answer";

      const newSubmission: Submission = {
        id: `sub_${Date.now()}`,
        status: status,
        runtime: Math.floor(Math.random() * 50) + 50,
        memory: Math.round((Math.random() * 5 + 50) * 10) / 10,
        language: language,
        code: code,
        timestamp: new Date(),
      };
      
      setLastRunResult({
          status: newSubmission.status,
          runtime: newSubmission.runtime,
          memory: newSubmission.memory
      });

      setSubmissions(prev => [newSubmission, ...prev]);
      setIsSubmitting(false);
      
      if (status === 'Accepted') {
        setIsSessionActive(false);
        setLeftTab("submissions");
      } else {
        setLeftTab("description");
      }

    }, 3000);
  }

  const renderResult = () => {
      if (isEvaluating || isSubmitting) {
         return (
            <div className="flex items-center justify-center h-full gap-2 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>{isSubmitting ? "Submitting..." : "Running test cases..."}</span>
            </div>
         )
      }

      if (!lastRunResult) {
          return (
             <div className="flex items-center justify-center h-full text-muted-foreground">
                <p>Click "Run" or "Submit" to see the results.</p>
             </div>
          )
      }
      
      const isSuccess = lastRunResult.status === 'Accepted';

      if (isSubmitting || !hasAcceptedSubmission) {
         return (
             <div>
                <div className={cn("flex items-center gap-2", isSuccess ? "text-green-500" : "text-red-500")}>
                    {isSuccess ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                    <span className="font-semibold">{lastRunResult.status}</span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                    <div>
                    <p className="text-muted-foreground">Status</p>
                    <p className="font-semibold">{lastRunResult.status}</p>
                    </div>
                    <div>
                    <p className="text-muted-foreground">Runtime</p>
                    <p className="font-semibold">{lastRunResult.runtime} ms</p>
                    </div>
                    <div>
                    <p className="text-muted-foreground">Memory</p>
                    <p className="font-semibold">{lastRunResult.memory} MB</p>
                    </div>
                </div>
                {!isSubmitting && (
                    <>
                        <div className="mt-4">
                            <p className="font-semibold mb-2">Test cases</p>
                            {testCases.map((tc, index) => (
                            <div key={index} className="p-2 border-b text-sm flex items-center justify-between">
                                <span className="text-muted-foreground">Case {index + 1}</span>
                                {isSuccess || index < 2 ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />}
                            </div>
                            ))}
                        </div>
                        {!isSuccess && (
                            <div className="mt-4 p-4 rounded-md bg-muted">
                                <p className="font-semibold text-sm">Last test case</p>
                                <div className="mt-2 space-y-1 text-xs font-mono">
                                <p><span className="font-semibold text-muted-foreground">Input:</span> nums = [3,3], target = 6</p>
                                <p><span className="font-semibold text-muted-foreground">Output:</span> [1,1]</p>
                                <p><span className="font-semibold text-muted-foreground">Expected:</span> [0,1]</p>
                                </div>
                            </div>
                        )}
                    </>
                )}
             </div>
         )
      }

      // Final Accepted State
      return (
        <div className="flex flex-col items-center justify-center h-full text-center">
            <PartyPopper className="h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-green-500">Accepted!</h2>
            <p className="text-muted-foreground">Congratulations, you've solved the problem.</p>
             <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                <p className="text-muted-foreground">Runtime</p>
                <p className="font-semibold">{lastRunResult.runtime} ms</p>
                </div>
                <div>
                <p className="text-muted-foreground">Memory</p>
                <p className="font-semibold">{lastRunResult.memory} MB</p>
                </div>
            </div>
        </div>
      )
  }

  return (
    <div className="h-screen w-screen bg-card flex flex-col text-foreground">
      <header className="flex-shrink-0 flex items-center justify-between px-4 py-2 border-b">
        <Link href="/dashboard" className="text-lg font-bold">
          CodeClash Arena
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-red-500 font-semibold">
            <Clock className="h-5 w-5" />
            <span>{formatTime(timeLeft)}</span>
          </div>
           <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <DoorClosed className="mr-2 h-4 w-4" />
                  End Session
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to end the session?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Any unsaved code will be lost. You will be returned to the dashboard.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction asChild className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    <Link href="/dashboard">End Session</Link>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
        </div>
      </header>

      <PanelGroup direction="horizontal" className="flex-grow">
        <Panel defaultSize={40} minSize={25}>
          <div className="h-full flex flex-col">
            <Tabs value={leftTab} onValueChange={setLeftTab} className="flex-1 flex flex-col min-h-0">
              <TabsList className="m-2">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="submissions">Submissions</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="flex-grow p-4 min-h-0">
                <ScrollArea className="h-full">
                  <h1 className="text-2xl font-bold">{problem.title}</h1>
                  <div className="flex items-center gap-2 mt-2 mb-4">
                    <Badge variant={problem.difficulty === 'Easy' ? 'secondary' : 'destructive'}>{problem.difficulty}</Badge>
                  </div>
                  <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: problem.description }} />
                </ScrollArea>
              </TabsContent>
              <TabsContent value="submissions" className="flex-grow p-4 min-h-0">
                <ScrollArea className="h-full">
                  {submissions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                        <History className="h-10 w-10 mb-4" />
                        <p className="font-semibold">No submissions yet</p>
                        <p className="text-sm text-center">Submit your code to see your history here.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {submissions.map(sub => (
                        <Card key={sub.id}>
                          <CardContent className="p-3 grid grid-cols-3 items-center gap-2">
                             <div className="col-span-1">
                               <p className={cn(
                                "font-semibold",
                                sub.status === "Accepted" ? "text-green-500" : "text-red-500"
                               )}>
                                {sub.status}
                               </p>
                               <p className="text-xs text-muted-foreground">
                                {formatDistanceToNow(sub.timestamp, { addSuffix: true })}
                               </p>
                            </div>
                            <div className="col-span-1 text-center">
                                <p className="text-xs text-muted-foreground">Runtime: {sub.runtime}ms</p>
                                <p className="text-xs text-muted-foreground">Memory: {sub.memory}MB</p>
                            </div>
                            <div className="col-span-1 flex justify-end">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="sm"><FileCode className="mr-2 h-4 w-4"/> View Code</Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-3xl h-[80vh]">
                                        <DialogHeader>
                                            <DialogTitle>Submission - {sub.status}</DialogTitle>
                                        </DialogHeader>
                                        <div className="flex-grow h-full overflow-hidden rounded-md border">
                                          <Editor
                                              height="100%"
                                              language={sub.language}
                                              theme="vs-dark"
                                              value={sub.code}
                                              options={{ readOnly: true, minimap: { enabled: false }, fontSize: 14 }}
                                          />
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        </Panel>
        <PanelResizeHandle className="w-1.5 bg-border" />
        <Panel defaultSize={60} minSize={30}>
          <PanelGroup direction="vertical">
            <Panel defaultSize={65} minSize={25}>
              <div className="h-full flex flex-col">
                <div className="flex-shrink-0 p-2 border-b">
                  <Select
                    onValueChange={onLanguageChange}
                    defaultValue={language}
                    disabled={hasAcceptedSubmission}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang} value={lang}>
                          {lang.charAt(0).toUpperCase() + lang.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-grow">
                  <Editor
                    height="100%"
                    language={language}
                    theme="vs-dark"
                    value={code}
                    onChange={(value) => setCode(value || "")}
                    options={{ minimap: { enabled: false }, fontSize: 14, readOnly: hasAcceptedSubmission }}
                  />
                </div>
              </div>
            </Panel>
            <PanelResizeHandle className="h-1.5 bg-border" />
            <Panel defaultSize={35} minSize={15}>
              <div className="h-full flex flex-col">
                <Tabs value={bottomTab} onValueChange={setBottomTab} className="flex-1 flex flex-col min-h-0">
                  <div className="flex justify-between items-center p-2 border-b">
                      <TabsList>
                        <TabsTrigger value="testcases">Test Cases</TabsTrigger>
                        <TabsTrigger value="result">Result</TabsTrigger>
                      </TabsList>
                      <div className="flex gap-2">
                          {hasAcceptedSubmission ? (
                            <>
                              <Button variant="outline" asChild>
                                <Link href="/dashboard"><Home className="mr-2 h-4 w-4"/> Problems</Link>
                              </Button>
                              <Button asChild>
                                <Link href="/dashboard/arena">Next Challenge <ArrowRight className="ml-2 h-4 w-4"/></Link>
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button variant="outline" onClick={handleRunCode} disabled={isEvaluating || isSubmitting}>
                                  {isEvaluating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
                                  Run
                              </Button>
                              <Button className="bg-green-600 hover:bg-green-700" onClick={handleSubmitCode} disabled={isEvaluating || isSubmitting}>
                                  {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                                  Submit
                              </Button>
                            </>
                          )}
                      </div>
                  </div>
                  <TabsContent value="testcases" className="flex-grow p-2 min-h-0">
                      <ScrollArea className="h-full">
                        <div className="space-y-4">
                          {testCases.map((tc, index) => (
                            <Card key={index}>
                              <CardContent className="p-3">
                                <p className="text-sm font-medium mb-2">Case {index + 1}</p>
                                <div className="space-y-1 text-xs">
                                  <p><span className="font-semibold">nums:</span> {tc.input.nums}</p>
                                  <p><span className="font-semibold">target:</span> {tc.input.target}</p>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </ScrollArea>
                  </TabsContent>
                  <TabsContent value="result" className="flex-grow p-4 min-h-0">
                      <ScrollArea className="h-full">
                        {renderResult()}
                      </ScrollArea>
                  </TabsContent>
                </Tabs>
              </div>
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </div>
  );
}
