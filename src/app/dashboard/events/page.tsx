'use client';

import { useState, useEffect } from 'react';
import {
  addDays,
  format,
  isSameDay,
  startOfWeek,
  isWithinInterval,
  eachDayOfInterval,
  differenceInDays,
  startOfDay,
} from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type Event = {
  id: string;
  name: string;
  platform: 'LeetCode' | 'Codeforces' | 'TopCoder' | 'HackerRank' | 'Other';
  startTime: Date;
  endTime: Date;
  link: string;
  type: 'Contest' | 'Workshop' | 'Alliance War' | 'Hackathon';
};

const getDummyEvents = (): Event[] => {
  const today = new Date();
  return [
    {
      id: '1',
      name: 'Weekly Contest 350',
      platform: 'LeetCode',
      startTime: new Date(new Date().setDate(today.getDate())),
      endTime: new Date(new Date().setDate(today.getDate())),
      link: '#',
      type: 'Contest',
    },
    {
      id: '2',
      name: 'Codeforces Round #882 (Div. 2)',
      platform: 'Codeforces',
      startTime: new Date(new Date().setDate(today.getDate() + 1)),
      endTime: new Date(new Date().setDate(today.getDate() + 1)),
      link: '#',
      type: 'Contest',
    },
    {
      id: '3',
      name: 'Alliance War: TCC vs PYPH',
      platform: 'Other',
      startTime: new Date(new Date().setDate(today.getDate() + 2)),
      endTime: new Date(new Date().setDate(today.getDate() + 2)),
      link: '#',
      type: 'Alliance War',
    },
    {
      id: '4',
      name: 'TopCoder SRM 855',
      platform: 'TopCoder',
      startTime: new Date(new Date().setDate(today.getDate() + 4)),
      endTime: new Date(new Date().setDate(today.getDate() + 4)),
      link: '#',
      type: 'Contest',
    },
    {
      id: '5',
      name: 'Weekend Hackathon',
      platform: 'Other',
      startTime: new Date(new Date().setDate(today.getDate() + 2)),
      endTime: new Date(new Date().setDate(today.getDate() + 4)),
      link: '#',
      type: 'Hackathon',
    },
    {
      id: '6',
      name: 'HackerRank HourRank 32',
      platform: 'HackerRank',
      startTime: new Date(new Date().setDate(today.getDate() + 5)),
      endTime: new Date(new Date().setDate(today.getDate() + 5)),
      link: '#',
      type: 'Contest',
    },
    {
      id: '7',
      name: 'LeetCode Biweekly Contest 110',
      platform: 'LeetCode',
      startTime: new Date(new Date().setDate(today.getDate() + 6)),
      endTime: new Date(new Date().setDate(today.getDate() + 6)),
      link: '#',
      type: 'Contest',
    },
    {
      id: '8',
      name: '3-Day Coding Challenge',
      platform: 'Other',
      startTime: new Date(new Date().setDate(today.getDate() + 3)),
      endTime: new Date(new Date().setDate(today.getDate() + 5)),
      link: '#',
      type: 'Hackathon',
    },
  ];
};

const platformColors = {
  LeetCode: 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30',
  Codeforces: 'bg-red-500/20 text-red-600 border-red-500/30',
  TopCoder: 'bg-blue-500/20 text-blue-600 border-blue-500/30',
  HackerRank: 'bg-green-500/20 text-green-600 border-green-500/30',
  Other: 'bg-gray-500/20 text-gray-600 border-gray-500/30',
};

const typeColors = {
  Contest: 'bg-primary/20 text-primary-foreground border-primary/30',
  Workshop: 'bg-accent/20 text-accent-foreground border-accent/30',
  'Alliance War':
    'bg-destructive/20 text-destructive-foreground border-destructive/30',
  Hackathon: 'bg-purple-500/20 text-purple-600 border-purple-500/30',
};

const EventCard = ({
  event,
  style,
}: {
  event: Event;
  style: React.CSSProperties;
}) => {
  return (
    <div style={style}>
      <Card className='p-2 flex flex-col justify-between items-start gap-2 h-full text-left'>
        <div className='flex-1'>
          <p className='font-semibold text-sm leading-tight'>{event.name}</p>
          <div className='flex items-center gap-2 text-xs text-muted-foreground mt-1 flex-wrap'>
            <Badge
              variant='secondary'
              className={cn(platformColors[event.platform], 'text-xs')}>
              {event.platform}
            </Badge>
            <Badge
              variant='outline'
              className={cn(typeColors[event.type], 'text-xs')}>
              {event.type}
            </Badge>
          </div>
          <p className='text-xs text-muted-foreground mt-1'>
            {format(event.startTime, 'p')} - {format(event.endTime, 'p')}
          </p>
        </div>
        <Button
          asChild
          size='sm'
          variant='outline'
          className='w-full sm:w-auto mt-auto'>
          <Link href={event.link} target='_blank'>
            Go to Event <ExternalLink className='ml-2 h-3 w-3' />
          </Link>
        </Button>
      </Card>
    </div>
  );
};

