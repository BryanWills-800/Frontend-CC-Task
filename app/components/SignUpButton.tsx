'use client';
import React from 'react';
import Button from "@/app/components/Button";

export default function SignUpButton() {
  return (
    <div style={{ whiteSpace: 'nowrap' }}>
      <Button href='/signup' variant="primary">
        Sign Up
      </Button>
    </div>
  );
}