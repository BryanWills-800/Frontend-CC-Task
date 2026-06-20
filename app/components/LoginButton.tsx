'use client';
import React from 'react';
import Button from "@/app/components/Button";


export default function LoginButton() {

  return (
    <div style={{ whiteSpace: 'nowrap' }}>
        <Button href='/login' variant="neutral">
            Login
        </Button>
    </div>
  );
}
