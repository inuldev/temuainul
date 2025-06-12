"use client";

import Link from "next/link";
import {
  StarIcon,
  RocketIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  ConstructionIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const UpgradeView = () => {
  return (
    <div className="flex-1 p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="sm">
          <Link href="/">
            <ArrowLeftIcon className="h-4 w-4" />
            Kembali
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <StarIcon className="h-8 w-8 text-yellow-500" />
            Premium Features
          </h1>
          <p className="text-muted-foreground">
            Tingkatkan pengalaman meeting AI Anda
          </p>
        </div>
      </div>

      {/* Coming Soon Banner */}
      <Card className="border-dashed border-2 border-primary/20 bg-primary/5">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <ConstructionIcon className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold flex items-center justify-center gap-2">
                <RocketIcon className="h-5 w-5" />
                Sedang Dalam Pengembangan
              </h2>
              <p className="text-muted-foreground mt-2">
                Fitur premium sedang dalam tahap pengembangan dan akan segera
                hadir!
              </p>
            </div>
            <Badge
              variant="outline"
              className="flex items-center gap-2 w-fit mx-auto"
            >
              <ClockIcon className="h-3 w-3" />
              Coming Soon
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Preview Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircleIcon className="h-5 w-5 text-green-600" />
              Fitur Premium yang Akan Datang
            </CardTitle>
            <CardDescription>
              Berikut adalah beberapa fitur premium yang sedang kami kembangkan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Meeting tanpa batas waktu</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">
                  AI agent dengan kemampuan advanced
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">
                  Rekaman meeting berkualitas tinggi
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">
                  Summary meeting yang lebih detail
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">
                  Integrasi dengan tools eksternal
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Priority support</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <StarIcon className="h-5 w-5 text-yellow-500" />
              Mengapa Premium?
            </CardTitle>
            <CardDescription>
              Manfaat yang akan Anda dapatkan dengan upgrade premium
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-muted rounded-lg">
                <h4 className="font-medium text-sm">Produktivitas Maksimal</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Meeting yang lebih efisien dengan AI yang lebih canggih
                </p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <h4 className="font-medium text-sm">Kualitas Terbaik</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Rekaman dan transkrip berkualitas tinggi untuk dokumentasi
                </p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <h4 className="font-medium text-sm">Dukungan Prioritas</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Bantuan teknis yang cepat dan responsif
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section */}
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <div className="text-center space-y-4 max-w-md">
            <h3 className="text-lg font-semibold">
              Ingin Mendapatkan Update Terbaru?
            </h3>
            <p className="text-sm text-muted-foreground">
              Sementara menunggu fitur premium, nikmati dulu fitur gratis yang
              sudah tersedia. Kami akan memberitahu Anda ketika premium sudah
              siap!
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button asChild>
                <Link href="/meetings">Mulai Meeting Gratis</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/agents">Kelola Agent AI</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer Note */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          Fitur premium akan tersedia dalam waktu dekat. Terima kasih atas
          kesabaran Anda! 🚀
        </p>
      </div>
    </div>
  );
};
