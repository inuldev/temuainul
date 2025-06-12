"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  BotIcon,
  VideoIcon,
  PlusIcon,
  TrendingUpIcon,
  CalendarIcon,
  ClockIcon,
} from "lucide-react";

import { useTRPC } from "@/trpc/client";
import { authClient } from "@/lib/auth-client";
import { DEFAULT_PAGE_SIZE } from "@/constants";
import { Button } from "@/components/ui/button";
import { DataPagination } from "@/components/data-pagination";
import { GeneratedAvatar } from "@/components/generated-avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useHomeFilters } from "../../hooks/use-home-filters";

export const HomeView = () => {
  const trpc = useTRPC();
  const { data: session } = authClient.useSession();
  const [filters, setFilters] = useHomeFilters();

  // Fetch stats data
  const { data: agentsData } = useQuery(
    trpc.agents.getMany.queryOptions({
      pageSize: 100,
    })
  );

  const { data: meetingsData } = useQuery(
    trpc.meetings.getMany.queryOptions({
      page: filters.meetingsPage,
      pageSize: DEFAULT_PAGE_SIZE,
    })
  );

  const totalAgents = agentsData?.total || 0;
  const totalMeetings = meetingsData?.total || 0;
  const recentMeetings = meetingsData?.items || [];

  // Get today's meetings
  const today = new Date().toLocaleDateString("id-ID");
  const todayMeetings = recentMeetings.filter(
    (meeting) =>
      new Date(meeting.createdAt).toLocaleDateString("id-ID") === today
  ).length;

  return (
    <div className="flex-1 p-4 md:p-6 space-y-6">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold">
          Selamat datang, {session?.user?.name || "User"}! 👋
        </h1>
        <p className="text-muted-foreground">
          Kelola meeting AI Anda dengan mudah dan efisien
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Agent AI
            </CardTitle>
            <BotIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAgents}</div>
            <p className="text-xs text-muted-foreground">
              Agent siap membantu meeting Anda
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Meeting</CardTitle>
            <VideoIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMeetings}</div>
            <p className="text-xs text-muted-foreground">
              Meeting yang telah dilakukan
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Meeting Hari Ini
            </CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayMeetings}</div>
            <p className="text-xs text-muted-foreground">
              Meeting yang dibuat hari ini
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <VideoIcon className="h-5 w-5" />
              Mulai Meeting Baru
            </CardTitle>
            <CardDescription>
              Buat meeting baru dengan AI agent pilihan Anda
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/meetings">
                <PlusIcon className="h-4 w-4" />
                Buat Meeting
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BotIcon className="h-5 w-5" />
              Kelola Agent AI
            </CardTitle>
            <CardDescription>
              Buat dan atur agent AI dengan instruksi khusus
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/agents">
                <PlusIcon className="h-4 w-4" />
                Kelola Agent
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Meetings */}
      {recentMeetings.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClockIcon className="h-5 w-5" />
              Meeting Terbaru
            </CardTitle>
            <CardDescription>
              Daftar meeting yang baru saja dibuat
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentMeetings.map((meeting) => (
                <div
                  key={meeting.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <GeneratedAvatar
                      seed={meeting.agent.name}
                      variant="botttsNeutral"
                      className="h-8 w-8"
                    />
                    <div>
                      <p className="font-medium">{meeting.name}</p>
                      <p className="text-sm text-muted-foreground">
                        dengan {meeting.agent.name}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        meeting.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : meeting.status === "active"
                          ? "bg-blue-100 text-blue-800"
                          : meeting.status === "upcoming"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {meeting.status === "completed"
                        ? "Selesai"
                        : meeting.status === "active"
                        ? "Aktif"
                        : meeting.status === "upcoming"
                        ? "Akan Datang"
                        : meeting.status}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(meeting.createdAt).toLocaleDateString("id-ID")}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {meetingsData && meetingsData.totalPages > 1 && (
              <div className="mt-4">
                <DataPagination
                  page={filters.meetingsPage}
                  totalPages={meetingsData.totalPages}
                  onPageChange={(page) => setFilters({ meetingsPage: page })}
                />
              </div>
            )}

            <div className="mt-4 text-center">
              <Button asChild variant="ghost">
                <Link href="/meetings">Lihat Semua Meeting</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State for New Users */}
      {totalAgents === 0 && totalMeetings === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <TrendingUpIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  Mulai Perjalanan AI Anda
                </h3>
                <p className="text-muted-foreground">
                  Buat agent AI pertama Anda dan mulai meeting yang lebih
                  produktif
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button asChild>
                  <Link href="/agents">
                    <BotIcon className="h-4 w-4" />
                    Buat Agent AI
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/meetings">
                    <VideoIcon className="h-4 w-4" />
                    Mulai Meeting
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
