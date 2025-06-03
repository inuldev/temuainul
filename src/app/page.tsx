"use client";

import { useState } from "react";

import { authClient } from "@/lib/auth-client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: session } = authClient.useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    authClient.signUp.email(
      {
        name,
        email,
        password,
      },
      {
        onError: () => {
          window.alert("terjadi kesalahan");
        },
        onSuccess: () => {
          window.alert("berhasil daftar");
        },
      }
    );
  };

  if (session) {
    return (
      <div className="p-4 flex flex-col gap-y-4">
        <p>Masuk sebagai {session.user.name}</p>
        <Button onClick={() => authClient.signOut()}>Keluar</Button>
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-y-4">
      <Input
        placeholder="nama"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={onSubmit}>Daftar</Button>
    </div>
  );
}