type PositionedEvent = {
  event: Event;
  startDayIndex: number;
  duration: number;
  row: number;
};

const assignRowsToEvents = (
  events: Event[],
  weekStart: Date
): PositionedEvent[] => {
  const weekEnd = addDays(weekStart, 6);
  const grid: boolean[][] = Array.from({ length: 10 }, () =>
    Array(7).fill(false)
  ); // Max 10 rows

  const sortedEvents = events.sort(
    (a, b) =>
      differenceInDays(a.startTime, b.startTime) ||
      differenceInDays(b.endTime, a.endTime)
  );

  const positionedEvents: PositionedEvent[] = [];

  sortedEvents.forEach((event) => {
    const eventStart = startOfDay(event.startTime);
    const eventEnd = startOfDay(event.endTime);

    const start = eventStart < weekStart ? weekStart : eventStart;
    const end = eventEnd > weekEnd ? weekEnd : eventEnd;

    const startDayIndex = differenceInDays(start, weekStart);
    const duration = differenceInDays(end, start) + 1;

    let placed = false;
    for (let row = 0; row < grid.length; row++) {
      let canPlace = true;
      for (let i = 0; i < duration; i++) {
        if (startDayIndex + i < 7 && grid[row][startDayIndex + i]) {
          canPlace = false;
          break;
        }
      }
      if (canPlace) {
        for (let i = 0; i < duration; i++) {
          if (startDayIndex + i < 7) {
            grid[row][startDayIndex + i] = true;
          }
        }
        positionedEvents.push({ event, startDayIndex, duration, row: row + 1 });
        placed = true;
        break;
      }
    }
  });

  return positionedEvents;
};

export default function EventsPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    setEvents(getDummyEvents());
  }, []);

  const startDayOfWeek = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start week on Monday
  const weekDays = Array.from({ length: 7 }, (_, i) =>
    addDays(startDayOfWeek, i)
  );

  const handlePrevWeek = () => {
    setCurrentDate(addDays(currentDate, -7));
  };

  const handleNextWeek = () => {
    setCurrentDate(addDays(currentDate, 7));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const weeklyEvents = events.filter(
    (event) =>
      isWithinInterval(event.startTime, {
        start: startOfDay(weekDays[0]),
        end: startOfDay(weekDays[6]),
      }) ||
      isWithinInterval(event.endTime, {
        start: startOfDay(weekDays[0]),
        end: startOfDay(weekDays[6]),
      }) ||
      (event.startTime < startOfDay(weekDays[0]) &&
        event.endTime > startOfDay(weekDays[6]))
  );

  const positionedEvents = assignRowsToEvents(weeklyEvents, startDayOfWeek);

  return (
    <div className='p-4 md:p-6 lg:p-8'>
      <Card>
        <CardHeader>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
            <div>
              <CardTitle className='text-2xl'>Event Calendar</CardTitle>
              <p className='text-muted-foreground'>
                {format(startDayOfWeek, 'MMMM yyyy')}
              </p>
            </div>
            <div className='flex items-center gap-2'>
              <Button variant='outline' onClick={handleToday}>
                Today
              </Button>
              <div className='flex items-center gap-1 rounded-md border p-1'>
                <Button variant='ghost' size='icon' onClick={handlePrevWeek}>
                  <ChevronLeft className='h-4 w-4' />
                </Button>
                <Button variant='ghost' size='icon' onClick={handleNextWeek}>
                  <ChevronRight className='h-4 w-4' />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-7 border-t border-l rounded-t-lg overflow-hidden'>
            {weekDays.map((day) => (
              <div
                key={day.toString()}
                className='p-2 border-b border-r text-center'>
                <p className='text-sm text-muted-foreground'>
                  {format(day, 'E')}
                </p>
                <h3
                  className={cn(
                    'text-2xl font-semibold',
                    isSameDay(day, new Date()) && 'text-primary'
                  )}>
                  {format(day, 'd')}
                </h3>
              </div>
            ))}
          </div>
          <div className='grid grid-cols-7 grid-rows-1 border-l border-b border-r rounded-b-lg min-h-96 relative'>
            {weekDays.map((day, index) => (
              <div
                key={`day-bg-${index}`}
                className={cn('h-full', index < 6 && 'border-r')}></div>
            ))}
            {positionedEvents.map(
              ({ event, startDayIndex, duration, row }, index) => {
                const gridColumnStart = startDayIndex + 1;
                const gridColumnEnd = gridColumnStart + duration;

                const eventStyle = {
                  gridColumn: `${gridColumnStart} / ${gridColumnEnd}`,
                  gridRow: `${row}`,
                  zIndex: index,
                  margin: '4px',
                };

                return (
                  <EventCard key={event.id} event={event} style={eventStyle} />
                );
              }
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
