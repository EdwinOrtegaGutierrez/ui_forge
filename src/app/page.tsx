"use client";
//import styles from "./page.module.css";
import { useState, useRef } from 'react';
import Image from 'next/image';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Card } from 'primereact/card';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const toast = useRef<Toast>(null);

  const show = (
    severity: "success" | "info" | "warn" | "error" | "secondary" | "contrast" | undefined,
    summary: string,
    detail: string
  ) => {
      toast.current?.show({ severity: severity, summary: summary, detail: detail });
  };

  const handleLogin = () => {
    if (!username || !password) {
      show("error", "Error", "Por favor, completa todos los campos.");
      return;
    }

    // Simula una autenticación básica
    if (username === 'admin' && password === '1234') {
      show("success", "Success", "Inicio de sesión exitoso");
    } else {
      show("error", "Error", "Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className='box'>
      <Card style={{ width: '622px', height:"650px" }}>
        <Image
          src="/logo.jpg"
          alt="Logo de la aplicación"
          width={490}
          height={250}
          className='logo-image'
        />
        <h2 style={{ textAlign: 'center' }} className='p-title'>Iniciar sesión</h2>
          <InputText
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='large-input'
            placeholder="Ingresa tu correo electrónico"
          />
        <div style={{ width: '100%' }}>
          <Password
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            toggleMask
            placeholder="Ingresa tu contraseña"
            className='large-input'
            pt={{
              iconField: {
                root: {
                  style: { width: "100%" },
                },
              },
              input: {
                style: { width: "100%" },
              },
              root: {
                style: { width: "100%" },
              },
            }}
          />
        </div>

        <Toast ref={toast} />

        <div style={{
              display: 'flex',
              justifyContent: 'center',  
        }}>
            <Button label="Iniciar sesión" severity="info" icon="pi pi-sign-in" onClick={handleLogin}  style={{width:"200px"}}/>
        </div>
      </Card>
    </div>

  );
}
